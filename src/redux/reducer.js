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

    default: 
      return state
  }
}

export default reducer