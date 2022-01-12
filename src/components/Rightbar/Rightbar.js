import React, { useEffect, useState, useRef } from 'react'
import classes from './Rightbar.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import render from '../../templates/render'
import Params from './Params/Params'
import MiniCanvas from './Layer/MiniCanvas'
import Layer from './Layer/Layer'

const Rightbar = () => {
  // state
  const [objects, setObjects] = useState([])
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
    /*
      когда меняется canvasObject, создаётся объект, над которым будут
      производиться манипуляции, чтобы не диспатчить все измения
    */
    const array = [...canvasObjects].sort((a, b) => a.z > b.z ? 1 : -1)
    array.shift()
    setObjects(array)
  }, [canvasObjects])

  // меняет значения z для объектов по 2 индексам (prevI, nextI)
  // а также сортирует массив по новым значениям z
  function swapZ(prevI, nextI) {
    const list = objects
    const aboba = list[prevI].z
    list[prevI].z = list[nextI].z
    list[nextI].z = aboba
    list.sort((a, b) => a.z > b.z ? 1 : -1)
    setObjects(list)
    dispatch({
      type: 'swap objects',
      value: [canvasObjects[0], ...list]
    })
  }

  /*
    dragLayer:
      добавляет драгнутому элементу класс draged, отвечающий за 
      position relative
      глобально устанавливает offset (от верха элемента до контейнера)
      глоабльно устанавливает startTop (от верха элемента до места "захвата")
    moveLayer:
      кверит предыдущий и следующий элемент для драгнутого
      устанавливает значение top для элемента в shift
      если элемент сдвинули на его же высоту, то:
        вызывается swapZ, меняющая элементы порядков и по z
        всем элементам обнуляют стиль top
        заканчивается drag'n'drop, элементы остаются на новых местах
    dropLayer:
      отменяет стили и классы, заданные в dragLayer
  */

  function dragLayer(object, i, event, dragClass) {
    const li = event.currentTarget
    //li.classList.add(classes.draged)
    li.classList.add(dragClass)
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

  function dropLayer(object, i, event, dragClass) {
    //event.currentTarget.classList.remove(classes.draged)
    event.currentTarget.classList.remove(dragClass)
    setClicked(false)
    setObjects(objects.map((item, j) => {
      if (i !== j) return item
      return {
        ...item,
        style: { top: null }
      }
    }))
  }

  function updateObjects(object={}) {
    for (let i=0; i<objects.length; i++) {
      if (objects[i].id !== object.id) continue
      const list = objects
      list.splice(i, 1, object)
      setObjects(list)
      dispatch({
        type: 'change params',
        value: [canvasObjects[0], ...list]
      })
    }
  }

  return (
    <aside
      className={classes.Rightbar} 
    >
      <section className={classes.layers}>
        <h2>Layers</h2>
        <ul> {
          objects.map((item, i) => (
            <Layer
              object={item}
              key={i}
              i={i}
              dragLayer={dragLayer}
              dropLayer={dropLayer}
              moveLayer={moveLayer}/>
          ))
        } </ul>
      </section>

      <div className={classes.line}></div>
      
      <section className={classes.params}>
        <h2>Parameters</h2>
        { objects.filter(item => item.id === currentLayer).map((item, i) => {
          return (<Params object={item} updateObjects={updateObjects} key={i} />)
        })}
      </section>
    </aside>
  )
}

export default Rightbar