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

  if (object.rotate) ctx.save()
  if (object.opacity) ctx.globalAlpha = object.opacity

  if (object.shadow) {
    ctx.shadowOffsetX = object.shadow.x
    ctx.shadowOffsetY = object.shadow.y
    ctx.shadowBlur = object.shadow.blur
    ctx.shadowColor = object.shadow.color
  }
  ctx.scale(object.scale.x, object.scale.y)
  ctx.fillStyle = object.fill
  ctx.fillRect(
    Math.min(start.x, end.x), 
    Math.min(start.y, end.y),
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
    ctx.strokeRect(
      Math.min(start.x, end.x), 
      Math.min(start.y, end.y),
      Math.abs(end.x - start.x),
      Math.abs(end.y - start.y)
    )
  }

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

  if (object.rotate) ctx.save()
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

const drawImage = (ctx, object, size) => {}

const render = (canvas, objects) => {
  const ctx = canvas.getContext('2d')

  objects.sort((a, b) => {
    if (a.z > b.z) return 1
    if (a.z === b.z) return 0
    if (a.z < b.z) return -1
  })

  objects.forEach(object => {
    switch(object?.type) {
      case 'line':
        drawLine(ctx, object, {
          width: canvas.width,
          height: canvas.height
        })
        break

      case 'rectangle': 
        drawRect(ctx, object, {
          width: canvas.width,
          height: canvas.height
        })
        break

      case 'circle':
        drawCircle(ctx, object, {
          width: canvas.width,
          height: canvas.height
        })
        break

      case 'triangle':
        drawTriangle(ctx, object, {
          width: canvas.width,
          height: canvas.height
        })
        break

      default: 
        break
    }
  })
}

export default render