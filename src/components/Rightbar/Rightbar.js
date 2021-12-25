import React, { useEffect, useState } from 'react'
import classes from './Rightbar.module.scss'
import { useSelector, useDispatch } from 'react-redux'

const Rightbar = () => {
  // state
  const [objects, setObjects] = useState([])


  // store
  const canvasObjects = useSelector(state => state.canvasObjects)
  const currentLayer = useSelector(state => state.currentLayer)
  const dispatch = useDispatch()


  // effects
  useEffect(() => {
    const array = [...canvasObjects].sort((a, b) => a.z > b.z ? 1 : -1)
    array.shift()
    setObjects(array)
    setTimeout(() => {
      console.log(objects)
    })
  }, [canvasObjects])

  useEffect(() => {
    console.log('current layer: ', currentLayer)
  }, [currentLayer])


  // utility methods
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // methods
  function select(id) {
    dispatch({
      type: 'set current layer',
      value: id
    })
  }


  // jsx-objects
  const layers = (
    <ul className={classes.layers}> 
      {
        objects.map(item => {
          const cls = [classes.layer]
          if (item.id === currentLayer) cls.push(classes.selected)
          return (
            <li 
              className={cls.join(' ')}
              key={item.z}
              onClick={() => select(item.id)}
            >
              { capitalizeFirstLetter(item.type) }
            </li>
          )
        })
      } 
    </ul>
  )


  return (
    <aside
      className={classes.Rightbar} 
    >
      <section className={classes.layers}>
        <h2>Layers</h2>
        { layers }
      </section>

      <div className={classes.line}></div>
      <section></section>
    </aside>
  )
}

export default Rightbar