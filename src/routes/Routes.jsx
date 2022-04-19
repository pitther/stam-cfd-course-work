import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import NoMatch from '../pages';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Workspace from '../pages/Workspace';

import * as paths from './paths';

const Routes = () => (
  <Router>
    <Switch>
      <Route path={paths.WORKSPACE}>
        <Layout selectedTab={paths.WORKSPACE}>
          <Workspace />
        </Layout>
      </Route>
      <Route path={paths.PROFILE}>
        <Layout selectedTab={paths.PROFILE}>
          <Profile />
        </Layout>
      </Route>
      <Route path={paths.LOGIN}>
        <Layout selectedTab={paths.LOGIN}>
          <Login />
        </Layout>
      </Route>
      <Route exact path={paths.HOME}>
        <Layout selectedTab={paths.HOME}>
          <Home />
        </Layout>
      </Route>
      <Route>
        <Layout>
          <NoMatch />
        </Layout>
      </Route>
    </Switch>
  </Router>
);

export default Routes;
