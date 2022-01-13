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
  fill: '#000000',
  opacity: 0,
  stroke: {
    color: '#000000',
    width: 0
  },
  rotate: 0,
  shadow: {
    x: 0, y: 0, blur: 0, color: '#000000'
  },
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