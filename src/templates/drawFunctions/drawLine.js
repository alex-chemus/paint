import { setAbsCoords } from "./utilityFunctions.js"

const drawLine = (ctx, object, size) => {
  const [start, end] = setAbsCoords(object, size)
  
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
  ctx.strokeStyle = object.stroke.color
  ctx.lineWidth = object.stroke.width
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