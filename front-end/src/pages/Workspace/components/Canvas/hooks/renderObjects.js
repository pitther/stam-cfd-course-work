import { HORIZONTAL, VERTICAL } from '../../../../../util/ObjectCodes';

export const OBJECT_TEXTURES = [
  { colors: { hex: 0xadadad, alpha: 1 } }, // wall
  { colors: { hex: 0x0db6ff, alpha: 1 } }, // window
  { colors: { hex: 0xff960d, alpha: 1 } }, // door
  { colors: { hex: 0x707070, alpha: 1 } }, // went
  { colors: { hex: 0xff20ff, alpha: 1 } }, // fan
  { colors: { hex: 0x464545, alpha: 1 } }, // floor
  { colors: { hex: 0xff20ff, alpha: 1 } }, // air source
  { colors: { hex: 0xdbdbdb, alpha: 0.5 } }, // cursor color
];

export const drawCell = ({
  graphics,
  x,
  y,
  width,
  height,
  hexColor,
  alpha,
  offset,
}) => {
  graphics.beginFill(hexColor, alpha);
  graphics.drawRect(offset.x + width * x, offset.y + height * y, width, height);
};

export const drawSquare = ({
  graphics,
  x,
  y,
  width,
  height,
  offset,
  hex,
  alpha,
}) => {
  // graphics.lineStyle(1, 0x000000, 1);
  graphics.beginFill(hex, alpha);
  graphics.drawRect(offset.x + width * x, offset.y + height * y, width, height);
  // graphics.lineStyle(0);
};

export const drawWall = ({ graphics, x, y, width, height, offset }) => {
  const { hex, alpha } = OBJECT_TEXTURES[0].colors;
  drawSquare({ graphics, x, y, width, height, offset, hex, alpha });
};

export const drawFloor = ({ graphics, x, y, width, height, offset }) => {
  const { hex, alpha } = OBJECT_TEXTURES[5].colors;
  drawSquare({ graphics, x, y, width, height, offset, hex, alpha });
};

const drawOrientatedRect = ({
  graphics,
  x,
  y,
  width,
  height,
  offset,
  orientation,
  hex,
  alpha,
}) => {
  // drawFloor({ graphics, x, y, width, height, offset, orientation });
  let actualWidth = width;
  let actualHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (orientation === HORIZONTAL) {
    actualHeight /= 2;
    offsetY += height / 4.2;
  } else if (orientation === VERTICAL) {
    actualWidth /= 2;
    offsetX += width / 4.2;
  }

  graphics.beginFill(hex, alpha);
  graphics.drawRect(
    offset.x + width * x + offsetX,
    offset.y + height * y + offsetY,
    actualWidth,
    actualHeight,
  );
};

export const drawWindow = ({
  graphics,
  x,
  y,
  width,
  height,
  offset,
  orientation,
}) => {
  drawOrientatedRect({
    graphics,
    x,
    y,
    width,
    height,
    offset,
    orientation,
    ...OBJECT_TEXTURES[1].colors,
  });
};

export const drawDoor = ({
  graphics,
  x,
  y,
  width,
  height,
  offset,
  orientation,
}) => {
  drawOrientatedRect({
    graphics,
    x,
    y,
    width,
    height,
    offset,
    orientation,
    ...OBJECT_TEXTURES[2].colors,
  });
};

const drawWentLine = ({
  graphics,
  x,
  y,
  width,
  height,
  offset,
  orientation,
  hex,
  alpha,
  count,
  index,
}) => {
  // drawFloor({ graphics, x, y, width, height, offset, orientation });
  let actualWidth = width;
  let actualHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  const offsetK = width / (count * 2);

  if (orientation === VERTICAL) {
    actualHeight = offsetK;
    offsetY += index * offsetK * 2;
  } else if (orientation === HORIZONTAL) {
    actualWidth = offsetK;
    offsetX += index * offsetK * 2;
  }

  graphics.beginFill(hex, alpha);
  graphics.drawRect(
    offset.x + width * x + offsetX,
    offset.y + height * y + offsetY,
    actualWidth,
    actualHeight,
  );
};

export const drawWent = ({
  graphics,
  x,
  y,
  width,
  height,
  offset,
  orientation,
}) => {
  const count = 3;
  for (let i = 0; i < count; i += 1) {
    drawWentLine({
      graphics,
      x,
      y,
      width,
      height,
      offset,
      orientation,
      count,
      index: i,
      ...OBJECT_TEXTURES[3].colors,
    });
  }
};

const drawCircle = ({ graphics, x, y, width, height, offset, hex, alpha }) => {
  const topLeftX = offset.x + width * x;
  const topLeftY = offset.y + height * y;
  graphics.beginFill(hex, alpha);
  graphics.drawCircle(
    topLeftX + width / 2,
    topLeftY + height / 2,
    width / 2,
    height / 2,
  );
};

export const drawFan = ({ graphics, x, y, width, height, offset }) => {
  const { hex, alpha } = OBJECT_TEXTURES[4].colors;
  const topLeftX = offset.x + width * x;
  const topLeftY = offset.y + height * y;

  drawCircle({ graphics, x, y, width, height, offset, hex, alpha });
  graphics.lineStyle(3, 0x0db6ff, 1);
  graphics.moveTo(topLeftX, topLeftY);
  graphics.lineTo(topLeftX + width / 2, topLeftY + height / 2);
  graphics.moveTo(topLeftX + width / 2, topLeftY + height / 2);
  graphics.lineTo(topLeftX, topLeftY + height);
  graphics.lineStyle(0);
};

export const drawAirSource = ({ graphics, x, y, width, height, offset }) => {
  const { hex, alpha } = OBJECT_TEXTURES[6].colors;
  drawCircle({ graphics, x, y, width, height, offset, hex, alpha });
};

export const drawEmptyRect = ({ graphics, x, y, width, height, offset }) => {
  const { hex, alpha } = OBJECT_TEXTURES[7].colors;
  graphics.lineStyle(1, hex, alpha);
  graphics.beginFill(hex, 0);
  graphics.drawRect(offset.x + width * x, offset.y + height * y, width, height);
  graphics.lineStyle(0);
};
