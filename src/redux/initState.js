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
      fill: 'rgba(255, 255, 255, 1)',
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
      fill: 'rgba(255, 255, 255, 1)',
    },
  ]],
  interimVersions: [],
  currentVersion: null,
}

export default initState 