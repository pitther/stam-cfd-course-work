import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from '../components/Layout';
import UserContext from '../contexts/UserContext';
import NoMatch from '../pages';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Workspace from '../pages/Workspace';

import * as paths from './paths';

const SiteRoutes = () => {
  const { loggedIn } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        {loggedIn && (
          <>
            <Route
              path={paths.WORKSPACE}
              element={
                <Layout selectedTab={paths.WORKSPACE}>
                  <Workspace />
                </Layout>
              }
            />
            <Route
              path={paths.PROFILE}
              element={
                <Layout selectedTab={paths.PROFILE}>
                  <Profile />
                </Layout>
              }
            />
          </>
        )}
        <Route
          path={paths.LOGIN}
          element={
            <Layout selectedTab={paths.LOGIN}>
              <Login />
            </Layout>
          }
        />
        <Route
          path={paths.HOME}
          element={
            <Layout selectedTab={paths.HOME}>
              <Home />
            </Layout>
          }
        />
        <Route
          path={'/*'}
          element={
            <Layout>
              <NoMatch />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default SiteRoutes;
