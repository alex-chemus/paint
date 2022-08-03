import React, { useRef, useEffect, useState } from 'react'
import classes from './CanvasContainer.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { render } from '@/templates'
import { IState } from '@/types'
import { useRenderObjects, useImageHandlers, useDragNDrop } from '@/hooks'

const CanvasContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentObject, setCurrentObject] = useState<any>()

  const currentTool = useSelector((state: IState) => state.currentTool)
  const containerWidth = useSelector((state: IState) => state.containerSize.width)
  const containerHeight = useSelector((state: IState) => state.containerSize.height)
  const dispatch = useDispatch()

  useRenderObjects(containerRef)
  

  // render currentObject on change
  useEffect(() => {
    if (!currentObject || !containerRef) return
    const size = {
      width: containerWidth,
      height: containerHeight
    }
    render(currentObject, size, size)
  }, [currentObject])

  useImageHandlers({
    setCurrentObject, containerRef
  })


  useEffect(() => {
    if (!containerRef.current) return
    dispatch({
      type: 'set size',
      value: {
        width: document.body.clientWidth - 266 - 85,
        height: document.body.clientHeight - 100
      }
    })
  }, []) // containerRef.current

  const { setStart, setEnd, onMove } = useDragNDrop({
    setCurrentObject, currentObject, containerRef
  })

  const cls = [classes.CanvasContainer]
  cls.push(
    currentTool==='move' 
      ? classes['cursor-grab'] 
      : classes['cursor-crosshair']
  )

  return (
    <div 
      className={cls.join(' ')} 
      ref={containerRef}
      onMouseDown={e => setStart(e)}
      onMouseUp={e => setEnd(e)}
      onMouseLeave={e => setEnd(e)}
      onMouseMove={e => onMove(e)}
      style={{
        width: containerWidth,
        height: containerHeight
      }}
    ></div>
  )
}

export default CanvasContainer