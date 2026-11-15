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
  children = null,
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
    handleActiveIndexChange(selectIndex) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
  }, [
    selectIndex,
    handleActiveIndexChange
  ])

  const handleBlur = useCallback(function onBlur () {
    setHasActiveOptions(false)
  }, [
    setHasActiveOptions
  ])

  const handleActiveEnterFocus = useCallback(function onActiveEnterFocus () {
    //
  }, [])

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
    current,
    setHasActiveOptions
  ])

  const handleOptionClick = useCallback(function onOptionClick (index) {
    setHasActiveOptions(false)
    handleSelectIndexChange(index) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
    if (current) current.focus()
  }, [
    current,
    setHasActiveOptions,
    handleSelectIndexChange
  ])

  const handleKeySpace = useCallback(function onKeySpace () {
    setHasActiveOptions(false)
    handleSelectIndexChange(activeIndex) // let `handleSelectIndexChange` handle `(activeIndex !== selectIndex)`
  }, [
    activeIndex,
    setHasActiveOptions,
    handleSelectIndexChange
  ])

  const handleKeyEnter = useCallback(function onKeyEnter () {
    setHasActiveOptions(false)
    handleSelectIndexChange(activeIndex) // let `handleSelectIndexChange` handle `(activeIndex !== selectIndex)`
  }, [
    activeIndex,
    setHasActiveOptions,
    handleSelectIndexChange
  ])

  const handleKeyEscape = useCallback(function onKeyEscape () {
    setHasActiveOptions(false)
  }, [
    setHasActiveOptions
  ])

  const decrementActiveIndex = useCallback(function decrementActiveIndex () {
    const index = Math.max(activeIndex - 1, lowerBound)
    handleActiveIndexChange(index) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
  }, [
    activeIndex,
    lowerBound,
    handleActiveIndexChange
  ])

  const incrementActiveIndex = useCallback(function incrementActiveIndex () {
    const index = Math.min(activeIndex + 1, upperBound)
    handleActiveIndexChange(index) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
  }, [
    activeIndex,
    upperBound,
    handleActiveIndexChange
  ])

  const handleKeyArrowUp = useCallback(function onKeyArrowUp () {
    decrementActiveIndex()
    setActiveChars('')
  }, [
    decrementActiveIndex,
    setActiveChars
  ])

  const handleKeyArrowDown = useCallback(function onKeyArrowDown () {
    incrementActiveIndex()
    setActiveChars('')
  }, [
    incrementActiveIndex,
    setActiveChars
  ])

  const handleActiveOptionsKeyChar = useCallback(function onActiveOptionsKeyChar ({ charCode: keyChar }) {
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    /*
    *  activeIndex()
    */
    if (hasExactMatch(options, chars)) {
      setActiveChars(chars)
      handleActiveIndexChange(
        getExactMatchIndex(options, chars) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
      )
    } else {
      if (hasStartMatch(options, chars)) {
        setActiveChars(chars)
        handleActiveIndexChange(
          getStartMatchIndex(options, chars) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
        )
      } else {
        if (hasExactMatch(options, char)) {
          setActiveChars(char)
          handleActiveIndexChange(
            getExactMatchIndex(options, char) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
          )
        } else {
          if (hasStartMatch(options, char)) {
            setActiveChars(char)
            handleActiveIndexChange(
              getStartMatchIndex(options, char) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
            )
          } else {
            if (hasGreaterThanMatch(options, char)) {
              setActiveChars('')
              handleActiveIndexChange(
                getGreaterThanMatchIndex(options, char) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
              )
            } else {
              if (hasSmallerThanMatch(options, char)) {
                setActiveChars('')
                handleActiveIndexChange(
                  getSmallerThanMatchIndex(options, char) // let `handleActiveIndexChange` handle `(index !== activeIndex)`
                )
              }
            }
          }
        }
      }
    }
  }, [
    activeChars,
    options,
    handleActiveIndexChange
  ])

  const handleKeyChar = useCallback(function onKeyChar ({ charCode: keyChar }) {
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    /*
    *  selectIndex()
    */
    if (hasExactMatch(options, chars)) {
      setActiveChars(chars)
      handleSelectIndexChange(
        getExactMatchIndex(options, chars) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
      )
    } else {
      if (hasStartMatch(options, chars)) {
        setActiveChars(chars)
        handleSelectIndexChange(
          getStartMatchIndex(options, chars) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
        )
      } else {
        if (hasExactMatch(options, char)) {
          setActiveChars(char)
          handleSelectIndexChange(
            getExactMatchIndex(options, char) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
          )
        } else {
          if (hasStartMatch(options, char)) {
            setActiveChars(char)
            handleSelectIndexChange(
              getStartMatchIndex(options, char) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
            )
          } else {
            if (hasGreaterThanMatch(options, char)) {
              setActiveChars('')
              handleSelectIndexChange(
                getGreaterThanMatchIndex(options, char) // let `handleSelectIndexChange` handle `(index !== selectIndex)`
              )
            }
          }
        }
      }
    }
  }, [
    activeChars,
    options,
    handleSelectIndexChange
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
    handleKeyEnter,
    handleKeyEscape,
    handleKeySpace,
    handleKeyArrowUp,
    handleKeyArrowDown
  ])

  const handleKeyCode = useCallback(function onKeyCode ({ keyCode }) {
    if (
      keyCode === 32 ||
      keyCode === 38 ||
      keyCode === 40) { // space or arrow up or arrow down
      setHasActiveOptions(true)
    }
  }, [setHasActiveOptions])

  const handleKeyPress = useCallback(function onKeyPress (event) { handleKeyChar(event) }, [
    handleKeyChar
  ])

  const handleActiveOptionsKeyPress = useCallback(function onActiveOptionsKeyPress (event) {
    if (isKeyEnter(event) || isKeySpace(event)) return
    handleActiveOptionsKeyChar(event)
  }, [
    handleActiveOptionsKeyChar
  ])

  const handleActiveOptionsKeyUp = useCallback(function onActiveOptionsKeyUp (event) { handleActiveOptionsKeyCode(event) }, [
    handleActiveOptionsKeyCode
  ])

  const handleActiveOptionsKeyDown = useCallback(function onActiveOptionsKeyDown () { /* */ }, [])

  const handleKeyUp = useCallback(function onKeyUp (event) { handleKeyCode(event) }, [handleKeyCode])

  const handleKeyDown = useCallback(function onKeyDown () { /* */ }, [])

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
        onKeyDown={handleKeyDown}>
        {children}
      </SelectedOption>
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
