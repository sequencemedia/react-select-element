import React, {
  useMemo
} from 'react'
import PropTypes from 'prop-types'

import {
  toOptionText
} from '#common'

export default function SelectedOptionDisabled ({ selectOptionRef, options, selectIndex, children }) {
  const {
    text
  } = useMemo(() => options[selectIndex] || {}, [
    options,
    selectIndex
  ])

  return (
    <div
      ref={selectOptionRef}
      className='selected-option'>
      {children || (
        toOptionText(text)
      )}
    </div>
  )
}

SelectedOptionDisabled.propTypes = {
  selectOptionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape() })
  ]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool
      ])
    })
  ).isRequired,
  selectIndex: PropTypes.number.isRequired,
  children: PropTypes.node
}
