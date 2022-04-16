import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import logo from '../../resources/images/logo.png';
import * as paths from '../../routes/paths';

import * as S from './Layout.styled';

const MainLayout = ({ children, selectedTab }) => (
  <Layout>
    <S.AntdHeader>
      <S.Logo>
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </S.Logo>
      <S.AntdMenu mode="horizontal" defaultSelectedKeys={[selectedTab]}>
        <Menu.Item key="1">
          <Link to={paths.HOME}>HOME</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={paths.PROFILE}>PROFILE</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={paths.WORKSPACE}>WORKSPACE</Link>
        </Menu.Item>
      </S.AntdMenu>
    </S.AntdHeader>
    <S.AntdContainer>{children}</S.AntdContainer>
    <S.AntdFooter style={{ textAlign: 'center' }}>
      ICFD ©2022 Created by Peter Ovseychuk
    </S.AntdFooter>
  </Layout>
);

MainLayout.propTypes = {};

export default MainLayout;
