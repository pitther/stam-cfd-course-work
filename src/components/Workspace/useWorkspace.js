import {useCallback} from "react";
import {useStemFluid} from "../../hooks/StemFluid";
import {use2DContextRender} from "../../hooks/2DContextRender";

const FLUID_UPDATE_INTERVAL_S = 30 / 60;

const RENDER_INTERVAL_MS = FLUID_UPDATE_INTERVAL_S * 1000;

const nativeCoordsToFluid = (x, y, CANVAS_WIDTH, CANVAS_HEIGHT, SIZE_X, SIZE_Y) => {
    return {x: Math.floor(x * SIZE_X / CANVAS_WIDTH), y: Math.floor(y * SIZE_Y / CANVAS_HEIGHT)}
}

export const useWorkspace = ({CANVAS_WIDTH, CANVAS_HEIGHT, SIZE}) => {
    const {FLUID, addSolidObject, removeSolidObject, SOLID_OBJECTS} = useStemFluid(
        {
            SIZE,
            visc: 0.000001,
            diff: 0.000001
        }
    );

    const {renderScene, setCanvasRef} = use2DContextRender({SIZE, CANVAS_WIDTH, CANVAS_HEIGHT});

    const startRenderingCycle = useCallback(() => {
        setInterval(() => {
            FLUID.addForce(SIZE - 3, 16, -500, 0);
            FLUID.addDensity(SIZE - 3, 16, 20);

            FLUID.step(FLUID_UPDATE_INTERVAL_S);

           /* for (let y = 0; y < SIZE; y++) {
                if (Math.abs(y - SIZE / 2) < 20) {
                    FLUID.addForce(SIZE - 1, y, -1000, 0)
                    FLUID.addDensity(SIZE - 1, y, 100);
                }
            }*/


            renderScene({SOLID_OBJECTS, FLUID});
        }, FLUID_UPDATE_INTERVAL_S * 1000);
    }, []);


    const activeControls = {
        leftMouseDown: false,
        rightMouseDown: false,
        middleMouseDown: false
    }
    const handleControls = (e) => {
        if (e._reactName === 'onMouseMove') {
            const nativeX = e.nativeEvent.offsetX;
            const nativeY = e.nativeEvent.offsetY;
            const {x, y} = nativeCoordsToFluid(nativeX, nativeY, CANVAS_WIDTH, CANVAS_HEIGHT, SIZE, SIZE);

            if (activeControls.rightMouseDown) {
                FLUID.addDensity(x, y, 100);
            }

            if (activeControls.leftMouseDown) {
                FLUID.addForce(x, y, e.movementX * 20, e.movementY * 20);
            }

            if (activeControls.rightMouseDown) {
                removeSolidObject(x, y);
            }

            if (activeControls.middleMouseDown) {
                addSolidObject(x, y);
            }
        }

        if (e._reactName === 'onMouseDown') {
            if (e.button === 2) {
                activeControls.rightMouseDown = true;
            }
            if (e.button === 1) {
                activeControls.middleMouseDown = true;
            }
            if (e.button === 0) {
                activeControls.leftMouseDown = true;
            }
        }

        if (e._reactName === 'onMouseUp') {
            if (e.button === 2) {
                activeControls.rightMouseDown = false;
            }
            if (e.button === 1) {
                activeControls.middleMouseDown = false;
            }
            if (e.button === 0) {
                activeControls.leftMouseDown = false;
            }
        }

        e.preventDefault();
        e.stopPropagation();
        return false;
    }


    return {startRenderingCycle, setCanvasRef, handleControls}

}