// relative coordinates -> absolute coordinates
export const setAbsCoords = (object, size) => {
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

export const setAbsXY = (object, size) => {
  const x = object.x * size.width
  const y = object.y * size.height
  return [x, y]
}