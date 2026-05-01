const ANALYTICS_SCRIPT_ID = "umami-analytics-script";

const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

if (analyticsEndpoint && analyticsWebsiteId && !document.getElementById(ANALYTICS_SCRIPT_ID)) {
  const script = document.createElement("script");

  script.id = ANALYTICS_SCRIPT_ID;
  script.defer = true;
  script.src = `${analyticsEndpoint.replace(/\/+$/, "")}/umami`;
  script.dataset.websiteId = analyticsWebsiteId;

  document.body.appendChild(script);
}
