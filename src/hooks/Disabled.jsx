import React from 'react'
import PropTypes from 'prop-types'

import SelectedOptionDisabled from './SelectedOptionDisabled'
import OptionsDisabled from './OptionsDisabled'

export default function Disabled ({
  selectOptionRef,
  optionsRef,
  activeOptionRef,
  options,
  selectIndex,
  children = null,
  activeIndex,
  id
}) {
  return (
    <div
      className='react-select-element disabled'
      aria-expanded={false}
      aria-haspopup='listbox'
      aria-controls={id}>
      <SelectedOptionDisabled
        selectOptionRef={selectOptionRef}
        options={options}
        selectIndex={selectIndex}>
        {children}
      </SelectedOptionDisabled>
      <OptionsDisabled
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

Disabled.propTypes = {
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
  activeIndex: PropTypes.number.isRequired,
  children: PropTypes.node
}
