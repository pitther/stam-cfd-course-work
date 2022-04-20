import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import UserContext from '../contexts/UserContext';
import NoMatch from '../pages/NoMatch';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Workspace from '../pages/Workspace';

import * as paths from './paths';
import Browse from '../pages/Browse';

const SiteRoutes = () => {
  const { loggedIn } = useContext(UserContext);
  return (
    <Router>
      <Layout>
        <Routes>
          {loggedIn && (
            <>
              <Route path={paths.WORKSPACE} element={<Workspace />} />
              <Route path={paths.PROFILE} element={<Profile />} />
            </>
          )}
          <Route path={paths.LOGIN} element={<Login />} />
          <Route path={paths.HOME} element={<Home />} />
          <Route path={paths.BROWSE} element={<Browse />} />
          <Route path={'/*'} element={<NoMatch />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default SiteRoutes;
