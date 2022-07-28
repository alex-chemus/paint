import React from 'react'
import classes from './Topbar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useSave } from '@/hooks'

const Topbar = () => {
  const dispatch = useDispatch() 
  const save = useSave()

  return (
    <div className={classes.Topbar}>
      <button 
        className={classes.save}
        onClick={save}
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