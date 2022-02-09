import { Breadcrumb, Layout, Menu } from 'antd';
import styled from 'styled-components';

import { themeColors } from '../../styles/theme';

const { Header, Content, Footer, Sider } = Layout;

export const AntdHeader = styled(Header)`
  height: 50px;
  padding: 0 5vw;
  background-color: ${themeColors.header};
  border-bottom: 0px solid;
  border-bottom-color: ${themeColors.light};
`;

export const Logo = styled.div`
  float: left;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

export const AntdMenu = styled(Menu)`
  height: 100%;
  background-color: ${themeColors.header} !important;
  border-bottom: 0px;

  color: ${themeColors.accent} !important;

  & > li {
    height: 100%;
    display: flex !important;
    align-items: center;
  }
`;

export const AntdSiderMenu = styled(Menu)`
  height: 100%;
  background-color: ${themeColors.header} !important;
  border-bottom: 0px;

  color: ${themeColors.accent} !important;
`;

export const AntdBreadcrumb = styled(Breadcrumb)`
  margin: 2rem 0 1rem 0;
  color: ${themeColors.accentLight} !important;

  & > span:last-child {
    color: ${themeColors.accent} !important;
  }
`;

export const MainContentLayout = styled(Layout)`
  padding: 0 0 1rem 0;
  background-color: ${themeColors.light};
`;

export const AntdContainer = styled(Content)`
  padding: 1rem 5vw;
`;

export const AntdFooter = styled.div`
  background-color: ${themeColors.mainContent};
`;
