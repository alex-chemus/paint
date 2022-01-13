const removeObject = (state, action) => {
  const newCanvasObjects = state.canvasObjects.filter(item => {
    return item.id !== action.value
  })
  const getTopLayerId = () => {
    const len = newCanvasObjects.length
    return newCanvasObjects[len-1].id
  }
  const currentLayer = state.currentLayer===action.value ? getTopLayerId() : state.currentLayer
  if (state.currentVersion !== null) {
    return {
      ...state,
      canvasVersions: [
        ...state.canvasVersions,
        ...state.interimVersions,
        newCanvasObjects
      ],
      interimVersions: [],
      currentVersion: null,
      canvasObjects: newCanvasObjects,
      currentLayer,
    }
  }
  return {
    ...state,
    canvasVersions: [...state.canvasVersions, newCanvasObjects],
    canvasObjects: newCanvasObjects,
    currentLayer,
  }
}

export default removeObject