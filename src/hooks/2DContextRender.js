const use2DContextRender = ({SIZE, CANVAS_WIDTH, CANVAS_HEIGHT}) => {
    const canvas = {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        cellWidth: CANVAS_WIDTH / SIZE,
        cellHeight: CANVAS_HEIGHT / SIZE,
        cellCount: SIZE,
        context: null,
        ref: null,
    };

    const setCanvasRef = (canvasRef) => {
        canvas.ref = canvasRef;
        canvas.context = canvasRef.current.getContext('2d');
    }

    console.log(canvas);

    const renderScene = ({SOLID_OBJECTS, FLUID}) => {
        const imgData = canvas.context.createImageData(10, 10);


        for (let i = 0; i < imgData.data.length; i += 4) {
            const FLUID_INDEX = Math.floor(i / 4);
            //const CELL_DENSITY = FLUID.x[FLUID_INDEX];

            imgData.data[i] = 255;
            imgData.data[i+1] = 123;
            imgData.data[i+2] = 12;
            imgData.data[i+3] = 255;
        }

        canvas.context.putImageData(imgData,0,0);
    }

    return {renderScene, setCanvasRef}
}

export {use2DContextRender}