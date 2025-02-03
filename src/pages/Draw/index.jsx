import { Container } from './styles'

import React, { useState, useRef, useEffect } from 'react';
import * as fabric from 'fabric';

import { Header } from '../../components/Header'

export function Draw() {
    const canvasRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    const [activeTool, setActiveTool] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPoint, setStartPoint] = useState(null);
    const [tempObject, setTempObject] = useState(null);
    const [pencilWidth, setPencilWidth] = useState(1);

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
    }, [pencilWidth]);


    const toolActions = {
        pencil: {
            activate() {
                canvas.isDrawingMode = true;
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush.color = 'black';
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
                });
                setTempObject(rect);
                canvas.add(rect);
                setIsDrawing(true);
                rect.set('selectable', false);
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
                setTempObject(null);
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

                const circle = new fabric.Ellipse({ // Usando Ellipse para suportar oval
                    left: pointer.x,
                    top: pointer.y,
                    originX: 'center',
                    originY: 'center',
                    rx: 1, // Raio X inicial
                    ry: 1, // Raio Y inicial
                    stroke: 'black',
                    strokeWidth: 2,
                    fill: 'transparent',
                });

                setTempObject(circle);
                canvas.add(circle);
                setIsDrawing(true);
                circle.set('selectable', false);
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
                setTempObject(null);
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
        
                const triangle = new fabric.Polygon([
                    { x: pointer.x, y: pointer.y },
                    { x: pointer.x, y: pointer.y },
                    { x: pointer.x, y: pointer.y }
                ], {
                    stroke: 'black',
                    fill: 'transparent',
                    strokeWidth: 2,
                    selectable: false
                });
        
                setTempObject(triangle);
                canvas.add(triangle);
                setIsDrawing(true);
            },
            mouseMove(event) {
                if (!isDrawing || activeTool !== 'triangle' || !tempObject) return;
                
                const pointer = canvas.getPointer(event.e);
                const points = tempObject.get('points');
        
                points[1] = { x: pointer.x, y: pointer.y };
                points[2] = { x: (points[0].x + points[1].x) / 2, y: points[0].y - Math.abs(points[1].x - points[0].x) };
        
                tempObject.set({
                    points: points
                });
        
                canvas.renderAll();
            },
            mouseUp() {
                setIsDrawing(false);
                setStartPoint(null);
                setTempObject(null);
            },
        },        
        eraser: {
            activate() {
                canvas.isDrawingMode = true;
                // Define o pincel de desenho livre como um pincel de borracha
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
                canvas.freeDrawingBrush.color = 'white'; // Define a cor como a cor de fundo do canvas
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
                    selectable: false
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
                setTempObject(null);
            },
        },
        text: {
            activate() {
                canvas.selection = false;
                canvas.defaultCursor = 'text'; // Mudar o cursor para o cursor de texto
            },
            deactivate() {
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
            mouseDown(event) {
                const pointer = canvas.getPointer(event.e);

                const iText = new fabric.IText('Clique para editar', {
                    left: pointer.x,
                    top: pointer.y,
                    fontSize: 20,
                    fill: 'black',
                    selectable: false,
                });

                setTempObject(iText);
                canvas.add(iText);
                canvas.setActiveObject(iText); // Definir o objeto como ativo para edição
                iText.enterEditing(); // Iniciar a edição do texto
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
                // Crie um input file hidden
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
                                    svgGroup.scaleToWidth(100)
                                    canvas.centerObject(svgGroup);
                                    canvas.renderAll();
                                });
                            } else {
                                const img = new Image();
                                img.onload = () => {
                                    const fabricImg = new fabric.Image(img);
                                    canvas.add(fabricImg);
                                    fabricImg.scaleToWidth(100)
                                    canvas.centerObject(fabricImg)
                                    canvas.renderAll()
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
                input.click(); //simula um clique no input

            },
            deactivate() {
                canvas.selection = false;
                canvas.defaultCursor = 'default';
            },
        },
        select: {
            activate() {
                canvas.selection = true;
                canvas.defaultCursor = 'default';
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
    }

    function handleMouseDown(event) {
        toolActions[activeTool]?.mouseDown?.(event);
    }

    function handleMouseMove(event) {
        toolActions[activeTool]?.mouseMove?.(event);
    }

    function handleMouseUp() {
        toolActions[activeTool]?.mouseUp?.();
    }

   useEffect(() => {
        if (!canvas) return;

        canvas.on('mouse:down', handleMouseDown);
        canvas.on('mouse:move', handleMouseMove);
        canvas.on('mouse:up', handleMouseUp);
        
        const handleObjectMoving = (options) => {
            if (activeTool === 'select') {
                
            } else{
                 options.target.set({ left: options.target.left, top: options.target.top });
                 options.target.setCoords();
                 canvas.renderAll()
            }
            
        };
        canvas.on('object:moving', handleObjectMoving);
        
        return () => {
             canvas.off('mouse:down', handleMouseDown);
            canvas.off('mouse:move', handleMouseMove);
            canvas.off('mouse:up', handleMouseUp);
             canvas.off('object:moving', handleObjectMoving);
        };
    }, [canvas, activeTool, isDrawing, startPoint, tempObject]);

    useEffect(() => {
        if (!canvas) return;

        canvas.forEachObject((obj) => {
            if (activeTool === 'select') {
                obj.set('selectable', true);
            } else {
                obj.set('selectable', false);
            }
        });
        canvas.renderAll();
    }, [activeTool, canvas]);

    return (
        <Container>
            <Header />
            <button onClick={() => activateTool('pencil')}>Pincel</button>
            <button onClick={() => activateTool('square')}>Quadrado</button>
            <button onClick={() => activateTool('circle')}>Círculo</button>
            <button onClick={() => activateTool('triangle')}>Triângulo</button>
            <button onClick={() => activateTool('line')}>Linha</button>
            <button onClick={() => activateTool('text')}>Texto</button>
            <button onClick={() => activateTool('eraser')}>Borracha</button>
            <button onClick={() => activateTool('svg')}>imagem</button>
            <button onClick={() => activateTool('select')}>Seleção livre</button>

            <label htmlFor="pencil-width">Largura do Pincel:</label>
            <input
                type="number"
                id="pencil-width"
                value={pencilWidth}
                onChange={(e) => setPencilWidth(Number(e.target.value))}
                min="1"
                max="20" // Limite opcional para largura
            />

            <canvas ref={canvasRef} id="fabric-canvas" />
        </Container>
    );
}