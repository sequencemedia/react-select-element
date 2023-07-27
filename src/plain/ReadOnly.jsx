import React from 'react'
import PropTypes from 'prop-types'

import SelectedOptionReadOnly from './SelectedOptionReadOnly'
import OptionsReadOnly from './OptionsReadOnly'

export default function ReadOnly ({
  selectOptionRef,
  optionsRef,
  activeOptionRef,
  options,
  selectIndex,
  activeIndex,
  id
}) {
  return (
    <div
      className='react-select-element readonly'
      aria-expanded={false}
      aria-haspopup='listbox'
      aria-controls={id}>
      <SelectedOptionReadOnly
        selectOptionRef={selectOptionRef}
        options={options}
        selectIndex={selectIndex}
      />
      <OptionsReadOnly
        optionsRef={optionsRef}
        activeOptionRef={activeOptionRef}
        options={options}
        selectIndex={selectIndex}
        activeIndex={activeIndex}
        id={id}
      />
    </div>
  )
}

ReadOnly.propTypes = {
  id: PropTypes.string.isRequired,
  selectOptionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape() })
  ]).isRequired,
  optionsRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.shape() })
  ]).isRequired,
  activeOptionRef: PropTypes.oneOfType([
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
  activeIndex: PropTypes.number.isRequired
}
