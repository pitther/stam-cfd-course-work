import * as PIXI from "pixi.js";
import fragmentShaderRoot from './GLSL/fragment.glsl'
import vertexShaderRoot from './GLSL/vertex.glsl'
import {CustomBufferResource} from "./CustomBufferResource";


const rgbToHex = (rgb) => {
    return PIXI.utils.rgb2hex(rgbToNormalLimit(rgb))
}

const getTextFile = (name, object) => {
    fetch(name).then((r) => r.text()).then(text => {
        object.response = text;
    })
}

const arrayTo2d = (ARRAY, size) => ARRAY.reduce((cur, i) => {
    let lastInd = cur.length - 1
    let lastVal = cur[lastInd]

    if (lastVal.length === size) {
        return cur.concat([[i]])
    }

    return cur
        .slice(0, lastInd)
        .concat([lastVal.concat(i)])
}, [[]])


const densityArrayToRGBATexture = (array) => {
    const tempArray = [];
    array.forEach(density => tempArray.push(0.2, 0.5, 0.5, .9));
    return new Float32Array(tempArray);
}

const rgbToNormalLimit = (rgb) => {
    return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255]
}

const useWebGLRenderer = ({SIZE, CANVAS_WIDTH, CANVAS_HEIGHT}) => {
    const CELL_WIDTH = CANVAS_WIDTH / SIZE;
    const CELL_HEIGHT = CANVAS_HEIGHT / SIZE;

    const fragmentShader = {};
    const vertexShader = {};
    getTextFile(fragmentShaderRoot, fragmentShader);
    getTextFile(vertexShaderRoot, vertexShader);

    //const colorScale = new ColorScale(0, 4, ["#000000","#ff5c5c", "#faff7a"]);
    //const colorScale = new ColorScale(0, 5, ["#000000", "#0024ff", "#02c3ff", "#00ff33", "#ffea13", "#ff1111"]);

    const DENSITY_TEXTURE = densityArrayToRGBATexture([.5, 1, 4, 2, 4, 5]);

    console.log(DENSITY_TEXTURE);

    const uniforms = {
        color: [1.0, 0.5, 1.0, 1.0],
        offset: [0, 0],
        size: SIZE,
        CELL_WIDTH,
        CELL_HEIGHT,
        CANVAS_WIDTH,
        CANVAS_HEIGHT,
        uResolution: new PIXI.Point(CANVAS_WIDTH, CANVAS_HEIGHT)
    };


    const drawScene = ({g, SOLID_OBJECTS, FLUID}) => {
        const DENSITY_RGBA_ARRAY = densityArrayToRGBATexture([...FLUID.x]);

        const dataArray = new Float32Array([...FLUID.x]);
        const resource = new CustomBufferResource(dataArray, {
            width: SIZE,
            height: SIZE,
            internalFormat: 'R32F',
            format: 'RED',
            type: 'FLOAT'
        });

        const baseDataTexture = new PIXI.BaseTexture(resource, { scaleMode: PIXI.SCALE_MODES.NEAREST });
        const dataTexture = new PIXI.Texture(baseDataTexture);

        const uniforms = new PIXI.UniformGroup({
            uColors: rgb2hsv([255, 128, 0]),
            uDomains: [0, 1],
            uTexSampler: dataTexture // CHANGE TO `dataTexture` and it won't work anymore!
        });

        const shader = PIXI.Shader.from(vertexShader.response, fragmentShader.response, uniforms);

        const geometry = new PIXI.Geometry();

        geometry.addAttribute('aPosition', [-1, -1, 1, -1, 1, 1, -1, 1], 2);
        geometry.addAttribute('aTexCoords', [0, 1, 1, 1, 1, 0, 0, 0], 2);
        geometry.addIndex([0, 1, 2, 0, 3, 2]);

        const state = new PIXI.State();

        const mesh = new PIXI.Mesh(geometry, shader, state);
        g.addChild(mesh);


        const simulationShader = new PIXI.Filter(null,fragmentShader.response,
            {
                ...uniforms,
                DENSITY: FLUID.x,
                texture: DENSITY_TEXTURE
            });

        //g.clear();
        //g.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        //g.filters = [simulationShader];
    }

    return {drawScene}
}

export {useWebGLRenderer}



function rgb2hsv ([r, g, b]) {
    let rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
    rabs = r / 255;
    gabs = g / 255;
    babs = b / 255;
    v = Math.max(rabs, gabs, babs);
    diff = v - Math.min(rabs, gabs, babs);
    diffc = c => (v - c) / 6 / diff + 1 / 2;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = (1 / 3) + rr - bb;
        } else if (babs === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return [
        h,
        s,
        v
    ];
}


/*
* g.clear();
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
* */