import { useCallback, useEffect, useRef, useState } from 'react';

import { WALL_CODE } from '../../../../../util/ObjectCodes';

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

const addForces = (FLUID, SIZE) => {
  for (let y = 0; y < SIZE; y += 1) {
    if (Math.abs(y - SIZE / 2) < 30 && y % 10 === 0) {
      FLUID.addForce(SIZE, y, -5000, 0);
      FLUID.addDensity(SIZE, y, 50);
    }
  }
};

export const useCanvas = ({ MAP, canvasWidth, canvasHeight, toolbar }) => {
  // creating fluid with map

  MAP.initStemFluid();

  const { fluid, stemBoundRef, clearDensity, resolution } = MAP.stemFluid;

  const [simulationRunning, setSimulationRunning] = useState(true);
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
          addForces(fluid, resolution);
          fluid.step(FLUID_UPDATE_INTERVAL_S);
        }

        if (sceneRunning) {
          renderScene({
            graphics,
            MAP,
          });
        }
      }, FLUID_UPDATE_INTERVAL_S * 1000);

      return () => {
        clearInterval(intervalRef.current);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      MAP.resolution,
      stemBoundRef,
      renderScene,
      simulationRunning,
      sceneRunning,
      clearDensity,
    ],
  );

  const stopSceneLooping = () => {
    clearInterval(intervalRef.current);
  };

  const { toggledTools, isToggled, groups } = toolbar;

  groups[0].tools[2].action = () => {
    clearDensity();
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

  const handleControls = (e) => {
    // eslint-disable-next-line no-underscore-dangle
    if (e._reactName === 'onMouseMove') {
      const nativeX = e.nativeEvent.offsetX;
      const nativeY = e.nativeEvent.offsetY;
      const { x, y } = nativeCoordsToFluid(
        nativeX,
        nativeY,
        canvasWidth,
        canvasHeight,
        MAP.resolution,
        MAP.resolution,
      );

      if (activeControls.leftMouseDown) {
        if (isToggled('MOVE'))
          MAP.stemFluid.fluid.addForce(
            x,
            y,
            e.movementX * 20,
            e.movementY * 20,
          );

        if (isToggled('POUR')) MAP.stemFluid.fluid.addDensity(x, y, 100);

        if (isToggled('ERASER')) MAP.removeObject(x, y);

        if (
          isToggled('WALL') ||
          isToggled('WINDOW') ||
          isToggled('FAN') ||
          isToggled('WENT')
        ) {
          MAP.addObject(WALL_CODE, x, y);
        }
      }

      if (activeControls.middleMouseDown) {
      }

      if (activeControls.rightMouseDown) {
        if (
          isToggled('WALL') ||
          isToggled('WINDOW') ||
          isToggled('FAN') ||
          isToggled('WENT')
        ) {
          MAP.removeObject(x, y);
        }
      }

      if (activeControls.rightMouseDown) {
      }
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

    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return { startSceneLooping, stopSceneLooping, handleControls };
};
