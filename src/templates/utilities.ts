//import { ISheet } from '@/types'

interface Size {
  width: number, 
  height: number
}

const getRatio = (size: Size, containerSize: Size) => {
  const ratio = {
    width: size.width / containerSize.width,
    height: size.height / containerSize.height,
    avarage: 0
  }
  ratio.avarage = ((ratio.width + ratio.height)/2)
  return ratio
}

// relative coordinates -> absolute coordinates
export const setAbsCoords = (object: any, size: Size, containerSize: Size) => {
  const ratio = getRatio(size, containerSize)
  const start = {
    x: object.start.x * ratio.width,
    y: object.start.y * ratio.height
  }
  const end = {
    x: object.end.x * ratio.width,
    y: object.end.y * ratio.height
  }

  return [start, end]
}

export const setAbsXY = (object: any, size: Size, containerSize: Size) => {
  const ratio = getRatio(size, containerSize)
  const x = object.x * ratio.width
  const y = object.y * ratio.height
  return [x, y]
}

export const setStroke = (object: any, size: Size, containerSize: Size) => {
  const ratio = getRatio(size, containerSize)
  const stroke = {
    color: object.stroke.color,
    width: object.stroke.width * ratio.avarage
  }
  return stroke
}

export const setShadow = (object: any, size: Size, containerSize: Size) => {
  const ratio = getRatio(size, containerSize)
  const shadow = {
    color: object.shadow.color,
    blur: object.shadow.blur * ratio.avarage,
    x: object.shadow.x * ratio.width,
    y: object.shadow.y * ratio.height
  }
  return shadow
}

export const setFont = (object: any, size: Size, containerSize: Size) => {
  const ratio = getRatio(size, containerSize)
  const font = {
    ...object.font,
    size: object.font.size * ratio.avarage
  }
  return font
}

export const getWidthRatio = (size: Size, containerSize: Size) => {
  const ratio = getRatio(size, containerSize)
  return ratio.width
}

export const getHeightRatio = (size: Size, containerSize: Size) => {
  const ratio = getRatio(size, containerSize)
  return ratio.height
}