// relative coordinates -> absolute coordinates
const setAbsCoords = (object, size) => {
  const start = {
    x: object.start.x * size.width,
    y: object.start.y * size.height
  }

  const end = {
    x: object.end.x * size.width,
    y: object.end.y * size.height
  }

  return [start, end]
}

const setAbsXY = (object, size) => {
  const x = object.x * size.width
  const y = object.y * size.height
  return [x, y]
}

const drawLine = (ctx, object, size) => {
  const [start, end] = setAbsCoords(object, size)
  
  if (object.rotate) {
    ctx.save()
    const translate = {
      x: Math.min(start.x, end.x) + Math.abs(start.x - end.x) / 2,
      y: Math.min(start.y, end.y) + Math.abs(start.y - end.y) / 2
    }
    //console.log(translate)
    ctx.translate(translate.x, translate.y) // translate to the shape center
    ctx.rotate(object.rotate)
  }
  if (object.opacity) ctx.globalAlpha = 1 - object.opacity/100

  ctx.scale(object.scale.x, object.scale.y)
  ctx.strokeStyle = object.stroke.color
  ctx.lineWidth = object.stroke.width
  ctx.lineJoin = 'round'
  ctx.beginPath()

  if (object.rotate) {
    const dx = Math.abs(start.x - end.x)
    const dy = Math.abs(start.y - end.y)
    ctx.moveTo(-dx/2, -dy/2)
    ctx.lineTo(dx/2, dy/2)
  } else {
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
  }

  ctx.stroke()

  if (object.rotate) ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

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
  /*if (object.rotate) {
    //img.onload = () => ctx.drawImage(img, 0, 0, width, height)
    img.onload = () => ctx.drawImage(img, 0, 0, width, height, 0, 0, width, height)
  } else {
    //img.onload = () => ctx.drawImage(img, x, y, width, height)
    img.onload = () => ctx.drawImage(img, 0, 0, width, height, x, y, width, height)
  }*/
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
    /*if (object.rotate) { 
      ctx.strokeRect(0, 0, width, height)
    } else {
      ctx.strokeRect(x, y, width, height)
    }*/
  }

  //if (object.rotate) ctx.restore()
  ctx.translate(-x, -y)
  ctx.restore()
  if (object.opacity) ctx.globalAlpha = 1
}

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

const render = (object, size, beforeDraw=()=>{}) => {
  object.canvas.dataset.z = object.z
  const ctx = object.canvas.getContext('2d')
  ctx.clearRect(0, 0, size.width, size.height)
  beforeDraw()
  
  switch (object?.type) {
    case 'rectangle':
      drawRect(ctx, object, size)
      break
    case 'line':
      drawLine(ctx, object, size)
      break
    case 'circle':
      drawCircle(ctx, object, size)
      break
    case 'triangle':
      drawTriangle(ctx, object, size)
      break
    case 'image':
      drawImage(ctx, object, size)
      break
    case 'text':
      drawText(ctx, object, size)
      break
    default:
      break
  }
}

export default render