import React, { useState, useEffect } from 'react'
import classes from './Params.module.scss'

import { opacity, rotate, scale, start, end, stroke, fill,
shadow, x, y, width, height, font } from './ParamItems/exports'

const Params = ({ object: layer, updateObjects }) => {
  const [object, setObject] = useState(layer) 
  useEffect(() => setObject(layer), [layer])

  return (
    <ul className={classes.Params}> {
      Object.keys(object).map((param, i) => {
        let func = () => {}
        switch (param) {
          case 'opacity':
            func = opacity
            break

          case 'rotate':
            func = rotate
            break

          case 'scale':
            func = scale
            break

          case 'start':
            func = start
            break

          case 'end':
            func = end
            break

          case 'stroke':
            func = stroke
            break

          case 'fill':
            func = fill
            break

          case 'shadow':
            func = shadow
            break

          case 'x':
            func = x
            break

          case 'y':
            func = y
            break

          case 'width':
            func = width
            break

          case 'height':
            func = height
            break

          case 'font':
            func = font
            break

          default: 
            return null
        }
        return (
          <React.Fragment key={i}>
            { func(param, {object, setObject, updateObjects}) }
          </React.Fragment>
        )
      })
    } </ul>
  )
}

export default Params