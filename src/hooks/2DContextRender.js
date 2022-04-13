import ColorScale from 'color-scales';
import * as PIXI from 'pixi.js';
import { useCallback, useContext } from 'react';

import ResponsibleSizeContext from '../contexts/ResponsibleSize';

import { IX } from './StemFluid';

const rgbToNormalLimit = (rgb) => [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];

const rgbToHex = (rgb) => PIXI.utils.rgb2hex(rgbToNormalLimit(rgb));

const drawCell = (graphics, x, y, width, height, hexColor, offset) => {
  graphics.beginFill(hexColor, 1);
  graphics.drawRect(offset.x + width * x, offset.y + height * y, width, height);
};

const use2DContextRender = () => {
  const colorScale = new ColorScale(0, 2, [
    '#000000',
    '#0024ff',
    '#02c3ff',
    '#00ff33',
    '#ffea13',
    '#ff1111',
  ]);

  const { canvasWidth, canvasHeight } = useContext(ResponsibleSizeContext);
  const renderScene = useCallback(
    ({ graphics, BOUND_OBJECTS, FLUID, SIMULATION_RESOLUTION }) => {
      const CELL_WIDTH = canvasWidth / SIMULATION_RESOLUTION;
      const CELL_HEIGHT = canvasHeight / SIMULATION_RESOLUTION;

      const OFFSET = {
        x: -CELL_WIDTH,
        y: -CELL_HEIGHT,
      };

      graphics?.clear();
      for (let y = 1; y <= SIMULATION_RESOLUTION; y += 1) {
        for (let x = 1; x <= SIMULATION_RESOLUTION; x += 1) {
          const [velocityX, velocityY] = FLUID.velocityAt(x, y);
          const density = FLUID.densityAt(x, y);
          if (isNaN(density)) {
            FLUID?.clear();
            return;
          }
          const color = colorScale.getColor(density);
          const hexColor = rgbToHex([color?.r, color?.g, color?.b]);
          drawCell(graphics, x, y, CELL_WIDTH, CELL_HEIGHT, hexColor, OFFSET);

          if (BOUND_OBJECTS[IX(SIMULATION_RESOLUTION, x, y)]) {
            // rgb(115, 118, 120)
            const boundColor = rgbToHex([255, 255, 255]);
            drawCell(
              graphics,
              x,
              y,
              CELL_WIDTH,
              CELL_HEIGHT,
              boundColor,
              OFFSET,
            );
          }
        }
      }

      graphics.endFill();
    },
    [canvasHeight, canvasWidth],
  );

  return { renderScene };
};

export { use2DContextRender };
