import { useCallback, useEffect, useRef, useState } from 'react';

import { useStemFluid } from '../StemFluid/StemFluid';

import { use2DContextRender } from './2DContextRender';
import { SOLID_OBJECTS_MAP1 } from './temp_maps';

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

export const useCanvas = ({
  SIMULATION_RESOLUTION,
  canvasWidth,
  canvasHeight,
  toolbar,
}) => {
  /* const SOLID_OBJECTS_CLEAR = new Array(
    SIMULATION_RESOLUTION * SIMULATION_RESOLUTION,
  ).fill(false); */

  // creating fluid with map
  const [simulationRunning, setSimulationRunning] = useState(true);
  const [sceneRunning, setSceneRunning] = useState(true);

  const { FLUID, addSolidObject, removeSolidObject, BOUND_OBJECTS } =
    useStemFluid({
      SIMULATION_RESOLUTION,
      BOUND_OBJECTS: SOLID_OBJECTS_MAP1,
      visc: 0.0,
      diff: 0.0002,
    });

  const { renderScene } = use2DContextRender();
  const intervalRef = useRef(null);

  const startSceneLooping = useCallback(
    (graphics) => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (simulationRunning) {
          addForces(FLUID, SIMULATION_RESOLUTION);
          FLUID.step(FLUID_UPDATE_INTERVAL_S);
        }

        if (sceneRunning) {
          renderScene({
            graphics,
            BOUND_OBJECTS,
            FLUID,
            SIMULATION_RESOLUTION,
          });
        }
      }, FLUID_UPDATE_INTERVAL_S * 1000);

      return () => {
        clearInterval(intervalRef.current);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      SIMULATION_RESOLUTION,
      BOUND_OBJECTS,
      renderScene,
      simulationRunning,
      sceneRunning,
    ],
  );

  const stopSceneLooping = () => {
    clearInterval(intervalRef.current);
  };

  const { toggledTools, isToggled } = toolbar;

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
        SIMULATION_RESOLUTION,
        SIMULATION_RESOLUTION,
      );

      if (activeControls.rightMouseDown) {
        FLUID.addDensity(x, y, 100);
      }

      if (activeControls.leftMouseDown) {
        FLUID.addForce(x, y, e.movementX * 20, e.movementY * 20);
      }

      if (activeControls.rightMouseDown) {
        removeSolidObject(x, y);
      }

      if (activeControls.middleMouseDown) {
        addSolidObject(x, y);
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
