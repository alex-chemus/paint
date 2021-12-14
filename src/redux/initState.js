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
    // test circle
    /*{
      type: 'circle',
      x: 0.5,
      y: 0.5,
      radius: 0.2,
      relative: { 
        coord: { x: true, y: true },
        radius: true,
      },
      fill: '#999'
    }*/
  ],
  // rectangle, triangle, circle, shape, text, image, move (default for resizing)
  currentTool: 'move',
}

export default initState 