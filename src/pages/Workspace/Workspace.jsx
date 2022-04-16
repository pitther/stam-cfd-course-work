import { Breadcrumb } from 'antd';

import ContentSidebar from '../../components';

import Canvas from './components/Canvas';
import {
  AntdBreadcrumb,
  MainContentLayout,
} from '../../components/Layout/Layout.styled';
import * as S from './Workspace.styled';

const workspaceMenuScheme = [];

const Workspace = () => (
  <>
    <AntdBreadcrumb>
      <Breadcrumb.Item>Workspace</Breadcrumb.Item>
      <Breadcrumb.Item>Map</Breadcrumb.Item>
      <Breadcrumb.Item>Hospital 2</Breadcrumb.Item>
    </AntdBreadcrumb>
    <MainContentLayout>
      <ContentSidebar scheme={workspaceMenuScheme}>
        <S.Main>
          <Canvas />
        </S.Main>
      </ContentSidebar>
    </MainContentLayout>
  </>
);

Workspace.propTypes = {};

export default Workspace;
