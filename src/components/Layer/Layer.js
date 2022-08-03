import React, { useEffect, useState } from 'react'
import classes from './Layer.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import MiniCanvas from './MiniCanvas'

const Layer = ({ object, i, dragLayer, dropLayer, moveLayer }) => {
  const containerSize = useSelector(state => state.containerSize)
  const [size, setSize] = useState(calcMiniCanvas())
  const currentLayer = useSelector(state => state.currentLayer)
  const dispatch = useDispatch()

  useEffect(() => {
    setSize(calcMiniCanvas())
  }, [containerSize])

  function calcMiniCanvas() {
    const maxWidth = 77
    const maxHeight = 40

    const {width: containerWidth, height: containerHeight} = containerSize
    if (maxWidth * containerWidth < maxHeight * containerHeight) {
      const width = maxWidth
      const height = (maxWidth * containerHeight) / containerWidth
      return {width, height}
    } else {
      const height = maxHeight
      const width = (maxHeight * containerWidth) / containerHeight
      return {width, height}
    }
  }

  const select = id => {
    dispatch({
      type: 'set current layer',
      value: id
    })
  }

  const removeObject = event => {
    const btn = event.currentTarget
    const id = +btn.dataset.id
    dispatch({
      type: 'remove object',
      value: id
    })
  }

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const onClick = e => {
    if (e.target.tagName === 'BUTTON') return
    select(object.id)
  }

  const cls = [classes.Layer]
  currentLayer===object.id && cls.push(classes.selected)
  object?.class && cls.push(object.class)

  return (
    <li
      className={cls.join(' ')}
      key={i}
      onClick={onClick}
      style={object?.style}
      onMouseDown={e => dragLayer(object, i, e, classes.draged)}
      onMouseUp={e => dropLayer(object, i, e, classes.draged)}
      onMouseLeave={e => dropLayer(object, i, e, classes.draged)}
      onMouseMove={e => moveLayer(object, i, e)}  
    >
      <MiniCanvas
        width={size.width}
        height={size.height}
        object={object}/>
      { capitalizeFirstLetter(object.type) }
      <button
        data-id={object.id}
        onClick={removeObject}
      ></button>
    </li>
  )
}

export default Layer