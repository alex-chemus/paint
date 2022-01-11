export const value = (param, {object, setObject, updateObjects}) => {
  const onChange = e => {
    setObject({
      ...object,
      [param]: e.target.value
    })
  }

  const onBlur = () => {
    if (!object[param].length) {
      setObject({
        ...object,
        [param]: 'text'
      })
      updateObjects({
        ...object,
        [param]: 'text'
      })
    } else {
      updateObjects(object)
    }
  }

  return (
    <li>
      <p>Value</p>
      <input
        type='text'
        value={`${object[param]}`}
        placeholder="text"
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}