export const fill = (param, {object, setObject, updateObjects}) => {
  const onChange = e => {
    setObject({
      ...object,
      [param]: e.target.value
    })
  }

  const onBlur = () => {
    updateObjects(object)
  }

  return (
    <li>
      <p>Fill</p>
      <input
        type='color'
        value={object[param]}
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}