import React, { useEffect, useState, useRef } from 'react'
import classes from './Rightbar.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import render from '../../templates/render'

const Rightbar = () => {
  // state
  const [objects, setObjects] = useState([])
  const [containerWidth, setContainerWidth] = useState(document.body.clientWidth - 266 - 85)
  const [containerHeight, setContainerHeight] = useState(document.body.clientHeight - 100)


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
      //console.log(objects)
    })
  }, [canvasObjects])


  // utility methods
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function calcMiniCanvas() {
    const maxWidth = 77
    const maxHeight = 40

    if (maxWidth*containerWidth < maxHeight*containerHeight) {
      const width = maxWidth
      const height = (maxWidth * containerHeight) / containerWidth
      return [width, height]
    } else {
      const height = maxHeight
      const width = (maxHeight * containerWidth) / containerHeight
      return [width, height]
    }
  }


  // methods
  function select(id) {
    dispatch({
      type: 'set current layer',
      value: id
    })
  }

  function drawCanvas(width, height, item) {
    const canvas = (
      <canvas width={width} height={height} data-id={item.id}></canvas>
    )
      
    setTimeout(() => {
      const elem = document.querySelector(`[data-id="${item.id}"]`)
      if (!elem) return
      const object = {
        ...item,
        canvas: elem
      }
      render(object, {width, height}, () => {
        const ctx = object.canvas.getContext('2d')
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, width, height)
      }) 
    });

    return canvas
  }


  // jsx-objects
  const layers = (
    <ul>  
      {
        objects.map(item => {
          const cls = [classes.layer]
          if (item.id === currentLayer) cls.push(classes.selected)
          const [width, height] = calcMiniCanvas()
          console.log('item from layer object: ', item)
          return (
            <li 
              className={cls.join(' ')}
              key={item.z}
              onClick={() => select(item.id)}
            >
              { drawCanvas(width, height, item) }
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