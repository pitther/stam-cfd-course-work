import { useState } from 'react';

const useResponsibleSize = () => {
  const [canvasWidth, setCanvasWidth] = useState(100);
  const [canvasHeight, setCanvasHeight] = useState(100);

  return { canvasWidth, canvasHeight, setCanvasWidth, setCanvasHeight };
};

export default useResponsibleSize;
