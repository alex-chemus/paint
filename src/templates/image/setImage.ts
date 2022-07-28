import { Tool } from "@/types"
import { MutableRefObject } from "react"

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

const setImage = ({ params }: { params: any }) => {
  return {
    ...sheet,
    ...params,
  }
}

interface Params {
  container: MutableRefObject<null | HTMLDivElement>,
  currentTool: Tool,
  callback?(...rest: any): void,
  createCanvas(containerRef: MutableRefObject<null | HTMLDivElement>): HTMLCanvasElement | undefined,
  topObject: any, // ISheet
  removeText(): void
}

const setHandlers = ({
  container, currentTool, callback=()=>{}, createCanvas, topObject, removeText
}: Params) => {
  const onDragOver = (event: DragEvent) => {
    event.preventDefault()
    removeText()
  }

  if (!container.current) return

  container.current.addEventListener('dragover', onDragOver)

  const onDragLeave = (event: DragEvent) => {
    event.preventDefault()
    removeText()
  }
  container.current.addEventListener('dragleave', onDragLeave)

  const onDragEnd = (event: DragEvent) => {
    event.preventDefault()
    removeText()
  }
  container.current.addEventListener('dragend', onDragEnd)

  const onDrop = (event: DragEvent) => {
    if (currentTool !== 'image') return
    event.preventDefault()

    const okData = event.dataTransfer && event.dataTransfer.files.length

    if (okData) {
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
    container.current?.removeEventListener('dragover', onDragOver)
    container.current?.removeEventListener('dragleave', onDragLeave)
    container.current?.removeEventListener('dragend', onDragEnd)
    container.current?.removeEventListener('drop', onDrop)
  }
}

export default setHandlers