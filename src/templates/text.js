const sheet = {
  type: 'text',
  x: 0, y: 0,
  id: 0,
  z: 0,
  fill: 'black', // text color
  stroke: null, // {width, color}
  opacity: 0, // number
  rotate: 0, // angle
  scale: {x: 1, y: 1},
  canvas: null, // ref
  value: 'Text',
  textAlign: 'center'
}

const setText = ({ coords, size, params }) => {
  const relativeSize = 16 / size.height
  
  const text = {
    ...sheet,
    ...params,
    x: coords.x,
    y: coords.y, 
    font: {
      size: relativeSize, // px
      family: 'Arial',
      style: 'normal',
      weight: 'normal',
      height: '1.2' // em
    }
  }
  return text
}

export default setText