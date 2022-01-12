const moveObject = (state, action) => {
  function setNewObject() {
    const object = state.canvasObjects.find(item => item.id === state.currentLayer)
    let newObj = {}
    if ( (object.x && object.y) || object.type === 'image' ) {
      newObj = {
        ...object,
        x: object.x + action.value.x,
        y: object.y + action.value.y
      }
    } else { // start: {x, y}, end: {x, y}
      newObj = {
        ...object,
        start: {
          x: object.start.x + action.value.x,
          y: object.start.y + action.value.y
        },
        end: {
          x: object.end.x + action.value.x,
          y: object.end.y + action.value.y
        }
      }
    }
    return newObj
  }
  const oldObjects = state.canvasObjects.filter(item => item.id !== state.currentLayer)
  if (state.currentVersion !== null) {
    return {
      ...state,
      canvasVersions: [
        ...state.canvasVersions,
        ...state.interimVersions,
        [...state.canvasObjects, setNewObject()],
      ],
      interimVersions: [],
      currentVersion: null,
      canvasObjects: [...oldObjects, setNewObject()],
    }
  }
  return {
    ...state,
    canvasVersions: [...state.canvasVersions, [...oldObjects, setNewObject()]],
    canvasObjects: [...oldObjects, setNewObject()] 
  }
}

export default moveObject