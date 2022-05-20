import { Web3ReactLocalProvider } from 'contexts/web3react';
import React, { useEffect } from 'react';
//@ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch, withRouter, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/Base/ErrorBoundary';
// eslint-disable-next-line
import NewLanding from './pages/NewLanding';
import { clearAlert } from './store/actions/alert';
import XborgLandingPage from 'pages/XborgLandingPage';

/**
 * Main App routes.
 */
const Routes: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);
  const { history } = props;
  const location = useLocation();
  useEffect(() => {
    const { type, message } = alert;
    if (type && message) {
      NotificationManager[type](message);
    }
  }, [alert]);

  useEffect(() => {
    history.listen((location, action) => {
      dispatch(clearAlert());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (location.pathname === '/new-landing') {
    return (
      <Switch>
        <Route path={'/new-landing'} component={NewLanding} />
      </Switch>
    );
  }
  if (location.pathname === '/xborg-landing-page') {
    return (
      <Switch>
        <Route path={'/xborg-landing-page'} component={XborgLandingPage} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path={'/'} component={NewLanding} />
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
