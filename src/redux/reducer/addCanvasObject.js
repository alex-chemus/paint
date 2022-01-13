const addCanvasObject = (state, action) => {
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
}

export default addCanvasObject