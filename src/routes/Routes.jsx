import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Workspace from '../pages/Workspace';

import * as paths from './paths';

const Routes = () => (
  <Router>
    <Switch>
      <Route path={paths.LOGIN}>
        <Layout selectedTab="1">
          <Login />
        </Layout>
      </Route>
      <Route path={paths.WORKSPACE}>
        <Layout selectedTab="3">
          <Workspace />
        </Layout>
      </Route>
      <Route path={paths.PROFILE}>
        <Layout selectedTab="2">
          <Profile />
        </Layout>
      </Route>
      <Route path={paths.HOME}>
        <Layout selectedTab="1">
          <Home />
        </Layout>
      </Route>
    </Switch>
  </Router>
);

export default Routes;
