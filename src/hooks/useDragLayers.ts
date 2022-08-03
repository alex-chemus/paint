import { IState } from "@/types"
import { useRef, MouseEvent } from "react"
import { useDispatch, useSelector } from "react-redux"

interface Params {
  setObjects(value: any): void,
  objects: any[] // any[]
}

const useDragLayers = ({ setObjects, objects }: Params) => {
  const startY = useRef(0)
  const startX = useRef(0)
  const startTop = useRef(0)
  const clicked = useRef(false)

  const canvasObjects = useSelector((state: IState) => state.canvasObjects)
  const dispatch = useDispatch()

  const swapZ = (prevI: number, nextI: number) => {
    const list = [...objects]
    const aboba = list[prevI].z
    list[prevI].z = list[nextI].z
    list[nextI].z = aboba
    list.sort((a, b) => a.z - b.z)
    setObjects(list)
    dispatch({
      type: 'swap objects',
      value: [canvasObjects[0], ...list]
    })
  }

  // ISheet
  const dragLayer = (i: number, event: MouseEvent, dragClass: string) => {
    const li = event.currentTarget
    li.classList.add(dragClass)
    const offset = (objects.length-1-i)*50
    startY.current = event.clientY - offset - 50 - 79
    startTop.current = offset
    clicked.current = true
  }

  const moveLayer = (i: number, event: MouseEvent) => {
    if (!clicked.current) return
    const y = event.clientY
    const li = event.currentTarget
    const prev = li.previousElementSibling
    const next = li.nextElementSibling
    const shift = y - 50 - 79 - startTop.current - startY.current
  
    if (shift > li.clientHeight && prev) {
      swapZ(i, i-1)
      const offset = (objects.length-i)*50
      setObjects(objects.map((item, j) => {
        if (i-1 !== j) return item
        return {
          ...item,
          style: {
            top: '0px'
          }
        }
      }))
      startTop.current = offset
    } else if (-shift > li.clientHeight && next) {
      swapZ(i, i+1)
      const offset = (objects.length-i)*50
      setObjects(objects.map((item, j) => {
        if (i+1 !== j) return item
        return {
          ...item,
          style: {
            top: '0px'
          }
        }
      }))
      startTop.current = offset
    } else {
      setObjects(objects.map((item, j) => {
        if (i !== j) return item
        return {
          ...item,
          style: {
            top: `${shift}px`
          }
        }
      }))
    }
  }

  const dropLayer = (i: number, event: MouseEvent, dragClass: string) => {
    event.currentTarget.classList.remove(dragClass)
    clicked.current = false
    setObjects(objects.map((item, j) => {
      if (i !== j) return item
      return {
        ...item,
        style: { top: null }
      }
    }))
  }

  return { dragLayer, moveLayer, dropLayer }
}

export default useDragLayers