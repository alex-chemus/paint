const getRatio = (size, containerSize) => {
  const ratio = {
    width: size.width / containerSize.width,
    height: size.height / containerSize.height
  }
  ratio.avarage = ((ratio.width + ratio.height)/2)
  return ratio
}

// relative coordinates -> absolute coordinates
export const setAbsCoords = (object, size, containerSize) => {
  const ratio = getRatio(size, containerSize)
  const start = {
    x: object.start.x * ratio.width,
    y: object.start.y * ratio.height
  }
  const end = {
    x: object.end.x * ratio.width,
    y: object.end.y * ratio.height
  }

  return [start, end]
}

export const setAbsXY = (object, size, containerSize) => {
  const ratio = getRatio(size, containerSize)
  const x = object.x * ratio.width
  const y = object.y * ratio.height
  return [x, y]
}

export const setStroke = (object, size, containerSize) => {
  const ratio = getRatio(size, containerSize)
  const stroke = {
    color: object.stroke.color,
    width: object.stroke.width * ratio.avarage
  }
  return stroke
}

export const setShadow = (object, size, containerSize) => {
  const ratio = getRatio(size, containerSize)
  const shadow = {
    color: object.shadow.color,
    blur: object.shadow.blur * ratio.avarage,
    x: object.shadow.x * ratio.width,
    y: object.shadow.y * ratio.height
  }
  return shadow
}