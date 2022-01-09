export const opacity = (param, {object, setObject, updateObjects}) => {
  return (
    <li>
      <p>Opacity</p>
      <input 
        type='text' 
        value={`${object[param]}%`}
        onChange={e => {
          setObject({
            ...object,
            [param]: e.target.value.slice(0, -1)
          })
        }}
        onBlur={() => {
          const list = object
          Object.keys(list).forEach(key => {
            if (key !== 'opacity') return
            list[key] = +list[key]
          })
          updateObjects(list)
        }}/>
    </li>
  )
}