import React from 'react'
import classes from './Topbar.module.scss'
import { useDispatch } from 'react-redux'

const Topbar = () => {
  const dispatch = useDispatch() 

  const clear = () => {
    dispatch({ type: 'clear' })
  }

  return (
    <div className={classes.Topbar}>
      <button className={classes.save}>
        Save
      </button>

      <button 
        className={classes.clear}
        onClick={clear}
      >
        Clear
      </button>

      <button className={classes.prev}>
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 1.5L2 7.5L8 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <button className={classes.next}>
        <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13.5L7 7.5L1 1.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  )
}

export default Topbar