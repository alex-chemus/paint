import React, { useState, useEffect } from 'react'
import classes from './Params.module.scss'

const Params = ({ object: layer, updateObjects }) => {
  const [object, setObject] = useState(layer) 
  useEffect(() => setObject(layer), [layer])

  const opacity = param => {
    return (
      <li>
        <p>Opacity</p>
        <input 
          type='text' 
          value={`${object[param]}%`}
          onChange={e => {
            setObject({
              ...object,
              [param]: e.target.value.slice(0, -1)
            })
          }}
          onBlur={() => {
            const list = object
            Object.keys(list).forEach(key => {
              if (key !== 'opacity') return
              list[key] = +list[key]
            })
            updateObjects(list)
          }}/>
      </li>
    )
  }

  const rotate = param => {
    const toDegrees = radians => {
      console.log(+radians * 180 / Math.PI)
      return (+radians * 180 / Math.PI).toFixed(0)
    }
    const test = () => {
      return object[param]
    }
    return (
      <li>
        <p>Rotate</p>
        <input
          type='text'
          value={`${object[param].length!==0 && !isNaN(+object[param]) ? toDegrees(object[param]) : test()}°`}
          onChange={e => {
            const value = e.target.value.slice(0, -1)
            if (value === '') {
              setObject({
                ...object,
                [param]: ''
              })
            } else if (isNaN(+value)) {
              console.log('target value:', e.target.value.slice(0, -1))
              setObject({
                ...object,
                [param]: e.target.value.slice(0, -1)
              })
            } else {
              const radians = +value>360 ? (360 * Math.PI / 180) : (+value * Math.PI / 180)
              setObject({
                ...object,
                [param]: `${radians}`
              })
            }
          }}
          onBlur={() => {
            const list = object
            Object.keys(list).forEach(key => {
              if (key !== 'rotate') return
              list[key] = +list[key]
            })
            updateObjects(list)
          }}/>
      </li>
    )
  }

  const scale = value => {}

  const start = value => {}

  const end = value => {}

  const stroke = value => {}

  const fill = value => {}

  const shadow = value => {}

  const x = value => {}

  const y = value => {}

  const width = value => {}

  const height = value => {}

  const font = value => {}

  const value = value => {}

  const textAlign = value => {}

  const base = value => {}

  return (
    <ul className={classes.Params}> {
      Object.keys(object).map((param, i) => {
        let func = () => {}
        switch (param) {
          case 'opacity':
            func = opacity
            break
            /*return (
              <React.Fragment key={i}>
                { opacity(param) }
              </React.Fragment>
            )*/ //opacity(object[param])

          case 'rotate':
            func = rotate
            break

          default: 
            return null
        }
        return (
          <React.Fragment key={i}>
            { func(param) }
          </React.Fragment>
        )
      })
    } </ul>
  )
}

export default Params