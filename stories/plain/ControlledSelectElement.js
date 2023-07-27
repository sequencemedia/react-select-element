import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  getSelectIndex
} from 'react-select-element/common'
import {
  PlainSelectElement as SelectElement
} from 'react-select-element'

export default function ControlledSelectElement (props) {
  const [index, setIndex] = useState(() => getSelectIndex(props))

  function handleChange (index) {
    const {
      onChange
    } = props

    onChange(index)

    setIndex(index)
  }

  return (
      <SelectElement
        {...props}
        onChange={handleChange}
        index={index}
      />
  )
}

ControlledSelectElement.propTypes = {
  onChange: PropTypes.func,
  index: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ])
    })
  )
}

ControlledSelectElement.defaultProps = {
  onChange: () => {},
  index: 0,
  options: []
}
