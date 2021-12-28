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
  const [containerWidth, setContainerWidth] = useState(document.body.clientWidth - 266 - 85)
  const [containerHeight, setContainerHeight] = useState(document.body.clientHeight - 100)
  const [clicked, setClicked] = useState(false)
  const [currentObject, setCurrentObject] = useState()


  // store
  const canvasObjects = useSelector(state => state.canvasObjects)
  const currentTool = useSelector(state => state.currentTool)
  const canvasVersions = useSelector(state => state.canvasVersions)
  const interimVersions = useSelector(state => state.interimVersions)
  const dispatch = useDispatch()


  // refs
  const containerRef = useRef(null)


  //effects
  // rerender all changes in store
  useEffect(() => {
    if (!containerRef?.current) return
    if (!canvasObjects[0]?.canvas) {
      dispatch({
        type: 'add init canvas',
        value: createCanvas(containerRef)
      })
      canvasObjects.forEach(item => {
        render(item, {
          width: containerWidth,
          height: containerHeight
        })
      })
      return
    }
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
    const nextFull = [...canvasObjects]
    const versions = [...canvasVersions].concat([...interimVersions])
    const prevFull = [...versions[versions.length-2]]

    const [prev, next] = removeDuplicates(prevFull, nextFull)
    prev.forEach(item => item.canvas.remove())
    next.sort((a, b) => a.z > b.z ? 1 : -1).forEach(item => {
      if (!containerRef.current.contains(item.canvas)) {
        //containerRef.current.append(item.canvas)
        const prevElem = containerRef.current.querySelector(`[data-z="${item.z-1}"]`)
        prevElem.after(item.canvas)
      }
      //setCanvasRefs([...canvasRefs, item.canvas])
      render(item, {
        width: containerWidth,
        height: containerHeight
      })
    })
    /*prev.forEach(item => {
      if (!canvasRefs.some(i => i === item)) {
        item.canvas.remove()
      }
    })*/
  }, [canvasObjects])

  // render currentObject on change
  useEffect(() => {
    if (!currentObject || !containerRef) return
    render(currentObject, {
      width: containerWidth,
      height: containerHeight
    })
  }, [currentObject])

  // insert text for image drag'n'drop and set/reset drag'n'drop handlers
  useEffect(() => {
    const addImage = img => dispatch({ type: 'add canvas object', value: img })
    const createCanvasWrapper = (width, height) => {
      const containerWidth = width
      const containerHeight = height
      return createCanvas
    }
    const removeHanlders = setHanlders(
      containerRef, 
      currentTool, 
      addImage, 
      createCanvasWrapper(containerWidth, containerHeight),
      canvasObjects.find(item => item.z === canvasObjects.length)
    )
    return removeHanlders
  }, [currentTool])


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
          if (nextItem.type === 'circle' && prevItem.type === 'circle') {
            //console.log('circle comparison', treesEqual(nextItem, prevItem))
          }
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
  function draw() {
    if (!endPosition || !startPosition) return
    const topObject = canvasObjects.find(item => item.z === canvasObjects.length)
    switch (currentTool) {
      case 'circle':
        setCurrentObject(setCircle({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          }
        }))
        break
      
      case 'rectangle':
        setCurrentObject(setRectangle({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          }
        }))
        break

      case 'line':
        setCurrentObject(setLine({
          startPosition,
          endPosition,
          params: {
            canvas: currentObject?.canvas ? currentObject.canvas : createCanvas(containerRef),
            id: Date.now(),
            z: topObject.z + 1
          },
        }))
        break

      case 'triangle':
        setCurrentObject(setTriangle({
          startPosition,
          endPosition,
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
    const coordX = event.clientX-85
    const coordY = event.clientY-50
    // координаты относительно холста
    const coords = {
      x: coordX / containerWidth,
      y: coordY / containerHeight
    }

    func(coords)
    callback(coords)
  }

  function setStart(event) {
    if (currentTool === 'move') return
    setCoords(event, setStartPosition, (coords) => {
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
  }

  function setEnd(event) {
    if (currentTool === 'move' || !startPosition) return
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