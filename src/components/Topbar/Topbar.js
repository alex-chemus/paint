import React, { useContext } from 'react'
import classes from './Topbar.module.scss'
import Context from '../../context/context'

const Topbar = () => {
  const { store } = useContext(Context)
  
  return (
    <div className={classes.Topbar}>
      <button className={classes.save}>
        Save
      </button>

      <button className={classes.prev}>
      </button>

      <button className={classes.next}>
      </button>
    </div>
  )
}

export default Topbar