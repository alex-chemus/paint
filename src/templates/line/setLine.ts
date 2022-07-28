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
  opacity: 0,
  rotate: 0,
  scale: {x: 1, y: 1},
  canvas: null,
}

interface Position {
  x: number,
  y: number
}

interface Params {
  startPosition: Position,
  endPosition: Position,
  params: any
}

const setLine = ({ startPosition, endPosition, params }: Params) => {
  const line = {
    ...sheet,
    ...params,
    start: startPosition,
    end: endPosition
  }

  return line
}

export default setLine