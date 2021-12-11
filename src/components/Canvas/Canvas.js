import React, { useContext, useRef, useEffect } from 'react'
import classes from './Canvas.module.scss'
import Context from '../../context/context'
import EasyC from '../../EasyC'

const Canvas = () => {
  const { store } = useContext(Context)
  const canvas = useRef(null)

  useEffect(() => {
    if (!canvas) return
    console.log(canvas)
    const sheet = new EasyC(canvas.current, store.canvasObjects)
    sheet.draw()
  }, [store.canvasObjects])

  return (
    <canvas 
      className={classes.Canvas} 
      ref={canvas}
    >
    </canvas>
  )
}

export default Canvas