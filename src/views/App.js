import Firebase from "firebase/app";
import { FirestoreProvider } from "react-firestore";
import React from "react";
import ReactGA from "react-ga";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ErrorBoundary from "./misc/ErrorBoundary";
import Routes from "./Routes";
import Layout from "./layout/Layout";
import GlobalStyle from "../styles/global";
import StreamPage from "./stream/StreamPage";

const App = () => (
  <FirestoreProvider firebase={Firebase}>
    <GlobalStyle />
    <BrowserRouter>
      <ErrorBoundary>
        <Switch>
          <Route path="/stream" component={StreamPage} />

          <Layout>
            <Route path="/" component={ScrollToTop} />
            <Routes />
          </Layout>
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  </FirestoreProvider>
);

// scroll to top on route change
// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md#scroll-to-top
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    return null;
  }
}

export default App;
