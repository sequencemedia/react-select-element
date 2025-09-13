import React, {
  useMemo,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/dedupe'

import Option from './Option'

export default function Options ({
  options,
  optionsRef,
  activeOptionRef,
  selectIndex,
  activeIndex,
  hasActiveOptions,
  id,
  onActiveIndexChange,
  onActiveEnterChange,
  onOptionClick
}) {
  const className = useMemo(() => (
    classNames('options', { active: hasActiveOptions })
  ), [hasActiveOptions])

  const handleMouseEnter = useCallback(function onMouseEnter () {
    onActiveEnterChange(true)
  }, []) // hasActiveOptions])

  const handleMouseLeave = useCallback(function onMouseLeave () {
    onActiveEnterChange(false)
  }, []) // hasActiveOptions])

  if (options.length) {
    return (
      <ul
        ref={optionsRef}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
            onActiveIndexChange={onActiveIndexChange}
            onClick={onOptionClick}
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
  onActiveIndexChange: PropTypes.func.isRequired,
  onActiveEnterChange: PropTypes.func.isRequired,
  onOptionClick: PropTypes.func.isRequired
}
