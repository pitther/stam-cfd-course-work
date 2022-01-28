
import {useCallback} from "react";
import * as PIXI from "pixi.js";
import ColorScale from "color-scales";
import {IX, useStemFluid} from "../../hooks/StemFluid";


const FPS = 1 / 60;

const limit = (num, min, max) => Math.min(Math.max(num, min), max)

const lerp = (x, y, a) => x * (1 - a) + y * (a > 1 ? 1 : a);

const rgbToNormalLimit = (rgb) => {
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]
}

const rgbToHex = (rgb) => {
    return PIXI.utils.rgb2hex(rgbToNormalLimit(rgb))
}

const nativeCoordsToFluid = (x, y, CANVAS_WIDTH, CANVAS_HEIGHT, SIZE_X, SIZE_Y) => {
    return {x: Math.floor(x * SIZE_X / CANVAS_WIDTH), y: Math.floor(y * SIZE_Y / CANVAS_HEIGHT)}
}

export const useWorkspace = ({CANVAS_WIDTH, CANVAS_HEIGHT, SIZE}) => {
    const {FLUID,addSolidObject,removeSolidObject,SOLID_OBJECTS} = useStemFluid(
        {SIZE,visc:.000000001,diff:0.00001});

    const CELL_WIDTH = CANVAS_WIDTH / SIZE;
    const CELL_HEIGHT = CANVAS_HEIGHT / SIZE;

    setInterval(() => {
       /*for (let y = 0; y < SIZE; y++) {
           if (Math.abs(y-SIZE/2) < 3){
               FLUID.addForce(SIZE-1 , y, -1000, 0)
               FLUID.addDensity(SIZE-1 , y, 500);
           }
        }*/
        FLUID.addForce(SIZE-1 , 32, -1300, 0);
        FLUID.addDensity(SIZE-1 , 32, 1500);
        FLUID.step(FPS);
    }, FPS / 1000);

    const colorScale = new ColorScale(0, 5, ["#000000","#ff5c5c", "#faff7a"]);

    const draw = useCallback(g => {
        setInterval(() => {
            g.clear();
            for (let y = 0; y < SIZE; y++) {
                for (let x = 0; x < SIZE; x++) {
                    const [velocityX, velocityY] = FLUID.velocityAt(x, y);
                    let density = FLUID.densityAt(x, y);
                    const color = colorScale.getColor(density);
                    g.beginFill(rgbToHex([color?.r, color?.g, color?.b]), 1);
                    g.drawRect(CELL_WIDTH * x, CELL_HEIGHT * y, CELL_WIDTH, CELL_HEIGHT);

                    if (SOLID_OBJECTS[IX(SIZE,x,y)]){
                        g.beginFill(rgbToHex([255,255,255]), 1);
                        g.drawRect(CELL_WIDTH * x, CELL_HEIGHT * y, CELL_WIDTH, CELL_HEIGHT);
                    }
                }
            }
            g.endFill()
        }, FPS / 1000);
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

            if (activeControls.middleMouseDown) {
                addSolidObject(x,y);
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


    return {draw, handleControls}

}