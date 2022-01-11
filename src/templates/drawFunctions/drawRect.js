import { setAbsCoords } from './setCoords.js'

const drawRect = (ctx, object, size) => {
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

  if (object.shadow) {
    ctx.shadowOffsetX = object.shadow.x
    ctx.shadowOffsetY = object.shadow.y
    ctx.shadowBlur = object.shadow.blur
    ctx.shadowColor = object.shadow.color
  }

  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  ctx.fillRect(
    -Math.abs(start.x - end.x) / 2,
    -Math.abs(start.y - end.y) / 2,
    Math.abs(end.x - start.x),
    Math.abs(end.y - start.y)
  )
  
  if (object.shadow) {
    ctx.shadowOffsetX = null
    ctx.shadowOffsetY = null
    ctx.shadowBlur = null
    ctx.shadowColor = null
  }

  if (object.stroke) {
    ctx.strokeStyle = object.stroke.color
    ctx.lineWidth = object.stroke.width
    ctx.lineJoin = 'round'
    if (object.stroke.width>0) ctx.strokeRect(
      -Math.abs(start.x - end.x) / 2,
      -Math.abs(start.y - end.y) / 2,
      Math.abs(end.x - start.x),
      Math.abs(end.y - start.y)
    )
  }

  ctx.translate(-translate.x, -translate.y)
  ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

export default drawRect