const sheet = {
  type: 'line',
  start: {
    x: 0, y: 0
  },
  end: {
    x: 100, y: 100
  },
  id: 0,
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
  const line = {
    ...sheet,
    ...params,
    start: startPosition,
    end: endPosition
  }

  return line
}

export default setLine