const sheet = {
  type: 'triangle',
  start: {x: 0, y: 0},
  end: {x: 0, y: 0,},
  fill: '#000',
  //base: 0,
  id: 0,
  z: 0,
  opacity: 0,
  scale: {x: 1, y: 1},
  rotate: 0,
  stroke: {
    width: 0,
    color: '#000'
  },
  shadow: {
    x: 0, y: 0, blur: 0, color: '#000'
  },
  canvas: null,
}

const setTriangle = ({startPosition, endPosition, params}) => {
  const triangle = {
    ...sheet,
    ...params,
    start: startPosition,
    end: endPosition
  }

  return triangle
}

export default setTriangle