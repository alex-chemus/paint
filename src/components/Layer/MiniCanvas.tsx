import React, { useRef, useEffect, FC } from 'react'
import { useSelector } from 'react-redux'
import render from '@/templates/render'
import { IState } from '@/types'

interface Props {
  width: number,
  height: number,
  object: any
}

const MiniCanvas: FC<Props> = ({ width, height, object }) => {
  const ref = useRef(null)
  const containerSize = useSelector((state: IState) => state.containerSize)

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
  }, [object])

  return (
    <canvas
      width={width}
      height={height}
      data-id={object.id}
      ref={ref}/>
  )
}

export default MiniCanvas