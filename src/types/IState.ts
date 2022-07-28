import {Tool} from './Tool'

export interface IState {
  canvasObjects: any[], // todo: ISheet[],
  currentTool: Tool,
  canvasVersions: any[][], // todo: ISheet[][],
  interimVersions: any[][], // same as canvasVersions
  currentVersion: number | null, // see in code how it works
  currentLayer: number,
  containerSize: {
    width: number,
    height: number
  }
}