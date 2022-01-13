import { setAbsCoords, setShadow, setStroke } from './utilityFunctions.js'

const drawCircle = (ctx, object, size, containerSize) => {
  /* recalculate: start, end, stroke.width, shadow.x, shadow.y, shadow.blur */
  const [start, end] = setAbsCoords(object, size, containerSize)
  const stroke = setStroke(object, size, containerSize)
  const shadow = setShadow(object, size, containerSize)

  ctx.save()
  /*const translate = {
    x: Math.min(start.x, end.x) + Math.abs(start.x - end.x) / 2,
    y: Math.min(start.y, end.y) + Math.abs(start.y - end.y) / 2
  }*/
  //ctx.translate(translate.x, translate.y)
  ctx.translate(start.x, start.y)

  if (object.opacity) ctx.globalAlpha = 1 - object.opacity/100
  if (shadow) {
    ctx.shadowOffsetX = shadow.x
    ctx.shadowOffsetY = shadow.y
    ctx.shadowBlur = shadow.blur
    ctx.shadowColor = shadow.color
  }

  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  ctx.beginPath()
  ctx.arc(
    //translate.x-start.x, translate.y-start.y, 
    //start.x, start.y,
    0, 0, 
    Math.sqrt(
      (end.x - start.x)**2 + (end.y - start.y)**2
    ),
    0, Math.PI*2
  )
  ctx.fill()
  ctx.closePath()

  if (shadow) {
    ctx.shadowOffsetX = null
    ctx.shadowOffsetY = null
    ctx.shadowBlur = null
    ctx.shadowColor = null
  }

  if (stroke) {
    ctx.strokeStyle = stroke.color
    ctx.lineWidth = stroke.width
    ctx.beginPath()
    ctx.arc(
      0, 0,
      Math.sqrt(
        (end.x - start.x)**2 + (end.y - start.y)**2
      ),
      0, Math.PI*2
    )
    //ctx.stroke()
    if (stroke.width > 0) ctx.stroke()
    ctx.closePath()
  }

  //ctx.translate(-translate.x, -translate.y)
  ctx.translate(-start.x, -start.y)
  ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

export default drawCircle