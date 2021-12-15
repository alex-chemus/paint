import React, { useRef, useEffect, useState } from 'react'
import classes from './Canvas.module.scss'
import EasyC from '../../EasyC'
import { useSelector, useDispatch } from 'react-redux'
// templates
import setCircle from '../../templates/circle'
import setRectangle from '../../templates/rectangle'
import setLine from '../../templates/line'
import setTriangle from '../../templates/triangle'

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
    const canvas = new EasyC(canvasRef.current, canvasObjects)
    canvas.draw()
  }, [canvasObjects])

  useEffect(() => {
    setCanvasWidth(canvasRef.current.width)
    setCanvasHeight(canvasRef.current.height)
    //console.log(canvasRef.current.width)
  }, [canvasRef])


  // methods
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

    const canvas = new EasyC(canvasRef.current, [...canvasObjects, currentObject])
    canvas.draw()
  }

  const setCoords = (event, func, callback=()=>{}) => {
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
    setCoords(event, setStartPosition, (coords) => {
      setEndPosition(null)
      setClicked(true)
    })
  }

  const setEnd = event => {
    setCoords(event, setEndPosition, (coords) => {
      //if (startPosition) console.log('end: ', coords.x-startPosition.x, coords.y-startPosition.y)
      //console.log(coords)
      setClicked(false)
      ///console.log(currentObject)
      dispatch({
        type: 'add canvas object',
        value: currentObject
      })
      setCurrentObject(null)
    })
  }
  //document.addEventListener('mouseup', setEnd)

  const onMove = event => {
    if (!clicked) return
    setCoords(event, setEndPosition, draw)
  } 


  // move, resize, rotate current layer
  const move = () => {
    //console.log('move')
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