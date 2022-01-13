import React, { useEffect, useRef, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useThrottle from './hooks/useThrottle'
// components
import CanvasContainer from './components/CanvasContainer/CanvasContainer'
import Leftbar from './components/Leftbar/Leftbar'
import Rightbar from './components/Rightbar/Rightbar'
import Topbar from './components/Topbar/Topbar'

function App() {
  /*
    todos:
    - сделать валидацию (достаточно широкий экран, мышь) и элемент-ворнинг
    - добавить сохранение документа
  */

  const dispatch = useDispatch()

  const mouseTarget = useRef(null)
  const rightbarRef = useRef(null)
  const ctrl = useRef(false)

  const save = useCallback(() => {

  }, [])

  const onKeyUp = useCallback(e => {
    if (e.key === 'Control') ctrl.current = false
    if (rightbarRef.current.contains(mouseTarget.current)) return
    switch (e.code) {
      case 'ControlLeft':
      case 'ContronRight':
        ctrl.current = true
        break

      case 'KeyM':
        dispatch({
          type: 'set tool',
          value: 'move'
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
        // +  ctrl - save
        break

      default:
        break
    }
  }, [])

  const onMouseMove = useThrottle(
    useCallback(e => {
      mouseTarget.current = e.target
    }, []), 100)

  const onKeyDown = useCallback(e => {
    if (e.key === 'Control') ctrl.current = true
  })

  useEffect(() => {
    document.addEventListener('keyup', onKeyUp)
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <>
      <Topbar/>
      <Leftbar/>
      <Rightbar
        reference={rightbarRef}/>
      <CanvasContainer/>
    </>
  );
}

export default App;