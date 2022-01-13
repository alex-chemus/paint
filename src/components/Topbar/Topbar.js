import React from 'react'
import classes from './Topbar.module.scss'
import { useDispatch, useSelector } from 'react-redux'

const Topbar = ({ save }) => {
  const dispatch = useDispatch() 
  const canvasObjects = useSelector(state => state.canvasObjects)
  const containerSize = useSelector(state => state.containerSize)

  return (
    <div className={classes.Topbar}>
      <button 
        className={classes.save}
        onClick={() => save(canvasObjects, containerSize)}
      >
        Save
      </button>

      <button 
        className={classes.clear}
        onClick={() => {
          dispatch({ type: 'clear' })
        }}
      >
        Clear
      </button>

      <button 
        className={classes.prev}
        onClick={() => {
          dispatch({ type: 'undo' })
        }}
      >
        Undo
      </button>
    </div>
  )
}

export default Topbar