export const height = (param, {object, setObject, updateObjects}) => {
  const onChange = e => {
    setObject({
      ...object,
      [param]: e.target.value
    })
  }
  
  const onBlur = () => {
    const list = object
    list[param] = +list[param]
    if (isNaN(list[param])) list[param] = 100
    updateObjects(list)
  }
  
  return (
    <li>
      <p>Height</p>
      <input
        type='text'
        value={`${object[param]}`.slice(0, 7)}
        placeholder="Height"
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}