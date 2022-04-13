import { Breadcrumb, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import logo from '../../resources/images/logo.png';
import * as paths from '../../routes/paths';

import * as S from './Layout.styled';

const MainLayout = ({ children }) => {
  console.log('Remove it when reformat will be okay');

  return (
    <Layout>
      <S.AntdHeader>
        <S.Logo>
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </S.Logo>
        <S.AntdMenu mode="horizontal" defaultSelectedKeys={['1']}>
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
      <S.AntdContainer>
        <S.AntdBreadcrumb>
          <Breadcrumb.Item>Workspace</Breadcrumb.Item>
          <Breadcrumb.Item>Map</Breadcrumb.Item>
          <Breadcrumb.Item>Hospital 2</Breadcrumb.Item>
        </S.AntdBreadcrumb>
        <S.MainContentLayout>{children}</S.MainContentLayout>
      </S.AntdContainer>
      <S.AntdFooter style={{ textAlign: 'center' }}>
        ICFD ©2022 Created by Peter Ovseychuk
      </S.AntdFooter>
    </Layout>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
