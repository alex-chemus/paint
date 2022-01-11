import { setAbsCoords } from './setCoords.js'

const drawCircle = (ctx, object, size) => {
  const [start, end] = setAbsCoords(object, size)

  ctx.save()
  /*const translate = {
    x: Math.min(start.x, end.x) + Math.abs(start.x - end.x) / 2,
    y: Math.min(start.y, end.y) + Math.abs(start.y - end.y) / 2
  }*/
  //ctx.translate(translate.x, translate.y)
  ctx.translate(start.x, start.y)

  if (object.opacity) ctx.globalAlpha = 1 - object.opacity/100
  if (object.shadow) {
    ctx.shadowOffsetX = object.shadow.x
    ctx.shadowOffsetY = object.shadow.y
    ctx.shadowBlur = object.shadow.blur
    ctx.shadowColor = object.shadow.color
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

  if (object.shadow) {
    ctx.shadowOffsetX = null
    ctx.shadowOffsetY = null
    ctx.shadowBlur = null
    ctx.shadowColor = null
  }

  if (object.stroke) {
    ctx.strokeStyle = object.stroke.color
    ctx.lineWidth = object.stroke.width
    ctx.beginPath()
    ctx.arc(
      0, 0,
      Math.sqrt(
        (end.x - start.x)**2 + (end.y - start.y)**2
      ),
      0, Math.PI*2
    )
    //ctx.stroke()
    if (object.stroke.width > 0) ctx.stroke()
    ctx.closePath()
  }

  //ctx.translate(-translate.x, -translate.y)
  ctx.translate(-start.x, -start.y)
  ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

export default drawCircle