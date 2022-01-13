import React from 'react'
import classes from './Warning.module.scss'

const Warning = () => {
  return (
    <div className={classes.Warning} id='warning'>
      <p>Sorry, but your device is not supported</p>
    </div>
  )
}

export default Warning