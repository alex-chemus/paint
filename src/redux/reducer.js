const initState = {
  canvasObjects: [
    // basic sheet
    {
      type: 'rectangle',
      x: 0,
      y: 0,
      width: 1,
      height: 1,
      fill: '#fff',
      relative: {
        size: { width: true, height: true }
      },
    },
  ],
  // rectangle, triangle, circle, shape, text, image, move (default for resizing)
  currentTool: 'move',
}

const reducer = (state=initState, action) => {
  switch (action.type) {
    case 'set tool':
      /*console.log(action.value)
      console.log({
        currentTool: action.value,
        ...state
      })*/
      return {
        ...state,
        currentTool: action.value,
      }
    default: 
      return state
  }
}

export default reducer