import { Breadcrumb, Layout, Menu } from 'antd';
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
          <Sider>
            <S.AntdSiderMenu
              mode="inline"
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="Environment">
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="Objects">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">321</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="Forces"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </S.AntdSiderMenu>
          </Sider>
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
