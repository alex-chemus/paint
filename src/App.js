import React, { useEffect, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useThrottle from './hooks/useThrottle'
// components
import CanvasContainer from './components/CanvasContainer/CanvasContainer'
import Leftbar from './components/Leftbar/Leftbar'
import Rightbar from './components/Rightbar/Rightbar'
import Topbar from './components/Topbar/Topbar'
import render from './templates/render'

function App() {
  /*
    todos:
    - сделать валидацию (достаточно широкий экран, мышь) и элемент-ворнинг
  */

  const dispatch = useDispatch()
  const containerSize = useSelector(state => state.containerSize)
  const canvasObjects = useSelector(state => state.canvasObjects)

  const mouseTarget = useRef(null)
  const rightbarRef = useRef(null)
  const ctrl = useRef(false)

  const download = useCallback((canvas, filename) => {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;
  
    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;
  
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/png;base64");
  
    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
  
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }, [])

  // из-за того, что у юз колбека нет зависимостей, он не обновляется при 
  // изменении стейта/стора
  const save = useCallback((canvasObjects, containerSize) => {
    const objects = [...canvasObjects]
    const size = [...containerSize]
    const canvas = document.createElement('canvas')
    canvas.width = size.width
    canvas.height = size.height

    objects
      .sort((a, b) => a.z > b.z)
      .map(item => { return { ...item, canvas } })
      .forEach(item => render(item, size, size, ()=>{}, false))

    download(canvas, 'image.png')
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
        if (ctrl.current) save(canvasObjects, containerSize)
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
    if (e.code === 'KeyS' && ctrl.current) e.preventDefault()
    if (e.key === 'Control') ctrl.current = true
  }, [])

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
      <Topbar
        save={save}/>
      <Leftbar/>
      <Rightbar
        reference={rightbarRef}/>
      <CanvasContainer/>
    </>
  );
}

export default App;