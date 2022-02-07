import { useState } from 'react';

const useResponsibleSize = () => {
  const [canvasWidth, setCanvasWidth] = useState(500);
  const [canvasHeight, setCanvasHeight] = useState(500);

  return { canvasWidth, canvasHeight, setCanvasWidth, setCanvasHeight };
};

export default useResponsibleSize;
