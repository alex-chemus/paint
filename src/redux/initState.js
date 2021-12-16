const initState = {
  canvasObjects: [
    // basic sheet
    {
      type: 'rectangle',
      x: 0,
      y: 0,
      width: 2,
      height: 2,
      fill: '#fff',
      relative: {
        size: { width: true, height: true },
        coord: { x: true, y: true }
      },
    },
  ],
  // rectangle, triangle, circle, shape, text, image, move (default for resizing)
  currentTool: 'move',
  canvasVersions: [[
    // basic sheet
    {
      type: 'rectangle',
      x: 0,
      y: 0,
      width: 2,
      height: 2,
      fill: '#fff',
      relative: {
        size: { width: true, height: true },
        coord: { x: true, y: true }
      },
    },
  ]],
  interimVersions: [],
  currentVersion: null,
}

export default initState 