import React, {
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/dedupe'

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
  /**
   *  Dependencies ordered from most to least likely to change
   */
  const className = useMemo(() => (
    classNames('option', { active: (index === activeIndex), selected: (index === selectIndex) })
  ), [
    activeIndex,
    index,
    selectIndex
  ])

  const handleMouseEnter = useCallback(() => onActiveIndexChange(index), [
    activeIndex,
    index,
    selectIndex
  ])

  const handleMouseLeave = useCallback(() => onActiveIndexChange(index), [
    activeIndex,
    index,
    selectIndex
  ])

  const handleClick = useCallback(() => onClick(index), [
    activeIndex,
    index,
    selectIndex
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
