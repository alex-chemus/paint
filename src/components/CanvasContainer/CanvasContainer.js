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
  // state
  const [startPosition, setStartPosition] = useState(null)
  const [endPosition, setEndPosition] = useState(null)
  /* эти значения надо загнать в стейт, потом передавать в render, чтобы 
  расчитывать все значения относительно размера канваса */
  //const [containerWidth, setContainerWidth] = useState(document.body.clientWidth - 266 - 85)
  //const [containerHeight, setContainerHeight] = useState(document.body.clientHeight - 100)
  const [clicked, setClicked] = useState(false)
  const [currentObject, setCurrentObject] = useState()
  //const [textRef, setTextRef] = useState()


  // store
  const canvasObjects = useSelector(state => state.canvasObjects)
  const currentTool = useSelector(state => state.currentTool)
  const canvasVersions = useSelector(state => state.canvasVersions)
  const interimVersions = useSelector(state => state.interimVersions)
  const currentLayer = useSelector(state => state.currentLayer)
  const containerWidth = useSelector(state => state.containerSize.width)
  const containerHeight = useSelector(state => state.containerSize.height)
  const dispatch = useDispatch()


  // refs
  const containerRef = useRef(null)
  const textRef = useRef(null)


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
    /*const children = containerRef.current.children
    for (let i=0; i<children.length; i++) {
      children[i].remove()
    }
    canvasObjects.forEach(item => {
      containerRef.current.append(item.canvas)
      render(item, {
        width: containerWidth,
        height: containerHeight
      })
    })*/
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
    next.sort((a, b) => a.z > b.z ? 1 : -1).forEach(item => {
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
          x: 0.5, y: 0.5
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
      if (!Object.keys(tree2).includes(key)) {
        //console.log('not equal 1:', tree1, tree2)
        return false
      }
    }
    for (let key in tree2) {
      if (!Object.keys(tree1).includes(key)) {
        //console.log('not equal 2:', tree1, tree2)
        return false
      }
    }
    // проверка на соответствие значений деревьев
    for (let i=0; i<Object.values(tree1).length; i++) {
      const arr1 = Object.values(tree1).sort() // значения первого дерева
      const arr2 = Object.values(tree2).sort() // значения второго дерева

      if (typeof arr1[i] !== 'object') { 
        // не объект, проверка по примитивам
        if (arr1[i] !== arr2[i]) { 
          //console.log('not equal 3:', tree1, tree2)
          return false
        }
      } else if (arr1[i] instanceof HTMLElement && arr2[i] instanceof HTMLElement) {
        // html-объект, пропускаем
      } else if (typeof arr1[i] === typeof arr2[i] && arr1[i] && arr2[i]) {
        // два объекта, рекурсия
        if ( !treesEqual(arr1[i], arr2[i]) ) { 
          //console.log('not equal 4:', tree1, tree2)
          return false
        }
      } // другой случай - оба значения null, проходит проверку всегда
    }
  
    return true
  }

  function removeDuplicates(prev, next) {
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
    const start = !startPosition && s
    const end = !endPosition && e

    const topObject = canvasObjects.find(item => item.z === canvasObjects.length)
    switch (currentTool) {
      case 'circle':
        setCurrentObject(setCircle({
          startPosition: startPosition ?? start,
          endPosition: endPosition ?? end,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          }
        }))
        break
      
      case 'rectangle':
        setCurrentObject(setRectangle({
          startPosition: startPosition ?? start,
          endPosition: endPosition ?? end,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          }
        }))
        break

      case 'line':
        //console.log('set current object to line')
        setCurrentObject(setLine({
          startPosition: startPosition ?? start,
          endPosition: endPosition ?? end,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          },
        }))
        break

      case 'triangle':
        setCurrentObject(setTriangle({
          startPosition: startPosition ?? start,
          endPosition: endPosition ?? end,
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
      setCoords(event, setStartPosition, () => {
        setEndPosition(null)
        setClicked(true)
      })
      return 
    }
    const start = setCoords(event, setStartPosition, (coords) => {
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
      setEndPosition(null)
      setClicked(currentTool !== 'text')
    })
    const end = setCoords(event, setEndPosition)
    /*
      setStartPosition и setEndPosition не успевают отрабатывать
       => draw не работает => setCurrentObject равен null => 
       setEnd не отрабатывает при первом тригере, когда юзер только нажал
    */
    draw(start, end)
  }

  function setEnd(event) {
    if (!startPosition) return
    if (currentTool === 'move') {
      setCoords(event, setEndPosition, coords => {
        if (currentLayer === 0) return
        const layer = canvasObjects.find(item => item.id === currentLayer)
        const delta = {
          x: coords.x - startPosition.x,
          y: coords.y - startPosition.y
        }
        layer.canvas.style = ''
        dispatch({
          type: 'move object',
          value: delta
        }) 
        setClicked(false)
        setCurrentObject(null)
        setStartPosition(null)
        setEndPosition(null)
      })
      return
    }
    setCoords(event, setEndPosition, (coords) => {
      if (!currentObject) return
      setClicked(false)
      dispatch({
        type: 'add canvas object',
        value: currentObject
      })
      setCurrentObject(null)
      setStartPosition(null)
      setEndPosition(null)
    })
  }

  function onMove(event) {
    if (!clicked) return
    if (currentTool === 'move') {
      setCoords(event, setEndPosition, coords => {
        if (currentLayer === 0) return
        const layer = canvasObjects.find(item => item.id === currentLayer)
        const delta = {
          x: coords.x - startPosition.x,
          y: coords.y - startPosition.y
        }
        //layer.canvas.style.top = `${delta.y * containerHeight}px`
        //layer.canvas.style.left = `${delta.x * containerWidth}px`
        layer.canvas.style.top = `${delta.y}px`
        layer.canvas.style.left = `${delta.x}px`
      })
    }
    setCoords(event, setEndPosition, draw)
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