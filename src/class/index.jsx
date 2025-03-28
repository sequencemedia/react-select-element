import React, { createRef, Component } from 'react'
import PropTypes from 'prop-types'

import {
  nanoid
} from 'nanoid'

import classNames from 'classnames/dedupe'

import {
  isKeyEnter,
  isKeySpace,
  isEventClickLike,
  toOptionText,
  hasExactMatch,
  getExactMatchIndex,
  hasStartMatch,
  getStartMatchIndex,
  hasGreaterThanMatch,
  getGreaterThanMatchIndex,
  hasSmallerThanMatch,
  getSmallerThanMatchIndex,
  getSelectIndex
} from '#common'

export default class SelectElement extends Component {
  constructor (props) {
    super(props)

    this.selectOption = createRef()
    this.options = createRef()
    this.activeOption = createRef()

    const {
      id
    } = props

    this.state = {
      id: id || nanoid(),
      selectIndex: getSelectIndex(props),
      hasActiveOptions: false,
      activeEnter: false,
      activeIndex: 0,
      activeChars: ''
    }
  }

  get upperBound () {
    const {
      options: {
        length: n
      } = []
    } = this.props

    return Math.max(0, n - 1)
  }

  get lowerBound () { return 0 }

  scrollOptionIntoView (element) {
    if (element) {
      const options = this.getOptions()

      if (options.contains(element)) {
        const {
          clientHeight
        } = options

        const {
          offsetHeight,
          offsetTop
        } = element

        const i = (clientHeight / 2)
        const j = (offsetHeight / 2)
        const n = Math.max(0, (offsetTop - i) + j)
        if (n !== options.scrollTop) options.scrollTop = n
      }
    }
  }

  toLowerBound () {
    this.setState({ activeIndex: this.lowerBound })
  }

  toUpperBound () {
    this.setState({ activeIndex: this.upperBound })
  }

  handleFocus = () => {
    const {
      selectIndex
    } = this.state

    this.activeIndex(selectIndex)
  }

  handleBlur = () => {
    this.setState({ hasActiveOptions: false })
  }

  handleMouseEnter = () => {
    this.setState({ activeEnter: true })
  }

  handleMouseLeave = () => {
    this.setState({ activeEnter: false })
  }

  handleActiveEnterFocus = () => true

  handleActiveEnterBlur = () => {
    this.getSelectOption().focus()
  }

  handleClick = (event) => {
    if (isEventClickLike(event)) { // it's probably an accessKey event
      this.getSelectOption().focus()
    } else { // it's probably a mouse click
      this.setState({ hasActiveOptions: true })
    }
  }

  handleOptionClick = (index) => {
    this.setState({ hasActiveOptions: false })
    this.selectIndex(index)
    this.getSelectOption().focus()
  }

  handleActiveOptionsKeyPress = (event) => {
    if (isKeyEnter(event) || isKeySpace(event)) return
    this.handleActiveOptionsKeyChar(event)
  }

  handleKeyPress = (event) => this.handleKeyChar(event)

  handleActiveOptionsKeyUp = (event) => this.handleActiveOptionsKeyCode(event)

  handleActiveOptionsKeyDown = () => true

  handleKeyUp = (event) => this.handleKeyCode(event)

  handleKeyDown = () => true

  handleKeySpace () {
    this.setState({ hasActiveOptions: false })

    const {
      activeIndex
    } = this.state

    this.selectIndex(activeIndex)
  }

  handleKeyEnter () {
    this.setState({ hasActiveOptions: false })

    const {
      activeIndex
    } = this.state

    this.selectIndex(activeIndex)
  }

  handleKeyEscape () {
    this.setState({ hasActiveOptions: false })
  }

  handleKeyArrowUp () {
    this.decrementActiveIndex()

    this.setState({ activeChars: '' })
  }

  handleKeyArrowDown () {
    this.incrementActiveIndex()

    this.setState({ activeChars: '' })
  }

  handleActiveOptionsKeyChar ({ charCode: keyChar }) {
    const {
      activeChars
    } = this.state
    const {
      options = []
    } = this.props
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    /*
     *  activeIndex()
     */
    if (hasExactMatch(options, chars)) {
      this.setState({ activeChars: chars })
      this.activeIndex(
        getExactMatchIndex(options, chars)
      )
    } else {
      if (hasStartMatch(options, chars)) {
        this.setState({ activeChars: chars })
        this.activeIndex(
          getStartMatchIndex(options, chars)
        )
      } else {
        if (hasExactMatch(options, char)) {
          this.setState({ activeChars: char })
          this.activeIndex(
            getExactMatchIndex(options, char)
          )
        } else {
          if (hasStartMatch(options, char)) {
            this.setState({ activeChars: char })
            this.activeIndex(
              getStartMatchIndex(options, char)
            )
          } else {
            if (hasGreaterThanMatch(options, char)) {
              this.setState({ activeChars: '' })
              this.activeIndex(
                getGreaterThanMatchIndex(options, char)
              )
            } else {
              if (hasSmallerThanMatch(options, char)) {
                this.setState({ activeChars: '' })
                this.activeIndex(
                  getSmallerThanMatchIndex(options, char)
                )
              }
            }
          }
        }
      }
    }
  }

  handleKeyChar ({ charCode: keyChar }) {
    const {
      activeChars
    } = this.state
    const {
      options = []
    } = this.props
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    /*
     *  selectIndex()
     */
    if (hasExactMatch(options, chars)) {
      this.setState({ activeChars: chars })
      this.selectIndex(
        getExactMatchIndex(options, chars)
      )
    } else {
      if (hasStartMatch(options, chars)) {
        this.setState({ activeChars: chars })
        this.selectIndex(
          getStartMatchIndex(options, chars)
        )
      } else {
        if (hasExactMatch(options, char)) {
          this.setState({ activeChars: char })
          this.selectIndex(
            getExactMatchIndex(options, char)
          )
        } else {
          if (hasStartMatch(options, char)) {
            this.setState({ activeChars: char })
            this.selectIndex(
              getStartMatchIndex(options, char)
            )
          } else {
            if (hasGreaterThanMatch(options, char)) {
              this.setState({ activeChars: '' })
              this.selectIndex(
                getGreaterThanMatchIndex(options, char)
              )
            }
          }
        }
      }
    }
  }

  handleActiveOptionsKeyCode (event) {
    const { keyCode } = event

    switch (keyCode) {
      case 13:
        this.handleKeyEnter(event)
        break
      case 27:
        this.handleKeyEscape(event)
        break
      case 32:
        this.handleKeySpace(event)
        break
      case 38:
        this.handleKeyArrowUp(event)
        break
      case 40:
        this.handleKeyArrowDown(event)
        break
    }
  }

  handleKeyCode ({ keyCode }) {
    if (
      keyCode === 32 ||
      keyCode === 38 ||
      keyCode === 40) { // space or arrow up or arrow down
      this.setState({ hasActiveOptions: true })
    }
  }

  selectIndex (index) {
    const {
      selectIndex
    } = this.state

    /*
     * Is the index different to the index stored in state?
     */
    if (index !== selectIndex) {
      const {
        onChange
      } = this.props

      /*
       *  Always invoke 'onChange' if it is available
       */
      if (onChange instanceof Function) onChange(index)

      /*
       *  Exit if 'index' is a prop. The component is not managing state
       */
      if ('index' in this.props) return

      /*
       *  Otherwise, update the state
       */
      this.setState({ selectIndex: index })
    }
  }

  activeIndex (index) {
    const {
      activeIndex
    } = this.state

    if (index !== activeIndex) {
      this.setState({ activeIndex: index })
    }
  }

  decrementActiveIndex () {
    const {
      activeIndex
    } = this.state

    this.activeIndex(
      Math.max(activeIndex - 1, this.lowerBound)
    )
  }

  incrementActiveIndex () {
    const {
      activeIndex
    } = this.state

    this.activeIndex(
      Math.min(activeIndex + 1, this.upperBound)
    )
  }

  getSelectOption () {
    return this.selectOption.current
  }

  getOptions () {
    return this.options.current
  }

  getActiveOption () {
    return this.activeOption.current
  }

  getOptionsFirstChild () {
    return (
      this.getOptions()
        .firstChild
    ) || null
  }

  getOptionsLastChild () {
    return (
      this.getOptions()
        .lastChild
    ) || null
  }

  getActiveOptionPreviousSibling () {
    return (
      this.getActiveOption()
        .previousSibling
    ) || null
  }

  getActiveOptionNextSibling () {
    return (
      this.getActiveOption()
        .nextSibling
    ) || null
  }

  getOptionRef = (index) => {
    const {
      activeIndex
    } = this.state

    if (index === activeIndex) {
      return this.activeOption
    }
  }

  getSelectedOptionDisabledClassName () {
    return 'selected-option'
  }

  getSelectedOptionReadOnlyClassName () {
    return 'selected-option'
  }

  getSelectedOptionClassName () {
    return 'selected-option'
  }

  getSelectedOption () {
    const {
      options = []
    } = this.props
    const {
      selectIndex
    } = this.state

    return (
      options[selectIndex] || {}
    )
  }

  getOptionDisabledClassName (index) {
    const {
      selectIndex
    } = this.state

    return (
      classNames('option', { selected: (index === selectIndex) })
    )
  }

  getOptionReadOnlyClassName (index) {
    const {
      selectIndex
    } = this.state

    return (
      classNames('option', { selected: (index === selectIndex) })
    )
  }

  getOptionClassName (index) {
    const {
      activeIndex,
      selectIndex
    } = this.state

    return (
      classNames('option', { active: (index === activeIndex), selected: (index === selectIndex) })
    )
  }

  getOptionsClassName () {
    const {
      hasActiveOptions
    } = this.state

    return (
      classNames('options', { active: hasActiveOptions })
    )
  }

  static getDerivedStateFromProps (props) {
    return ('index' in props) ? { selectIndex: getSelectIndex(props) } : null
  }

  shouldComponentUpdate (props, state) {
    if (props !== this.props) return true

    return (
      (state.hasActiveOptions !== this.state.hasActiveOptions) ||
      (state.activeEnter !== this.state.activeEnter) ||
      (state.activeIndex !== this.state.activeIndex) ||
      (state.selectIndex !== this.state.selectIndex)
    )
  }

  renderSelectedOptionText ({ text }) {
    return toOptionText(text)
  }

  renderSelectedOptionDisabled () {
    const {
      children = null
    } = this.props

    return (
      <div
        ref={this.selectOption}
        className={this.getSelectedOptionDisabledClassName()}>
        {children || (
          this.renderSelectedOptionText(
            this.getSelectedOption()
          )
        )}
      </div>
    )
  }

  renderSelectedOptionReadOnly () {
    const {
      children = null
    } = this.props

    return (
      <div
        ref={this.selectOption}
        className={this.getSelectedOptionReadOnlyClassName()}>
        {children || (
          this.renderSelectedOptionText(
            this.getSelectedOption()
          )
        )}
      </div>
    )
  }

  renderSelectedOption () {
    const {
      accessKey,
      tabIndex = 0,
      children = null
    } = this.props

    const {
      activeEnter,
      hasActiveOptions
    } = this.state

    return (
      <div
        ref={this.selectOption}
        accessKey={accessKey}
        tabIndex={tabIndex}
        className={this.getSelectedOptionClassName()}
        onFocus={(activeEnter)
          ? this.handleActiveEnterFocus
          : this.handleFocus}
        onBlur={(activeEnter)
          ? this.handleActiveEnterBlur
          : this.handleBlur}
        onClick={this.handleClick}
        onKeyPress={(hasActiveOptions)
          ? this.handleActiveOptionsKeyPress
          : this.handleKeyPress}
        onKeyUp={(hasActiveOptions)
          ? this.handleActiveOptionsKeyUp
          : this.handleKeyUp}
        onKeyDown={(hasActiveOptions)
          ? this.handleActiveOptionsKeyDown
          : this.handleKeyDown}>
        {children || (
          this.renderSelectedOptionText(
            this.getSelectedOption()
          )
        )}
      </div>
    )
  }

  renderOptionText ({ text }) /* (option, index) */ {
    return toOptionText(text)
  }

  renderOptionDisabled = (option, index) => {
    const optionText = this.renderOptionText(option, index)

    const {
      selectIndex
    } = this.state

    return (
      <li
        key={index}
        ref={this.getOptionRef(index)}
        className={this.getOptionDisabledClassName(index)}
        role='option'
        aria-selected={index === selectIndex}>
        {optionText}
      </li>
    )
  }

  renderOptionReadOnly = (option, index) => {
    const optionText = this.renderOptionText(option, index)

    const {
      selectIndex
    } = this.state

    return (
      <li
        key={index}
        ref={this.getOptionRef(index)}
        className={this.getOptionReadOnlyClassName(index)}
        role='option'
        aria-selected={index === selectIndex}>
        {optionText}
      </li>
    )
  }

  renderOption = (option, index) => {
    const optionText = this.renderOptionText(option, index)

    const {
      selectIndex
    } = this.state

    const handleMouse = () => this.activeIndex(index)

    return (
      <li
        key={index}
        ref={this.getOptionRef(index)}
        className={this.getOptionClassName(index)}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
        onClick={() => this.handleOptionClick(index)}
        role='option'
        aria-selected={index === selectIndex}>
        {optionText}
      </li>
    )
  }

  renderOptionsDisabled () {
    const {
      options = []
    } = this.props

    if (options.length) {
      const {
        id
      } = this.state

      return (
        <ul
          ref={this.options}
          className='options'
          role='listbox'
          aria-hidden
          id={id}>
          {options.map(this.renderOptionDisabled)}
        </ul>
      )
    }
  }

  renderOptionsReadOnly () {
    const {
      options = []
    } = this.props

    if (options.length) {
      const {
        id
      } = this.state

      return (
        <ul
          ref={this.options}
          className='options'
          role='listbox'
          aria-hidden
          id={id}>
          {options.map(this.renderOptionReadOnly)}
        </ul>
      )
    }
  }

  renderOptions () {
    const {
      options = []
    } = this.props

    if (options.length) {
      const {
        hasActiveOptions,
        id
      } = this.state

      return (
        <ul
          ref={this.options}
          className={this.getOptionsClassName()}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          role='listbox'
          aria-hidden={!hasActiveOptions}
          id={id}>
          {options.map(this.renderOption)}
        </ul>
      )
    }
  }

  renderDisabled () {
    const {
      id
    } = this.state

    return (
      <div
        className='react-select-element disabled'
        aria-expanded={false}
        aria-haspopup='listbox'
        aria-controls={id}>
        {this.renderSelectedOptionDisabled()}
        {this.renderOptionsDisabled()}
      </div>
    )
  }

  renderReadOnly () {
    const {
      id
    } = this.state

    return (
      <div
        className='react-select-element readonly'
        aria-expanded={false}
        aria-haspopup='listbox'
        aria-controls={id}>
        {this.renderSelectedOptionReadOnly()}
        {this.renderOptionsReadOnly()}
      </div>
    )
  }

  render () {
    const { disabled = false } =
       this.props

    if (disabled) {
      return this.renderDisabled()
    }

    const {
      readOnly = false
    } = this.props

    if (readOnly) {
      return this.renderReadOnly()
    }

    const {
      hasActiveOptions,
      id
    } = this.state

    return (
      <div
        className='react-select-element'
        aria-expanded={hasActiveOptions}
        aria-haspopup='listbox'
        aria-controls={id}>
        {this.renderSelectedOption()}
        {this.renderOptions()}
      </div>
    )
  }
}

SelectElement.propTypes = {
  id: PropTypes.string,
  defaultIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
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
  ),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  children: PropTypes.node
}
