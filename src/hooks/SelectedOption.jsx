import React, {
  useMemo
} from 'react'
import PropTypes from 'prop-types'

import {
  toOptionText
} from '#common'

export default function SelectedOption ({
  selectOptionRef,
  accessKey,
  tabIndex,
  options,
  selectIndex,
  activeEnter,
  hasActiveOptions,
  onActiveEnterFocus,
  onFocus,
  onActiveEnterBlur,
  onBlur,
  onClick,
  onActiveOptionsKeyPress,
  onKeyPress,
  onActiveOptionsKeyUp,
  onKeyUp,
  onActiveOptionsKeyDown,
  onKeyDown,
  children = null
}) {
  const {
    text
  } = useMemo(() => options[selectIndex] ?? {}, [
    options,
    selectIndex
  ])

  const handleFocus = (activeEnter)
    ? onActiveEnterFocus
    : onFocus

  const handleBlur = (activeEnter)
    ? onActiveEnterBlur
    : onBlur

  const handleKeyPress = (hasActiveOptions)
    ? onActiveOptionsKeyPress
    : onKeyPress

  const handleKeyUp = (hasActiveOptions)
    ? onActiveOptionsKeyUp
    : onKeyUp

  const handleKeyDown = (hasActiveOptions)
    ? onActiveOptionsKeyDown
    : onKeyDown

  return (
    <div
      ref={selectOptionRef}
      accessKey={accessKey}
      tabIndex={tabIndex}
      className='selected-option'
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      onKeyUp={handleKeyUp}
      onKeyDown={handleKeyDown}>
      {children ?? toOptionText(text)}
    </div>
  )
}

SelectedOption.propTypes = {
  selectOptionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape() })
  ]),
  accessKey: PropTypes.string,
  tabIndex: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool
      ])
    })
  ),
  children: PropTypes.node,
  selectIndex: PropTypes.number.isRequired,
  activeEnter: PropTypes.bool.isRequired,
  hasActiveOptions: PropTypes.bool.isRequired,
  onActiveEnterFocus: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onActiveEnterBlur: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onActiveOptionsKeyPress: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  onActiveOptionsKeyUp: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onActiveOptionsKeyDown: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired
}
