import React, { useRef, useEffect, useState } from 'react'
import classes from './Canvas.module.scss'
//import EasyC from '../../EasyC'
import render from '../../templates/render'
import { useSelector, useDispatch } from 'react-redux'
// templates
import setCircle from '../../templates/circle'
import setRectangle from '../../templates/rectangle'
import setLine from '../../templates/line'
import setTriangle from '../../templates/triangle'
import setHanlders from '../../templates/image'

const Canvas = () => {
  // state
  const [startPosition, setStartPosition] = useState(null)
  const [endPosition, setEndPosition] = useState(null)
  const [canvasWidth, setCanvasWidth] = useState(0)
  const [canvasHeight, setCanvasHeight] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [currentObject, setCurrentObject] = useState()


  // store
  const canvasObjects = useSelector(state => state.canvasObjects)
  const currentTool = useSelector(state => state.currentTool)
  const dispatch = useDispatch()


  // refs
  const canvasRef = useRef(null)


  //effects
  useEffect(() => {
    if (!canvasRef) return
    /*const canvas = new EasyC(canvasRef.current, canvasObjects)
    canvas.draw()*/
    render(canvasRef.current, canvasObjects)
  }, [canvasObjects])

  useEffect(() => {
    setCanvasWidth(canvasRef.current.width)
    setCanvasHeight(canvasRef.current.height)
  }, [canvasRef])

  useEffect(() => {
    setHanlders(canvasRef.current, currentTool, setCurrentObject)
    if (currentTool==='image') {
      //console.log(currentTool)
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
      //console.log('from currentTool effect: ', currentObject)
    } else {
      //console.log(currentTool)
      setCurrentObject({})
      //console.log('from currentTool effect: ', currentObject)
    }
  }, [currentTool, canvasRef])

  useEffect(() => {
    if (!currentObject) return
    /*const canvas = new EasyC(canvasRef.current, [...canvasObjects, currentObject])
    canvas.draw()*/
    //console.log('from current object')
    render(canvasRef.current, [...canvasObjects, currentObject])
  }, [currentObject])


  // methods
  //setHanlders(canvasRef.current, currentTool, setCurrentObject)

  /*
    draw:
    клик - задать изначальные координаты
    движение - изменить финальные координаты + ререндер
  */
  // draw a new object on top of the sheet
  const draw = () => {
    if (!endPosition || !startPosition) return
    switch (currentTool) {
      case 'circle':
        setCurrentObject(setCircle({
          startPosition,
          endPosition,
          params: {}
        }))
        break
      
      case 'rectangle':
        setCurrentObject(setRectangle({
          startPosition,
          endPosition,
          params: {}
        }))
        break

      case 'line':
        setCurrentObject(setLine({
          startPosition,
          endPosition,
          params: {},
          canvasHeight,
          canvasWidth
        }))
        break

      case 'triangle':
        setCurrentObject(setTriangle({
          startPosition,
          endPosition,
          params: {},
          canvasWidth,
          canvasHeight
        }))
        break

      default: 
        break
    }
  }

  const setCoords = (event, func=()=>{}, callback=()=>{}) => {
    // координаты в пикселях
    const coordX = event.clientX-85
    const coordY = event.clientY-50
    // координаты относительно холста
    const coords = {
      x: coordX / canvasWidth,
      y: coordY / canvasHeight
    }

    func(coords)
    callback(coords)
  }

  const setStart = event => {
    if (currentTool === 'move') return
    setCoords(event, setStartPosition, (coords) => {
      setEndPosition(null)
      setClicked(true)
    })
  }

  const setEnd = event => {
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

  const onMove = event => {
    if (!clicked) return
    setCoords(event, setEndPosition, draw)
  } 


  const cls = [classes.Canvas]
  cls.push(currentTool==='move' ? classes['cursor-grab'] : classes['cursor-crosshair'])

  return (
    <canvas 
      className={cls.join(' ')} 
      ref={canvasRef}
      //onClick={currentTool==='move' ? move : draw}
      onMouseDown={setStart}
      onMouseUp={setEnd}
      onMouseLeave={setEnd}
      onMouseMove={onMove}
      width={document.body.clientWidth - 266 - 85}
      height={document.body.clientHeight - 100}
    >
    </canvas>
  )
}

export default Canvas