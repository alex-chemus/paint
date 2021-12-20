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

  ctx.beginPath()
  ctx.moveTo(start.x, start.y)
  ctx.lineTo(end.x, end.y)
  ctx.stroke()
}

const drawRect = (ctx, object, size) => {
  const [start, end] = setAbsCoords(object, size)

  ctx.fillStyle = object.fill
  ctx.fillRect(
    Math.min(start.x, end.x), 
    Math.min(start.y, end.y),
    Math.abs(end.x - start.x),
    Math.abs(end.y - start.y)
  )
}

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

      default: 
        break
    }
  })
}

export default render