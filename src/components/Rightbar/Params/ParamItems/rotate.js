export const rotate = (param, {object, setObject, updateObjects}) => {
  const toDegrees = radians => {
    return (+radians * 180 / Math.PI).toFixed(0)
  }
  const test = () => {
    return object[param]
  }
  return (
    <li>
      <p>Rotate</p>
      <input
        type='text'
        value={`${object[param].length!==0 && !isNaN(+object[param]) ? toDegrees(object[param]) : test()}°`}
        onChange={e => {
          const value = e.target.value.slice(0, -1)
          if (value === '') {
            setObject({
              ...object,
              [param]: ''
            })
          } else if (isNaN(+value)) {
            setObject({
              ...object,
              [param]: e.target.value.slice(0, -1)
            })
          } else {
            const radians = +value>360 ? (360 * Math.PI / 180) : (+value * Math.PI / 180)
            setObject({
              ...object,
              [param]: `${radians}`
            })
          }
        }}
        onBlur={() => {
          const list = object
          Object.keys(list).forEach(key => {
            if (key !== 'rotate') return
            list[key] = +list[key]
          })
          updateObjects(list)
        }}/>
    </li>
  )
}