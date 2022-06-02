import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import Browse from '../pages/Browse';
import Home from '../pages/Home';
import NoMatch from '../pages/NoMatch';
import Workspace from '../pages/Workspace';

import * as paths from './paths';

const SiteRoutes = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path={`${paths.WORKSPACE}/:id`} element={<Workspace />} />
        <Route path={`${paths.WORKSPACE}`} element={<Workspace />} />
        <Route path={paths.HOME} element={<Home />} />
        <Route path={paths.BROWSE} element={<Browse />} />
        <Route path={'/*'} element={<NoMatch />} />
        <Route path={paths.NO_MATCH} element={<NoMatch />} />
      </Routes>
    </Layout>
  </Router>
);

export default SiteRoutes;
