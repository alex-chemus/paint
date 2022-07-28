const sheet = {
  type: 'text',
  x: 0, y: 0,
  id: 0,
  z: 0,
  fill: '#000', // text color
  stroke: {
    width: 0,
    color: '#000'
  }, // {width, color}
  opacity: 0, // number
  rotate: 0, // angle
  scale: {x: 1, y: 1},
  canvas: null, // ref
  value: 'Text',
  textAlign: 'center'
}

interface Params {
  coords: {
    x: number,
    y: number,
  },
  size: {
    width: number,
    height: number
  },
  params: any
}

const setText = ({ coords, size, params }: Params) => {
  //const relativeSize = 16 / size.height
  
  const text = {
    ...sheet,
    ...params,
    x: coords.x,
    y: coords.y, 
    font: {
      size: 16, // px
      family: 'Arial',
      style: 'normal',
      weight: 'normal',
      height: '1.2' // em
    }
  }
  return text
}

export default setText