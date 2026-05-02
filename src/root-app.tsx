import "./app.css";
import { ErrorBoundary, LocationProvider, Route, Router } from "preact-iso";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Layout } from "./layouts/Layout";
import { App } from "./pages/App";

export function RootApp() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Layout>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/app" component={App} />
          </Router>
        </Layout>
      </ErrorBoundary>
    </LocationProvider>
  );
}
