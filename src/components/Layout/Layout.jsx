import { Layout, Menu } from 'antd';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import LayoutContext from '../../contexts/LayoutContext';
import UserContext from '../../contexts/UserContext';
import logo from '../../resources/images/logo.png';
import * as paths from '../../routes/paths';

import * as S from './Layout.styled';

const MainLayout = ({ children }) => {
  const { loggedIn } = useContext(UserContext);
  const { currentTab } = useContext(LayoutContext);
  return (
    <Layout>
      <S.AntdHeader>
        <S.Logo>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </S.Logo>
        <S.AntdMenu mode="horizontal" selectedKeys={[currentTab]}>
          <Menu.Item key={paths.HOME}>
            <Link to={paths.HOME}>HOME</Link>
          </Menu.Item>
          {loggedIn && (
            <Menu.Item key={paths.WORKSPACE}>
              <Link to={paths.WORKSPACE}>WORKSPACE</Link>
            </Menu.Item>
          )}
          <Menu.Item key={paths.BROWSE}>
            <Link to={paths.BROWSE}>BROWSE</Link>
          </Menu.Item>
          {loggedIn ? (
            <Menu.Item style={{ marginLeft: 'auto' }} key={paths.PROFILE}>
              <Link to={paths.PROFILE}>PROFILE</Link>
            </Menu.Item>
          ) : (
            <Menu.Item style={{ marginLeft: 'auto' }} key={paths.LOGIN}>
              <Link to={paths.LOGIN}>LOGIN</Link>
            </Menu.Item>
          )}
        </S.AntdMenu>
      </S.AntdHeader>
      <S.AntdContainer>{children}</S.AntdContainer>
      <S.AntdFooter style={{ textAlign: 'center' }}>
        ICFD ©2022 Created by Peter Ovseychuk
      </S.AntdFooter>
    </Layout>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
