const sheet = {
  type: 'image',
  x: 0, 
  y: 0,
  width: 50,
  height: 50,
  src: '',
  z: 0,
  scale: {x: 1, y: 1},
  opacity: null,
  rotate: null,
  stroke: null,
  canvas: null,
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
      event.preventDefault()
    })
  })

  canvas.addEventListener('drop', event => {
    if (currentTool !== 'image') return
    event.preventDefault()

    if (event.dataTransfer.files.length) {
      // blob -> url
      const url = URL.createObjectURL(event.dataTransfer.files[0])
      callback(setImage({
        params: { 
          src: url
        }
      }))
    }
  })
}

export default setHanlders