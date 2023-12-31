import React, { useState, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'

import {
  isKeyEnter,
  isKeySpace,
  isEventClickLike,
  hasExactMatch,
  getExactMatchIndex,
  hasStartMatch,
  getStartMatchIndex,
  hasGreaterThanMatch,
  getGreaterThanMatchIndex,
  hasSmallerThanMatch,
  getSmallerThanMatchIndex
} from '../common'

import SelectedOption from './SelectedOption'
import Options from './Options'

export default function Select ({
  accessKey,
  tabIndex,
  options,
  selectIndex,
  handleSelectIndexChange,
  activeIndex,
  handleActiveIndexChange,
  selectOptionRef,
  optionsRef,
  activeOptionRef,
  id
}) {
  const [hasActiveOptions, setHasActiveOptions] = useState(false)
  const [activeEnter, setActiveEnter] = useState(false)
  const [activeChars, setActiveChars] = useState('')

  const {
    length: n
  } = options

  const {
    upperBound,
    lowerBound
  } = useMemo(() => {
    return {
      upperBound: Math.max(0, n - 1),
      lowerBound: 0
    }
  }, [n])

  function handleFocus () {
    handleActiveIndexChange(selectIndex)
  }

  function handleBlur () {
    setHasActiveOptions(false)
  }

  const handleActiveEnterFocus = () => true

  function handleActiveEnterBlur () {
    const {
      current
    } = selectOptionRef

    current.focus()
  }

  function handleClick (event) {
    if (isEventClickLike(event)) { // it's probably an accessKey event
      const {
        current
      } = selectOptionRef

      current.focus()
    } else { // it's probably a mouse click
      setHasActiveOptions(true)
    }
  }

  function handleOptionClick (index) {
    setHasActiveOptions(false)
    handleSelectIndexChange(index)

    const {
      current
    } = selectOptionRef

    current.focus()
  }

  function handleActiveOptionsKeyPress (event) {
    if (isKeyEnter(event) || isKeySpace(event)) return

    return handleActiveOptionsKeyChar(event)
  }

  const handleKeyPress = (event) => handleKeyChar(event)

  const handleActiveOptionsKeyUp = (event) => handleActiveOptionsKeyCode(event)

  const handleActiveOptionsKeyDown = () => true

  const handleKeyUp = (event) => handleKeyCode(event)

  const handleKeyDown = () => true

  function handleKeySpace () {
    setHasActiveOptions(false)
    handleSelectIndexChange(activeIndex)
  }

  function handleKeyEnter () {
    setHasActiveOptions(false)
    handleSelectIndexChange(activeIndex)
  }

  function handleKeyEscape () {
    setHasActiveOptions(false)
  }

  const decrementActiveIndex = useCallback(function decrementActiveIndex () {
    handleActiveIndexChange(
      Math.max(activeIndex - 1, lowerBound)
    )
  }, [activeIndex, lowerBound])

  const incrementActiveIndex = useCallback(function incrementActiveIndex () {
    handleActiveIndexChange(
      Math.min(activeIndex + 1, upperBound)
    )
  }, [activeIndex, upperBound])

  function handleKeyArrowUp () {
    decrementActiveIndex()

    setActiveChars('')
  }

  function handleKeyArrowDown () {
    incrementActiveIndex()

    setActiveChars('')
  }

  const handleActiveOptionsKeyChar = useCallback(function handleActiveOptionsKeyChar ({ charCode: keyChar }) {
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    /*
    *  activeIndex()
    */
    if (hasExactMatch(options, chars)) {
      setActiveChars(chars)
      handleActiveIndexChange(
        getExactMatchIndex(options, chars)
      )
    } else {
      if (hasStartMatch(options, chars)) {
        setActiveChars(chars)
        handleActiveIndexChange(
          getStartMatchIndex(options, chars)
        )
      } else {
        if (hasExactMatch(options, char)) {
          setActiveChars(char)
          handleActiveIndexChange(
            getExactMatchIndex(options, char)
          )
        } else {
          if (hasStartMatch(options, char)) {
            setActiveChars(char)
            handleActiveIndexChange(
              getStartMatchIndex(options, char)
            )
          } else {
            if (hasGreaterThanMatch(options, char)) {
              setActiveChars('')
              handleActiveIndexChange(
                getGreaterThanMatchIndex(options, char)
              )
            } else {
              if (hasSmallerThanMatch(options, char)) {
                setActiveChars('')
                handleActiveIndexChange(
                  getSmallerThanMatchIndex(options, char)
                )
              }
            }
          }
        }
      }
    }
  }, [activeChars, options])

  const handleKeyChar = useCallback(function handleKeyChar ({ charCode: keyChar }) {
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    /*
    *  selectIndex()
    */
    if (hasExactMatch(options, chars)) {
      setActiveChars(chars)
      handleSelectIndexChange(
        getExactMatchIndex(options, chars)
      )
    } else {
      if (hasStartMatch(options, chars)) {
        setActiveChars(chars)
        handleSelectIndexChange(
          getStartMatchIndex(options, chars)
        )
      } else {
        if (hasExactMatch(options, char)) {
          setActiveChars(char)
          handleSelectIndexChange(
            getExactMatchIndex(options, char)
          )
        } else {
          if (hasStartMatch(options, char)) {
            setActiveChars(char)
            handleSelectIndexChange(
              getStartMatchIndex(options, char)
            )
          } else {
            if (hasGreaterThanMatch(options, char)) {
              setActiveChars('')
              handleSelectIndexChange(
                getGreaterThanMatchIndex(options, char)
              )
            }
          }
        }
      }
    }
  }, [activeChars, options])

  function handleActiveOptionsKeyCode (event) {
    const { keyCode } = event

    switch (keyCode) {
      case 13:
        handleKeyEnter(event)
        break
      case 27:
        handleKeyEscape(event)
        break
      case 32:
        handleKeySpace(event)
        break
      case 38:
        handleKeyArrowUp(event)
        break
      case 40:
        handleKeyArrowDown(event)
        break
    }
  }

  function handleKeyCode ({ keyCode }) {
    if (
      keyCode === 32 ||
      keyCode === 38 ||
      keyCode === 40) { // space or arrow up or arrow down
      setHasActiveOptions(true)
    }
  }

  return (
    <div
      className='react-select-element'
      aria-expanded={hasActiveOptions}
      aria-haspopup='listbox'
      aria-controls={id}>
      <SelectedOption
        selectOptionRef={selectOptionRef}
        accessKey={accessKey}
        tabIndex={tabIndex}
        options={options}
        selectIndex={selectIndex}
        activeEnter={activeEnter}
        hasActiveOptions={hasActiveOptions}
        handleActiveEnterFocus={handleActiveEnterFocus}
        handleFocus={handleFocus}
        handleActiveEnterBlur={handleActiveEnterBlur}
        handleBlur={handleBlur}
        handleClick={handleClick}
        handleActiveOptionsKeyPress={handleActiveOptionsKeyPress}
        handleKeyPress={handleKeyPress}
        handleActiveOptionsKeyUp={handleActiveOptionsKeyUp}
        handleKeyUp={handleKeyUp}
        handleActiveOptionsKeyDown={handleActiveOptionsKeyDown}
        handleKeyDown={handleKeyDown}
      />
      <Options
        activeOptionRef={activeOptionRef}
        optionsRef={optionsRef}
        options={options}
        selectIndex={selectIndex}
        activeIndex={activeIndex}
        hasActiveOptions={hasActiveOptions}
        handleActiveIndexChange={handleActiveIndexChange}
        handleActiveEnterChange={setActiveEnter}
        handleOptionClick={handleOptionClick}
        id={id}
      />
    </div>
  )
}

Select.propTypes = {
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
  tabIndex: PropTypes.number,
  accessKey: PropTypes.string,
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
  handleSelectIndexChange: PropTypes.func.isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleActiveIndexChange: PropTypes.func.isRequired,
  children: PropTypes.node
}

Select.defaultProps = {
  tabIndex: 0,
  options: [],
  disabled: false,
  readOnly: false
}
