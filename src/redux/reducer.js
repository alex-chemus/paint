import initState from "./initState"
import changeParam from "./reducer/changeParam"
import moveObject from "./reducer/moveObject"
import removeObject from "./reducer/removeObject"
import swapObjects from "./reducer/swapObjects"
import undo from "./reducer/undo"
import addCanvasObject from "./reducer/addCanvasObject"
import addInitCanvas from "./reducer/addInitCanvas"
import setSize from "./reducer/setSize"

const reducer = (state=initState, action) => {
  switch (action.type) {
    case 'set size':
      return setSize(state, action)
    
    case 'set tool':
      return {
        ...state,
        currentTool: action.value,
      }

    case 'add init canvas':
      return addInitCanvas(state, action)

    case 'add canvas object':
      return addCanvasObject(state, action)

    case 'clear':
      return {
        ...state,
        canvasObjects: state.canvasVersions[0],
        canvasVersions: [...state.canvasVersions, state.canvasVersions[0]]
      }

    case 'undo':
      return undo(state, action)

    case 'set current layer':
      return {
        ...state,
        currentLayer: action.value
      }

    case 'swap objects':
      return swapObjects(state, action)

    case 'remove object': 
      return removeObject(state, action)

    case 'move object':
      return moveObject(state, action)

    case 'change params':
      return changeParam(state, action)

    default: 
      return state
  }
}

export default reducer