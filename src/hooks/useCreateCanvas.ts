import { MutableRefObject } from "react"
import { useSelector } from 'react-redux'
import { IState } from '@/types'

const useCreateCanvas = () => {
  const containerSize = useSelector((state: IState) => state.containerSize)

  return (containerRef: MutableRefObject<HTMLElement | null>) => {
    if (!containerRef.current) return

    const canvas = document.createElement('canvas')
    canvas.width = containerSize.width
    canvas.height = containerSize.height

    containerRef.current.append(canvas)
    return canvas // на всякий случай
  }
}

export default useCreateCanvas