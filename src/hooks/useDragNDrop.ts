import { useRef, MutableRefObject, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IState } from '@/types'
import useCreateCanvas from './useCreateCanvas'
import { setCircle, setLine, setRectangle, setText, setTriangle } from '@/templates'

interface Coords {
  x: number,
  y: number
}

interface Params {
  setCurrentObject(value: any): void,
  currentObject: any,
  containerRef: MutableRefObject<HTMLDivElement | null>
}

const useDragNDrop = ({ 
  setCurrentObject, currentObject, containerRef 
}: Params) => {
  const startPosition = useRef<Coords | null>(null)
  const endPosition = useRef<Coords | null>(null)
  const clicked = useRef(false)
  
  const canvasObjects = useSelector((state: IState) => state.canvasObjects)
  const currentTool = useSelector((state: IState) => state.currentTool)
  const currentLayer = useSelector((state: IState) => state.currentLayer)
  const containerSize = useSelector((state: IState) => state.containerSize)
  const dispatch = useDispatch()

  const createCanvas = useCreateCanvas()

  // utilities

  const draw = (s: Coords, e: Coords) => {
    const start = startPosition.current ?? s
    const end = endPosition.current ?? e

    const topObject = canvasObjects.find(item => item.z === canvasObjects.length)
    const objectSetters = {
      'circle': setCircle,
      'rectangle': setRectangle,
      'line': setLine,
      'triangle': setTriangle,
    }
    for (let [key, setter] of Object.entries(objectSetters)) {
      if (currentTool === key) {
        setCurrentObject(setter({
          startPosition: start,
          endPosition: end,
          params: {
            canvas: currentObject?.canvas 
              ? currentObject.canvas
              : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          }
        }))
      }
    }
  }

  type Callback = (...args: any) => void
  const setCoords = (event: MouseEvent, func?: Callback, callback?: Callback) => {
    const coords = {
      x: event.clientX - 85,
      y: event.clientY - 50,
    }

    if (func) func(coords)
    if (callback) callback(coords)
    return coords
  }

  // functions

  const setStart = (event: MouseEvent) => {
    if (currentTool === 'move') {
      if (currentLayer === 0) return
      setCoords(event, value => startPosition.current = value, () => {
        endPosition.current = null
        clicked.current = true
      })
      return
    }

    const start = setCoords(event, value => startPosition.current = value, (coords) => {
      if (currentTool === 'text') {
        const topObject = canvasObjects.find(item => item.z === canvasObjects.length)
        dispatch({
          type: 'add canvas object',
          value: setText({
            coords, 
            size: {
              width: containerSize.width,
              height: containerSize.height
            }, 
            params: {
              canvas: createCanvas(containerRef),
              id: Date.now(),
              z: topObject.z + 1
            }})
        })
      }
      endPosition.current = null
      clicked.current = currentTool !== 'text'
    })

    const end = setCoords(event, value => endPosition.current = value)

    draw(start, end)
  }

  const setEnd = (event: MouseEvent) => {
    if (!startPosition.current) return
    if (currentTool === 'move') {
      setCoords(event, value => endPosition.current = value, coords => {
        if (currentLayer === 0) return
        const layer = canvasObjects.find(item => item.id === currentLayer)
        if (!startPosition.current) return
        const delta = {
          x: coords.x - startPosition.current?.x,
          y: coords.y - startPosition.current.y
        }
        layer.canvas.style = ''
        dispatch({
          type: 'move object',
          value: delta
        })
        clicked.current = false
        setCurrentObject(null)
        startPosition.current = null
        endPosition.current = null
      })
      return
    }

    setCoords(event, value => endPosition.current = value, coords => {
      if (!currentObject) return
      clicked.current = false
      console.log('add in useDragNDrop: ', currentObject)
      dispatch({
        type: 'add canvas object',
        value: currentObject
      })
      setCurrentObject(null)
      startPosition.current = null
      endPosition.current = null
    })
  }

  const onMove = (event: MouseEvent) => {
    if (!clicked.current) return
    if (currentTool === 'move') {
      setCoords(event, value => endPosition.current = value, coords => {
        if (currentLayer === 0) return
        const layer = canvasObjects.find(item => item.id === currentLayer)
        if (!startPosition.current) return
        const delta = {
          x: coords.x - startPosition.current.x,
          y: coords.y - startPosition.current.y
        }
        layer.canvas.style.top = `${delta.y}px`
        layer.canvas.style.left = `${delta.x}px`
      })
    }

    setCoords(event, value => endPosition.current = value, draw)
  }
  
  return { setStart, setEnd, onMove }
}

export default useDragNDrop