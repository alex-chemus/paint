import initState from "./initState"

const reducer = (state=initState, action) => {
  switch (action.type) {
    case 'set tool':
      return {
        ...state,
        currentTool: action.value,
      }

    case 'add init canvas':
      const canvasObjects = state.canvasObjects
      canvasObjects[0].canvas = action.value
      const canvasVersions = state.canvasVersions
      canvasVersions[0][0].canvas = action.value

      return {
        ...state,
        canvasObjects,
        canvasVersions
      }

    case 'add canvas object':
      if (state.currentVersion !== null) {
        return {
          ...state,
          canvasVersions: [
            ...state.canvasVersions, 
            ...state.interimVersions, 
            [...state.canvasObjects, action.value]
          ],
          interimVersions: [],
          currentVersion: null,
          canvasObjects: [...state.canvasObjects, action.value],
          currentLayer: action.value.id
        }
      }
      const pushObjects = [...state.canvasObjects, action.value]
      return {
        ...state,
        canvasVersions: [...state.canvasVersions, pushObjects],
        canvasObjects: pushObjects,
        currentLayer: action.value.id
      }

    case 'clear':
      return {
        ...state,
        canvasObjects: state.canvasVersions[0],
        canvasVersions: [...state.canvasVersions, state.canvasVersions[0]]
      }

    case 'undo':
      const currentVersion = Math.max(state.currentVersion!==null ? state.currentVersion-1 : state.canvasVersions.length-2, 0)
      if (state.currentVersion === currentVersion) return { ...state }
      const interimVersions = [...state.interimVersions, state.canvasVersions[currentVersion]]
      return {
        ...state,
        currentVersion,
        interimVersions,
        canvasObjects: interimVersions[interimVersions.length-1]
      }

    case 'set current layer':
      return {
        ...state,
        currentLayer: action.value
      }

    case 'swap objects':
      /*function swapObjects(prevI, nextI) {
        const list = []
        state.canvasObjects.forEach(obj => {
          list.push({...obj})
        })
        const amogus = list[prevI].z
        list[prevI].z = list[nextI].z
        list[nextI].z = amogus
        list.sort((a, b) => a.z > b.z ? 1 : -1)
        return list
      }*/
      // if there's undo chain
      if (state.currentVersion !== null) {
        return {
          ...state,
          canvasVersions: [
            ...state.canvasVersions,
            ...state.interimVersions,
            //swapObjects(action.prevI+1, action.nextI+1)
            action.value
          ],
          interimVersions: [],
          currentVersion: null,
          canvasObjects: action.value //swapObjects(action.prevI+1, action.nextI+1),
        }
      }
      const objects = action.value //swapObjects(action.prevI+1, action.nextI+1)
      return {
        ...state,
        canvasObjects: objects,
        canvasVersions: [...state.canvasVersions, objects],
      }

    case 'remove object': 
      const newCanvasObjects = state.canvasObjects.filter(item => {
        return item.id !== action.value
      })
      const getTopLayerId = () => {
        const len = newCanvasObjects.length
        return newCanvasObjects[len-1].id
      }
      const currentLayer = state.currentLayer===action.value ? getTopLayerId() : state.currentLayer
      if (state.currentVersion !== null) {
        return {
          ...state,
          canvasVersions: [
            ...state.canvasVersions,
            ...state.interimVersions,
            newCanvasObjects
          ],
          interimVersions: [],
          currentVersion: null,
          canvasObjects: newCanvasObjects,
          currentLayer,
        }
      }
      return {
        ...state,
        canvasVersions: [...state.canvasVersions, newCanvasObjects],
        canvasObjects: newCanvasObjects,
        currentLayer,
      }

    case 'move object':
      function setNewObject() {
        const object = state.canvasObjects.find(item => item.id === state.currentLayer)
        let newObj = {}
        if (object.x && object.y) {
          newObj = {
            ...object,
            x: object.x + action.value.x,
            y: object.y + action.value.y
          }
        } else { // start: {x, y}, end: {x, y}
          newObj = {
            ...object,
            start: {
              x: object.start.x + action.value.x,
              y: object.start.y + action.value.y
            },
            end: {
              x: object.end.x + action.value.x,
              y: object.end.y + action.value.y
            }
          }
        }
        return newObj
      }
      const oldObjects = state.canvasObjects.filter(item => item.id !== state.currentLayer)
      if (state.currentVersion !== null) {
        return {
          ...state,
          canvasVersions: [
            ...state.canvasVersions,
            ...state.interimVersions,
            [...state.canvasObjects, setNewObject()],
          ],
          interimVersions: [],
          currentVersion: null,
          canvasObjects: [...oldObjects, setNewObject()],
        }
      }
      return {
        ...state,
        canvasVersions: [...state.canvasVersions, [...oldObjects, setNewObject()]],
        canvasObjects: [...oldObjects, setNewObject()] 
      }

    default: 
      return state
  }
}

export default reducer