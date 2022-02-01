import {useWorkspace} from "./useWorkspace";
import {Graphics, Stage} from "@inlet/react-pixi";
import * as S from "./Workspace.styled";
import {useEffect, useRef} from "react";

const SIMULATION_RESOLUTION = 64;
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const Workspace = () => {
    const canvasRef = useRef();

    const {startRenderingCycle,setCanvasRef, handleControls} = useWorkspace({
        CANVAS_HEIGHT,
        CANVAS_WIDTH,
        SIZE: SIMULATION_RESOLUTION
    });

    useEffect(() => {
        setCanvasRef(canvasRef);
        startRenderingCycle();
    },[])

    return <S.Wrapper>
        <canvas
            ref={canvasRef}
            onMouseDown={handleControls}
            onMouseUp={handleControls}
            onMouseMove={handleControls}
            onContextMenu={handleControls}
            style={{width: CANVAS_WIDTH, height: CANVAS_HEIGHT}}
        >
        </canvas>
    </S.Wrapper>;
};

Workspace.propTypes = {}

export default Workspace;