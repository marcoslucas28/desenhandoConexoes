import { Container } from './styles';
import React, { useState, useRef, useEffect } from 'react';
import * as fabric from 'fabric';

import { Header } from '../../components/Header';

export function Draw() {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [activeTool, setActiveTool] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    const [tempObject, setTempObject] = useState(null);
    const [pencilWidth, setPencilWidth] = useState(5);
    const [eraserWidth, setEraserWidth] = useState(5);


    useEffect(() => {
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: false,
            height: 500,
            width: 700,
            selection: false,
        });
        setCanvas(newCanvas);

        return () => {
            newCanvas.dispose();
        };
    }, []);

    useEffect(() => {
        if (!canvas) return;

        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = pencilWidth;
        canvas.freeDrawingBrush.color = pencilColor;

    }, [pencilWidth, pencilColor, canvas]);


    const toolActions = {
        pencil: {
            activate() {
                canvas.isDrawingMode = true;
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush.color = "black";
                canvas.freeDrawingBrush.width = pencilWidth;
                canvas.selection = false;
                canvas.defaultCursor = 'crosshair';
            },
            deactivate() {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
        },
        eraser: {
            activate() {
                canvas.isDrawingMode = true;
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush.color = "white";
                canvas.freeDrawingBrush.width = pencilWidth;
                canvas.selection = false;
                canvas.defaultCursor = 'crosshair';
            },
            deactivate() {
                canvas.isDrawingMode = false;
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
        },
        square: {
            activate() {
                canvas.selection = false;
                canvas.defaultCursor = 'crosshair';
            },
            deactivate() {
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
            mouseDown(event) {
                

                const pointer = canvas.getPointer(event.e);
                setStartPoint({ x: pointer.x, y: pointer.y });
                const rect = new fabric.Rect({
                    left: pointer.x,
                    top: pointer.y,
                    width: 0,
                    height: 0,
                    fill: 'transparent',
                    stroke: 'black',
                    strokeWidth: 2,
                    originX: 'left',
                    originY: 'top',
                    selectable: false,
                });
                setTempObject(rect);
                canvas.add(rect);
                setIsDrawing(true);
            },
            mouseMove(event) {
                if (!isDrawing || activeTool !== 'square') return;

                const pointer = canvas.getPointer(event.e);
                const width = Math.abs(pointer.x - startPoint.x);
                const height = Math.abs(pointer.y - startPoint.y);
                const left = Math.min(pointer.x, startPoint.x);
                const top = Math.min(pointer.y, startPoint.y);

                tempObject.set({
                    width: width,
                    height: height,
                    left: left,
                    top: top,
                });

                canvas.renderAll();
            },
            mouseUp() {
                setIsDrawing(false);
                setStartPoint(null);
                if (tempObject) {
                    tempObject.set('selectable', true);
                    canvas.setActiveObject(tempObject);
                    setTempObject(null);
                }
            },
        },
        circle: {
            activate() {
                canvas.selection = false;
                canvas.defaultCursor = 'crosshair';
            },
            deactivate() {
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
            mouseDown(event) {
                

                const pointer = canvas.getPointer(event.e);
                setStartPoint({ x: pointer.x, y: pointer.y });

                const circle = new fabric.Ellipse({
                    left: pointer.x,
                    top: pointer.y,
                    originX: 'center',
                    originY: 'center',
                    rx: 1,
                    ry: 1,
                    stroke: 'black',
                    strokeWidth: 2,
                    fill: 'transparent',
                    selectable: false,
                });

                setTempObject(circle);
                canvas.add(circle);
                setIsDrawing(true);
            },
            mouseMove(event) {
                if (!isDrawing || activeTool !== 'circle' || !tempObject) return;

                const pointer = canvas.getPointer(event.e);
                const startX = startPoint.x;
                const startY = startPoint.y;

                const rx = Math.abs(pointer.x - startX) / 2;
                const ry = Math.abs(pointer.y - startY) / 2;

                const centerX = (startX + pointer.x) / 2;
                const centerY = (startY + pointer.y) / 2;


                tempObject.set({
                    rx: rx,
                    ry: ry,
                    left: centerX,
                    top: centerY,
                });


                canvas.renderAll();
            },
            mouseUp() {
                setIsDrawing(false);
                setStartPoint(null);
                if (tempObject) {
                    tempObject.set('selectable', true);
                    canvas.setActiveObject(tempObject);
                    setTempObject(null);
                }
            },
        },
        triangle: {
            activate() {
                canvas.selection = false;
                canvas.defaultCursor = 'crosshair';
            },
            deactivate() {
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
            mouseDown(event) {
                

                const pointer = canvas.getPointer(event.e);
                setStartPoint({ x: pointer.x, y: pointer.y });
                const triangle = new fabric.Triangle({
                    left: pointer.x,
                    top: pointer.y,
                    width: 0,
                    height: 0,
                    fill: 'transparent',
                    stroke: 'black',
                    strokeWidth: 2,
                    originX: 'left',
                    originY: 'top',
                    selectable: false,
                });
                setTempObject(triangle);
                canvas.add(triangle);
                setIsDrawing(true);
            },
            mouseMove(event) {
                if (!isDrawing || activeTool !== 'triangle') return;
                const pointer = canvas.getPointer(event.e);
                const width = Math.abs(pointer.x - startPoint.x);
                const height = Math.abs(pointer.y - startPoint.y);
                const left = Math.min(pointer.x, startPoint.x);
                const top = Math.min(pointer.y, startPoint.y);

                tempObject.set({
                    width: width,
                    height: height,
                    left: left,
                    top: top,
                });
                canvas.renderAll();
            },
            mouseUp() {
                setIsDrawing(false);
                setStartPoint(null);
                if (tempObject) {
                    tempObject.set('selectable', true);
                    canvas.setActiveObject(tempObject);
                    setTempObject(null);
                }
            },
        },
        line: {
            activate() {
                canvas.selection = false;
                canvas.defaultCursor = 'crosshair';
            },
            deactivate() {
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
            mouseDown(event) {
                

                const pointer = canvas.getPointer(event.e);
                setStartPoint({ x: pointer.x, y: pointer.y });

                const line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
                    stroke: 'black',
                    strokeWidth: 2,
                    selectable: false,
                });

                setTempObject(line);
                canvas.add(line);
                setIsDrawing(true);
            },
            mouseMove(event) {
                if (!isDrawing || activeTool !== 'line' || !tempObject) return;

                const pointer = canvas.getPointer(event.e);

                tempObject.set({
                    x2: pointer.x,
                    y2: pointer.y
                });

                canvas.renderAll();
            },
            mouseUp() {
                setIsDrawing(false);
                setStartPoint(null);
                if (tempObject) {
                    tempObject.set('selectable', true); 
                    canvas.setActiveObject(tempObject);
                    setTempObject(null);
                }
            },
        },
        text: {
            activate() {
                canvas.selection = false;
                canvas.defaultCursor = 'text';
            },
            deactivate() {
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
            mouseDown(event) {
                
                const pointer = canvas.getPointer(event.e);

                const activeObject = canvas.getActiveObject();
                if (activeObject && activeObject.type === 'i-text') {
                    return;
                }

                const iText = new fabric.IText('Clique para editar', {
                    left: pointer.x,
                    top: pointer.y,
                    fontSize: 20,
                    fill: 'black',
                    selectable: true,
                });

                setTempObject(iText);
                canvas.add(iText);
                canvas.setActiveObject(iText);
                iText.enterEditing();
                setIsDrawing(true)
            },

            mouseMove(event) { 
                if (!isDrawing || activeTool !== 'text' || !tempObject) return;
                const pointer = canvas.getPointer(event.e);

                tempObject.set({
                    left: pointer.x,
                    top: pointer.y
                });
                canvas.renderAll()
            },
            mouseUp(event) {
                setIsDrawing(false)
                setTempObject(null)
            },

        },
        svg: {
            activate() {
                canvas.selection = false;
                canvas.defaultCursor = 'pointer';
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.svg, .png, .jpeg, .jpg';
                input.style.display = 'none';

                input.onchange = (e) => {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            if (file.type === 'image/svg+xml') {
                                fabric.loadSVGFromString(event.target.result, (objects, options) => {
                                    const svgGroup = fabric.util.groupSVGElements(objects, options);
                                    canvas.add(svgGroup);
                                    svgGroup.scaleToWidth(100);
                                    canvas.centerObject(svgGroup);
                                     canvas.setActiveObject(svgGroup);
                                    canvas.renderAll();
                                });
                            } else {
                                const img = new Image();
                                img.onload = () => {
                                    const fabricImg = new fabric.Image(img);
                                    canvas.add(fabricImg);
                                    fabricImg.scaleToWidth(100);
                                    canvas.centerObject(fabricImg);
                                    canvas.setActiveObject(fabricImg);
                                    canvas.renderAll();
                                };
                                img.src = event.target.result;
                            }
                        };
                        if (file.type === 'image/svg+xml') {
                            reader.readAsText(file);
                        } else {
                            reader.readAsDataURL(file)
                        }
                    }
                    input.value = '';
                };
                input.click();
            },
            deactivate() {
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
        },
    };

    function activateTool(toolName) {
        if (activeTool) {
            toolActions[activeTool]?.deactivate?.();
        }
        setActiveTool(toolName);
        toolActions[toolName]?.activate?.();
        canvas.discardActiveObject().renderAll();
    }

    function handleMouseDown(event) {
        toolActions[activeTool]?.mouseDown?.(event);
    }

    function handleMouseMove(event) {
        toolActions[activeTool]?.mouseMove?.(event);
    }

    function handleMouseUp(event) {
        toolActions[activeTool]?.mouseUp?.(event);
    }


    useEffect(() => {
        if (!canvas) return;

        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:move', handleMouseMove);
        canvas.on('mouse:up', handleMouseUp);

        return () => {
            canvas.off('mouse:down', handleMouseDown);
            canvas.off('mouse:move', handleMouseMove);
            canvas.off('mouse:up', handleMouseUp);
        };
    }, [canvas, activeTool, isDrawing, startPoint, tempObject, isObjectSelected]);


    return (
        <Container>
            <Header />
            <button onClick={() => activateTool('pencil')}>Pincel</button>
            <button onClick={() => activateTool('eraser')}>Borracha</button>
            <button onClick={() => activateTool('square')}>Quadrado</button>
            <button onClick={() => activateTool('circle')}>Círculo</button>
            <button onClick={() => activateTool('triangle')}>Triângulo</button>
            <button onClick={() => activateTool('line')}>Linha</button>
            <button onClick={() => activateTool('text')}>Texto</button>
            <button onClick={() => activateTool('svg')}>imagem</button>


            <div>
                
                <label htmlFor="pencil-width">Largura do Pincel:</label>
                <input
                    type="number"
                    id="pencil-width"
                    value={pencilWidth}
                    onChange={(e) => setPencilWidth(Number(e.target.value))}
                    min="1"
                    max="20"
                />
                <label htmlFor="eraser-width">Largura da Borracha:</label>
                <input
                    type="number"
                    id="eraser-width"
                    value={eraserWidth}
                    onChange={(e) => setEraserWidth(Number(e.target.value))}
                    min="1"
                    max="100"
                />
            </div>

            <canvas ref={canvasRef} id="fabric-canvas" />
        </Container>
    );
}