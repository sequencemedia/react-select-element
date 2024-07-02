import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  toOptionText
} from '#common'

export default function OptionReadOnly ({
  activeOptionRef,
  index,
  selectIndex,
  activeIndex,
  option: {
    text
  }
}) {
  const className = useMemo(() => (
    classNames({ selected: (index === selectIndex) }, 'option')
  ), [index, selectIndex])

  return (
    <li
      ref={(index === activeIndex) ? activeOptionRef : null}
      className={className}
      role='option'
      aria-selected={index === selectIndex}>
      {toOptionText(text)}
    </li>
  )
}

OptionReadOnly.propTypes = {
  activeOptionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape() })
  ]).isRequired,
  index: PropTypes.number.isRequired,
  selectIndex: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  option: PropTypes.shape().isRequired
}
