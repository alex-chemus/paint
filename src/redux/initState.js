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
      opacity: 0,
      rotate: 0,
      stroke: 0,
      scale: 0,
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
      rotate: 0,
      stroke: 0,
      scale: 0,
      opacity: 0,
    },
  ]],
  interimVersions: [],
  currentVersion: null,
}

export default initState 