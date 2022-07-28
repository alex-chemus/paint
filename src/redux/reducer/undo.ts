import { IState, IAction } from "@/types"

const undo = (state: IState, action: IAction) => {
  const currentVersion = Math.max(state.currentVersion!==null ? state.currentVersion-1 : state.canvasVersions.length-2, 0)
  if (state.currentVersion === currentVersion) return { ...state }
  const interimVersions = [...state.interimVersions, state.canvasVersions[currentVersion]]
  return {
    ...state,
    currentVersion,
    interimVersions,
    canvasObjects: interimVersions[interimVersions.length-1]
  }
}

export default undo