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
  fill: 'blue',
  opacity: 0,
  stroke: {
    color: '#000',
    width: 0
  },
  rotate: 0,
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