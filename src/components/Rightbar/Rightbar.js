import React, { useEffect, useState, useRef } from 'react'
import classes from './Rightbar.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import render from '../../templates/render'

const Rightbar = () => {
  // state
  const [objects, setObjects] = useState([])
  const [containerWidth, setContainerWidth] = useState(document.body.clientWidth - 266 - 85)
  const [containerHeight, setContainerHeight] = useState(document.body.clientHeight - 100)
  const [startY, setStartY] = useState()
  const [startTop, setStartTop] = useState()
  const [endY, setEndY] = useState()
  const [clicked, setClicked] = useState()


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

  function swapElements(nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
    // Move `nodeA` to before the `nodeB`
    nodeB.parentNode.insertBefore(nodeA, nodeB);
    // Move `nodeB` to before the sibling of `nodeA`
    parentA.insertBefore(nodeB, siblingA);
  }

  function swapObjects(prevIndex, nextIndex) {
    const prev = objects[prevIndex]
    const next = objects[nextIndex]
    objects.slice(prevIndex, 2, next, prev)
  }

  function swapZ(prevI, nextI) {
    const list = objects
    const aboba = list[prevI].z
    list[prevI].z = list[nextI].z
    list[nextI].z = aboba
    list.sort((a, b) => a.z > b.z ? 1 : -1)
    setObjects(list)
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

  function dragLayer(object, i, event) {
    const li = event.currentTarget
    li.classList.add(classes.draged)
    const offset = (objects.length-1-i)*50
    setStartY(event.clientY - offset - 50 - 79)
    setStartTop(offset)
    setClicked(true)
  }

  function moveLayer(object, i, event) {
    if (!clicked) return
    const y = event.clientY
    const li = event.currentTarget
    const prev = li.previousElementSibling
    const next = li.nextElementSibling
    // y coordinate from original location
    const shift = y - 50 - 79 - startTop - startY
    
    // element is dragged down
    if (shift > li.clientHeight && prev) {
      swapZ(i, i-1)
      const offset = (objects.length-i)*50
      setObjects(objects.map((item, j) => {
        if (i-1 !== j) return item 
        return {
          ...item,
          style: {
            top: '0px'
          }
        }
      }))
      setStartTop(offset)
    } else if (-shift > li.clientHeight && next) {
      swapZ(i, i+1)
      const offset = (objects.length-i)*50
      setObjects(objects.map((item, j) => {
        if (i+1 !== j) return item 
        return {
          ...item,
          style: {
            top: '0px'
          }
        }
      }))
      setStartTop(offset)
    } else {
      setObjects(objects.map((item, j) => {
        if (i !== j) return item
        return {
          ...item,
          style: {
            top: `${shift}px`
          }
        }
      }))
    }
    setEndY(y)
  }

  function dropLayer(object, i, event) {
    event.currentTarget.classList.remove(classes.draged)
    console.log('drop layer')
    setClicked(false)
    setObjects(objects.map((item, j) => {
      if (i !== j) return item
      return {
        ...item,
        style: { top: null }
      }
    }))
  }

  function renderItem(object, i) {
    const [width, height] = calcMiniCanvas()
    const cls = [classes.layer]
    object?.class && cls.push(object.class)
    if (object.id === currentLayer) cls.push(classes.selected)
    return (
      <li
        className={cls.join(' ')}
        key={object.z}
        onClick={() => select(object.id)}
        onMouseDown={e => dragLayer(object, i, e)}
        onMouseUp={e => dropLayer(object, i, e)}
        onMouseLeave={e => dropLayer(object, i, e)}
        onMouseMove={e => moveLayer(object, i, e)}
        style={object?.style}
      >
        { drawCanvas(width, height, object) }
        { capitalizeFirstLetter(object.type) }
      </li>
    )
  }


  return (
    <aside
      className={classes.Rightbar} 
    >
      <section className={classes.layers}>
        <h2>Layers</h2>
        <ul> {
          objects.map(renderItem)
        } </ul>
      </section>

      <div className={classes.line}></div>
      <section></section>
    </aside>
  )
}

export default Rightbar