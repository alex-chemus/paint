export const stroke = (param, {object, setObject, updateObjects}) => {
  // object[param] = { width, color }
  const onChange = e => {
    const type = e.target.placeholder
    const newObject = {
      width: type==='Width' ? e.target.value : object[param].width,
      color: type==='Color' ? e.target.value : object[param].color
    }
    setObject({
      ...object,
      [param]: newObject
    })
  }

  const onBlur = e => {
    const list = object
    list[param].width = isNaN(+list[param].width) ? 0 : +list[param].width
    updateObjects(list)
  }

  return (
    <li>
      <p>Stroke</p>
      <input
        type='text'
        value={object[param].width}
        placeholder="Width"
        onChange={onChange}
        onBlur={onBlur}/>
      <input
        type='color'
        value={object[param].color}
        placeholder="Color"
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}