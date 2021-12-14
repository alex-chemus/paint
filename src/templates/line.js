const sheet = {
  type: 'rectangle',
  x: 0,
  y: 0,
  fill: '#000',
  width: 0,
  height: 3,
  relative: {
    coord: { x: true, y: true },
    size: { width: true, height: false}
  },
  z: 0,
  opacity: 0,
  //scale: 0,
  rotate: 0,
  stroke: 0,
}

const setLine = ({ startPosition, endPosition, params, canvasHeight, canvasWidth }) => {
  const coefficient = canvasHeight / canvasWidth
  const dx = endPosition.x - startPosition.x
  const dy = (endPosition.y - startPosition.y) * coefficient

  const width = Math.sqrt(dy**2 + dx**2)
  const arccos = endPosition.y > startPosition.y ? Math.acos(dx / width) : -Math.acos(dx / width)

  const line = {
    ...sheet,
    ...params,
    width,
    x: (endPosition.x + startPosition.x) / 2,
    y: (endPosition.y + startPosition.y) / 2,
    rotate: arccos
  }

  return line
}

export default setLine