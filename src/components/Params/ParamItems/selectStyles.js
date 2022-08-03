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

export default styles