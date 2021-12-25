const sheet = {
  type: 'rectangle',
  start: {
    x: 0, y: 0,
  },
  end: {
    x: 0, y: 0,
  },
  id: 0,
  z: 0,
  scale: {x: 1, y: 1},
  fill: '#000',
  opacity: 0,
  stroke: null,
  rotate: null,
  shadow: null,
  canvas: null,
}

const setRectangle = ({startPosition, endPosition, params}) => {
  const rectangle = {
    ...sheet,
    ...params,
    start: startPosition,
    end: endPosition,
  }

  return rectangle
}

export default setRectangle