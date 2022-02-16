import { Breadcrumb, Layout, Menu } from 'antd';
import { FaFan, GiDoor, GiWindow, MdOutlineAir } from 'react-icons/all';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';

import logo from '../../resources/images/logo.png';

import * as S from './Layout.styled';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

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
          <Menu.Item key="1">HOME</Menu.Item>
          <Menu.Item key="2">PROFILE</Menu.Item>
          <Menu.Item key="3">WORKSPACE</Menu.Item>
        </S.AntdMenu>
      </S.AntdHeader>
      <S.AntdContainer>
        <S.AntdBreadcrumb>
          <Breadcrumb.Item>Workspace</Breadcrumb.Item>
          <Breadcrumb.Item>Map</Breadcrumb.Item>
          <Breadcrumb.Item>Hospital 2</Breadcrumb.Item>
        </S.AntdBreadcrumb>
        <S.MainContentLayout>
          <S.SiderMenuWrapper>
            <S.AntdSiderMenu mode="inline">
              <SubMenu key="sub1" icon={<UserOutlined />} title="Environment">
                <S.MenuItem key="1">Wind force</S.MenuItem>
                <S.MenuItem key="2">Wind direction</S.MenuItem>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Objects">
                <S.MenuItem key="5">
                  <GiDoor />
                  Door
                </S.MenuItem>
                <S.MenuItem key="6">
                  <GiWindow /> Window
                </S.MenuItem>
                <S.MenuItem key="7">
                  <MdOutlineAir />
                  Went
                </S.MenuItem>
                <S.MenuItem key="8">
                  <FaFan />
                  Fan
                </S.MenuItem>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="Forces"
              >
                <S.MenuItem key="9">option9</S.MenuItem>
                <S.MenuItem key="10">option10</S.MenuItem>
                <S.MenuItem key="11">option11</S.MenuItem>
                <S.MenuItem key="12">option12</S.MenuItem>
              </SubMenu>
            </S.AntdSiderMenu>
          </S.SiderMenuWrapper>
          <S.AntdContent>{children}</S.AntdContent>
        </S.MainContentLayout>
      </S.AntdContainer>
      <S.AntdFooter style={{ textAlign: 'center' }}>
        ICFD ©2022 Created by Peter Ovseychuk
      </S.AntdFooter>
    </Layout>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
