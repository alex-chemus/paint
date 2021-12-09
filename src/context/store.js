import React, {useReducer} from "react";
import initState from "./initState";
import reducer from "./reducer"
import Context from './context'

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