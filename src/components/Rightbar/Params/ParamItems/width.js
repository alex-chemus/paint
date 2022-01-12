export const width = (param, {object, setObject, updateObjects}) => {
  const onChange = e => {
    setObject({
      ...object,
      [param]: e.target.value
    })
  }

  const onBlur = () => {
    const list = object
    list[param] = isNaN(+list[param]) ? 200 : +list[param]
    updateObjects(list)
  }

  return (
    <li>
      <p>Width</p>
      <input
        type='text'
        value={`${object[param]}`.slice(0, 7)}
        placeholder="Width"
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}