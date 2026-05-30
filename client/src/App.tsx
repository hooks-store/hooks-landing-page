import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

const FAQ = lazy(() => import("./pages/FAQ"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PrivacyPage() {
  return <LegalPage documentType="privacy" />;
}

function TermsPage() {
  return <LegalPage documentType="terms" />;
}

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in history)) {
      return;
    }

    const previousScrollRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    return () => {
      history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    document.documentElement.style.scrollBehavior = previousScrollBehavior;
  }, [location]);

  return null;
}

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/privacy"} component={PrivacyPage} />
        <Route path={"/terms"} component={TermsPage} />
        <Route path={"/faq"} component={FAQ} />
        <Route path={"/faqs"} component={FAQ} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route path={"*"} component={NotFound} />
      </Switch>
    </Suspense>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <ThemeProvider
          defaultTheme="dark"
          // switchable
        >
          <ScrollToTop />
          <Router />
        </ThemeProvider>
      </ErrorBoundary>
    </LanguageProvider>
  );
}

export default App;
