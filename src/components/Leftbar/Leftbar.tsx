import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classes from './Leftbar.module.scss'
import { IState, Tool } from '@/types'

const Leftbar = () => {
  const container = useRef<HTMLDivElement | null>(null)
  // adjust the bar vertically on mounted
  useEffect(() => {
    if (container.current)
      container.current.style.top = `calc(50% - ${container.current.offsetHeight/2}px)`
  }, [])

  const tool = useSelector((state: IState) => state.currentTool)
  const dispatch = useDispatch()

  const changeTool = (newTool: Tool) => {
    dispatch({
      type: 'set tool',
      value: newTool
    })
  }

  return (
    <div 
      className={classes.Leftbar}
      ref={container}
    >
      <button 
        className={`${classes.move} ${tool==='move' ? classes.selected : ''}`}
        onClick={() => changeTool('move')}
        title='M - move'
      >
        <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="11.4718" y1="0.641021" x2="21.0872" y2="25.641" stroke="currentColor" stroke-width="2"/>
          <line y1="-1" x2="26.7854" y2="-1" transform="matrix(-0.358979 0.933346 0.933346 0.358979 12.4615 1)" stroke="currentColor" stroke-width="2"/>
          <line x1="2.33163" y1="25.1425" x2="11.947" y2="19.3733" stroke="currentColor" stroke-width="2"/>
          <line y1="-1" x2="11.2134" y2="-1" transform="matrix(-0.857493 -0.514496 -0.514496 0.857493 20.1538 26)" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button 
        className={`${classes.line} ${tool==='line' ? classes.selected : ''}`}
        onClick={() => changeTool('line')}
        title='L - line'
      >
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.707107" y1="1.29289" x2="25.7071" y2="26.2929" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button 
        className={`${classes.circle} ${tool==='circle' ? classes.selected : ''}`}
        onClick={() => changeTool('circle')}
        title='O - circle'
      >
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12.5" cy="12.5" r="11.5" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button 
        className={`${classes.triangle} ${tool==='triangle' ? classes.selected : ''}`}
        onClick={() => changeTool('triangle')}
        title='T - triangle'
      >
        <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.40673 17.75L11.5 2L20.5933 17.75H2.40673Z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button 
        className={`${classes.rectangle} ${tool==='rectangle' ? classes.selected : ''}`}
        onClick={() => changeTool('rectangle')}
        title='R - rectangle'
      >
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="23" height="23" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button 
        className={`${classes.text} ${tool==='text' ? classes.selected : ''}`}
        onClick={() => changeTool('text')}
        title='F - text'
      >
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5586 2.05664H7.53125V16H5.47949V2.05664H0.462891V0.359375H12.5586V2.05664Z" fill="currentColor"/>
        </svg>
      </button>

      <button 
        className={`${classes.image} ${tool==='image' ? classes.selected : ''}`}
        onClick={() => changeTool('image')}
        title='I - image'
      >
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="18" cy="7" r="3" fill="currentColor"/>
          <rect x="1" y="1" width="23" height="23" stroke="currentColor" stroke-width="2"/>
          <line x1="1.05675" y1="16.029" x2="7.05675" y2="10.029" stroke="currentColor" stroke-width="2"/>
          <line x1="5.6585" y1="10.2474" x2="21.6585" y2="24.2474" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
    </div>
  )
}

export default Leftbar