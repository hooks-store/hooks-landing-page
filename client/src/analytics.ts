const ANALYTICS_SCRIPT_ID = "umami-analytics-script";
const GTM_SCRIPT_ID = "google-tag-manager-script";
const GTM_ID = "GTM-5XWW96PG";
const ANALYTICS_START_DELAY_MS = 7000;

const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
const posthogProjectToken = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

type WindowWithDataLayer = Window & {
  dataLayer?: unknown[];
};

function runAfterPageLoad(callback: () => void) {
  const run = () => {
    window.setTimeout(callback, ANALYTICS_START_DELAY_MS);
  };

  if (document.readyState === "complete") {
    run();
    return;
  }

  window.addEventListener("load", run, { once: true });
}

function initPosthog() {
  if (!posthogProjectToken || !posthogHost) {
    return;
  }

  void import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(posthogProjectToken, {
        api_host: posthogHost,
        defaults: "2026-01-30",
      });
    })
    .catch(() => undefined);
}

function initUmami() {
  if (
    !analyticsEndpoint ||
    !analyticsWebsiteId ||
    document.getElementById(ANALYTICS_SCRIPT_ID)
  ) {
    return;
  }

  const script = document.createElement("script");

  script.id = ANALYTICS_SCRIPT_ID;
  script.defer = true;
  script.src = `${analyticsEndpoint.replace(/\/+$/, "")}/umami`;
  script.dataset.websiteId = analyticsWebsiteId;

  document.body.appendChild(script);
}

function initGoogleTagManager() {
  if (document.getElementById(GTM_SCRIPT_ID)) {
    return;
  }

  const win = window as WindowWithDataLayer;
  win.dataLayer = win.dataLayer || [];
  win.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = GTM_SCRIPT_ID;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

  document.head.appendChild(script);
}

runAfterPageLoad(() => {
  initPosthog();
  initUmami();
  initGoogleTagManager();
});
