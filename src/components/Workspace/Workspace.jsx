import {useWorkspace} from "./useWorkspace";
import {Graphics, Stage} from "@inlet/react-pixi";
import * as S from "./Workspace.styled";

const SIMULATION_RESOLUTION = 64;
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 500;

const Workspace = () => {
    const {draw, handleControls} = useWorkspace({CANVAS_HEIGHT, CANVAS_WIDTH, SIZE: SIMULATION_RESOLUTION});


    return <S.Wrapper>
        <Stage
            onMouseDown={handleControls}
            onMouseUp={handleControls}
            onMouseMove={handleControls}
            onContextMenu={handleControls}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            options={{backgroundColor: 0x000000, resolution: 5}}
        >
            <Graphics draw={draw}/>
        </Stage>
    </S.Wrapper>;
};

Workspace.propTypes = {}

export default Workspace;