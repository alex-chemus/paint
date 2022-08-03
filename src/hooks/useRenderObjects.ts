import { useEffect, MutableRefObject } from "react"
import { useSelector, useDispatch } from "react-redux"
import { IState } from "@/types"
import useCreateCanvas from './useCreateCanvas'
import { render } from "@/templates"
import useRemoveDuplicateObjects from "./useRemoveDuplicateObjects"

const useRenderObjects = (containerRef: MutableRefObject<HTMLDivElement | null>) => {
  const canvasObjects = useSelector((state: IState) => state.canvasObjects)
  const containerSize = useSelector((state: IState) => state.containerSize)
  const canvasVersions = useSelector((state: IState) => state.canvasVersions)
  const interimVersions = useSelector((state: IState) => state.interimVersions)
  const dispatch = useDispatch()
  const createCanvas = useCreateCanvas()
  const removeDuplicateObjects = useRemoveDuplicateObjects()

  useEffect(() => {
    console.log('useRenderObjects', canvasObjects)

    if (!containerRef.current) return

    // добавить начальный канвас с белым фоном, если его нет
    if (!canvasObjects[0]?.canvas) {
      if (canvasObjects[0].end.x === 1) return
      dispatch({
        type: 'add init canvas',
        value: createCanvas(containerRef)
      })
      canvasObjects.forEach(item => {
        const size = { // container size
          width: containerSize.width || document.body.clientWidth - 266 - 85,
          height: containerSize.height || document.body.clientWidth - 100
        }
        render(item, size, size)
      })
      return
    }

    // чекнуть, надо ли вообще что-то перерисовывать
    const shouldNotRerender = canvasObjects.length <= 1 && canvasVersions.length <= 1
    if (shouldNotRerender) return

    // nextFull - полный массив новых объектов
    // prevFull - полный массив предыдущих объектов
    const nextFull = [...canvasObjects]
    const versions = [...canvasVersions].concat([...interimVersions])
    const prevFull = [...versions[versions.length-2]]

    // из prevFull и nextFull убираются общие объекты
    const [prev, next] = removeDuplicateObjects(prevFull, nextFull)

    // объекты, которых нет в новой версии, удаляются из контейнера
    prev.forEach(item => item.canvas.remove())

    next.sort((a, b) => a.z - b.z).forEach(item => {
      if (!containerRef.current) return
      if (!containerRef.current.contains(item.canvas)) {
        const prevElem = containerRef.current.querySelector(`[data-z="${item.z-1}"]`)
        prevElem?.after(item.canvas)
      }
      const size = {
        width: containerSize.width || document.body.clientWidth - 266 - 85,
        height: containerSize.height || document.body.clientWidth - 266 - 85
      }
      render(item, size, size)
    })
  // eslint-disable-next-line
  }, [canvasObjects])
}

export default useRenderObjects