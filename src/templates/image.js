const sheet = {
  type: 'image',
  x: 0, 
  y: 0,
  width: 250,
  height: 250,
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

const setHanlders = (container, currentTool, callback=()=>{}, createCanvas) => {
  const onDragOver = event => event.preventDefault()
  container.current.addEventListener('dragover', onDragOver)

  const onDragLeave = event => event.preventDefault()
  container.current.addEventListener('dragleave', onDragLeave)

  const onDragEnd = event => event.preventDefault()
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
          canvas
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