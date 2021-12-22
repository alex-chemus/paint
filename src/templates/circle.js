const sheet = {
  type: 'circle',
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 },
  fill: '#000',
  z: 0,
  scale: { x: 1, y: 1},
  opacity: 0,
  stroke: null,
  shadow: null,
}

const setCircle = ({startPosition, endPosition, params}) => {
  /*const radius = Math.max(
    Math.abs(endPosition.x - startPosition.x) / 2,
    Math.abs(endPosition.y - startPosition.y) / 2
  )
  const x = endPosition.x > startPosition.x ? startPosition.x + radius : startPosition.x - radius
  const y = endPosition.y > startPosition.y ? startPosition.y + radius : startPosition.y - radius*/

  const circle = {
    ...sheet,
    ...params,
    start: startPosition,
    end: endPosition
  }

  return circle
} 

export default setCircle