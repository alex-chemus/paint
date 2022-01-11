import { setAbsXY } from "./setCoords.js"

const drawText = (ctx, object, size) => {
  const [x, y] = setAbsXY(object, size)

  ctx.save()
  ctx.translate(x, y)

  if (object.rotate) {
    ctx.rotate(object.rotate)
  }
  if (object.opacity) ctx.globalAlpha = 1 - object.opacity/100

  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  ctx.textAlign = 'center'

  const fontSize = object.font.size * size.height
  ctx.font = `${object.font.style} ${object.font.weight} ${fontSize}px/${object.font.height}em ${object.font.family}`
  //if (object.rotate) ctx.fillText(object.value, 0, 0)
  //else ctx.fillText(object.value, x, y)
  ctx.fillText(object.value, 0, 0)

  if (object.stroke.width>0) {
    ctx.strokeStyle = object.stroke.color
    ctx.lineWidth = object.stroke.width
    ctx.lineJoin = 'round'
    ctx.strokeText(object.value, 0, 0)
  }
  ctx.translate(-x, -y)
  ctx.restore()
  //if (object.rotate) ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

export default drawText