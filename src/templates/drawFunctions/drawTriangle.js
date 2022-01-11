import { setAbsCoords } from './utilityFunctions.js'

const drawTriangle = (ctx, object, size) => {
  const [start, end] = setAbsCoords(object, size)

  ctx.save()
  const translate = {
    x: Math.min(start.x, end.x) + Math.abs(start.x - end.x) / 2,
    y: Math.min(start.y, end.y) + Math.abs(start.y - end.y) / 2
  }
  ctx.translate(translate.x, translate.y) // translate to the shape center

  if (object.rotate) {
    ctx.rotate(object.rotate)
  }
  if (object.opacity) ctx.globalAlpha = 1 - object.opacity/100

  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  
  if (object.stroke) {
    ctx.strokeStyle = object.stroke.color
    ctx.lineWidth = object.stroke.width
  }
  ctx.lineJoin = 'round'

  ctx.beginPath()
  const dx = Math.abs(start.x-end.x)
  const dy = Math.abs(start.y - end.y)
  ctx.moveTo(0, -dy / 2)
  ctx.lineTo(dx / 2, dy / 2)
  ctx.lineTo(-dx / 2, dy / 2)
  ctx.lineTo(0, -Math.abs(start.y - end.y) / 2)
  ctx.closePath()

  if (object.shadow) {
    ctx.shadowOffsetX = object.shadow.x
    ctx.shadowOffsetY = object.shadow.y
    ctx.shadowBlur = object.shadow.blur
    ctx.shadowColor = object.shadow.color
  }
  ctx.fill()
  if (object.shadow) {
    ctx.shadowOffsetX = null
    ctx.shadowOffsetY = null
    ctx.shadowBlur = null
    ctx.shadowColor = null
  }
  if (object.stroke.width>0) ctx.stroke()

  //if (object.rotate) ctx.restore()
  ctx.translate(-translate.x, -translate.y)
  ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

export default drawTriangle