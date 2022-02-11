import { useContext, useEffect, useRef } from 'react';
import { Graphics, Stage } from '@inlet/react-pixi';

import ResponsibleSizeContext from '../../../../contexts/ResponsibleSize';

import { useCanvas } from './useCanvas';
import * as S from './Canvas.styled';

const SIMULATION_RESOLUTION = 64;

const Canvas = () => {
  const stageRef = useRef();
  const containerRef = useRef();

  const { canvasWidth, canvasHeight, setCanvasWidth, setCanvasHeight } =
    useContext(ResponsibleSizeContext);

  const { startRenderingCycle, handleControls } = useCanvas({
    SIMULATION_RESOLUTION,
    canvasWidth,
    canvasHeight,
  });

  const handleResize = () => {
    setCanvasWidth(containerRef.current.offsetWidth);
    setCanvasHeight(containerRef.current.offsetWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    /* const stats = addStats(document, stageRef.current);
        const ticker = PIXI.Ticker.shared;
        ticker.add(stats.update, stats, 1); */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleResize();
    stageRef.current.app.renderer.resize(canvasWidth, canvasHeight);
  }, [canvasHeight, canvasWidth]);

  return (
    <S.Wrapper>
      <S.Container ref={containerRef}>
        <Stage
          ref={stageRef}
          onMouseDown={handleControls}
          onMouseUp={handleControls}
          onMouseMove={handleControls}
          onContextMenu={handleControls}
        >
          <Graphics tint={0xffffff} draw={startRenderingCycle} />
        </Stage>
      </S.Container>
    </S.Wrapper>
  );
};

Canvas.propTypes = {};

export default Canvas;
