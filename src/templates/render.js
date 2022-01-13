import drawRect from './drawFunctions/drawRect.js'
import drawLine from './drawFunctions/drawLine.js'
import drawCircle from './drawFunctions/drawCircle.js'
import drawTriangle from './drawFunctions/drawTriangle.js'
import drawImage from './drawFunctions/drawImage.js'
import drawText from './drawFunctions/drawText.js'

const render = (object, size, containerSize, beforeDraw=()=>{}, shouldClear=true) => {
  object.canvas.dataset.z = object.z
  const ctx = object.canvas.getContext('2d')
  shouldClear && ctx.clearRect(0, 0, size.width, size.height)
  beforeDraw()
  
  switch (object?.type) {
    case 'rectangle':
      drawRect(ctx, object, size, containerSize)
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