import { Breadcrumb, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LayoutContext from '../../contexts/LayoutContext';
import useData from '../../hooks/UseData';
import { NO_MATCH, WORKSPACE } from '../../routes/paths';
import { ICFDMAP } from '../../util/Map';

import Canvas from './components/Canvas';
import ToolPanel from './components/ToolPanel';
import useWorkspace from './UseWorkspace';
import {
  AntdBreadcrumb,
  MainContentLayout,
} from '../../components/Layout/Layout.styled';
import * as S from './Workspace.styled';

const Workspace = () => {
  const location = useLocation();
  const [currentMap, setCurrentMap] = useState(
    new ICFDMAP({
      resolution: 64,
      viscosity: 0.0001,
      diffuse: 0,
    }),
  );
  const mapId = location.pathname.split('/').pop();
  const [isNewMap, setIsNewMap] = useState(!mapId.length);
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const { getMap, updateMap } = useData(LayoutContext);

  const { setCurrentTab } = useContext(LayoutContext);
  const workspace = useWorkspace();

  const { getToolByName } = workspace.toolbar;

  getToolByName('SAVE').action = () => {
    updateMap({
      objects: currentMap.objects,
      viscosity: currentMap.viscosity,
      diffuse: currentMap.diffuse,
      resolution: currentMap.resolution,
      id: currentMap.id,
    }).then((r) => {
      if (r.matchedCount) {
        message.success('Map saved');
      } else {
        message.error('Error saving map');
      }
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentTab(WORKSPACE);
  }, [mapId, setCurrentTab]);

  useEffect(() => {
    if (!isNewMap && mapId !== 'workspace') {
      getMap(mapId).then(({ map }) => {
        if (!map) {
          navigate(NO_MATCH);
        } else {
          setCurrentMap(
            new ICFDMAP({
              ...map,
            }),
          );
        }
      });
    }
  }, [isNewMap, mapId, navigate]);

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
            <Canvas map={currentMap} workspace={workspace} />
          </S.AntdContent>
        </S.SiderMenuWrapper>
      </MainContentLayout>
    </>
  );
};

Workspace.propTypes = {};

export default Workspace;
