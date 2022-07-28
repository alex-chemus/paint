// интерфейс для круга, можно сделать
// общий для всех фигур и наследовать от него конкретные фигуры
export interface ISheet {
  type: string,
  start: {
    x: number,
    y: number,
  },
  fill: string,
  id: number,
  scale: {
    x: number,
    y: number,
  }
  opacity: number,
  z: number,
  stroke: {
    width: number,
    color: string
  },
  shadow: {
    x: number,
    y: number,
    blur: number,
    color: string
  }
}
