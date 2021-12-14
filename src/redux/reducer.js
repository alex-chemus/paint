import initState from "./initState"

const reducer = (state=initState, action) => {
  switch (action.type) {
    case 'set tool':
      return {
        ...state,
        currentTool: action.value,
      }

    case 'add canvas object':
      return {
        ...state,
        canvasObjects: [...state.canvasObjects, action.value],
      }

    default: 
      return state
  }
}

export default reducer