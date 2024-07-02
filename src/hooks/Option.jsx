import React, {
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  toOptionText
} from '#common'

export default function Option ({
  activeOptionRef,
  index,
  selectIndex,
  activeIndex,
  onActiveIndexChange,
  onClick,
  option: {
    text
  }
}) {
  const className = useMemo(() => (
    classNames({ selected: (index === selectIndex) }, 'option', { active: (index === activeIndex) })
  ), [
    index,
    selectIndex,
    activeIndex
  ])

  const handleMouseEnter = useCallback(() => onActiveIndexChange(index), [
    index,
    selectIndex,
    activeIndex
  ])

  const handleMouseLeave = useCallback(() => onActiveIndexChange(index), [
    index,
    selectIndex,
    activeIndex
  ])

  const handleClick = useCallback(() => onClick(index), [
    index,
    selectIndex,
    activeIndex
  ])

  return (
    <li
      ref={(index === activeIndex) ? activeOptionRef : null}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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
  onActiveIndexChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  option: PropTypes.shape().isRequired
}
