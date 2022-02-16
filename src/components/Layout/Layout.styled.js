import { Breadcrumb, Layout, Menu } from 'antd';
import styled from 'styled-components';

import { themeColors } from '../../styles/theme';

const { Header, Content, Footer, Sider } = Layout;

const COLLAPSE_BREAKPOINT = 800;

export const AntdHeader = styled(Header)`
  height: 50px;
  padding: 0 5vw;
  border-bottom: 0px solid;
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
  border-bottom: 0px;

  & > li {
    height: 100%;
    display: flex !important;
    align-items: center;
  }
`;

export const MainContentLayout = styled(Layout)`
  position: relative;
  padding: 0 0 1rem 0;
  display: flex;
  flex-direction: row;

  @media (max-width: ${COLLAPSE_BREAKPOINT}px) {
    flex-direction: column-reverse !important;
    width: 100%;
  }
`;

export const SiderMenuWrapper = styled.div`
  height: 100%;
`;

export const MenuItem = styled(Menu.Item)`
  width: 100%;
  display: flex !important;
  align-items: center !important;
  justify-content: center;
  flex-direction: row !important;
  padding-left: 1rem !important;
  padding-right: 0 !important;
  text-align: center;

  & > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  & > span > svg {
    height: 100%;
    color: ${themeColors.accentLight};
    font-size: 1.7rem;
  }
`;

export const AntdSiderMenu = styled(Menu)`
  height: 100%;
  max-width: 200px;

  border-bottom: 0px;

  @media (max-width: ${COLLAPSE_BREAKPOINT}px) {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
  }
`;

export const AntdBreadcrumb = styled(Breadcrumb)`
  margin: 2rem 0 1rem 0;

  & > span:last-child {
  }
`;

export const AntdContainer = styled(Content)`
  padding: 0 5vw;
`;

export const AntdFooter = styled.div``;

export const AntdContent = styled(Content)`
  height: 100%;
  padding: 1rem;
  min-height: 280px;
  background: white;
`;
