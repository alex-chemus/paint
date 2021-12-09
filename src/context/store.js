import React, {useReducer} from "react";
import initState from "./initState";
import reducer from "./reducer"
import Context from './context'

const Store = ({ children }) => {
  useReducer(reducer, initState)

  // methods

  return (
    <Context.Provider value={{
      
    }}>
      { children }
    </Context.Provider>
  )
}

export default Store