import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Option from './Option'

export default function Options ({
  options,
  optionsRef,
  activeOptionRef,
  selectIndex,
  activeIndex,
  hasActiveOptions,
  id,
  handleActiveIndexChange,
  handleActiveEnterChange,
  handleOptionClick
}) {
  const className = useMemo(() => (
    classNames('options', { active: hasActiveOptions })
  ), [hasActiveOptions])

  if (options.length) {
    return (
      <ul
        ref={optionsRef}
        className={className}
        onMouseEnter={() => handleActiveEnterChange(true)}
        onMouseLeave={() => handleActiveEnterChange(false)}
        role='listbox'
        aria-hidden={!hasActiveOptions}
        id={id}>
        {options.map((option, index) => (
          <Option
            activeOptionRef={activeOptionRef}
            option={option}
            index={index}
            selectIndex={selectIndex}
            activeIndex={activeIndex}
            handleActiveIndexChange={handleActiveIndexChange}
            handleClick={handleOptionClick}
            key={index}
          />
        ))}
      </ul>
    )
  }
}

Options.propTypes = {
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
  hasActiveOptions: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  handleActiveIndexChange: PropTypes.func.isRequired,
  handleActiveEnterChange: PropTypes.func.isRequired,
  handleOptionClick: PropTypes.func.isRequired
}
