import { setAbsXY, setFont, setStroke } from "./utilityFunctions.js"

const drawText = (ctx, object, size, containerSize) => {
  /* recalculate: x, y, stroke.width, font.size */
  const [x, y] = setAbsXY(object, size, containerSize)
  const stroke = setStroke(object, size, containerSize)
  const font = setFont(object, size, containerSize)

  ctx.save()
  ctx.translate(x, y)

  if (object.rotate) {
    ctx.rotate(object.rotate)
  }
  if (object.opacity) ctx.globalAlpha = 1 - object.opacity/100

  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  ctx.textAlign = 'center'

  //const fontSize = object.font.size * size.height
  //ctx.font = `${object.font.style} ${object.font.weight} ${fontSize}px/${object.font.height}em ${object.font.family}`
  ctx.font = `${font.style} ${font.weight} ${font.size}px/${font.height}em ${font.family}`
  //if (object.rotate) ctx.fillText(object.value, 0, 0)
  //else ctx.fillText(object.value, x, y)
  ctx.fillText(object.value, 0, 0)

  if (stroke.width>0) {
    ctx.strokeStyle = stroke.color
    ctx.lineWidth = stroke.width
    ctx.lineJoin = 'round'
    ctx.strokeText(object.value, 0, 0)
  }
  ctx.translate(-x, -y)
  ctx.restore()
  //if (object.rotate) ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

export default drawText