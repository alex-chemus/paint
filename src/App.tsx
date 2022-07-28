import React, { useEffect, useRef, useCallback } from 'react'
import { useThrottle, useAppKeyUp } from '@/hooks'
// components
import CanvasContainer from '@/components/CanvasContainer/CanvasContainer'
import Leftbar from '@/components/Leftbar/Leftbar'
import Rightbar from '@/components/Rightbar/Rightbar'
import Topbar from '@/components/Topbar/Topbar'
import Warning from '@/components/Warning/Warning'

function App() {
  /*
    todos:
    - сделать валидацию (достаточно широкий экран, мышь) и элемент-ворнинг
  */

  // eslint-disable-next-line
  const mouseTarget = useRef<EventTarget | null>(null)
  const ctrl = useRef(false)

  const { onKeyUp, rightbarRef } = useAppKeyUp({ ctrl, mouseTarget })
  
  const onMouseMove = useThrottle(
    useCallback(e => {
      mouseTarget.current = e.target
    }, []), 
  100)

  const onKeyDown = useCallback((e: KeyboardEvent) => {
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
  }, []) // eslint-disable-line

  return (
    <>
      <Topbar />
      <Leftbar />
      <Rightbar reference={rightbarRef}/>
      <CanvasContainer />
      <Warning />
    </>
  );
}

export default App;