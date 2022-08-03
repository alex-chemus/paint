import Select from 'react-select'
import styles from './selectStyles.js'

export const font = (param, {object, setObject, updateObjects}) => {
  const onChange = e => {
    const type = e.target.placeholder
    const newObject = {
      size: type==='Size' ? e.target.value.slice(0, -2) : object[param].size,
      family: type==='Family' ? e.target.value : object[param].family,
      height: type==='Height' ? e.target.value.slice(0, -2) : object[param].height,
      style: object[param].style,
      weight: object[param].weight,
    }
    setObject({
      ...object,
      [param]: newObject
    })
  }

  const onBlur = () => {
    const list = object
    Object.keys(list[param]).forEach(key => {
      if (key === 'size') {
        list[param][key] = +list[param][key]
      } else if (key === 'height') {
        list[param][key] = +list[param][key]
        if (isNaN(list[param][key])) list[param][key] = 1
      }
    })
    updateObjects(list)
  }

  const onSelectChange = (e, type) => {
    const newObject = {
      ...object[param],
      style: type==='style' ? e.value : object[param].style,
      weight: type==='weight' ? e.value : object[param].weight,
    }
    setObject({
      ...object,
      [param]: newObject
    })
  }

  const styleOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'italic', label: 'Italic' },
  ]

  const weightOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' }
  ]

  return (
    <li>
      <p>Font</p>
      <input
        type='text'
        value={`${object[param].size}px`}
        placeholder="Size"
        onChange={onChange}
        onBlur={onBlur}/>
      <Select
        options={styleOptions}
        defaultValue={styleOptions[0]}
        onBlur={onBlur}
        onChange={e => onSelectChange(e, 'style')}
        styles={styles}/>
      <Select
        options={weightOptions}
        defaultValue={weightOptions[0]}
        onBlur={onBlur}
        onChange={e => onSelectChange(e, 'weight')}
        styles={styles}/>
      <input
        type='text'
        value={object[param].family}
        placeholder="Family"
        onChange={onChange}
        onBlur={onBlur}/>
      <input
        type='text'
        value={`${object[param].height}em`}
        placeholder="Height"
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}