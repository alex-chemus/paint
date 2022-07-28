import drawRectangle from './rectangle/drawRectangle.js'
import drawLine from './line/drawLine.js'
import drawCircle from './circle/drawCircle.js'
import drawTriangle from './triangle/drawTriangle.js'
import drawImage from './image/drawImage.js'
import drawText from './text/drawText.js'

interface Size {
  width: number,
  height: number
}

const render = (
  object: any, size: Size, containerSize: Size, beforeDraw=()=>{}, shouldClear=true
) => {
  object.canvas.dataset.z = object.z
  const ctx = object.canvas.getContext('2d')
  if (shouldClear) ctx.clearRect(0, 0, size.width, size.height)
  beforeDraw()
  
  switch (object?.type) {
    case 'rectangle':
      drawRectangle(ctx, object, size, containerSize)
      break
    case 'line':
      drawLine(ctx, object, size, containerSize)
      break
    case 'circle':
      drawCircle(ctx, object, size, containerSize)
      break
    case 'triangle':
      drawTriangle(ctx, object, size, containerSize)
      break
    case 'image':
      drawImage(ctx, object, size, containerSize)
      break
    case 'text':
      drawText(ctx, object, size, containerSize)
      break
    default:
      break
  }
}

export default render