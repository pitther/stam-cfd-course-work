import { useState } from 'react';
import {
  AiFillFolderOpen,
  AiFillSave,
  FaEraser,
  FaFan,
  FaHandPointer,
  FiWind,
  GiArrowCursor,
  GiBrickWall,
  GiWindow,
  MdNotStarted,
  MdStopCircle,
} from 'react-icons/all';

const tools = [
  {
    title: 'MANAGE',
    tools: [
      { name: 'OPEN', icon: <AiFillFolderOpen /> },
      { name: 'SAVE', icon: <AiFillSave /> },
    ],
  },
  {
    title: 'CURSOR',
    tools: [
      { name: 'DEFAULT', icon: <GiArrowCursor /> },
      { name: 'POINTER', icon: <FaHandPointer /> },
      { name: 'ERASER', icon: <FaEraser /> },
    ],
  },
  {
    title: 'BUILD',
    tools: [
      { name: 'WALL', icon: <GiBrickWall /> },
      { name: 'WINDOW', icon: <GiWindow /> },
      { name: 'FAN', icon: <FaFan /> },
      { name: 'WENT', icon: <FiWind /> },
    ],
  },
  {
    title: 'SIMULATION',
    tools: [
      { name: 'STOP', icon: <MdStopCircle /> },
      { name: 'START', icon: <MdNotStarted /> },
    ],
  },
];

const useToolbar = () => {
  const [toggledToolName, setToggledToolName] = useState();

  return { toggledToolName, setToggledToolName, tools };
};

export default useToolbar;
