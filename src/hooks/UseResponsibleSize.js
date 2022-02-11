import { useState } from 'react';

const useResponsibleSize = () => {
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  return { canvasWidth, canvasHeight, setCanvasWidth, setCanvasHeight };
};

export default useResponsibleSize;
