const sheet = {
  type: 'image',
  x: .5,
  y: .5,
  relative: {
    coord: { x: true, y: true },
  },
  width: 100,
  height: 100,
  src: '',
  z: 0,
  scale: 0,
  opacity: 0,
  rotate: 0,
  fill: 0,
  stroke: 0,
  crop: null,
}

const setImage = ({ params }) => {
  return {
    ...sheet,
    ...params,
  }
}

const setHanlders = (canvas, currentTool, callback=()=>{}) => {
  const events = ['dragover', 'dragleave', 'dragend']
  events.forEach(type => {
    canvas.addEventListener(type, event => {
      //console.log(type)
      event.preventDefault()
    })
  })

  canvas.addEventListener('drop', event => {
    //console.log(currentTool)
    if (currentTool !== 'image') return
    event.preventDefault()

    if (event.dataTransfer.files.length) {
      //console.log(event.dataTransfer.files[0]) // blob
      // blob -> url
      const url = URL.createObjectURL(event.dataTransfer.files[0])
      console.log(url)
      callback(setImage({
        params: { 
          src: url
        }
      }))
    }
  })
}

export default setHanlders