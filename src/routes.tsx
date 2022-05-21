import { Web3ReactLocalProvider } from 'contexts/web3react';
import MintPage from 'pages/XborgLandingPage';
import React from 'react';
//@ts-ignore
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import ErrorBoundary from './components/Base/ErrorBoundary';
// eslint-disable-next-line
import NewLanding from './pages/NewLanding';

/**
 * Main App routes.
 */
const Routes: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  return (
    <Switch>
      <Route exact path={'/'} component={NewLanding} />
      <Route path={'/mint'} component={MintPage} />
      <Redirect to="/" />
    </Switch>
  );
};

const RoutesHistory = withRouter(Routes);

const routing = function createRouting() {
  return (
    <>
      <NotificationContainer />
      <Router>
        <ErrorBoundary>
          <Web3ReactLocalProvider>
            <RoutesHistory />
          </Web3ReactLocalProvider>
        </ErrorBoundary>
      </Router>
    </>
  );
};
/**
 * Wrap the app routes into router
 *
 * PROPS
 * =============================================================================
 * @returns {React.Node}
 */
export default routing;
