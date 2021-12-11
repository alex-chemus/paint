import React, {useReducer} from "react";
import reducer from "./reducer"
import Context from './context'

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
  currentTool: '',
}

const Store = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initState)

  // methods

  return (
    <Context.Provider value={{
      store
    }}>
      { children }
    </Context.Provider>
  )
}

export default Store