import {IState, IAction} from '@/types'

const addInitCanvas = (state: IState, action: IAction) => {
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