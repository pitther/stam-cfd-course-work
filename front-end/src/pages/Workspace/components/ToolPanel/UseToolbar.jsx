import { useState } from 'react';
import {
  AiFillFolderOpen,
  AiFillSave,
  BsArrowsMove,
  FaEraser,
  FaFan,
  FaHandPointer,
  FiWind,
  GiArrowCursor,
  GiBrickWall,
  GiWindow,
  GrClearOption,
  MdNotStarted,
  MdStopCircle,
  TiWeatherDownpour,
} from 'react-icons/all';

import {
  GROUP_BUTTON,
  GROUP_REQUIRED_ONE,
  GROUP_SCOPE_GLOBAL,
  GROUP_SCOPE_LOCAL,
  GROUP_TOGGLE,
} from './button-types';

const groups = [
  {
    title: 'MANAGE',
    type: GROUP_BUTTON,
    scope: GROUP_SCOPE_LOCAL,
    tools: [
      { name: 'OPEN', icon: <AiFillFolderOpen /> },
      { name: 'SAVE', icon: <AiFillSave /> },
      { name: 'CLEAN AIR', icon: <GrClearOption /> },
    ],
  },
  {
    title: 'CURSOR',
    type: GROUP_TOGGLE,
    scope: GROUP_SCOPE_GLOBAL,
    tools: [
      { name: 'DEFAULT', icon: <GiArrowCursor /> },
      { name: 'POINTER', icon: <FaHandPointer /> },
      { name: 'ERASER', icon: <FaEraser /> },
    ],
  },
  {
    title: 'AIR',
    type: GROUP_TOGGLE,
    scope: GROUP_SCOPE_GLOBAL,
    tools: [
      { name: 'POUR', icon: <TiWeatherDownpour /> },
      { name: 'MOVE', icon: <BsArrowsMove /> },
    ],
  },
  {
    title: 'BUILD',
    type: GROUP_TOGGLE,
    scope: GROUP_SCOPE_GLOBAL,
    tools: [
      { name: 'WALL', icon: <GiBrickWall /> },
      { name: 'WINDOW', icon: <GiWindow /> },
      { name: 'FAN', icon: <FaFan /> },
      { name: 'WENT', icon: <FiWind /> },
    ],
  },
  {
    title: 'SIMULATION',
    type: GROUP_TOGGLE,
    scope: GROUP_SCOPE_LOCAL,
    required: GROUP_REQUIRED_ONE,
    tools: [
      { name: 'STOP', icon: <MdStopCircle /> },
      { name: 'START', icon: <MdNotStarted /> },
    ],
  },
];

// AiOutlineClear

const getToolGroupByName = (name) =>
  groups.find((group) => group.tools.find((tool) => tool.name === name));

const getToolByName = (name) =>
  getToolGroupByName(name).tools.find((tool) => tool.name === name);

const useToolbar = () => {
  const [toggledTools, setToggledTools] = useState(['START', 'DEFAULT']);

  const isToggled = (name) => toggledTools.indexOf(name) > -1;

  const addToggledTool = (name) => {
    setToggledTools((prevState) => [...prevState, name]);
  };

  const removeToggledTool = (name) => {
    if (isToggled(name)) {
      setToggledTools(toggledTools.filter((toolName) => toolName !== name));
    }
  };

  const removeToggledFromGroup = (group) => {
    group.tools.forEach(({ name }) => removeToggledTool(name));
  };

  const removeGlobalToggledTools = () => {
    groups.forEach((group) => {
      if (group.scope === GROUP_SCOPE_GLOBAL && group.type === GROUP_TOGGLE) {
        removeToggledFromGroup(group);
      }
    });
  };

  const toggle = (name) => {
    const group = getToolGroupByName(name);
    const tool = getToolByName(name);

    if (
      isToggled(name) &&
      group.required !== GROUP_REQUIRED_ONE &&
      group.scope !== GROUP_SCOPE_GLOBAL
    ) {
      removeToggledTool(name);
      return;
    }

    if (tool.action && !isToggled(name)) {
      tool.action();
    }

    if (group.type === GROUP_TOGGLE) {
      if (group.scope === GROUP_SCOPE_LOCAL) {
        removeToggledFromGroup(group);
      } else {
        removeGlobalToggledTools();
      }
      addToggledTool(name);
    }
  };

  return { toggledTools, setToggledTools, groups, isToggled, toggle };
};

export default useToolbar;