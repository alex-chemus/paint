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
    if (!containerRef.current) return
    canvasObjects.forEach(item => {
      render(item, {
        width: containerWidth,
        height: containerHeight
      }, containerRef)
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
  }, [currentTool, containerRef])

  useEffect(() => {
    if (!currentObject || !containerRef) return
    const objects = [...canvasObjects, currentObject]
    objects.forEach(item => {
      render(item, {
        width: containerWidth,
        height: containerHeight
      }, containerRef)
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
  const draw = () => {
    if (!endPosition || !startPosition) return
    switch (currentTool) {
      case 'circle':
        setCurrentObject(setCircle({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : null
          }
        }))
        break
      
      case 'rectangle':
        setCurrentObject(setRectangle({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : null
          }
        }))
        console.log(currentObject)
        break

      case 'line':
        setCurrentObject(setLine({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : null
          },
        }))
        break

      case 'triangle':
        setCurrentObject(setTriangle({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : null
          },
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
      x: coordX / containerWidth,
      y: coordY / containerHeight
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


  const cls = [classes.CanvasContainer]
  cls.push(currentTool==='move' ? classes['cursor-grab'] : classes['cursor-crosshair'])

  return (
    <div 
      className={cls.join(' ')} 
      ref={containerRef}
      //onClick={currentTool==='move' ? move : draw}
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