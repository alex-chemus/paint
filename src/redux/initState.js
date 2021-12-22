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
      z: 0,
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
      z: 0,
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
}

export default initState 