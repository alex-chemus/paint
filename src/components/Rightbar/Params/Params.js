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

  const rotate = value => {}

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
        switch (param) {
          case 'opacity':
            return (
              <React.Fragment key={i}>
                { opacity(param) }
              </React.Fragment>
            ) //opacity(object[param])

          default: 
            return null
        }
      })
    } </ul>
  )
}

export default Params