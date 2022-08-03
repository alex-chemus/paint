export const opacity = (param, {object, setObject, updateObjects}) => {
  const onChange = e => {
    setObject({
      ...object,
      [param]: e.target.value.slice(0, -1)
    })
  }

  const onBlur = () => {
    const list = object
    list[param] = +list[param]
    if (isNaN(list[param])) list[param] = 0
    updateObjects(list)
  }
  
  return (
    <li>
      <p>Opacity</p>
      <input 
        type='text' 
        value={`${object[param]}%`}
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}