import React, { useRef, useEffect, useState } from 'react'
import classes from './CanvasContainer.module.scss'
//import EasyC from '../../EasyC'
import render from '../../templates/render'
import { useSelector, useDispatch } from 'react-redux'
// templates
import setCircle from '../../templates/circle'
import setRectangle from '../../templates/rectangle'
import setLine from '../../templates/line'
import setTriangle from '../../templates/triangle'
import setHanlders from '../../templates/image'

const CanvasContainer = () => {
  // state
  const [startPosition, setStartPosition] = useState(null)
  const [endPosition, setEndPosition] = useState(null)
  const [containerWidth, setContainerWidth] = useState(document.body.clientWidth - 266 - 85)
  const [containerHeight, setContainerHeight] = useState(document.body.clientHeight - 100)
  const [clicked, setClicked] = useState(false)
  const [currentObject, setCurrentObject] = useState()


  // store
  const canvasObjects = useSelector(state => state.canvasObjects)
  const currentTool = useSelector(state => state.currentTool)
  const dispatch = useDispatch()


  // refs
  const containerRef = useRef(null)


  //effects
  useEffect(() => {
    if (!containerRef?.current) return
    //console.log('canvas objects changed')
    if (!canvasObjects[0]?.canvas) {
      //console.log('no init canvas')
      dispatch({
        type: 'add init canvas',
        value: createCanvas(containerRef)
      })
      //console.log('render canvas objects after mounting')
      canvasObjects.forEach(item => {
        render(item, {
          width: containerWidth,
          height: containerHeight
        })
      })
      return
    }
    //console.log('render canvas objects')
    canvasObjects.forEach(item => {
      render(item, {
        width: containerWidth,
        height: containerHeight
      })
    })
  }, [canvasObjects])

  useEffect(() => {
    const addImage = img => dispatch({ type: 'add canvas object', value: img })
    setHanlders(containerRef.current, currentTool, addImage)
    if (currentTool==='image') {
      setCurrentObject({
        type: 'text',
        value: 'Drag an Image Here',
        font: 'Arial',
        x: 0.5,
        y: 0.5,
        relative: {
          coord: {x: true, y: true}
        },
        size: '20',
        align: 'center',
        fill: '#ccc'
      })
    } else {
      setCurrentObject()
    }
  }, [currentTool])

  useEffect(() => {
    if (!currentObject || !containerRef) return
    /*const objects = [...canvasObjects, currentObject]
    objects.forEach(item => {
      render(item, {
        width: containerWidth,
        height: containerHeight
      })
    })*/
    //console.log('render current object')
    render(currentObject, {
      width: containerWidth,
      height: containerHeight
    })
  }, [currentObject])


  // methods
  //setHanlders(canvasRef.current, currentTool, setCurrentObject)

  /*
    draw:
    клик - задать изначальные координаты
    движение - изменить финальные координаты + ререндер
  */
  // draw a new object on top of the sheet
  //const createCanvas = (containerRef) => {
  function createCanvas(containerRef) {
    if (!containerRef?.current) return
    const canvas = document.createElement('canvas')
    canvas.width = containerWidth
    canvas.height = containerHeight
    containerRef.current.append(canvas)
    //console.log('from createCanvas: ', canvas)
    return canvas
  }

  function draw() {
    if (!endPosition || !startPosition) return
    switch (currentTool) {
      case 'circle':
        setCurrentObject(setCircle({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef)
          }
        }))
        break
      
      case 'rectangle':
        setCurrentObject(setRectangle({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef)
          }
        }))
        //console.log(currentObject)
        break

      case 'line':
        setCurrentObject(setLine({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef)
          },
        }))
        break

      case 'triangle':
        setCurrentObject(setTriangle({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef)
          },
        }))
        break

      default: 
        break
    }
  }

  function setCoords(event, func=()=>{}, callback=()=>{}) {
    // координаты в пикселях
    const coordX = event.clientX-85
    const coordY = event.clientY-50
    // координаты относительно холста
    const coords = {
      x: coordX / containerWidth,
      y: coordY / containerHeight
    }

    func(coords)
    callback(coords)
  }

  function setStart(event) {
    if (currentTool === 'move') return
    setCoords(event, setStartPosition, (coords) => {
      setEndPosition(null)
      setClicked(true)
    })
  }

  function setEnd(event) {
    if (currentTool === 'move' || !startPosition) return
    setCoords(event, setEndPosition, (coords) => {
      setClicked(false)
      dispatch({
        type: 'add canvas object',
        value: currentObject
      })
      setCurrentObject(null)
      setStartPosition(null)
      setEndPosition(null)
    })
  }
  //document.addEventListener('mouseup', setEnd)

  function onMove(event) {
    if (!clicked) return
    setCoords(event, setEndPosition, draw)
  } 


  const cls = [classes.CanvasContainer]
  cls.push(currentTool==='move' ? classes['cursor-grab'] : classes['cursor-crosshair'])

  return (
    <div 
      className={cls.join(' ')} 
      ref={containerRef}
      onMouseDown={setStart}
      onMouseUp={setEnd}
      onMouseLeave={setEnd}
      onMouseMove={onMove}
      width={containerWidth}
      height={containerHeight}
    ></div>
  )
}

export default CanvasContainer