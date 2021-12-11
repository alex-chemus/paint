import React, { useRef, useEffect } from 'react'
import classes from './Canvas.module.scss'
import EasyC from '../../EasyC'
import { useSelector } from 'react-redux'

const Canvas = () => {
  const canvasObjects = useSelector(state => state.canvasObjects)
  const canvas = useRef(null)

  useEffect(() => {
    if (!canvas) return
    const sheet = new EasyC(canvas.current, canvasObjects)
    sheet.draw()
  }, [canvasObjects])

  return (
    <canvas 
      className={classes.Canvas} 
      ref={canvas}
    >
    </canvas>
  )
}

export default Canvas