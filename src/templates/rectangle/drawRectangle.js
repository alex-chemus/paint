import { setAbsCoords, setStroke, setShadow } from '../utilities'

const drawRect = (ctx, object, size, containerSize) => {
  /*
    recalculate: start, end, stroke.width, shadow.x, shadow.y, shadow.blur
  */
  const [start, end] = setAbsCoords(object, size, containerSize)
  const stroke = setStroke(object, size, containerSize)
  const shadow = setShadow(object, size, containerSize)

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

  if (shadow) {
    ctx.shadowOffsetX = shadow.x
    ctx.shadowOffsetY = shadow.y
    ctx.shadowBlur = shadow.blur
    ctx.shadowColor = shadow.color
  }

  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  ctx.fillRect(
    -Math.abs(start.x - end.x) / 2,
    -Math.abs(start.y - end.y) / 2,
    Math.abs(end.x - start.x),
    Math.abs(end.y - start.y)
  )
  
  if (shadow) {
    ctx.shadowOffsetX = null
    ctx.shadowOffsetY = null
    ctx.shadowBlur = null
    ctx.shadowColor = null
  }

  if (stroke) {
    ctx.strokeStyle = stroke.color
    ctx.lineWidth = stroke.width
    ctx.lineJoin = 'round'
    if (stroke.width>0) ctx.strokeRect(
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