import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Workspace from '../pages/Workspace';

import * as paths from './paths';

const Routes = () => (
  <Router>
    <Switch>
      <Route path={paths.LOGIN}>
        <Login />
      </Route>
      <Route path={paths.WORKSPACE}>
        <Layout>
          <Workspace />
        </Layout>
      </Route>
      <Route path={paths.HOME}>
        <Layout>
          <Home />
        </Layout>
      </Route>
    </Switch>
  </Router>
);

export default Routes;
