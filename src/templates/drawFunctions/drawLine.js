import { setAbsCoords, setStroke } from "./utilityFunctions.js"

const drawLine = (ctx, object, size, containerSize) => {
  /* recalculate: start, end, stroke.width */
  const [start, end] = setAbsCoords(object, size, containerSize)
  const stroke = setStroke(object, size, containerSize)
  
  if (object.rotate) {
    ctx.save()
    const translate = {
      x: Math.min(start.x, end.x) + Math.abs(start.x - end.x) / 2,
      y: Math.min(start.y, end.y) + Math.abs(start.y - end.y) / 2
    }
    //console.log(translate)
    ctx.translate(translate.x, translate.y) // translate to the shape center
    ctx.rotate(object.rotate)
  }
  if (object.opacity) ctx.globalAlpha = 1 - object.opacity/100

  ctx.scale(object.scale.x, object.scale.y)
  ctx.strokeStyle = stroke.color
  ctx.lineWidth = Math.max(stroke.width, 0.5)
  ctx.lineJoin = 'round'
  ctx.beginPath()

  if (object.rotate) {
    const dx = Math.abs(start.x - end.x)
    const dy = Math.abs(start.y - end.y)
    ctx.moveTo(-dx/2, -dy/2)
    ctx.lineTo(dx/2, dy/2)
  } else {
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
  }

  ctx.stroke()

  if (object.rotate) ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

export default drawLine