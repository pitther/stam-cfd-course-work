import { useContext, useEffect, useRef } from 'react';
import { Graphics, Stage } from '@inlet/react-pixi';

import ResponsibleSizeContext from '../../../../contexts/ResponsibleSize';
import { ICFDMAP } from '../../../../util/Map';

import { useCanvas } from './hooks/useCanvas';
import { SOLID_OBJECTS_MAP1 } from './maps/temp_maps';
import * as S from './Canvas.styled';

const CURRENT_MAP = new ICFDMAP({
  resolution: 64,
  viscosity: 0.0,
  objects: SOLID_OBJECTS_MAP1,
  diffuse: 0,
});

const Canvas = ({ workspace }) => {
  const stageRef = useRef();
  const containerRef = useRef();

  const { toolbar } = workspace;
  const { getToolByName } = toolbar;

  getToolByName('SAVE').action = () => {
    console.log(CURRENT_MAP);
  };

  const { canvasWidth, canvasHeight, setCanvasWidth, setCanvasHeight } =
    useContext(ResponsibleSizeContext);

  const { startSceneLooping, stopSceneLooping, handleControls } = useCanvas({
    canvasWidth,
    canvasHeight,
    toolbar,
    stageRef,
    MAP: CURRENT_MAP,
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
