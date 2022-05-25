/* eslint-disable no-underscore-dangle */
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  AIR_SOURCE_CODE,
  DOOR_CODE,
  FAN_CODE,
  WALL_CODE,
  WENT_CODE,
  WINDOW_CODE,
} from '../../../../../util/ObjectCodes';

import { use2DContextRender } from './2DContextRender';

const FLUID_UPDATE_INTERVAL_S = 1 / 60;

const nativeCoordsToFluid = (
  x,
  y,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  SIZE_X,
  SIZE_Y,
) => ({
  x: Math.ceil((x * SIZE_X) / CANVAS_WIDTH),
  y: Math.ceil((y * SIZE_Y) / CANVAS_HEIGHT),
});

const addForces = (MAP) => {
  MAP.objects.forEach((object, i) => {
    if (object === FAN_CODE) {
      MAP.stemFluid.fluid.addForceIX(i, -500, 0);
    } else if (object === AIR_SOURCE_CODE) {
      MAP.stemFluid.fluid.addDensityIX(i, 30, 50);
    }
  });
};

const cursor = {
  x: 0,
  y: 0,
};

export const useCanvas = ({ MAP, canvasWidth, canvasHeight, toolbar }) => {
  // creating fluid with map

  MAP.initStemFluid();

  const { fluid, clearDensity } = MAP.stemFluid;

  const [simulationRunning, setSimulationRunning] = useState(false);
  const [sceneRunning, setSceneRunning] = useState(true);

  const { renderScene } = use2DContextRender();
  const intervalRef = useRef(null);

  const startSceneLooping = useCallback(
    (graphics) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (simulationRunning) {
          addForces(MAP);
          fluid.step(FLUID_UPDATE_INTERVAL_S);
        }

        if (sceneRunning) {
          renderScene({
            graphics,
            MAP,
            cursor,
          });
        }
      }, FLUID_UPDATE_INTERVAL_S * 1000);

      return () => {
        clearInterval(intervalRef.current);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      renderScene,
      simulationRunning,
      sceneRunning,
      clearDensity,
      MAP.resolution,
    ],
  );

  const stopSceneLooping = () => {
    clearInterval(intervalRef.current);
  };

  const { toggledTools, isToggled, getToolByName } = toolbar;

  getToolByName('CLEAR AIR').action = () => {
    clearDensity();
  };

  getToolByName('CLEAR OBJECTS').action = () => {
    MAP.generateClearMap();
  };

  useEffect(() => {
    if (isToggled('STOP')) {
      setSimulationRunning(false);
    }
    if (isToggled('START')) {
      setSimulationRunning(true);
    }
  }, [toggledTools, isToggled]);

  const activeControls = {
    leftMouseDown: false,
    rightMouseDown: false,
    middleMouseDown: false,
  };

  const applyControls = (e, x, y, isTouch) => {
    if (activeControls.leftMouseDown) {
      if (isToggled('MOVE') && isTouch) {
        MAP.stemFluid.fluid.addForce(x, y, 2000, 2000);
        return;
      }

      if (isToggled('MOVE'))
        MAP.stemFluid.fluid.addForce(x, y, e.movementX * 20, e.movementY * 20);

      if (isToggled('POUR')) MAP.stemFluid.fluid.addDensity(x, y, 100);

      if (isToggled('ERASER')) MAP.removeObject(x, y);

      if (isToggled('WALL')) {
        MAP.addObject(WALL_CODE, x, y);
      }
      if (isToggled('WINDOW')) {
        MAP.addObject(WINDOW_CODE, x, y);
      }
      if (isToggled('FAN')) {
        MAP.addObject(FAN_CODE, x, y);
      }
      if (isToggled('WENT')) {
        MAP.addObject(WENT_CODE, x, y);
      }
      if (isToggled('DOOR')) {
        MAP.addObject(DOOR_CODE, x, y);
      }
      if (isToggled('AIR SOURCE')) {
        MAP.addObject(AIR_SOURCE_CODE, x, y);
      }
    }

    if (activeControls.rightMouseDown) {
      if (
        isToggled('WALL') ||
        isToggled('WINDOW') ||
        isToggled('FAN') ||
        isToggled('WENT') ||
        isToggled('DOOR') ||
        isToggled('AIR SOURCE')
      ) {
        MAP.removeObject(x, y);
      }
    }
  };

  const handleControls = (e) => {
    // eslint-disable-next-line no-underscore-dangle

    let nativeX = e.nativeEvent.offsetX;
    let nativeY = e.nativeEvent.offsetY;
    let isTouch = false;

    if (!nativeX) {
      isTouch = true;
      const rect = e.target.getBoundingClientRect();
      if (!e?.targetTouches?.length) {
        return;
      }
      nativeX = e?.targetTouches[0]?.clientX - rect?.left;
      nativeY = e?.targetTouches[0]?.clientY - rect?.top;
    }

    const { x, y } = nativeCoordsToFluid(
      nativeX,
      nativeY,
      canvasWidth,
      canvasHeight,
      MAP.resolution,
      MAP.resolution,
    );

    cursor.x = x;
    cursor.y = y;

    if (isToggled('WALL')) {
      cursor.object = WALL_CODE;
    } else if (isToggled('FAN')) {
      cursor.object = FAN_CODE;
    } else if (isToggled('WINDOW')) {
      cursor.object = WINDOW_CODE;
    } else if (isToggled('WENT')) {
      cursor.object = WENT_CODE;
    } else if (isToggled('DOOR')) {
      cursor.object = DOOR_CODE;
    } else if (isToggled('AIR SOURCE')) {
      cursor.object = AIR_SOURCE_CODE;
    } else if (isToggled('ERASER')) {
      cursor.object = -1;
    } else {
      cursor.object = 0;
    }

    if (e._reactName === 'onMouseMove') {
      applyControls(e, x, y, isTouch);
    }

    // eslint-disable-next-line no-underscore-dangle
    if (e._reactName === 'onMouseDown') {
      if (e.button === 2) {
        activeControls.rightMouseDown = true;
      }
      if (e.button === 1) {
        activeControls.middleMouseDown = true;
      }
      if (e.button === 0) {
        activeControls.leftMouseDown = true;
      }
      applyControls(e, x, y, isTouch);
    }

    // eslint-disable-next-line no-underscore-dangle
    if (e._reactName === 'onMouseUp') {
      if (e.button === 2) {
        activeControls.rightMouseDown = false;
      }
      if (e.button === 1) {
        activeControls.middleMouseDown = false;
      }
      if (e.button === 0) {
        activeControls.leftMouseDown = false;
      }
    }

    if (e._reactName === 'onTouchStart') {
      activeControls.leftMouseDown = true;
      applyControls(e, x, y, isTouch);
    }
    if (e._reactName === 'onTouchMove') {
      activeControls.leftMouseDown = true;
      applyControls(e, x, y, isTouch);
    }
    if (e._reactName === 'onTouchEnd') {
      activeControls.leftMouseDown = false;
    }

    if (!isTouch) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return { startSceneLooping, stopSceneLooping, handleControls };
};
