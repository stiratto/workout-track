import "./app.css";
import { ErrorBoundary, LocationProvider, Route, Router } from "preact-iso";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Layout } from "./layouts/Layout";

export function App() {
  return (
    <LocationProvider>
      <ErrorBoundary>
        <Layout>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
          </Router>
        </Layout>
      </ErrorBoundary>
    </LocationProvider>
  );
}
