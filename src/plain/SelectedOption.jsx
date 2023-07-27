import React, { useMemo } from 'react'
import PropTypes from 'prop-types'

import {
  toOptionText
} from '../common/index.js'

export default function SelectedOption ({
  selectOptionRef,
  accessKey,
  tabIndex,
  children,
  options,
  selectIndex,
  activeEnter,
  hasActiveOptions,
  handleActiveEnterFocus,
  handleFocus,
  handleActiveEnterBlur,
  handleBlur,
  handleClick,
  handleActiveOptionsKeyPress,
  handleKeyPress,
  handleActiveOptionsKeyUp,
  handleKeyUp,
  handleActiveOptionsKeyDown,
  handleKeyDown
}) {
  const {
    text
  } = useMemo(() => options[selectIndex] || {}, [options, selectIndex])

  return (
    <div
      ref={selectOptionRef}
      accessKey={accessKey}
      tabIndex={tabIndex}
      className='selected-option'
      onFocus={(activeEnter)
        ? handleActiveEnterFocus
        : handleFocus}
      onBlur={(activeEnter)
        ? handleActiveEnterBlur
        : handleBlur}
      onClick={handleClick}
      onKeyPress={(hasActiveOptions)
        ? handleActiveOptionsKeyPress
        : handleKeyPress}
      onKeyUp={(hasActiveOptions)
        ? handleActiveOptionsKeyUp
        : handleKeyUp}
      onKeyDown={(hasActiveOptions)
        ? handleActiveOptionsKeyDown
        : handleKeyDown}>
      {children || (
        toOptionText(text)
      )}
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
  handleActiveEnterFocus: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleActiveEnterBlur: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleActiveOptionsKeyPress: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  handleActiveOptionsKeyUp: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func.isRequired,
  handleActiveOptionsKeyDown: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired
}
