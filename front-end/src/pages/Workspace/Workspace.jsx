import { Breadcrumb } from 'antd';
import { useContext, useEffect } from 'react';

import LayoutContext from '../../contexts/LayoutContext';
import useWorkspace from '../../hooks/UseWorkspace';
import { WORKSPACE } from '../../routes/paths';

import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import {
  AntdBreadcrumb,
  MainContentLayout,
} from '../../components/Layout/Layout.styled';
import * as S from './Workspace.styled';

const Workspace = () => {
  const { setCurrentTab } = useContext(LayoutContext);
  const workspace = useWorkspace();

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
        <S.SiderMenuWrapper>
          <S.AntdContent>
            <ToolPanel toolbar={workspace.toolbar} />
            <Canvas workspace={workspace} />
          </S.AntdContent>
        </S.SiderMenuWrapper>
      </MainContentLayout>
    </>
  );
};

Workspace.propTypes = {};

export default Workspace;
