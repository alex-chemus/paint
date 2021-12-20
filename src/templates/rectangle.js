/*const sheet = {
  type: 'rectangle',
  x: 0,
  y: 0,
  fill: '#000',
  width: 0,
  height: 0,
  relative: {
    coord: { x: true, y: true },
    size: { width: true, height: true }
  },
  z: 0,
  opacity: 0,
  scale: 0,
  rotate: 0,
  stroke: 0,
}*/

const sheet = {
  type: 'rectangle',
  start: {
    x: 0, y: 0,
  },
  end: {
    x: 0, y: 0,
  },
  z: 0,
  scale: {x: 1, y: 1},
  fill: '#000',
  opacity: 0,
  stroke: null,
  rotate: null,
  shadow: null,
}

const setRectangle = ({startPosition, endPosition, params}) => {
  /*const rectangle = {
    ...sheet,
    ...params,
    x: Math.abs(endPosition.x + startPosition.x) / 2,
    y: Math.abs(endPosition.y + startPosition.y) / 2,
    width: Math.abs(endPosition.x - startPosition.x),
    height: Math.abs(endPosition.y - startPosition.y)
  }*/

  const rectangle = {
    ...sheet,
    ...params,
    start: startPosition,
    end: endPosition,
  }

  return rectangle
}

export default setRectangle