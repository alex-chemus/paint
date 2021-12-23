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

const drawLine = (ctx, object, size) => {
  const [start, end] = setAbsCoords(object, size)
  ctx.clearRect(0, 0, size.width, size.height)
  //console.log('draw line')
  
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
  ctx.clearRect(0, 0, size.width, size.height)

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
  ctx.clearRect(0, 0, size.width, size.height)

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
  ctx.clearRect(0, 0, size.width, size.height)

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
  
  // todo: сделать строук сразу же при чертеже треугольника
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
  ctx.clearRect(0, 0, size.width, size.height)
  if (object.rotate) {
    ctx.save()
    ctx.translate(object.x, object.y) // translate to the shape center
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
    if (object.width && object.height) {
      img.onload = () => ctx.drawImage(img, 0, 0, object.width, object.height)
    } else img.onload = () => ctx.drawImage(img, 0, 0)
  } else {
    if (object.width && object.height) {
      img.onload = () => ctx.drawImage(img, object.x, object.y, object.width, object.height)
    } else img.onload = () => ctx.drawImage(img, object.x, object.y)
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
      ctx.strokeRect(0, 0, object.width, object.height)
    } else {
      ctx.strokeRect(object.x, object.y, object.width, object.height)
    }
  }

  if (object.rotate) ctx.restore()
}

const render = (object, size) => {
  const ctx = object.canvas.getContext('2d')
  
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

    default:
      break
  }
}

export default render