import { Web3ReactLocalProvider } from 'contexts/web3react';
import ComingSoon from 'pages/ComingSoon';
import React, { useEffect } from 'react';
//@ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, RouteComponentProps, Switch, withRouter, useLocation } from 'react-router-dom';
import AppContainer from './AppContainer';
import ErrorBoundary from './components/Base/ErrorBoundary';
import { SolanaProvider } from './contexts/solana';
import Deals from './pages/Deals';
// eslint-disable-next-line
import IDOProjectDetail from './pages/IDOProjectDetail';
import Landing from './pages/Landing';
import NotFoundPage from './pages/NotFoundPage';
import MyProfile from './pages/Profile';
import DefaultLayout from './pages/UserSiteDashboard/Layout/DefaultLayout';
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
    // <DefaultLayout>
    //   <Switch>
    //     <Route exact path={'/'} component={Landing} />
    //     <Route path={'/profile'} component={MyProfile} />
    //     <Route exact path={'/deals/ido-projects'} component={Deals} />
    //     {/* <Route path={'/deals/ido-projects/:id'} component={IDOProjectDetail} /> */}
    //     <Route path={'/deals/ido-projects/:id'} component={ComingSoon} />
    //     <Route path={'/pools/staking'} component={ComingSoon} />
    //     <Route path={'/pools/farming'} component={ComingSoon} />
    //     <Route path={'/guides'} component={ComingSoon} />
    //     <Route path={'/executive-lounge'} component={ComingSoon} />
    //     {/* <Route path={'/new-landing'} component={NewLanding} /> */}
    //     <Route component={NotFoundPage} />
    //   </Switch>
    // </DefaultLayout>
    <Switch>
      <Route exact path={'/'}  component={NewLanding} />
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
            <SolanaProvider>
              <AppContainer>
                <RoutesHistory />
              </AppContainer>
            </SolanaProvider>
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
