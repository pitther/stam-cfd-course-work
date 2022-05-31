import { Breadcrumb, Button, message, Modal, Spin } from 'antd';
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

  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  getToolByName('SETTINGS').action = () => {
    setSettingsModalVisible(true);
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

  const onChangeSettingsInput = (type, value) => {
    switch (type) {
      case 'R':
        if (value <= 64) {
          setCurrentMap(
            new ICFDMAP({
              viscosity: currentMap.viscosity,
              diffuse: currentMap.diffuse,
              id: currentMap.id,
              name: currentMap.name,
              resolution: parseInt(value, 10),
            }),
          );
        }
        break;
      case 'V':
        currentMap.updateViscosity(parseFloat(value));
        break;
      case 'D':
        currentMap.updateDiffuse(parseFloat(value));
        break;
      default:
        break;
    }
  };

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
            </MainContentLayout>
          </Spin>
          <Modal
            title="Map settings"
            visible={settingsModalVisible}
            onCancel={() => setSettingsModalVisible(false)}
            footer={[
              <Button
                type="primary"
                key="back"
                onClick={() => setSettingsModalVisible(false)}
              >
                Ok
              </Button>,
            ]}
          >
            <S.SettingsInputContainer>
              {/* <S.SettingsInputGroup>
                <S.SettingsInputLabel>RESOLUTION</S.SettingsInputLabel>
                <S.SettingsInput
                  min={0}
                  max={64}
                  step={1}
                  defaultValue={currentMap.resolution}
                  onChange={(e) => onChangeSettingsInput('R', e)}
                />
              </S.SettingsInputGroup> */}
              <S.SettingsInputGroup>
                <S.SettingsInputLabel>VISCOSITY</S.SettingsInputLabel>
                <S.SettingsInput
                  min={0}
                  max={10}
                  step={0.0001}
                  defaultValue={currentMap.viscosity}
                  stringMode
                  onChange={(e) => onChangeSettingsInput('V', e)}
                />
              </S.SettingsInputGroup>
              <S.SettingsInputGroup>
                <S.SettingsInputLabel>DIFFUSION</S.SettingsInputLabel>
                <S.SettingsInput
                  defaultValue={currentMap.diffuse}
                  min={0}
                  max={3}
                  step={0.0001}
                  stringMode
                  onChange={(e) => onChangeSettingsInput('D', e)}
                />
              </S.SettingsInputGroup>
            </S.SettingsInputContainer>
          </Modal>
        </>
      ) : (
        <NewMap />
      )}
    </>
  );
};

Workspace.propTypes = {};

export default Workspace;
