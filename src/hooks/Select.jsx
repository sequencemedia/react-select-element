import React, {
  useState,
  useMemo,
  useCallback
} from 'react'
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
} from '#common'

import SelectedOption from './SelectedOption'
import Options from './Options'

export default function Select ({
  accessKey,
  tabIndex = 0,
  options = [],
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

  const {
    current
  } = selectOptionRef

  const handleFocus = useCallback(function onFocus () {
    handleActiveIndexChange(selectIndex)
  }, [
    hasActiveOptions,
    selectIndex
  ])

  const handleBlur = useCallback(function onBlur () {
    setHasActiveOptions(false)
  }, [
    hasActiveOptions,
    selectIndex
  ])

  const handleActiveEnterFocus = useCallback(function onActiveEnterFocus () {
    //
  }, [current])

  const handleActiveEnterBlur = useCallback(function onActiveEnterBlur () {
    if (current) current.focus()
  }, [current])

  const handleClick = useCallback(function onClick (event) {
    if (isEventClickLike(event)) { // it's probably an accessKey event
      if (current) current.focus()
    } else { // it's probably a mouse click
      setHasActiveOptions(true)
    }
  }, [
    hasActiveOptions,
    current
  ])

  const handleOptionClick = useCallback(function onOptionClick (index) {
    setHasActiveOptions(false)
    if (index !== selectIndex) handleSelectIndexChange(index)
    if (current) current.focus()
  }, [
    hasActiveOptions,
    current,
    selectIndex,
    activeIndex
  ])

  const handleActiveOptionsKeyPress = useCallback(function onActiveOptionsKeyPress (event) {
    if (isKeyEnter(event) || isKeySpace(event)) return
    handleActiveOptionsKeyChar(event)
  }, [
    activeChars,
    options
  ])

  const handleKeyPress = useCallback((event) => handleKeyChar(event), [
    activeChars,
    options
  ])

  const handleActiveOptionsKeyUp = useCallback((event) => handleActiveOptionsKeyCode(event), [
    hasActiveOptions,
    selectIndex,
    activeIndex,
    upperBound,
    lowerBound
  ])

  const handleActiveOptionsKeyDown = useCallback(() => { /* */ }, [
    hasActiveOptions,
    selectIndex,
    activeIndex,
    upperBound,
    lowerBound
  ])

  const handleKeyUp = useCallback((event) => handleKeyCode(event), [hasActiveOptions])

  const handleKeyDown = useCallback(() => { /* */ }, [hasActiveOptions])

  const handleKeySpace = useCallback(function onKeySpace () {
    setHasActiveOptions(false)
    if (activeIndex !== selectIndex) handleSelectIndexChange(activeIndex)
  }, [
    hasActiveOptions,
    selectIndex,
    activeIndex
  ])

  const handleKeyEnter = useCallback(function onKeyEnter () {
    setHasActiveOptions(false)
    if (activeIndex !== selectIndex) handleSelectIndexChange(activeIndex)
  }, [
    hasActiveOptions,
    selectIndex,
    activeIndex
  ])

  const handleKeyEscape = useCallback(function onKeyEscape () {
    setHasActiveOptions(false)
  }, [hasActiveOptions])

  const decrementActiveIndex = useCallback(function decrementActiveIndex () {
    const index = Math.max(activeIndex - 1, lowerBound)
    if (index !== activeIndex) handleActiveIndexChange(index)
  }, [
    activeIndex,
    lowerBound
  ])

  const incrementActiveIndex = useCallback(function incrementActiveIndex () {
    const index = Math.min(activeIndex + 1, upperBound)
    if (index !== activeIndex) handleActiveIndexChange(index)
  }, [
    activeIndex,
    upperBound
  ])

  const handleKeyArrowUp = useCallback(function onKeyArrowUp () {
    decrementActiveIndex()
    setActiveChars('')
  }, [
    activeIndex,
    lowerBound
  ])

  const handleKeyArrowDown = useCallback(function onKeyArrowDown () {
    incrementActiveIndex()
    setActiveChars('')
  }, [
    activeIndex,
    upperBound
  ])

  const handleActiveOptionsKeyChar = useCallback(function onActiveOptionsKeyChar ({ charCode: keyChar }) {
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    /*
    *  activeIndex()
    */
    if (hasExactMatch(options, chars)) {
      setActiveChars(chars)
      const index = getExactMatchIndex(options, chars)
      if (index !== activeIndex) handleActiveIndexChange(index)
    } else {
      if (hasStartMatch(options, chars)) {
        setActiveChars(chars)
        const index = getStartMatchIndex(options, chars)
        if (index !== activeIndex) handleActiveIndexChange(index)
      } else {
        if (hasExactMatch(options, char)) {
          setActiveChars(char)
          const index = getExactMatchIndex(options, char)
          if (index !== activeIndex) handleActiveIndexChange(index)
        } else {
          if (hasStartMatch(options, char)) {
            setActiveChars(char)
            const index = getStartMatchIndex(options, char)
            if (index !== activeIndex) handleActiveIndexChange(index)
          } else {
            if (hasGreaterThanMatch(options, char)) {
              setActiveChars('')
              const index = getGreaterThanMatchIndex(options, char)
              if (index !== activeIndex) handleActiveIndexChange(index)
            } else {
              if (hasSmallerThanMatch(options, char)) {
                setActiveChars('')
                const index = getSmallerThanMatchIndex(options, char)
                if (index !== activeIndex) handleActiveIndexChange(index)
              }
            }
          }
        }
      }
    }
  }, [
    activeChars,
    selectIndex,
    activeIndex,
    options
  ])

  const handleKeyChar = useCallback(function onKeyChar ({ charCode: keyChar }) {
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    /*
    *  selectIndex()
    */
    if (hasExactMatch(options, chars)) {
      setActiveChars(chars)
      const index = getExactMatchIndex(options, chars)
      if (index !== selectIndex) handleSelectIndexChange(index)
    } else {
      if (hasStartMatch(options, chars)) {
        setActiveChars(chars)
        const index = getStartMatchIndex(options, chars)
        if (index !== selectIndex) handleSelectIndexChange(index)
      } else {
        if (hasExactMatch(options, char)) {
          setActiveChars(char)
          const index = getExactMatchIndex(options, char)
          if (index !== selectIndex) handleSelectIndexChange(index)
        } else {
          if (hasStartMatch(options, char)) {
            setActiveChars(char)
            const index = getStartMatchIndex(options, char)
            if (index !== selectIndex) handleSelectIndexChange(index)
          } else {
            if (hasGreaterThanMatch(options, char)) {
              setActiveChars('')
              const index = getGreaterThanMatchIndex(options, char)
              if (index !== selectIndex) handleSelectIndexChange(index)
            }
          }
        }
      }
    }
  }, [
    activeChars,
    selectIndex,
    activeIndex,
    options
  ])

  const handleActiveOptionsKeyCode = useCallback(function onActiveOptionsKeyCode (event) {
    const {
      keyCode
    } = event

    switch (keyCode) {
      case 13: // [hasActiveOptions, activeIndex]
        handleKeyEnter(event)
        break
      case 27: // [hasActiveOptions]
        handleKeyEscape(event)
        break
      case 32: // [hasActiveOptions, activeIndex]
        handleKeySpace(event)
        break
      case 38: // [activeIndex, lowerBound]
        handleKeyArrowUp(event)
        break
      case 40: // [activeIndex, upperBound]
        handleKeyArrowDown(event)
        break
    }
  }, [
    hasActiveOptions,
    selectIndex,
    activeIndex,
    upperBound,
    lowerBound
  ])

  const handleKeyCode = useCallback(function onKeyCode ({ keyCode }) {
    if (
      keyCode === 32 ||
      keyCode === 38 ||
      keyCode === 40) { // space or arrow up or arrow down
      setHasActiveOptions(true)
    }
  }, [hasActiveOptions])

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
        onActiveEnterFocus={handleActiveEnterFocus}
        onFocus={handleFocus}
        onActiveEnterBlur={handleActiveEnterBlur}
        onBlur={handleBlur}
        onClick={handleClick}
        onActiveOptionsKeyPress={handleActiveOptionsKeyPress}
        onKeyPress={handleKeyPress}
        onActiveOptionsKeyUp={handleActiveOptionsKeyUp}
        onKeyUp={handleKeyUp}
        onActiveOptionsKeyDown={handleActiveOptionsKeyDown}
        onKeyDown={handleKeyDown}
      />
      <Options
        activeOptionRef={activeOptionRef}
        optionsRef={optionsRef}
        options={options}
        selectIndex={selectIndex}
        activeIndex={activeIndex}
        hasActiveOptions={hasActiveOptions}
        onActiveIndexChange={handleActiveIndexChange}
        onActiveEnterChange={setActiveEnter}
        onOptionClick={handleOptionClick}
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
