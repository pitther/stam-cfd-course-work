import { Breadcrumb, message, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LayoutContext from '../../contexts/LayoutContext';
import useData from '../../hooks/UseData';
import { NO_MATCH, WORKSPACE } from '../../routes/paths';
import { ICFDMAP } from '../../util/Map';

import Canvas from './components/Canvas';
import NewMap from './components/NewMap';
import ToolPanel from './components/ToolPanel';
import useWorkspace from './UseWorkspace';
import {
  AntdBreadcrumb,
  MainContentLayout,
} from '../../components/Layout/Layout.styled';
import * as S from './Workspace.styled';

const Workspace = () => {
  const navigate = useNavigate();
  const { setCurrentTab } = useContext(LayoutContext);
  const workspace = useWorkspace();

  const { getToolByName } = workspace.toolbar;
  const { id: mapId } = useParams();

  const [currentMap, setCurrentMap] = useState(
    new ICFDMAP({
      resolution: 64,
      viscosity: 0.0001,
      diffuse: 0,
    }),
  );

  const isNewMap = !mapId;

  const [isLoading, setIsLoading] = useState(true);

  const { getMap, updateMap } = useData(LayoutContext);

  getToolByName('SAVE').action = () => {
    setIsLoading(true);
    updateMap({
      objects: currentMap.objects,
      viscosity: currentMap.viscosity,
      diffuse: currentMap.diffuse,
      resolution: currentMap.resolution,
      id: currentMap.id,
    }).then((r) => {
      if (r.matchedCount) {
        message.success('Map saved');
        setIsLoading(false);
      } else {
        message.error('Error saving map');
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    setCurrentTab(WORKSPACE);
    if (mapId) {
      setIsLoading(true);
      getMap(mapId).then(({ map }) => {
        if (!map) {
          setIsLoading(false);
          navigate(NO_MATCH);
        } else {
          setCurrentMap(
            new ICFDMAP({
              ...map,
            }),
          );
          setIsLoading(false);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewMap, mapId, navigate]);

  return (
    <>
      {!isNewMap ? (
        <>
          <AntdBreadcrumb>
            <Breadcrumb.Item>Workspace</Breadcrumb.Item>
            <Breadcrumb.Item>Map</Breadcrumb.Item>
            <Breadcrumb.Item>{currentMap.name}</Breadcrumb.Item>
          </AntdBreadcrumb>
          <Spin spinning={isLoading} delay={0}>
            <MainContentLayout>
              <S.SiderMenuWrapper>
                <S.AntdContent>
                  <ToolPanel toolbar={workspace.toolbar} />
                  <Canvas map={currentMap} workspace={workspace} />
                </S.AntdContent>
              </S.SiderMenuWrapper>
            </MainContentLayout>{' '}
          </Spin>
        </>
      ) : (
        <NewMap />
      )}
    </>
  );
};

Workspace.propTypes = {};

export default Workspace;
