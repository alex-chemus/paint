import { setAbsCoords, setShadow, setStroke } from '../utilities'

interface Size {
  width: number,
  height: number
}

interface Params {
  ctx: CanvasRenderingContext2D,
  object: any, // ISheet
  size: Size,
  containerSize: Size
}

const drawTriangle = ({ ctx, object, size, containerSize }: Params) => {
  /* recalculate: start, end, stroke, shadow */
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

  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  
  if (stroke) {
    ctx.strokeStyle = stroke.color
    ctx.lineWidth = stroke.width
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

  if (shadow) {
    ctx.shadowOffsetX = shadow.x
    ctx.shadowOffsetY = shadow.y
    ctx.shadowBlur = shadow.blur
    ctx.shadowColor = shadow.color
  }
  ctx.fill()
  if (object.shadow) {
    ctx.shadowOffsetX = 0 //null
    ctx.shadowOffsetY = 0 //null
    ctx.shadowBlur = 0 //null
    ctx.shadowColor = '' //null
  }
  if (stroke.width>0) ctx.stroke()

  //if (object.rotate) ctx.restore()
  ctx.translate(-translate.x, -translate.y)
  ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

export default drawTriangle