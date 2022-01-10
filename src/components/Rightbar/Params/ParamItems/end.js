export const end = (param, {object, setObject, updateObjects}) => {
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

  const onBlur = () => {
    const list = object
    Object.keys(list[param]).forEach(coord => {
      object[param][coord] = +object[param][coord]
      if (isNaN(object[param][coord])) object[param][coord] = 0.5
    })
    updateObjects(object)
  }

  return (
    <li>
      <p>End</p>
      <input
        type='text'
        value={`${object[param].x}`.slice(0, 7)}
        placeholder="X"
        onChange={onChange}
        onBlur={onBlur}/>
      <input
        type='text'
        value={`${object[param].y}`.slice(0, 7)}
        placeholder="Y"
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}