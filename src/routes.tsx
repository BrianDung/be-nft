import { Web3ReactLocalProvider } from 'contexts/web3react';
import MintPage from 'pages/Mint';
import React, { useEffect } from 'react';
//@ts-ignore
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { clearAlert } from 'store/actions/alert';
import ErrorBoundary from './components/Base/ErrorBoundary';
// eslint-disable-next-line
import NewLanding from './pages/NewLanding';
import { notification } from 'antd';

/**
 * Main App routes.
 */
const Routes: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.alert);
  const { history } = props;

  useEffect(() => {
    if (alert?.message) {
      notification.info({
        message: alert.message,
        placement: 'top',
        duration: 900000,
        className: 'alertMessage',
        icon: <></>,
        closeIcon: <img src="./images/icons/x-icon.svg" alt="x" />,
      });
    }
  }, [alert]);

  useEffect(() => {
    history.listen(() => {
      dispatch(clearAlert());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Switch>
      <Route exact path={'/'} component={NewLanding} />
      <Web3ReactLocalProvider>
        <Route path={'/mint'} component={MintPage} />
      </Web3ReactLocalProvider>
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
          <RoutesHistory />
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
