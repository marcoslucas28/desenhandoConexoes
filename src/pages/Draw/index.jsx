import { Container, ToolConfig, ToolsBar, Content } from './styles'
import React, { useState, useRef, useEffect } from 'react'
import * as fabric from 'fabric'

import { Header } from '../../components/Header'

import { IoMdDownload } from 'react-icons/io'
import { AiOutlineClear } from 'react-icons/ai'
import { FaPencilAlt } from 'react-icons/fa'
import { FaEraser } from 'react-icons/fa'
import { IoTextSharp } from 'react-icons/io5'
import { FaImage } from 'react-icons/fa'
import { FaSquare } from 'react-icons/fa'
import { FaCircle } from 'react-icons/fa'
import { IoTriangle } from 'react-icons/io5'
import { LuSpline } from 'react-icons/lu'
import { IoMdSettings } from "react-icons/io"

export function Draw() {
    const canvasRef = useRef(null)
    const [canvas, setCanvas] = useState(null)
    const [activeTool, setActiveTool] = useState('pencil')
    const [isDrawing, setIsDrawing] = useState(false)

    const [startPoint, setStartPoint] = useState(null)
    const [tempObject, setTempObject] = useState(null)
    
    const [pencilWidth, setPencilWidth] = useState(5)
    const [brushType, setBrushType] = useState('PencilBrush')
    const [eraserWidth, setEraserWidth] = useState(5)

    const [currentIText, setCurrentIText] = useState(null)
    const [isTextEditing, setIsTextEditing] = useState(false)

    const toleranceMargin = 10
    const [borderThickness, setBorderThickness] = useState(2)
    const [isFilled, setIsFilled] = useState(false)
    
    const [fontFamily, setFontFamily] = useState('Arial')

    const fontFamilies = ['Arial', 'Verdana', 'Tahoma', 'Times New Roman', 'Courier New', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Bebas Neue', 'Sigmar', 'Pacifico', 'Dancing Scrip', 'Caveat'] // Lista de fontes


    useEffect(() => {
        const newCanvas = new fabric.Canvas(canvasRef.current, {
            isDrawingMode: false,
            height: 500,
            width: 700,
            selection: true,
        })
        setCanvas(newCanvas)

        return () => {
            newCanvas.dispose()
        }
    }, [])

    useEffect(() => {
        if (!canvas) return

        switch (brushType) {
            case 'PencilBrush':
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
                break
            case 'CircleBrush':
                canvas.freeDrawingBrush = new fabric.CircleBrush(canvas)
                break
            case 'SprayBrush':
                canvas.freeDrawingBrush = new fabric.SprayBrush(canvas)
                break
            default:
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
        }
        canvas.freeDrawingBrush.width = pencilWidth

    }, [pencilWidth, canvas, brushType])


    useEffect(() => {
        if (!canvas || !currentIText) return

        const handleTextChanged = () => {
            canvas.renderAll()
        }

        currentIText.on('changed', handleTextChanged)


        return () => {
            if (currentIText) {
                currentIText.off('changed', handleTextChanged)

            }
        }
    }, [canvas, currentIText])


    const toolActions = {
        pencil: {
            activate() {
                canvas.isDrawingMode = true
                canvas.freeDrawingBrush.color = "black"
                canvas.freeDrawingBrush.width = pencilWidth
                canvas.selection = false
                canvas.defaultCursor = 'crosshair'
                canvas.forEachObject(obj => {
                    obj.selectable = false
                    obj.hoverCursor = 'crosshair'
                })
            },
            deactivate() {
                canvas.isDrawingMode = false
                canvas.defaultCursor = 'default'
                canvas.selection = true
                canvas.forEachObject(obj => {
                    obj.selectable = obj.selectable === false ? false : false
                    obj.hoverCursor = 'default'
                })

            },
        },
        eraser: {
            activate() {
                canvas.isDrawingMode = true
                canvas.freeDrawingBrush = new fabric.PencilBrush(canvas)
                canvas.freeDrawingBrush.color = "white"
                canvas.freeDrawingBrush.width = eraserWidth
                canvas.selection = false
                canvas.defaultCursor = 'crosshair'
                canvas.forEachObject(obj => {
                    obj.selectable = false
                    obj.hoverCursor = 'crosshair'
                })
            },
            deactivate() {
                canvas.isDrawingMode = false
                canvas.defaultCursor = 'default'
                canvas.selection = true
                canvas.forEachObject(obj => {
                    obj.selectable = obj.selectable === false ? false : false
                    obj.hoverCursor = 'default'
                })

            },
        },
        square: {
            activate() {
                canvas.selection = false
                canvas.defaultCursor = 'crosshair'
                canvas.forEachObject(obj => {
                    obj.selectable = false
                    obj.hoverCursor = 'crosshair'
                })
            },
            deactivate() {
                canvas.defaultCursor = 'default'
                canvas.selection = true
                canvas.forEachObject(obj => {
                    obj.selectable = obj.selectable === false ? false : false
                    obj.hoverCursor = 'default'
                })
            },
            mouseDown(event) {
                const activeObject = canvas.getActiveObject()
                const pointer = canvas.getPointer(event.e)

                if (activeObject) {
                    const boundingRect = activeObject.getBoundingRect()
                    const expandedRect = {
                        left: boundingRect.left - toleranceMargin,
                        top: boundingRect.top - toleranceMargin,
                        right: boundingRect.left + boundingRect.width + toleranceMargin,
                        bottom: boundingRect.top + boundingRect.height + toleranceMargin,
                    }

                    if (pointer.x >= expandedRect.left && pointer.x <= expandedRect.right && pointer.y >= expandedRect.top && pointer.y <= expandedRect.bottom) {
                        return
                    }
                }


                const creationPointer = canvas.getPointer(event.e)
                setStartPoint({ x: creationPointer.x, y: creationPointer.y })
                const rect = new fabric.Rect({
                    left: creationPointer.x,
                    top: creationPointer.y,
                    width: 0,
                    height: 0,
                    fill: isFilled ? 'black' : 'transparent',
                    stroke: 'black',
                    strokeWidth: borderThickness,
                    originX: 'left',
                    originY: 'top',
                    selectable: false,
                    hoverCursor: 'crosshair'
                })
                setTempObject(rect)
                canvas.add(rect)
                setIsDrawing(true)
            },
            mouseMove(event) {
                if (!isDrawing || activeTool !== 'square') return

                const pointer = canvas.getPointer(event.e)
                const width = Math.abs(pointer.x - startPoint.x)
                const height = Math.abs(pointer.y - startPoint.y)
                const left = Math.min(pointer.x, startPoint.x)
                const top = Math.min(pointer.y, startPoint.y)

                tempObject.set({
                    width: width,
                    height: height,
                    left: left,
                    top: top,
                })

                canvas.renderAll()
            },
            mouseUp() {
                setIsDrawing(false)
                setStartPoint(null)
                if (tempObject) {
                    tempObject.set('selectable', true)
                    tempObject.hoverCursor = 'move'
                    canvas.setActiveObject(tempObject)
                    setTempObject(null)
                }
            },
        },
        circle: {
            activate() {
                canvas.selection = false
                canvas.defaultCursor = 'crosshair'
                canvas.forEachObject(obj => {
                    obj.selectable = false
                    obj.hoverCursor = 'crosshair'
                })
            },
            deactivate() {
                canvas.defaultCursor = 'default'
                canvas.selection = true
                canvas.forEachObject(obj => {
                    obj.selectable = obj.selectable === false ? false : false
                    obj.hoverCursor = 'default'
                })
            },
            mouseDown(event) {
                const activeObject = canvas.getActiveObject()
                const pointer = canvas.getPointer(event.e)

                if (activeObject) {
                    const boundingRect = activeObject.getBoundingRect()
                    const expandedRect = {
                        left: boundingRect.left - toleranceMargin,
                        top: boundingRect.top - toleranceMargin,
                        right: boundingRect.left + boundingRect.width + toleranceMargin,
                        bottom: boundingRect.top + boundingRect.height + toleranceMargin,
                    }

                    if (pointer.x >= expandedRect.left && pointer.x <= expandedRect.right && pointer.y >= expandedRect.top && pointer.y <= expandedRect.bottom) {
                        return
                    }
                }

                const creationPointer = canvas.getPointer(event.e)
                setStartPoint({ x: creationPointer.x, y: creationPointer.y })

                const circle = new fabric.Ellipse({
                    left: creationPointer.x,
                    top: creationPointer.y,
                    originX: 'center',
                    originY: 'center',
                    rx: 1,
                    ry: 1,
                    stroke: 'black',
                    strokeWidth: borderThickness,
                    fill: isFilled ? 'black' : 'transparent',
                    selectable: false,
                    hoverCursor: 'crosshair'
                })

                setTempObject(circle)
                canvas.add(circle)
                setIsDrawing(true)
            },
            mouseMove(event) {
                if (!isDrawing || activeTool !== 'circle' || !tempObject) return

                const pointer = canvas.getPointer(event.e)
                const startX = startPoint.x
                const startY = startPoint.y

                const rx = Math.abs(pointer.x - startX) / 2
                const ry = Math.abs(pointer.y - startY) / 2

                const centerX = (startX + pointer.x) / 2
                const centerY = (startY + pointer.y) / 2

                tempObject.set({
                    rx: rx,
                    ry: ry,
                    left: centerX,
                    top: centerY,
                })
                canvas.renderAll()
            },
            mouseUp() {
                setIsDrawing(false)
                setStartPoint(null)
                if (tempObject) {
                    tempObject.set('selectable', true)
                    tempObject.hoverCursor = 'move'
                    canvas.setActiveObject(tempObject)
                    setTempObject(null)
                }
            },
        },
        triangle: {
            activate() {
                canvas.selection = false
                canvas.defaultCursor = 'crosshair'
                canvas.forEachObject(obj => {
                    obj.selectable = false
                    obj.hoverCursor = 'crosshair'
                })
            },
            deactivate() {
                canvas.defaultCursor = 'default'
                canvas.selection = true
                canvas.forEachObject(obj => {
                    obj.selectable = obj.selectable === false ? false : false
                    obj.hoverCursor = 'default'
                })
            },
            mouseDown(event) {
                const activeObject = canvas.getActiveObject()
                const pointer = canvas.getPointer(event.e)

                if (activeObject) {
                    const boundingRect = activeObject.getBoundingRect()
                    const expandedRect = {
                        left: boundingRect.left - toleranceMargin,
                        top: boundingRect.top - toleranceMargin,
                        right: boundingRect.left + boundingRect.width + toleranceMargin,
                        bottom: boundingRect.top + boundingRect.height + toleranceMargin,
                    }

                    if (pointer.x >= expandedRect.left && pointer.x <= expandedRect.right && pointer.y >= expandedRect.top && pointer.y <= expandedRect.bottom) {
                        return
                    }
                }

                const creationPointer = canvas.getPointer(event.e)
                setStartPoint({ x: creationPointer.x, y: creationPointer.y })
                const triangle = new fabric.Triangle({
                    left: creationPointer.x,
                    top: creationPointer.y,
                    width: 0,
                    height: 0,
                    fill: isFilled ? 'black' : 'transparent',
                    stroke: 'black',
                    strokeWidth: borderThickness,
                    originX: 'left',
                    originY: 'top',
                    selectable: false,
                    hoverCursor: 'crosshair'
                })
                setTempObject(triangle)
                canvas.add(triangle)
                setIsDrawing(true)
            },
            mouseMove(event) {
                if (!isDrawing || activeTool !== 'triangle') return
                const pointer = canvas.getPointer(event.e)
                const width = Math.abs(pointer.x - startPoint.x)
                const height = Math.abs(pointer.y - startPoint.y)
                const left = Math.min(pointer.x, startPoint.x)
                const top = Math.min(pointer.y, startPoint.y)

                tempObject.set({
                    width: width,
                    height: height,
                    left: left,
                    top: top,
                })
                canvas.renderAll()
            },
            mouseUp() {
                setIsDrawing(false)
                setStartPoint(null)
                if (tempObject) {
                    tempObject.set('selectable', true)
                    tempObject.hoverCursor = 'move'
                    canvas.setActiveObject(tempObject)
                    setTempObject(null)
                }
            },
        },
        line: {
            activate() {
                canvas.selection = false
                canvas.defaultCursor = 'crosshair'
                canvas.forEachObject(obj => {
                    obj.selectable = false
                    obj.hoverCursor = 'crosshair'
                })
            },
            deactivate() {
                canvas.defaultCursor = 'default'
                canvas.selection = true
                canvas.forEachObject(obj => {
                    obj.selectable = obj.selectable === false ? false : false
                    obj.hoverCursor = 'default'
                })
            },
            mouseDown(event) {
                const activeObject = canvas.getActiveObject()
                const pointer = canvas.getPointer(event.e)

                 if (activeObject) {
                    const boundingRect = activeObject.getBoundingRect()
                    const expandedRect = {
                        left: boundingRect.left - toleranceMargin,
                        top: boundingRect.top - toleranceMargin,
                        right: boundingRect.left + boundingRect.width + toleranceMargin,
                        bottom: boundingRect.top + boundingRect.height + toleranceMargin,
                    }

                    if (pointer.x >= expandedRect.left && pointer.x <= expandedRect.right && pointer.y >= expandedRect.top && pointer.y <= expandedRect.bottom) {
                        return
                    }
                }

                const creationPointer = canvas.getPointer(event.e)
                setStartPoint({ x: creationPointer.x, y: creationPointer.y })

                const line = new fabric.Line([creationPointer.x, creationPointer.y, creationPointer.x, creationPointer.y], {
                    stroke: 'black',
                    strokeWidth: borderThickness,
                    selectable: false,
                    hoverCursor: 'crosshair'
                })

                setTempObject(line)
                canvas.add(line)
                setIsDrawing(true)
            },
            mouseMove(event) {
                if (!isDrawing || activeTool !== 'line' || !tempObject) return

                const pointer = canvas.getPointer(event.e)

                tempObject.set({
                    x2: pointer.x,
                    y2: pointer.y
                })

                canvas.renderAll()
            },
            mouseUp() {
                setIsDrawing(false)
                setStartPoint(null)
                if (tempObject) {
                    tempObject.set('selectable', true)
                    tempObject.hoverCursor = 'move'
                    canvas.setActiveObject(tempObject)
                    setTempObject(null)
                }
            },
        },
        text: {
            activate() {
                canvas.selection = false
                canvas.defaultCursor = 'text'
                canvas.forEachObject(obj => {
                    obj.selectable = false
                    obj.hoverCursor = 'default'
                })
            },
            deactivate() {
                if (currentIText) {
                    currentIText.exitEditing()
                    currentIText.selectable = false
                    currentIText.hoverCursor = 'default'
                    setCurrentIText(null)
                }
                setIsTextEditing(false)
                canvas.defaultCursor = 'default'
                canvas.selection = true
                canvas.forEachObject(obj => {
                    obj.selectable = obj.selectable === false ? false : false
                    obj.hoverCursor = 'default'
                })

            },
            mouseDown(event) {
                const activeObject = canvas.getActiveObject()
                const pointer = canvas.getPointer(event.e)

                if (activeObject) {
                    const boundingRect = activeObject.getBoundingRect()
                    const expandedRect = {
                        left: boundingRect.left - toleranceMargin,
                        top: boundingRect.top - toleranceMargin,
                        right: boundingRect.left + boundingRect.width + toleranceMargin,
                        bottom: boundingRect.top + boundingRect.height + toleranceMargin,
                    }

                    if (pointer.x >= expandedRect.left && pointer.x <= expandedRect.right && pointer.y >= expandedRect.top && pointer.y <= expandedRect.bottom) {
                        return
                    }
                }


                if (isTextEditing) return

                const creationPointer = canvas.getPointer(event.e)

                const iText = new fabric.IText('Clique para editar', {
                    left: creationPointer.x,
                    top: creationPointer.y,
                    fontSize: 20,
                    fill: 'black',
                    fontFamily: fontFamily, // Aplica a fontFamily selecionada
                    selectable: true,
                    editable: true,
                    hasControls: true,
                    hasBorders: true,
                    hoverCursor: 'move',
                })

                setCurrentIText(iText)
                canvas.add(iText)
                canvas.setActiveObject(iText)
                iText.enterEditing()
                setIsTextEditing(true)
            },
            mouseUp() {
                if (currentIText) {
                    currentIText.selectable = true
                    currentIText.hoverCursor = 'move'
                }
            }

        },
        svg: {
            activate() {
                canvas.selection = false
                canvas.defaultCursor = 'pointer'
                canvas.forEachObject(obj => {
                    obj.selectable = false
                    obj.hoverCursor = 'pointer'
                })
                const input = document.createElement('input')
                input.type = 'file'
                input.accept = '.svg, .png, .jpeg, .jpg'
                input.style.display = 'none'

                input.onchange = (e) => {
                    const file = e.target.files[0]
                    if (file) {
                        const reader = new FileReader()
                        reader.onload = (event) => {
                            if (file.type === 'image/svg+xml') {
                                fabric.loadSVGFromString(event.target.result, (objects, options) => {
                                    const svgGroup = fabric.util.groupSVGElements(objects, options)
                                    canvas.add(svgGroup)
                                    svgGroup.scaleToWidth(100)
                                    canvas.centerObject(svgGroup)
                                    svgGroup.set('selectable', true)
                                    svgGroup.hoverCursor = 'move'
                                    canvas.setActiveObject(svgGroup)
                                    canvas.renderAll()
                                })
                            } else {
                                const img = new Image()
                                img.onload = () => {
                                    const fabricImg = new fabric.Image(img)
                                    canvas.add(fabricImg)
                                    fabricImg.scaleToWidth(100)
                                    canvas.centerObject(fabricImg)
                                    fabricImg.set('selectable', true)
                                    fabricImg.hoverCursor = 'move'
                                    canvas.setActiveObject(fabricImg)
                                    canvas.renderAll()
                                }
                                img.src = event.target.result
                            }
                        }
                        if (file.type === 'image/svg+xml') {
                            reader.readAsText(file)
                        } else {
                            reader.readAsDataURL(file)
                        }
                    }
                    input.value = ''
                }
                input.click()
            },
            deactivate() {
                canvas.defaultCursor = 'default'
                canvas.selection = true
                canvas.forEachObject(obj => {
                    obj.selectable = obj.selectable === false ? false : false
                    obj.hoverCursor = 'default'
                })
            },
        },
    }

    function activateTool(toolName) {
        if (activeTool) {
            toolActions[activeTool]?.deactivate?.()
        }
        setActiveTool(toolName)
        toolActions[toolName]?.activate?.()

    }

    function handleMouseDown(event) {

        if (activeTool === 'text' && isTextEditing && currentIText) {
            const pointer = canvas.getPointer(event.e)
            const clickedInside = currentIText.containsPoint(pointer)
            if (!clickedInside) {
                toolActions['text'].deactivate()
                return
            }
        }

        toolActions[activeTool]?.mouseDown?.(event)
    }


    function handleMouseMove(event) {
        toolActions[activeTool]?.mouseMove?.(event)
    }

    function handleMouseUp(event) {
        toolActions[activeTool]?.mouseUp?.(event)
        if (activeTool === 'text' && currentIText) {
            canvas.setActiveObject(currentIText)
            currentIText.enterEditing()
        }
    }

    function downloadSVG() {
        const svg = canvas.toSVG({
            width: 150,
            height: 150,
            viewBox: {
                x: 0,
                y: 0,
                width: canvas.width,
                height: canvas.height
            }
        })

        const blob = new Blob([svg], { type: 'image/svg+xml' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'drawing.svg'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    function clearAllCanvas(){
        canvas.clear()
    }


    useEffect(() => {
        if (!canvas) return

        canvas.on('mouse:down', handleMouseDown)
        canvas.on('mouse:move', handleMouseMove)
        canvas.on('mouse:up', handleMouseUp)

        return () => {
            canvas.off('mouse:down', handleMouseDown)
            canvas.off('mouse:move', handleMouseMove)
            canvas.off('mouse:up', handleMouseUp)
        }
    }, [canvas, activeTool, isDrawing, startPoint, tempObject, currentIText, isTextEditing, isFilled, borderThickness, fontFamily]) // Adicione fontFamily como dependência

    useEffect(() => {
        if (!canvas) return

        const handleSelectionCleared = (e) => {
            if (!e.deselected || e.deselected.length === 0) return

            e.deselected.forEach(obj => {
                if (obj.type === 'i-text') {
                    obj.exitEditing()
                }
                obj.selectable = false
                obj.hoverCursor = 'default'
                canvas.renderAll()

            })
        }

        canvas.on('selection:cleared', handleSelectionCleared)

        return () => {
            canvas.off('selection:cleared', handleSelectionCleared)
        }
    }, [canvas])


    return (
        <Container>
            <Header />
            <Content>
                <ToolsBar>
                    <div>
                        <button onClick={downloadSVG}>
                            <IoMdDownload />
                            <span>Baixar</span>
                        </button>
                        <button onClick={clearAllCanvas}>
                            <AiOutlineClear />
                            <span>
                                Limpar a tela
                            </span>
                        </button>
                    </div>

                    <div>
                        <button data-active={activeTool == 'pencil'} onClick={() => activateTool('pencil')}>
                            <FaPencilAlt />
                            <span>Pincel</span>
                        </button>
                        <button data-active={activeTool == 'eraser'} onClick={() => activateTool('eraser')}>
                            <FaEraser />
                            <span>Borracha</span>
                        </button>
                        <button data-active={activeTool == 'text'} onClick={() => activateTool('text')}>
                            <IoTextSharp />
                            <span>Texto</span>
                        </button>
                        <button onClick={() => activateTool('svg')}>
                            <FaImage />
                            <span>Imagem</span>
                        </button>
                    </div>

                    <div>
                        <button data-active={activeTool == 'square'} onClick={() => activateTool('square')}>
                            <FaSquare />
                            <span>Quadrado</span>
                        </button>
                        <button data-active={activeTool == 'circle'} onClick={() => activateTool('circle')}>
                            <FaCircle />
                            <span>Círculo</span>
                        </button>
                        <button data-active={activeTool == 'triangle'} onClick={() => activateTool('triangle')}>
                            <IoTriangle />
                            <span>Triângulo</span>
                        </button>
                        <button data-active={activeTool == 'line'} onClick={() => activateTool('line')}>
                            <LuSpline />
                            <span>Linha</span>
                        </button>
                    </div>
                </ToolsBar>

                <ToolConfig>
                    <header>
                        <IoMdSettings />
                        <span>Configurações</span>
                    </header>
                    <div id="settings">
                        <section>
                            <div>
                                <label htmlFor="eraser-width">Largura do Pincel:</label>
                                <input type="number" id="eraser-width" value={pencilWidth} onChange={(e) => setPencilWidth(Number(e.target.value))} min="1" max="100"/>
                            </div>
                            <div>
                                <label htmlFor="brush-type">Tipo de Pincel:</label>
                                <select id="brush-type" value={brushType} onChange={(e) => setBrushType(e.target.value)}>
                                    <option value="PencilBrush">Pincel</option>
                                    <option value="CircleBrush">Círculo</option>
                                    <option value="SprayBrush">Spray</option>
                                </select>
                            </div>
                            
                        </section>

                        <section>
                            <div>
                                <label htmlFor="eraser-width">Largura da Borracha:</label>
                                <input type="number" id="eraser-width" value={eraserWidth} onChange={(e) => setEraserWidth(Number(e.target.value))} min="1" max="100"/>
                            </div>
                            
                        </section>

                        <section>
                            <div>
                                <label htmlFor="border-thickness">Espessura da Borda:</label>
                                <input
                                    type="number"
                                    id="border-thickness"
                                    value={borderThickness}
                                    onChange={(e) => setBorderThickness(Number(e.target.value))}
                                    min="1"
                                    max="20"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="is-filled">Preenchido:</label>
                                <input
                                    type="checkbox"
                                    id="is-filled"
                                    checked={isFilled}
                                    onChange={(e) => setIsFilled(e.target.checked)}
                                />
                            </div>
                            
                        </section>

                        <section>
                            <div>
                                <label htmlFor="font-family">Fonte:</label>
                                <select id="font-family" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                                    {fontFamilies.map((font) => (
                                        <option key={font} value={font}>{font}</option>
                                    ))}
                                </select>
                            </div>
                            
                        </section>
                    </div>
                </ToolConfig>

                <canvas ref={canvasRef} id="fabric-canvas" />
            </Content>
        </Container>
    )
}