import React from 'react'
import PropTypes from 'prop-types'

import OptionReadOnly from './OptionReadOnly'

export default function OptionsReadOnly ({
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
          <OptionReadOnly
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

OptionsReadOnly.propTypes = {
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
