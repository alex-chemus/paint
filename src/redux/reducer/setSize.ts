import { IState, IAction } from "@/types"

const setSize = (state: IState, action: IAction) => {
  return {
    ...state,
    containerSize: {
      width: action.value.width,
      height: action.value.height
    },
    canvasObjects: [{
      ...state.canvasObjects[0],
      end: {
        x: action.value.width,
        y: action.value.height
      }
    }],
    canvasVersions: [[{
      ...state.canvasVersions[0][0],
      end: {
        x: action.value.width,
        y: action.value.height
      }
    }]]
  }
}

export default setSize