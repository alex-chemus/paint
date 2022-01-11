import Select from 'react-select'

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

  const styles = {
    menu: (styles) => {
      return {
        ...styles,
        backgroundColor: '#393E46',
        border: '1px solid #eee',
      }
    },
    option: styles => {
      return {
        ...styles,
        padding: '5px',
        backgroundColor: 'transparent',
        color: '#eee',
        fontFamily: 'Roboto',
        lineHeight: 'auto',
        margin: '0',
        fontSize: '12px',
        ':hover': {
          cursor: 'pointer'
        },
        ':not(:last-of-type)': {
          borderBottom: '1px solid #222831'
        }
      }
    },
    control: (styles, {isFocused}) => {
      return {
        ...styles,
        padding: '5px',
        border: '1px solid #eee',
        borderRadius: '5px',
        backgroundColor: 'transparent',
        transition: 'border-color .15s',  
        outline: 'none',
        borderColor: isFocused ? '#FFD369 !important' : '#eee',
        boxShadow: 'none',
        alignItems: 'stretch',
        minHeight: '0'
      }
    },
    singleValue: styles => {
      return {
        ...styles,
        color: '#eee',
        fontFamily: 'Roboto',
        lineHeight: 'auto',
        margin: '0',
        fontSize: '12px',
      }
    },
    indicatorSeparator: styles => {
      return {
        ...styles,
        display: 'none'
      }
    },
    valueContainer: styles => {
      return {
        ...styles,
        padding: '0',
        paddingRight: '5px',
        height: '20px'
      }
    },
    input: styles => {
      return {
        ...styles,
        height: '20px',
        padding: 0,
        margin: 0
      }
    },
    indicatorsContainer: styles => {
      return {
        ...styles,
        height: '20px'
      }
    }
  }

  return (
    <li>
      <p>Font</p>
      <input
        type='text'
        value={`${object[param].size}px`}
        placeholder="Size"
        onChange={onChange}
        onBlur={onBlur}/>
      <input
        type='text'
        value={object[param].family}
        placeholder="Family"
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
        value={`${object[param].height}em`}
        placeholder="Height"
        onChange={onChange}
        onBlur={onBlur}/>
    </li>
  )
}