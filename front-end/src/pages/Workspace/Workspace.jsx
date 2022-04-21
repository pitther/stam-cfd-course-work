import { Breadcrumb } from 'antd';
import { useContext, useEffect } from 'react';

import LayoutContext from '../../contexts/LayoutContext';
import { WORKSPACE } from '../../routes/paths';

import Canvas from './components/Canvas';
import ContentSidebar from './components/ContentSidebar';
import {
  AntdBreadcrumb,
  MainContentLayout,
} from '../../components/Layout/Layout.styled';
import * as S from './Workspace.styled';

const workspaceMenuScheme = [];

const Workspace = () => {
  const { setCurrentTab } = useContext(LayoutContext);

  useEffect(() => {
    setCurrentTab(WORKSPACE);
  }, [setCurrentTab]);
  return (
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
};

Workspace.propTypes = {};

export default Workspace;
