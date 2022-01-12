const swapObjects = (state, action) => {
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
}

export default swapObjects