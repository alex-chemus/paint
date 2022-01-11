import { setAbsXY } from './setCoords.js'

const drawImage = (ctx, object, size) => {
  const [x, y] = setAbsXY(object, size)
  const width = object.width * size.width
  const height = object.height * size.height

  ctx.save()
  ctx.translate(x, y) // translate to the shape center

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

  const img = new Image()
  img.src = object.src
  //if (object.rotate) {
    //img.onload = () => ctx.drawImage(img, 0, 0, width, height)
  //  img.onload = () => ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height)
  //} else {
    //img.onload = () => ctx.drawImage(img, x, y, width, height)
  //  img.onload = () => ctx.drawImage(img, 0, 0, width, height, x, y, width, height)
  //}
  img.onload = () => ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height)

  if (object.shadow) {
    //ctx.fillStyle = 'transparent'
    ctx.fillRect(0, 0, width, height)
    ctx.shadowOffsetX = null
    ctx.shadowOffsetY = null
    ctx.shadowBlur = null
    ctx.shadowColor = null
  }

  if (object.stroke) {
    ctx.strokeStyle = object.stroke.color
    ctx.lineWidth = object.stroke.width
    ctx.lineJoin = 'round'
    if (object.stroke.width>0) ctx.strokeRect(0, 0, width, height)
    //if (object.rotate) { 
    //  ctx.strokeRect(0, 0, width, height)
    //} else {
    //  ctx.strokeRect(x, y, width, height)
    //}
  }

  //if (object.rotate) ctx.restore()
  ctx.translate(-x, -y)
  ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

export default drawImage