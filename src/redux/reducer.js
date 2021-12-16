import initState from "./initState"

const reducer = (state=initState, action) => {
  switch (action.type) {
    case 'set tool':
      return {
        ...state,
        currentTool: action.value,
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
          canvasObjects: [...state.canvasObjects, action.value]
          
        }
      }
      const pushObjects = [...state.canvasObjects, action.value]
      return {
        ...state,
        canvasVersions: [...state.canvasVersions, pushObjects],
        canvasObjects: pushObjects,
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

    default: 
      return state
  }
}

export default reducer