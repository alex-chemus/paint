import React, { useEffect, useState, useRef } from 'react'
import classes from './Rightbar.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import render from '../../templates/render'
import Params from './Params/Params'

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
    /*
      когда меняется canvasObject, создаётся объект, над которым будут
      производиться манипуляции, чтобы не диспатчить все измения
    */
    const array = [...canvasObjects].sort((a, b) => a.z > b.z ? 1 : -1)
    array.shift()
    setObjects(array)
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


  // methods
  // выбирает текущий слой при клике
  function select(id) {
    dispatch({
      type: 'set current layer',
      value: id
    })
  }

  // отрисовывает канвас для каждого слоя, принимает ширину и высоту
  // канваса для слоя и сам объект
  function drawCanvas(width, height, item) {
    const canvas = (
      <canvas width={width} height={height} data-id={item.id}></canvas>
    )
    
    // асинхронно выполнить код, кода канвас вставится в dom
    setTimeout(() => {
      // элемент канваса, связян с js-кодом таким костылём
      const elem = document.querySelector(`[data-id="${item.id}"]`)
      if (!elem) return
      // создаёт отдельный объект, но при этом с ссылкой на мини-канвас
      const object = {
        ...item,
        canvas: elem
      }
      // рендерит мини-канвас, при этом делая заливку фона
      render(object, {width, height}, () => {
        const ctx = object.canvas.getContext('2d')
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, width, height)
      }) 
    });

    return canvas
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
    setClicked(false)
    setObjects(objects.map((item, j) => {
      if (i !== j) return item
      return {
        ...item,
        style: { top: null }
      }
    }))
  }

  function removeObject(event) {
    const btn = event.currentTarget
    const id = +btn.dataset.id
    dispatch({
      type: 'remove object',
      value: id
    })
  }

  function renderItem(object, i) {
    const [width, height] = calcMiniCanvas()
    const cls = [classes.layer]
    object?.class && cls.push(object.class)
    if (object.id === currentLayer) cls.push(classes.selected)
    return (
      <li
        className={cls.join(' ')}
        key={i}
        onClick={e => {
          if (e.target.tagName === 'BUTTON') return
          select(object.id)
        }}
        onMouseDown={e => dragLayer(object, i, e)}
        onMouseUp={e => dropLayer(object, i, e)}
        onMouseLeave={e => dropLayer(object, i, e)}
        onMouseMove={e => moveLayer(object, i, e)}
        style={object?.style}
      >
        { drawCanvas(width, height, object) }
        { capitalizeFirstLetter(object.type) }
        <button
          data-id={object.id}
          onClick={removeObject}
        ></button>
      </li>
    )
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

  useEffect(() => {
    //console.log('current object:', objects.filter(item => item.id === currentLayer))
  }, [objects])

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
      
      <section className={classes.params}>
        <h2>Parameters</h2>
        { objects.filter(item => item.id === currentLayer).map((item, i) => {
          //console.log('current object in return:', item)
          return (<Params object={item} updateObjects={updateObjects} key={i} />)
        })}
      </section>
    </aside>
  )
}

export default Rightbar