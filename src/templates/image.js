const sheet = {
  type: 'image',
  x: 0, 
  y: 0,
  src: '',
  id: 0,
  z: 0,
  scale: {x: 1, y: 1},
  stroke: {
    width: 0,
    color: '#000000'
  },
  shadow: {
    x: 0, y: 0, blur: 0, color: '#000000'
  },
  canvas: null,
}

const setImage = ({ params }) => {
  return {
    ...sheet,
    ...params,
  }
}

const setHanlders = (container, currentTool, callback=()=>{}, createCanvas, topObject, removeText) => {
  const onDragOver = event => {
    event.preventDefault()
    removeText()
  }
  container.current.addEventListener('dragover', onDragOver)

  const onDragLeave = event => {
    event.preventDefault()
    removeText()
  }
  container.current.addEventListener('dragleave', onDragLeave)

  const onDragEnd = event => {
    event.preventDefault()
    removeText()
  }
  container.current.addEventListener('dragend', onDragEnd)

  const onDrop = event => {
    if (currentTool !== 'image') return
    event.preventDefault()

    if (event.dataTransfer.files.length) {
      // blob -> url
      const url = URL.createObjectURL(event.dataTransfer.files[0])
      const canvas = createCanvas(container)
      callback(setImage({
        params: { 
          src: url,
          canvas,
          id: Date.now(),
          z: topObject.z + 1,
        }
      }))
    }
  }
  container.current.addEventListener('drop', onDrop)

  return () => {
    container.current.removeEventListener('dragover', onDragOver)
    container.current.removeEventListener('dragleave', onDragLeave)
    container.current.removeEventListener('dragend', onDragEnd)
    container.current.removeEventListener('drop', onDrop)
  }
}

export default setHanlders