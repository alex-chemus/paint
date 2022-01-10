export const scale = (param, {object, setObject, updateObjects}) => {
  const onChange = e => {
    const type = e.target.placeholder
    const newObject = {
      x: type==='X' ? e.target.value : object[param].x,
      y: type==='Y' ? e.target.value : object[param].y
    }

    setObject({
      ...object,
      [param]: newObject
    })
  }

  const onBlur = e => {
    const list = object
    Object.keys(list[param]).forEach(coord => {
      object[param][coord] = +object[param][coord]
      if (isNaN(object[param][coord])) object[param][coord] = 1
    })
    updateObjects(object)
  }

  return (
    <li>
      <p>Scale</p>
      <input
        type='text' 
        placeholder="X"
        value={object[param].x}
        onChange={onChange}
        onBlur={onBlur}/>
      <input
        type='text' 
        placeholder="Y"
        value={object[param].y}
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}