import { useContext, useEffect, useRef } from 'react';
import { Graphics, Stage } from '@inlet/react-pixi';

import ResponsibleSizeContext from '../../../../contexts/ResponsibleSize';

import { SOLID_OBJECTS_CLEAR } from './temp_map_clear';
import { useCanvas } from './useCanvas';
import * as S from './Canvas.styled';

const Canvas = ({ workspace }) => {
  const stageRef = useRef();
  const containerRef = useRef();
  const { toolbar } = workspace;
  const { canvasWidth, canvasHeight, setCanvasWidth, setCanvasHeight } =
    useContext(ResponsibleSizeContext);

  const MAP = {
    BOUND_OBJECTS: SOLID_OBJECTS_CLEAR,
    RESOLUTION: 64,
    DEFAULT_VISK: 0.0,
    DEFAULT_DIFF: 0.0002,
  };

  const { startSceneLooping, stopSceneLooping, handleControls } = useCanvas({
    canvasWidth,
    canvasHeight,
    toolbar,
    MAP,
  });

  const handleResize = () => {
    setCanvasWidth(containerRef?.current?.offsetWidth);
    setCanvasHeight(containerRef?.current?.offsetWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      stopSceneLooping();
    };

    /* const stats = addStats(document, stageRef.current);
        const ticker = PIXI.Ticker.shared;
        ticker.add(stats.update, stats, 1); */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    stageRef.current?.app.renderer.resize(canvasWidth, canvasHeight);
  }, [canvasHeight, canvasWidth]);

  return (
    <S.Wrapper>
      <S.Container ref={containerRef}>
        <Stage
          id="canvas-video"
          ref={stageRef}
          onMouseDown={handleControls}
          onMouseUp={handleControls}
          onMouseMove={handleControls}
          onContextMenu={handleControls}
        >
          <Graphics tint={0xffffff} draw={startSceneLooping} />
        </Stage>
      </S.Container>
    </S.Wrapper>
  );
};

Canvas.propTypes = {};

export default Canvas;
