import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  toOptionText
} from '../common/index.js'

export default function Option ({
  activeOptionRef,
  index,
  selectIndex,
  activeIndex,
  handleActiveIndexChange,
  handleClick,
  option: {
    text
  }
}) {
  const className = useMemo(() => (
    classNames({ selected: (index === selectIndex) }, 'option', { active: (index === activeIndex) })
  ), [index, selectIndex, activeIndex])

  return (
    <li
      ref={(index === activeIndex) ? activeOptionRef : null}
      className={className}
      onMouseEnter={() => handleActiveIndexChange(index)}
      onMouseLeave={() => handleActiveIndexChange(index)}
      onClick={() => handleClick(index)}
      role='option'
      aria-selected={index === selectIndex}>
      {toOptionText(text)}
    </li>
  )
}

Option.propTypes = {
  activeOptionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape() })
  ]).isRequired,
  index: PropTypes.number.isRequired,
  selectIndex: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleActiveIndexChange: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  option: PropTypes.shape().isRequired
}
