import { setAbsXY, getHeightRatio, getWidthRatio, setShadow, setStroke } from '../utilities'

const drawImage = (ctx, object, size, containerSize) => {
  const [x, y] = setAbsXY(object, size, containerSize)
  const ratio = {
    width: getWidthRatio(size, containerSize),
    height: getHeightRatio(size, containerSize)
  }
  const stroke = setStroke(object, size, containerSize)
  const shadow = setShadow(object, size, containerSize)

  ctx.save()
  ctx.translate(x, y) // translate to the shape center

  if (object.shadow) {
    ctx.shadowOffsetX = shadow.x
    ctx.shadowOffsetY = shadow.y
    ctx.shadowBlur = shadow.blur
    ctx.shadowColor = shadow.color
  }
  //ctx.scale(object.scale.x, object.scale.y)

  const img = new Image()
  img.src = object.src
  //if (object.rotate) {
    //img.onload = () => ctx.drawImage(img, 0, 0, width, height)
  //  img.onload = () => ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height)
  //} else {
    //img.onload = () => ctx.drawImage(img, x, y, width, height)
  //  img.onload = () => ctx.drawImage(img, 0, 0, width, height, x, y, width, height)
  //}
  //img.onload = () => ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height)
  //img.onload = () => ctx.drawImage(img, 0, 0, width, height)
  img.onload = () => {
    const width = img.width * object.scale.x * ratio.width
    const height = img.height * object.scale.y * ratio.height 

    if (shadow.blur) {
      ctx.fillRect(0, 0, width, height)
      ctx.shadowOffsetX = null
      ctx.shadowOffsetY = null
      ctx.shadowBlur = null
      ctx.shadowColor = null
    }
  
    if (object.stroke) {
      ctx.strokeStyle = stroke.color
      ctx.lineWidth = stroke.width
      ctx.lineJoin = 'round'
      if (object.stroke.width>0) ctx.strokeRect(0, 0, width, height)
    }
  
    ctx.drawImage(img, 0, 0, width, height)

    ctx.translate(-x, -y)
    ctx.restore()
  }
}

export default drawImage