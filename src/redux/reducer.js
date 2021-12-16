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

    case 'clear':
      console.log('clear')
      return {
        ...state,
        canvasObjects: [{
          type: 'rectangle',
          x: 0,
          y: 0,
          width: 2,
          height: 2,
          fill: '#fff',
          relative: {
            size: { width: true, height: true },
            coord: { x: true, y: true }
          },
        }]
      }

    default: 
      return state
  }
}

export default reducer