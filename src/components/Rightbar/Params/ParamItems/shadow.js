export const shadow = (param, {object, setObject, updateObjects}) => {
  const onChange = e => {
    const type = e.target.placeholder
    const newObject = {
      x: type==='X' ? e.target.value : object[param].x,
      y: type==='Y' ? e.target.value : object[param].y,
      blur: type==='Blur' ? e.target.value : object[param].blur,
      color: type==='Color' ? e.target.value : object[param].color,
    }
    console.log('new object:', newObject)
    setObject({
      ...object,
      [param]: newObject
    })
  }

  const onBlur = () => {
    const list = object
    Object.keys(list[param]).forEach(key => {
      if (key === 'color') return
      list[param][key] = +list[param][key]
    })
    updateObjects(list)
  }

  return (
    <li>
      <p>Shadow</p>
      <input
        type='text'
        value={object[param].x}
        placeholder="X"
        onChange={onChange}
        onBlur={onBlur}/>
      <input
        type='text'
        value={object[param].y}
        placeholder="Y"
        onChange={onChange}
        onBlur={onBlur}/>
      <input
        type='text'
        value={object[param].blur}
        placeholder="Blur"
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