import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

function replaceDeprecatedUnloadListeners(source: string) {
  return source.replaceAll('addEventListener("unload"', 'addEventListener("pagehide"');
}

function vitePluginManusRuntimeWithoutDeprecatedUnload(): Plugin {
  const plugin = vitePluginManusRuntime({ injectTo: "body" });
  const transformIndexHtml = plugin.transformIndexHtml;

  if (typeof transformIndexHtml !== "function") {
    return plugin;
  }

  return {
    ...plugin,
    name: "vite-plugin-manus-runtime-without-deprecated-unload",
    transformIndexHtml(html, context) {
      const result = transformIndexHtml.call(this, html, context);

      if (Array.isArray(result)) {
        return result.map((tag) => {
          if (typeof tag.children !== "string") {
            return tag;
          }

          return {
            ...tag,
            children: replaceDeprecatedUnloadListeners(tag.children),
          };
        });
      }

      return typeof result === "string" ? replaceDeprecatedUnloadListeners(result) : result;
    },
  };
}

type StaticSpaRoute = string | { path: string; title: string; description: string };

function escapeHtmlAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Swaps the title and description, including their Open Graph and Twitter copies,
// so shared links and search results describe the route instead of the home page.
function withRouteMetadata(html: string, title: string, description: string) {
  const safeTitle = escapeHtmlAttribute(title);
  const safeDescription = escapeHtmlAttribute(description);

  return html
    .replace(/<title>[^<]*<\/title>/, () => `<title>${safeTitle}</title>`)
    .replace(
      /(<meta\s+(?:name|property)="(?:og|twitter):title"\s+content=")[^"]*/g,
      (_match, prefix: string) => `${prefix}${safeTitle}`,
    )
    .replace(
      /(<meta\s+(?:name|property)="(?:(?:og|twitter):)?description"\s+content=")[^"]*/g,
      (_match, prefix: string) => `${prefix}${safeDescription}`,
    );
}

function vitePluginStaticSpaRoutes(routes: StaticSpaRoute[]): Plugin {
  return {
    name: "static-spa-routes",
    enforce: "post",
    generateBundle(_options, bundle) {
      const indexHtml = bundle["index.html"];

      if (!indexHtml || indexHtml.type !== "asset") {
        return;
      }

      const html =
        typeof indexHtml.source === "string"
          ? indexHtml.source
          : new TextDecoder().decode(indexHtml.source);

      for (const route of routes) {
        const routeConfig = typeof route === "string" ? { path: route } : route;
        const routePath = routeConfig.path.replace(/^\/+|\/+$/g, "");

        if (!routePath) {
          continue;
        }

        this.emitFile({
          type: "asset",
          fileName: `${routePath}/index.html`,
          source:
            "title" in routeConfig
              ? withRouteMetadata(html, routeConfig.title, routeConfig.description)
              : indexHtml.source,
        });
      }
    },
  };
}

const includeDebugPlugins =
  process.env.NODE_ENV !== "production" ||
  process.env.VITE_ENABLE_PRODUCTION_DEBUG_TOOLS === "true";

const plugins = [
  react(),
  tailwindcss(),
  ...(includeDebugPlugins
    ? [
        jsxLocPlugin(),
        vitePluginManusRuntimeWithoutDeprecatedUnload(),
        vitePluginManusDebugCollector(),
      ]
    : []),
  vitePluginStaticSpaRoutes([
    "/privacy",
    "/terms",
    {
      path: "/partners",
      title: "Hooks - Programa de afiliados",
      description:
        "Gana una comisión recurrente de por vida por cada cuenta que refieras a Hooks. Sin topes, sin niveles que escalar y sin audiencia mínima.",
    },
    {
      path: "/partners/agreement",
      title: "Hooks - Acuerdo del Programa de Afiliados",
      description:
        "Las condiciones completas del Programa de Afiliados de Hooks: atribución, comisiones, afiliados fundadores, pagos y normas de promoción.",
    },
  ]),
];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    strictPort: false, // Will find next available port if 3000 is busy
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
