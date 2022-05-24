import ColorScale from 'color-scales';
import * as PIXI from 'pixi.js';
import { useCallback, useContext } from 'react';

import ResponsibleSizeContext from '../../../../../contexts/ResponsibleSize';
import { OBJECT_TEXTURES } from '../../../../../util/ObjectCodes';
import { IX } from '../../StemFluid/StemFluid';

const rgbToNormalLimit = (rgb) => [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];

const rgbToHex = (rgb) => PIXI.utils.rgb2hex(rgbToNormalLimit(rgb));

const drawCell = (graphics, x, y, width, height, hexColor, alpha, offset) => {
  graphics.beginFill(hexColor, alpha);
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
    ({ graphics, MAP }) => {
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
          // const [velocityX, velocityY] = FLUID.velocityAt(x, y);
          const density = MAP.stemFluid.fluid.densityAt(x, y);
          // eslint-disable-next-line no-restricted-globals
          if (isNaN(density)) {
            MAP.stemFluid?.fluid.clear();
            return;
          }
          const color = colorScale.getColor(density);
          const hexColor = rgbToHex([color?.r, color?.g, color?.b]);
          drawCell(
            graphics,
            x,
            y,
            CELL_WIDTH,
            CELL_HEIGHT,
            hexColor,
            1,
            OFFSET,
          );

          const objectCode = MAP.objects[IX(resolution, x, y)];
          if (objectCode) {
            // rgb(115, 118, 120)

            const objectRGB = OBJECT_TEXTURES[objectCode - 1];

            const boundColor = rgbToHex(objectRGB);
            drawCell(
              graphics,
              x,
              y,
              CELL_WIDTH,
              CELL_HEIGHT,
              boundColor,
              objectRGB[3],
              OFFSET,
            );
          }
        }
      }

      graphics.endFill();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [canvasHeight, canvasWidth],
  );

  return { renderScene };
};

export { use2DContextRender };
