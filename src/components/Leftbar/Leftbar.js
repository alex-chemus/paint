import React, { useContext, useRef, useEffect } from 'react'
import classes from './Leftbar.module.scss'
import Context from '../../context/context' 

const Leftbar = () => {
  const { store } = useContext(Context)
  const container = useRef(null)
  
  // adjust the bar vertically on mount
  useEffect(() => {
    container.current.style.top = `calc(50% - ${container.current.offsetHeight}px)`
  }, [])

  return (
    <div 
      className={classes.Leftbar}
      ref={container}
    >
      <button className={classes.move}></button>

      <button className={classes.line}></button>

      <button className={classes.circle}></button>

      <button className={classes.triangle}></button>

      <button className={classes.rectangle}></button>

      <button className={classes.shape}></button>

      <button className={classes.text}></button>

      <button className={classes.image}></button>
    </div>
  )
}

export default Leftbar