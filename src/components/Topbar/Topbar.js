import React from 'react'
import classes from './Topbar.module.scss'
import { useDispatch } from 'react-redux'

const Topbar = () => {
  const dispatch = useDispatch() 

  return (
    <div className={classes.Topbar}>
      <button className={classes.save}>
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