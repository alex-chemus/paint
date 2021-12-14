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
  const radius = Math.max(
    Math.abs(endPosition.x - startPosition.x) / 2,
    Math.abs(endPosition.y - startPosition.y) / 2
  )
  const x = endPosition.x > startPosition.x ? startPosition.x + radius : startPosition.x - radius
  const y = endPosition.y > startPosition.y ? startPosition.y + radius : startPosition.y - radius

  const circle = {
    ...sheet,
    ...params,
    radius,
    x,
    y
    //x: (endPosition.x + startPosition.x) / 2,
    //y: (endPosition.y + startPosition.y) / 2,
  }

  return circle
} 

export default setCircle