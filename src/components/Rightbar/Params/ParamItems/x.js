export const x = (param, {object, setObject, updateObjects}) => {
  const onChange = e => {
    setObject({
      ...object,
      [param]: e.target.value
    })
  }

  const onBlur = () => {
    const list = object
    list[param] = +list[param]
    updateObjects(list)
  }

  return (
    <li>
      <p>X</p>
      <input
        type='text'
        value={`${object[param]}`.slice(0, 7)}
        placeholder="X"
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}