const sheet = {
  type: 'triangle',
  x: 0,
  y: 0,
  fill: '#000',
  base: 0,
  angleLeft: Math.PI / 4,
  angleRight: Math.PI / 4,
  relative: {
    coord: { x: true, y: true },
    base: true,
  },
  z: 0,
  opacity: 0,
  scale: 0,
  rotate: 0,
  stroke: 0,
}

const setTriangle = ({startPosition, endPosition, params, canvasWidth, canvasHeight}) => {
  const coefficient = canvasHeight / canvasWidth
  const dx = endPosition.x - startPosition.x
  const dy = endPosition.y - startPosition.y
  const dy_x = dy * coefficient
  const dx_y = dx / coefficient

  const alfa = Math.atan(Math.abs(dy_x) / (Math.abs(dx)/2))
  const betta = Math.atan(Math.abs(dy_x) / (Math.abs(dx)/2))
  console.log(alfa)

  const x = startPosition.x + dx/2
  const y = Math.min(startPosition.y, endPosition.y) + (Math.abs(dy) - Math.tan(alfa/2)*Math.abs(dx_y/2))
  //console.log(Math.tan(alfa/2)*(dx/2))

  const triangle = {
    ...sheet,
    ...params,
    base: Math.abs(endPosition.x - startPosition.x),
    x,
    y,
    angleLeft: alfa,
    angleRight: betta
  }

  return triangle
}

export default setTriangle