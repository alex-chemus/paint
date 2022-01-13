const addInitCanvas = (state, action) => {
  const canvasObjects = state.canvasObjects
  canvasObjects[0].canvas = action.value
  const canvasVersions = state.canvasVersions
  canvasVersions[0][0].canvas = action.value

  return {
    ...state,
    canvasObjects,
    canvasVersions
  }
}

export default addInitCanvas