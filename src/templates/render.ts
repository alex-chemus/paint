import drawRectangle from './rectangle/drawRectangle'
import drawLine from './line/drawLine'
import drawCircle from './circle/drawCircle'
import drawTriangle from './triangle/drawTriangle'
import drawImage from './image/drawImage'
import drawText from './text/drawText'

interface Size {
  width: number,
  height: number
}

const render = (
  object: any, size: Size, containerSize: Size, beforeDraw=()=>{}, shouldClear=true
) => {
  object.canvas.dataset.z = object.z
  // CanvasRenderingContext2D
  const ctx = object.canvas.getContext('2d')
  if (shouldClear) ctx.clearRect(0, 0, size.width, size.height)
  beforeDraw()
  
  switch (object?.type) {
    case 'rectangle':
      drawRectangle({ ctx, object, size, containerSize })
      break
    case 'line':
      drawLine({ ctx, object, size, containerSize })
      break
    case 'circle':
      drawCircle({ ctx, object, size, containerSize })
      break
    case 'triangle':
      drawTriangle({ ctx, object, size, containerSize })
      break
    case 'image':
      drawImage({ ctx, object, size, containerSize })
      break
    case 'text':
      drawText({ ctx, object, size, containerSize })
      break
    default:
      break
  }
}

export default render