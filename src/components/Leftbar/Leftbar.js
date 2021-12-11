import React, { useContext, useRef, useEffect } from 'react'
import classes from './Leftbar.module.scss'
import Context from '../../context/context' 

const Leftbar = () => {
  const { store } = useContext(Context)
  const container = useRef(null)
  
  // adjust the bar vertically on mount
  useEffect(() => {
    container.current.style.top = `calc(50% - ${container.current.offsetHeight/2}px)`
  }, [])

  return (
    <div 
      className={classes.Leftbar}
      ref={container}
    >
      <button className={classes.move}>
        <svg width="23" height="26" viewBox="0 0 23 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="11.4718" y1="0.641021" x2="21.0872" y2="25.641" stroke="white" stroke-width="2"/>
          <line y1="-1" x2="26.7854" y2="-1" transform="matrix(-0.358979 0.933346 0.933346 0.358979 12.4615 1)" stroke="white" stroke-width="2"/>
          <line x1="2.33163" y1="25.1425" x2="11.947" y2="19.3733" stroke="white" stroke-width="2"/>
          <line y1="-1" x2="11.2134" y2="-1" transform="matrix(-0.857493 -0.514496 -0.514496 0.857493 20.1538 26)" stroke="white" stroke-width="2"/>
        </svg>
      </button>

      <button className={classes.line}>
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="0.707107" y1="1.29289" x2="25.7071" y2="26.2929" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button className={classes.circle}>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12.5" cy="12.5" r="11.5" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button className={classes.triangle}>
        <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.40673 17.75L11.5 2L20.5933 17.75H2.40673Z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button className={classes.rectangle}>
        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="23" height="23" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button className={classes.shape}>
        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 3.23607L14.3554 8.9463L14.5799 9.63729H15.3064H21.3105L16.4531 13.1664L15.8653 13.5935L16.0898 14.2844L17.9452 19.9947L13.0878 16.4656L12.5 16.0385L11.9122 16.4656L7.0548 19.9947L8.91017 14.2844L9.13468 13.5935L8.54689 13.1664L3.68948 9.63729H9.69357H10.4201L10.6446 8.9463L12.5 3.23607Z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>

      <button className={classes.text}>
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5586 2.05664H7.53125V16H5.47949V2.05664H0.462891V0.359375H12.5586V2.05664Z" fill="currentColor"/>
        </svg>
      </button>

      <button className={classes.image}>
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