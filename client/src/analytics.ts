import posthog from "posthog-js";

const ANALYTICS_SCRIPT_ID = "umami-analytics-script";

const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
const posthogProjectToken = import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN;
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

if (posthogProjectToken && posthogHost) {
  posthog.init(posthogProjectToken, {
    api_host: posthogHost,
    defaults: "2026-01-30",
  });
}

if (analyticsEndpoint && analyticsWebsiteId && !document.getElementById(ANALYTICS_SCRIPT_ID)) {
  const script = document.createElement("script");

  script.id = ANALYTICS_SCRIPT_ID;
  script.defer = true;
  script.src = `${analyticsEndpoint.replace(/\/+$/, "")}/umami`;
  script.dataset.websiteId = analyticsWebsiteId;

  document.body.appendChild(script);
}
