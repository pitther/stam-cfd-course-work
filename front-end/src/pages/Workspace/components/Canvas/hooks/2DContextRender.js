import ColorScale from 'color-scales';
import * as PIXI from 'pixi.js';
import { useCallback, useContext } from 'react';

import ResponsibleSizeContext from '../../../../../contexts/ResponsibleSize';
import {
  AIR_SOURCE_CODE,
  DOOR_CODE,
  FAN_CODE,
  HORIZONTAL,
  VERTICAL,
  WALL_CODE,
  WENT_CODE,
  WINDOW_CODE,
} from '../../../../../util/ObjectCodes';
import { IX } from '../../StemFluid/StemFluid';

import {
  drawAirSource,
  drawCell,
  drawDoor,
  drawEmptyRect,
  drawFan,
  drawWall,
  drawWent,
  drawWindow,
} from './renderObjects';

const rgbToNormalLimit = (rgb) => [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];

const rgbToHex = (rgb) => PIXI.utils.rgb2hex(rgbToNormalLimit(rgb));

const colorScale = new ColorScale(0, 2, [
  '#000000',
  '#0024ff',
  '#02c3ff',
  '#00ff33',
  '#ffea13',
  '#ff1111',
]);

const checkOrientation = (x, y, objects, resolution) => {
  const left = objects[IX(resolution, x - 1, y)];
  const right = objects[IX(resolution, x + 1, y)];
  /* const top = objects[IX(resolution, x, y - 1)];
    const bottom = objects[IX(resolution, x, y + 1)]; */

  if (left && right) {
    return HORIZONTAL;
  }
  return VERTICAL;
};

const renderCells = ({ x, y, MAP, drawInfo }) => {
  // const [velocityX, velocityY] = FLUID.velocityAt(x, y);
  const density = MAP.stemFluid.fluid.densityAt(x, y);
  const color = colorScale.getColor(density);
  // eslint-disable-next-line no-param-reassign
  drawInfo.hexColor = rgbToHex([color?.r, color?.g, color?.b]);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(density)) {
    MAP.stemFluid?.fluid.clear();
    return;
  }

  drawCell(drawInfo);
};

const renderObjects = ({ drawInfo, objectCode }) => {
  switch (objectCode) {
    case WALL_CODE:
      drawWall(drawInfo);
      break;
    case WINDOW_CODE:
      drawWindow(drawInfo);
      break;
    case DOOR_CODE:
      drawDoor(drawInfo);
      break;
    case WENT_CODE:
      drawWent(drawInfo);
      break;
    case FAN_CODE:
      drawFan(drawInfo);
      break;
    case AIR_SOURCE_CODE:
      drawAirSource(drawInfo);
      break;
    default:
      break;
  }
};

const use2DContextRender = () => {
  const { canvasWidth, canvasHeight } = useContext(ResponsibleSizeContext);
  const renderScene = useCallback(
    ({ graphics, MAP, cursor }) => {
      const { resolution } = MAP;
      const CELL_WIDTH = canvasWidth / resolution;
      const CELL_HEIGHT = canvasHeight / resolution;

      const OFFSET = {
        x: -CELL_WIDTH,
        y: -CELL_HEIGHT,
      };

      graphics?.clear();

      for (let y = 1; y <= resolution; y += 1) {
        for (let x = 1; x <= resolution; x += 1) {
          const drawInfo = {
            graphics,
            x,
            y,
            width: CELL_WIDTH,
            height: CELL_HEIGHT,
            alpha: 1,
            offset: OFFSET,
          };

          renderCells({
            x,
            y,
            MAP,
            drawInfo,
          });
        }
      }

      for (let y = 1; y <= resolution; y += 1) {
        for (let x = 1; x <= resolution; x += 1) {
          const objectCode = MAP.objects[IX(resolution, x, y)];

          if (objectCode) {
            const orientation = checkOrientation(x, y, MAP.objects, resolution);
            const drawInfo = {
              graphics,
              x,
              y,
              width: CELL_WIDTH,
              height: CELL_HEIGHT,
              alpha: 1,
              orientation,
              offset: OFFSET,
            };
            renderObjects({ x, y, drawInfo, MAP, resolution, objectCode });
          }
        }
      }

      if (cursor.object) {
        const orientation = checkOrientation(
          cursor.x,
          cursor.y,
          MAP.objects,
          resolution,
        );

        const drawInfo = {
          graphics,
          x: cursor.x,
          y: cursor.y,
          width: CELL_WIDTH,
          height: CELL_HEIGHT,
          alpha: 1,
          orientation,
          offset: OFFSET,
        };

        renderObjects({
          x: cursor.x,
          y: cursor.y,
          drawInfo,
          MAP,
          resolution,
          objectCode: cursor.object,
        });

        drawEmptyRect({
          graphics,
          x: cursor.x,
          y: cursor.y,
          width: CELL_WIDTH,
          height: CELL_HEIGHT,
          offset: OFFSET,
        });
      }

      graphics.endFill();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canvasHeight, canvasWidth],
  );

  return { renderScene };
};

export { use2DContextRender };
