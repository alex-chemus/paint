import { useSelector } from "react-redux"
import { IState } from "@/types"
import render from '@/templates/render'

const download = (canvas: HTMLCanvasElement, filename: string) => {
  // create off-screen anchor tag
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png;base64')

  // create a fake click-event
  /*document
    .createEvent('MouseEvent')
    .initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false,
    false, 0, null) */
  const e = document.createEvent('MouseEvent')
  e.initMouseEvent("click", true, true, window,
  0, 0, 0, 0, 0, false, false, false,
  false, 0, null)
  link.dispatchEvent(e)
}

const useSave = () => {
  const canvasObjects = useSelector((state: IState) => state.canvasObjects)
  const containerSize = useSelector((state: IState) => state.containerSize)

  return () => {
    console.log('save')

    const objects = [...canvasObjects]
    const size = {...containerSize}

    const canvas = document.createElement('canvas')
    canvas.width = size.width
    canvas.height = size.height

    objects
      .sort((a, b) => a.z - b.z)
      .map(item => ({...item, canvas}))
      .forEach(item => render(item, size, size, ()=>{}, false))
  
    download(canvas, 'image.png')
  }
}

export default useSave