import { useContext, useEffect, useRef } from 'react';
import { Graphics, Stage } from '@inlet/react-pixi';

import ResponsibleSizeContext from '../../../../contexts/ResponsibleSize';

import { useCanvas } from './hooks/useCanvas';
import * as S from './Canvas.styled';

const Canvas = ({ workspace, map }) => {
  const stageRef = useRef();
  const containerRef = useRef();

  const { toolbar } = workspace;

  const { canvasWidth, canvasHeight, setCanvasWidth, setCanvasHeight } =
    useContext(ResponsibleSizeContext);

  const { startSceneLooping, stopSceneLooping, handleControls } = useCanvas({
    canvasWidth,
    canvasHeight,
    toolbar,
    stageRef,
    MAP: map,
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
          onTouchEnd={handleControls}
          onTouchMove={handleControls}
          onTouchStart={handleControls}
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
