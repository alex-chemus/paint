/*const sheet = {
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
}*/

const sheet = {
  type: 'line',
  start: {
    x: 0, y: 0
  },
  end: {
    x: 100, y: 100
  },
  z: 0,
  stroke: {
    color: '#000',
    width: 1,
  },
  opacity: null,
  rotate: null,
  scale: {x: 1, y: 1},
  canvas: null,
}

const setLine = ({ startPosition, endPosition, params }) => {
  /*const coefficient = canvasHeight / canvasWidth
  const dx = endPosition.x - startPosition.x
  const dy = (endPosition.y - startPosition.y) * coefficient

  const width = Math.sqrt(dy**2 + dx**2)
  const arccos = endPosition.y > startPosition.y ? Math.acos(dx / width) : -Math.acos(dx / width)*/

  const line = {
    ...sheet,
    ...params,
    start: startPosition,
    end: endPosition
  }

  console.log(params)

  return line
}

export default setLine