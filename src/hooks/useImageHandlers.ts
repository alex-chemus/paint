import { useEffect, useRef, MutableRefObject } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IState } from "@/types"
import { setText, setHandlers } from "@/templates"
import useCreateCanvas from "./useCreateCanvas"

interface Params {
  setCurrentObject(value: any): void,
  containerRef: MutableRefObject<HTMLDivElement | null>,
}

const useImageHandlers = ({ setCurrentObject, containerRef }: Params) => {
  const currentTool = useSelector((state: IState) => state.currentTool)
  const containerSize = useSelector((state: IState) => state.containerSize)
  const canvasObjects = useSelector((state: IState) => state.canvasObjects)
  const dispatch = useDispatch()
  const createCanvas = useCreateCanvas()
  const textRef = useRef<HTMLCanvasElement | null>(null)

  // utility functions
  const addImg = (img: any) => // ISheet
    dispatch({ type: 'add canvas object', value: img })

  const removeText = () => {
    textRef.current?.remove()
    setCurrentObject(null)
  }

  const removeHandlers = setHandlers({
    container: containerRef,
    currentTool,
    callback: addImg,
    createCanvas,
    topObject: canvasObjects.find(item => item.z === canvasObjects.length),
    removeText
  })

  useEffect(() => {
    if (currentTool === 'image' && containerRef?.current) {
      /*
        когда задается инструмент имадж, создать канвас для текста-ворнинга
        и создать текущий объект с текстом. потом, когда изменится инструмент (в else),
        удалить ссылку и очистить currentObject
      */
      textRef.current = createCanvas(containerRef) as HTMLCanvasElement
      setCurrentObject(setText({
        coords: {
          x: containerSize.width / 2,
          y: containerSize.height / 2
        },
        size: {
          width: containerSize.width,
          height: containerSize.height
        },
        params: {
          fill: '#ccc',
          value: 'Drag an image here',
          canvas: textRef.current,
          id: Date.now(),
          z: canvasObjects.length + 1,
        }
      }))
    } else {
      setCurrentObject(null)
      textRef.current?.remove()
    }

    return removeHandlers
  }, [currentTool])
}

export default useImageHandlers