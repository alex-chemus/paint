const sheet = {
  type: 'triangle',
  start: {x: 0, y: 0},
  end: {x: 0, y: 0,},
  fill: '#000',
  base: 0,
  z: 0,
  opacity: 0,
  scale: {x: 1, y: 1},
  rotate: null,
  stroke: {
    width: 10, 
    color: 'blue'
  },
  shadow: {
    x: 0, 
    y: 0,
    blur: 50,
    color: 'red'
  }
}

const setTriangle = ({startPosition, endPosition, params, canvasWidth, canvasHeight}) => {
  /*const coefficient = canvasHeight / canvasWidth
  const dx = endPosition.x - startPosition.x
  const dy = endPosition.y - startPosition.y
  const dy_x = dy * coefficient
  const dx_y = dx / coefficient

  const alfa = Math.atan(Math.abs(dy_x) / (Math.abs(dx)/2))
  const betta = Math.atan(Math.abs(dy_x) / (Math.abs(dx)/2))
  console.log(alfa)

  const x = startPosition.x + dx/2
  const y = Math.min(startPosition.y, endPosition.y) + (Math.abs(dy) - Math.tan(alfa/2)*Math.abs(dx_y/2))*/
  //console.log(Math.tan(alfa/2)*(dx/2))

  const triangle = {
    ...sheet,
    ...params,
    start: startPosition,
    end: endPosition
    //base: Math.abs(endPosition.x - startPosition.x),
    //x,
    //y,
    //angleLeft: alfa,
    //angleRight: betta
  }

  return triangle
}

export default setTriangle