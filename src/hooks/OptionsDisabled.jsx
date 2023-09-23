import React from 'react'
import PropTypes from 'prop-types'

import OptionDisabled from './OptionDisabled'

export default function OptionsDisabled ({
  options,
  optionsRef,
  activeOptionRef,
  selectIndex,
  activeIndex,
  id
}) {
  if (options.length) {
    return (
      <ul
        ref={optionsRef}
        className='options'
        role='listbox'
        aria-hidden
        id={id}>
        {options.map((option, index) => (
          <OptionDisabled
            activeOptionRef={activeOptionRef}
            option={option}
            index={index}
            selectIndex={selectIndex}
            activeIndex={activeIndex}
            key={index}
          />
        ))}
      </ul>
    )
  }
}

OptionsDisabled.propTypes = {
  optionsRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape() })
  ]),
  activeOptionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape() })
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
        PropTypes.bool
      ])
    })
  ),
  selectIndex: PropTypes.number.isRequired,
  activeIndex: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
}
