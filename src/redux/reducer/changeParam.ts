import { IState, IAction } from "@/types"

const changeParam = (state: IState, action: IAction) => {
  if (state.currentVersion !== null) {
    return {
      ...state,
      canvasVersions: [
        ...state.canvasVersions,
        ...state.interimVersions,
        action.value
      ],
      interimVersions: [],
      currentVersion: null,
      canvasObjects: action.value
    }
  }
  return {
    ...state,
    canvasVersions: [...state.canvasVersions, action.value],
    canvasObjects: action.value
  }
}

export default changeParam