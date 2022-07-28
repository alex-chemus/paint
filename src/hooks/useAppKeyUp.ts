import { MutableRefObject, useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import useSave from './useSave'

interface UseAppKeyUp {
  ctrl: MutableRefObject<boolean>,
  mouseTarget: MutableRefObject<EventTarget | null>
}

const useAppKeyUp = ({ ctrl, mouseTarget }: UseAppKeyUp) => {
  const dispatch = useDispatch()
  const rightbarRef = useRef<HTMLElement>(null)
  const save = useSave()

  const callback = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Control') ctrl.current = false
    const contains = rightbarRef.current?.contains(mouseTarget.current as Node)
    if (contains) return

    switch(e.code) {
      case 'ControlLeft':
      case 'ControlRight':
        ctrl.current = true
        break

      case 'KeyM':
        dispatch({
          type: 'set tool',
          value: 'move',
        })
        break

      case 'KeyL':
        dispatch({
          type: 'set tool',
          value: 'line'
        })
        break

      case 'KeyO':
        dispatch({
          type: 'set tool',
          value: 'circle'
        })
        break

      case 'KeyT':
        dispatch({
          type: 'set tool',
          value: 'triangle'
        })
        break

      case 'KeyR':
        dispatch({
          type: 'set tool',
          value: 'rectangle'
        })
        break

      case 'KeyF':
        dispatch({
          type: 'set tool',
          value: 'text'
        })
        break

      case 'KeyI':
        dispatch({
          type: 'set tool',
          value: 'image'
        })
        break

      case 'KeyZ':
        if (ctrl.current) dispatch({ type: 'undo' })
        break

      case 'KeyC':
        if (ctrl.current) dispatch({ type: 'clear' })
        break

      case 'KeyS':
        if (ctrl.current) save()
        break

      default:
        break;
    }
  }, [])

  return { onKeyUp: callback, rightbarRef }
}

export default useAppKeyUp