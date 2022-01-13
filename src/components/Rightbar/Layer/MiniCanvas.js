import React, { useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import render from '../../../templates/render'

const MiniCanvas = ({ width, height, object }) => {
  const ref = useRef(null)
  const containerSize = useSelector(state => state.containerSize)

  useEffect(() => {
    // новый объект с сылкой на мини-канвас
    const list = {
      ...object,
      canvas: ref.current
    }
    // рендерит мини-канвас, при этом делая заливку фона
    render(list, {width, height}, containerSize, () => {
      const ctx = list.canvas.getContext('2d')
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, width, height)
    })  
  }, [ref.current, object])

  return (
    <canvas
      width={width}
      height={height}
      data-id={object.id}
      ref={ref}/>
  )
}

export default MiniCanvas