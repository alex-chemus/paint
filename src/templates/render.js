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
  
  if (object.rotate) ctx.save()
  if (object.opacity) ctx.globalAlpha = object.opacity

  ctx.scale(object.scale.x, object.scale.y)
  ctx.strokeStyle = object.stroke.color
  ctx.lineWidth = object.stroke.width
  ctx.beginPath()
  ctx.moveTo(start.x, start.y)
  ctx.lineTo(end.x, end.y)
  ctx.stroke()

  if (object.rotate) {
    const translate = {
      x: Math.abs(start.x - end.x) / 2,
      y: Math.abs(start.y - end.y) / 2
    }
    ctx.translate(translate.x, translate.y) // translate to the shape center
    ctx.rotate(object.rotate)
    ctx.translate(-translate.x, -translate.y) // translate back
    ctx.restore()
  }
}

const drawRect = (ctx, object, size) => {
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
  if (object.opacity) ctx.globalAlpha = object.opacity

  if (object.shadow) {
    ctx.shadowOffsetX = object.shadow.x
    ctx.shadowOffsetY = object.shadow.y
    ctx.shadowBlur = object.shadow.blur
    ctx.shadowColor = object.shadow.color
  }
  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  if (object.rotate) { 
    ctx.fillRect(
      -Math.abs(start.x - end.x) / 2,
      -Math.abs(start.y - end.y) / 2,
      Math.abs(end.x - start.x),
      Math.abs(end.y - start.y)
    )
  } else {
    ctx.fillRect(
      Math.min(start.x, end.x), 
      Math.min(start.y, end.y),
      Math.abs(end.x - start.x),
      Math.abs(end.y - start.y)
    )
  }
  
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
    if (object.rotate) { 
      ctx.strokeRect(
        -Math.abs(start.x - end.x) / 2,
        -Math.abs(start.y - end.y) / 2,
        Math.abs(end.x - start.x),
        Math.abs(end.y - start.y)
      )
    } else {
      ctx.strokeRect(
        Math.min(start.x, end.x), 
        Math.min(start.y, end.y),
        Math.abs(end.x - start.x),
        Math.abs(end.y - start.y)
      )
    }
  }

  if (object.rotate) ctx.restore()
}

const drawCircle = (ctx, object, size) => {
  const [start, end] = setAbsCoords(object, size)

  if (object.opacity) ctx.globalAlpha = object.opacity
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
    start.x, start.y, 
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
    start.x, start.y, 
    Math.sqrt(
      (end.x - start.x)**2 + (end.y - start.y)**2
    ),
    0, Math.PI*2
  )
  ctx.stroke()
  ctx.closePath()
  }
}

const drawTriangle = (ctx, object, size) => {
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
  if (object.opacity) ctx.globalAlpha = object.opacity

  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  
  if (object.stroke) {
    ctx.strokeStyle = object.stroke.color
    ctx.lineWidth = object.stroke.width
  }
  ctx.lineJoin = 'round'

  ctx.beginPath()
  if (object.rotate) {
    const dx = Math.abs(start.x-end.x)
    const dy = Math.abs(start.y - end.y)
    ctx.moveTo(0, -dy / 2)
    ctx.lineTo(dx / 2, dy / 2)
    ctx.lineTo(-dx / 2, dy / 2)
    ctx.lineTo(0, -Math.abs(start.y - end.y) / 2)
  }
  else {
    ctx.moveTo(
      Math.min(start.x, end.x) + Math.abs(start.x - end.x) / 2,
      Math.min(start.y, end.y)
    )
    ctx.lineTo(
      Math.max(start.x, end.x),
      Math.max(start.y, end.y)
    )
    ctx.lineTo(
      Math.min(start.x, end.x),
      Math.max(start.y, end.y)
    )
    ctx.lineTo(
      Math.min(start.x, end.x) + Math.abs(start.x - end.x) / 2,
      Math.min(start.y, end.y)
    )
  }
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
  ctx.stroke()

  if (object.rotate) ctx.restore()
}

const drawImage = (ctx, object, size) => {
  const [x, y] = setAbsXY(object, size)
  const width = object.width * size.width
  const height = object.height * size.height

  if (object.rotate) {
    ctx.save()
    ctx.translate(x, y) // translate to the shape center
    ctx.rotate(object.rotate)
  }
  if (object.opacity) ctx.globalAlpha = object.opacity

  if (object.shadow) {
    ctx.shadowOffsetX = object.shadow.x
    ctx.shadowOffsetY = object.shadow.y
    ctx.shadowBlur = object.shadow.blur
    ctx.shadowColor = object.shadow.color
  }
  ctx.scale(object.scale.x, object.scale.y)

  const img = new Image()
  img.src = object.src
  if (object.rotate) {
    img.onload = () => ctx.drawImage(img, 0, 0, width, height)
  } else {
    img.onload = () => ctx.drawImage(img, x, y, width, height)
  }

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
    if (object.rotate) { 
      ctx.strokeRect(0, 0, width, height)
    } else {
      ctx.strokeRect(x, y, width, height)
    }
  }

  if (object.rotate) ctx.restore()
}

const drawText = (ctx, object, size) => {
  const [x, y] = setAbsXY(object, size)

  if (object.rotate) {
    ctx.save()
    ctx.translate(x, y) // translate to the shape center
    ctx.rotate(object.rotate)
  }
  if (object.opacity) ctx.globalAlpha = object.opacity

  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = 'black'

  const fontSize = object.font.size * size.height
  ctx.font = `${object.font.style} ${object.font.weight} ${fontSize}px/${object.font.height}em ${object.font.family}`
  ctx.fillText(object.value, x, y)

  if (object.stroke) ctx.strokeText(object.value, x, y)
  if (object.rotate) ctx.restore()
}

const render = (object, size, beforeDraw=()=>{}) => {
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