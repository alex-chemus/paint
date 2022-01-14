import React, { useRef, useEffect, useState } from 'react'
import classes from './CanvasContainer.module.scss'
//import EasyC from '../../EasyC'
import render from '../../templates/render'
import { useSelector, useDispatch } from 'react-redux'
// templates
import setCircle from '../../templates/circle'
import setRectangle from '../../templates/rectangle'
import setLine from '../../templates/line'
import setTriangle from '../../templates/triangle'
import setText from '../../templates/text'
import setHanlders from '../../templates/image'

const CanvasContainer = () => {
  // state, refs
  const startPosition = useRef(null)
  const endPosition = useRef(null)
  const clicked = useRef(false)
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [currentObject, setCurrentObject] = useState()


  // store
  const canvasObjects = useSelector(state => state.canvasObjects)
  const currentTool = useSelector(state => state.currentTool)
  const canvasVersions = useSelector(state => state.canvasVersions)
  const interimVersions = useSelector(state => state.interimVersions)
  const currentLayer = useSelector(state => state.currentLayer)
  const containerWidth = useSelector(state => state.containerSize.width)
  const containerHeight = useSelector(state => state.containerSize.height)
  const dispatch = useDispatch()


  //effects
  // rerender all changes in store
  useEffect(() => {
    if (!containerRef?.current) return
    if (!canvasObjects[0]?.canvas) {
      if (canvasObjects[0].end.x === 1) return
      dispatch({
        type: 'add init canvas',
        value: createCanvas(containerRef)
      })
      canvasObjects.forEach(item => {
        const size = { // container size
          width: containerWidth || document.body.clientWidth - 266 - 85,
          height: containerHeight || document.body.clientWidth - 100
        }
        render(item, size, size)
      })
      return
    }
    if (canvasObjects.length <= 1 && canvasVersions.length <= 1) return

    // nextFull - полный массив новых объектов
    // prevFull - полный массив предыдущих объектов
    const nextFull = [...canvasObjects]
    const versions = [...canvasVersions].concat([...interimVersions])
    const prevFull = [...versions[versions.length-2]]

    // из prevFull и nextFull убираются общие объекты
    const [prev, next] = removeDuplicates(prevFull, nextFull)

    // объекты, которых нет в новой версии, удаляются из контейнера
    prev.forEach(item => item.canvas.remove())

    // новые объекте, которых раньше не было, или были изменения в самом объекте, рендерятся 
    console.log(next.sort((a, b) => a.z > b.z))
    next.sort((a, b) => a.z > b.z/* ? 1 : -1*/).forEach(item => {
      // если объекта раньше не было и в контейнере нет соответсвующего канваса,
      // добавить объект по z, чтобы соблюдались слои
      if (!containerRef.current.contains(item.canvas)) {
        const prevElem = containerRef.current.querySelector(`[data-z="${item.z-1}"]`)
        prevElem.after(item.canvas)
      }
      const size = { // container size
        width: containerWidth || document.body.clientWidth - 266 - 85,
        height: containerHeight || document.body.clientWidth - 266 - 85
      }
      render(item, size, size)
    })
  }, [canvasObjects])

  // render currentObject on change
  useEffect(() => {
    if (!currentObject || !containerRef) return
    const size = {
      width: containerWidth,
      height: containerHeight
    }
    render(currentObject, size, size)
  }, [currentObject])

  // insert text for image drag'n'drop and set/reset drag'n'drop handlers
  useEffect(() => {
    if (currentTool === 'image') {
      /*
        когда задаётся инструмент имадж, создать канвас для текста-ворнинга
        и задать текущий объект текстом. потом, когда изменится инструмент (в else), 
        удалить ссылку и очистить currentObject
      */
      textRef.current = createCanvas(containerRef)
      setCurrentObject(setText({
        coords: {
          x: containerWidth / 2, 
          y: containerHeight / 2
        }, 
        size: {
          width: containerWidth,
          height: containerHeight
        }, 
        params: {
          fill: '#ccc',
          value: 'Drag an image here',
          canvas: textRef.current,
          id: Date.now(),
          z: canvasObjects.length + 1,
        }
      }))
    } else {
      setCurrentObject()
      textRef.current?.remove()
    }

    // вспомогательные функции, которые имеют скоуп этого компонента,
    // чтобы вызвать их внутри setHandlers
    const addImage = img => dispatch({ type: 'add canvas object', value: img })
    const createCanvasWrapper = (width, height) => {
      const containerWidth = width
      const containerHeight = height
      return createCanvas
    }
    // функция, удаляющая текст при дропе
    const removeText = () => {
      textRef.current?.remove()
      setCurrentObject()
    }
    // setHandlers устанавливает хэндлеры для контейнера для 
    // drag-ивентов, возвращает функцию-клинер, которая вызвается
    // перед следующим инструментом (для оптимизации)
    const removeHanlders = setHanlders(
      containerRef, 
      currentTool, 
      addImage, 
      createCanvasWrapper(containerWidth, containerHeight),
      canvasObjects.find(item => item.z === canvasObjects.length),
      removeText 
    )
    return removeHanlders
  }, [currentTool])

  useEffect(() => {
    if (!containerRef.current) return
    dispatch({
      type: 'set size',
      value: {
        width: document.body.clientWidth - 266 - 85,
        height: document.body.clientHeight - 100
      }
    })
  }, [containerRef.current])


  // utility methods
  function treesEqual(tree1, tree2) {
    // проверка на соответсвие ключей деревьев друг другу
    for (let key in tree1) {
      if (!Object.keys(tree2).includes(key)) return false
    }
    for (let key in tree2) {
      if (!Object.keys(tree1).includes(key)) return false
    }
    // проверка на соответствие значений деревьев
    for (let i=0; i<Object.values(tree1).length; i++) {
      const arr1 = Object.values(tree1).sort() // значения первого дерева
      const arr2 = Object.values(tree2).sort() // значения второго дерева

      if (typeof arr1[i] !== 'object') { 
        // не объект, проверка по примитивам
        if (arr1[i] !== arr2[i]) { 
          return false
        }
      } else if (arr1[i] instanceof HTMLElement && arr2[i] instanceof HTMLElement) {
        // html-объект, пропускаем
      } else if (typeof arr1[i] === typeof arr2[i] && arr1[i] && arr2[i]) {
        // два объекта, рекурсия
        if ( !treesEqual(arr1[i], arr2[i]) ) { 
          return false
        }
      } // другой случай - оба значения null, проходит проверку всегда
    }
  
    return true
  }

  function removeDuplicates(prevOrig, nextOrig) {
    const prev = [...prevOrig]
    const next = [...nextOrig]
    while (true) {
      let removed = false
      next.forEach((nextItem, i) => {
        prev.forEach((prevItem, j) => {
          if ( treesEqual(nextItem, prevItem) ) {
            prev.splice(j, 1)
            next.splice(i, 1)
            removed = true
          }
        })
        return
      })
      if (!removed) break
    }

    return [prev, next]
  }

  function createCanvas(containerRef) {
    if (!containerRef?.current) return
    const canvas = document.createElement('canvas')
    canvas.width = containerWidth
    canvas.height = containerHeight
    containerRef.current.append(canvas)
    return canvas
  }


  // methods
  function draw(s, e) {
    const start = !startPosition.current && s
    const end = !endPosition.current && e

    const topObject = canvasObjects.find(item => item.z === canvasObjects.length)
    switch (currentTool) {
      case 'circle':
        setCurrentObject(setCircle({
          startPosition: startPosition.current ?? start,
          endPosition: endPosition.current ?? end,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          }
        }))
        break
      
      case 'rectangle':
        setCurrentObject(setRectangle({
          startPosition: startPosition.current ?? start,
          endPosition: endPosition.current ?? end,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          }
        }))
        break

      case 'line':
        setCurrentObject(setLine({
          startPosition: startPosition.current ?? start,
          endPosition: endPosition.current ?? end,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          },
        }))
        break

      case 'triangle':
        setCurrentObject(setTriangle({
          startPosition: startPosition.current ?? start,
          endPosition: endPosition.current ?? end,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          },
        }))
        break

      default: 
        break
    }
  }

  function setCoords(event, func=()=>{}, callback=()=>{}) {
    // координаты в пикселях
    //const coordX = event.clientX-85
    //const coordY = event.clientY-50
    // координаты относительно холста
    //const coords = {
    //  x: coordX / containerWidth,
    //  y: coordY / containerHeight
    //}
    const coords = {
      x: event.clientX-85,
      y: event.clientY-50
    }

    func(coords)
    callback(coords)
    return coords
  }

  /*
    при mousedown:
      задаётся startPosition (возвращается start на время, пока setStartPosition
      не сработает)
      задаётся endPosition (возвращается end на время, пока setEndPosition не сработает)
      вызывается функция draw
    при move:
      меняется endPosition => draw всё перерисовывает
    при mouseup:
      задаётся endPosition
      startPosition и endPosition передаются в dispatch
  */

  function setStart(event) {
    if (currentTool === 'move') {
      if (currentLayer === 0) return // base sheet
      setCoords(event, value => startPosition.current = value, () => {
        endPosition.current = null
        clicked.current = true
      })
      return 
    }                                 
    const start = setCoords(event, value => startPosition.current = value, (coords) => {
      if (currentTool === 'text') {
        const topObject = canvasObjects.find(item => item.z === canvasObjects.length)
        dispatch({
          type: 'add canvas object',
          value: setText({coords, size: {
            width: containerWidth,
            height: containerHeight,
          }, params: {
            canvas: createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          }})
        })
      }
      endPosition.current = null
      clicked.current = currentTool !== 'text'
    })
    const end = setCoords(event, value => endPosition.current = value)
    /*
      setStartPosition и setEndPosition не успевают отрабатывать
       => draw не работает => setCurrentObject равен null => 
       setEnd не отрабатывает при первом тригере, когда юзер только нажал
    */
    draw(start, end)
  }

  function setEnd(event) {
    if (!startPosition.current) return
    if (currentTool === 'move') {
      setCoords(event, value => endPosition.current = value, coords => {
        if (currentLayer === 0) return
        const layer = canvasObjects.find(item => item.id === currentLayer)
        const delta = {
          x: coords.x - startPosition.current.x,
          y: coords.y - startPosition.current.y
        }
        layer.canvas.style = ''
        dispatch({
          type: 'move object',
          value: delta
        }) 
        clicked.current = false
        setCurrentObject(null)
        startPosition.current = null
        endPosition.current = null
      })
      return
    }
    setCoords(event, value => endPosition.current = value, (coords) => {
      if (!currentObject) return
      clicked.current = false
      dispatch({
        type: 'add canvas object',
        value: currentObject
      })
      setCurrentObject(null)
      startPosition.current = null
      endPosition.current = null
    })
  }

  function onMove(event) {
    if (!clicked.current) return
    if (currentTool === 'move') {
      setCoords(event, value => endPosition.current = value, coords => {
        if (currentLayer === 0) return
        const layer = canvasObjects.find(item => item.id === currentLayer)
        const delta = {
          x: coords.x - startPosition.current.x,
          y: coords.y - startPosition.current.y
        }

        layer.canvas.style.top = `${delta.y}px`
        layer.canvas.style.left = `${delta.x}px`
      })
    }
    setCoords(event, value => endPosition.current = value, draw)
  } 


  const cls = [classes.CanvasContainer]
  cls.push(currentTool==='move' ? classes['cursor-grab'] : classes['cursor-crosshair'])

  return (
    <div 
      className={cls.join(' ')} 
      ref={containerRef}
      onMouseDown={setStart}
      onMouseUp={setEnd}
      onMouseLeave={setEnd}
      onMouseMove={onMove}
      width={containerWidth}
      height={containerHeight}
    ></div>
  )
}

export default CanvasContainer