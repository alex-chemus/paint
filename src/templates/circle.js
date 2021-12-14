const sheet = {
  type: 'circle',
  x: 0,
  y: 0,
  fill: '#000',
  radius: 0,
  relative: {
    coord: {x: true, y: true},
    radius: true
  },
  z: 0,
  scale: 0,
  opacity: 0,
  rotate: 0,
  stroke: 0,
}

const setCircle = ({startPosition, endPosition, params}) => {
  /* params: {
      startPosition,
      endPosition,
      params
    }*/

  const circle = {
    ...sheet,
    ...params,
    x: Math.abs(endPosition.x + startPosition.x) / 2,
    y: Math.abs(endPosition.y + startPosition.y) / 2,
    radius: Math.max(
      Math.abs(endPosition.x - startPosition.x) / 2,
      Math.abs(endPosition.y - startPosition.y) / 2
    ),
  }

  return circle
} 

export default setCircle