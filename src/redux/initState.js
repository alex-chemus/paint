const initState = {
  canvasObjects: [
    // basic sheet
    {
      type: 'rectangle',
      start: {
        x: 0, y: 0
      },
      end: {
        x: 1, y: 1
      },
      id: 0,
      z: 1,
      fill: '#ffffff',
      opacity: 0,
      rotate: 0,
      stroke: {
        color: '#ffffff',
        width: 0,
      },
      scale: {x: 1, y: 1},
      canvas: null,
      shadow: {
        x: 0, y: 0, blur: 0, color: '#ffffff'
      }
    },
  ],
  // rectangle, triangle, circle, shape, text, image, move (default for resizing)
  currentTool: 'move',
  canvasVersions: [[
    // basic sheet
    {
      type: 'rectangle',
      start: {
        x: 0, y: 0
      },
      end: {
        x: 1, y: 1
      },
      id: 0,
      z: 1,
      fill: '#ffffff',
      rotate: 0,
      stroke: {
        color: '#ffffff',
        width: 0,
      },
      scale: {x: 1, y: 1},
      opacity: 0,
      shadow: {
        x: 0, y: 0, blur: 0, color: '#ffffff'
      },
      canvas: null,
    },
  ]],
  interimVersions: [],
  currentVersion: null,
  currentLayer: 0, // id of the layer
  containerSize: {
    width: 0,
    height: 0
  },
}

export default initState 