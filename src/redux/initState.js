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
      fill: 'white',
      opacity: null,
      rotate: null,
      stroke: null,
      scale: {x: 1, y: 1},
      canvas: null,
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
      fill: 'white',
      rotate: null,
      stroke: null,
      scale: {x: 1, y: 1},
      opacity: null,
      canvas: null,
    },
  ]],
  interimVersions: [],
  currentVersion: null,
  currentLayer: 0 // id of the layer
}

export default initState 