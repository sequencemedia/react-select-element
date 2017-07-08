import React from 'react'
import PropTypes from 'prop-types'

const toNumber = (v) => isNaN(v) ? NaN : parseInt(v, 10)

/*
 *  'accesskey' events are raised as clicks with all-zero co-ordinates. All-zero
 *  coordinates are (of course) possible, but unlikely. This is a woolly way of
 *  identifying 'accesskey' events
 */
const isEventClickLike = ({ pageX, pageY, screenX, screenY }) => !(pageX || pageY || screenX || screenY)

const toOptionText = (t) => (t !== undefined) ? t.toString() : '\uFEFF'

const noFocus = (e) => e.cancelDefault()

export default class SelectElement extends React.Component {
  state = {
    hasActiveOptions: false,
    activeEnter: false,
    activeIndex: 0,
    activeChars: ''
  }

  constructor (props) {
    super(props)
    const { index, defaultIndex } = this.props
    const value = toNumber(index)
    const selectIndex = isNaN(value) ? toNumber(defaultIndex) : value
    const { ...state } = this.state

    this.state = {
      selectIndex,
      ...state
    }
  }

  get lowerBound () { return 0 }
  get upperBound () {
    const {
      options: {
        length: n
      }
    } = this.props

    return Math.max(0, n - 1)
  }

  handleFocus = () => {
    const { selectIndex } = this.state

    this.activeIndex(selectIndex)
  }

  handleBlur = () => {
    this.setState({ hasActiveOptions: false })
  }

  handleOptionsEnter = () => {
    this.setState({ activeEnter: true })
  }

  handleOptionsLeave = () => {
    this.setState({ activeEnter: false })
  }

  optionFocus = () => this.selectedOption.focus()
  acceptFocus = () => true /* simplify a conditional! */

  handleClick = (event) => {
    if (isEventClickLike(event)) { // it's probably an accessKey event (which raises a click)
      this.optionFocus()
    } else { // it's probably a click
      this.setState({ hasActiveOptions: true })
    }
  }

  handleOptionClick = (index) => {
    this.setState({ hasActiveOptions: false })
    this.selectIndex(index)
  }

  handleOptionsKeyPress = ({ charCode }) => {
    this.handleOptionsKeyChar(charCode)
  }

  handleKeyPress = ({ charCode }) => {
    this.handleKeyChar(charCode)
  }

  handleOptionsKeyUp = ({ keyCode }) => {
    this.handleOptionsKeyCode(keyCode)
  }

  handleKeyUp = ({ keyCode }) => {
    this.handleKeyCode(keyCode)
  }

  handleRef = (ref) => {
    this.selectedOption = ref
  }

  findChars (chars) {
    const { options } = this.props

    const n = chars.length
    const i = options.findIndex(({ text }) => (
      toOptionText(text)
        .toLowerCase()
        .substr(0, n) === chars
    ))

    return (i < 0) ? NaN : i
  }

  findChar (char) {
    const { options } = this.props

    const i = options.findIndex(({ text }) => (
      toOptionText(text)
        .toLowerCase()
        .charAt(0) === char
    ))

    return (i < 0) ? NaN : i
  }

  handleOptionsKeyChar (keyChar) {
    const { activeChars } = this.state
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    let index = this.findChars(chars)
    if (!isNaN(index)) {
      this.setState({ activeChars: chars })
      this.activeIndex(index)
    } else {
      let index = this.findChar(char)
      if (!isNaN(index)) {
        this.setState({ activeChars: char })
        this.activeIndex(index)
      }
    }
  }

  handleKeyChar (keyChar) {
    const { activeChars } = this.state
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    let index = this.findChars(chars)
    if (!isNaN(index)) {
      this.setState({ activeChars: chars })
      this.selectIndex(index)
    } else {
      if (activeChars !== char) {
        let index = this.findChar(char)
        if (!isNaN(index)) {
          this.setState({ activeChars: char })
          this.selectIndex(index)
        }
      }
    }
  }

  handleOptionsKeyCode (keyCode) {
    switch (keyCode) {
      case 13:
      case 32:
        {
          this.setState({ hasActiveOptions: false })

          const { activeIndex } = this.state

          this.selectIndex(activeIndex)
        }
        break
      case 38: // arrow up
        this.decrementActiveIndex()
        break
      case 40: // arrow down
        this.incrementActiveIndex()
        break
    }
  }

  handleKeyCode (keyCode) {
    if (keyCode === 40) {
      this.setState({ hasActiveOptions: true })
    }
  }

  /*
   *  'shouldComponentUpdate()'
   */
  selectIndex (index) {
    const { selectIndex } = this.state

    if (index !== selectIndex) {
      const { onChange } = this.props

      if (onChange instanceof Function) onChange(index)
      else {
        if ('index' in this.props) return
        this.setState({ selectIndex: index })
      }
    }
  }

  /*
   *  'shouldComponentUpdate()'
   */
  activeIndex (index) {
    const { activeIndex } = this.state

    if (index !== activeIndex) {
      this.setState({ activeIndex: index })
    }
  }

  decrementActiveIndex () {
    const { activeIndex } = this.state

    this.activeIndex(
      Math.max(activeIndex - 1, this.lowerBound)
    )
  }

  incrementActiveIndex () {
    const { activeIndex } = this.state

    this.activeIndex(
      Math.min(activeIndex + 1, this.upperBound)
    )
  }

  createSelectedOptionDisabled () {
    const {
      options
    } = this.props

    const {
      selectIndex
    } = this.state

    const { text } = options[selectIndex] || {}

    return (
      <div
        className='selected-option'
        ref={this.handleRef}>
        {toOptionText(text)}
      </div>
    )
  }

  createSelectedOption () {
    const {
      options,
      accessKey,
      tabIndex
    } = this.props

    const {
      selectIndex,
      activeEnter,
      hasActiveOptions
    } = this.state

    const { text } = options[selectIndex] || {}

    return (
      <div
        accessKey={accessKey}
        tabIndex={tabIndex}
        className='selected-option'
        onFocus={(activeEnter)
          ? this.acceptFocus /* Bonkers but I like it. Soz-oh */
          : this.handleFocus}
        onBlur={(activeEnter)
          ? this.optionFocus
          : this.handleBlur}
        onClick={this.handleClick}
        onKeyPress={(hasActiveOptions)
          ? this.handleOptionsKeyPress
          : this.handleKeyPress}
        onKeyUp={(hasActiveOptions)
          ? this.handleOptionsKeyUp
          : this.handleKeyUp}
        ref={this.handleRef}>
        {toOptionText(text)}
      </div>
    )
  }

  createOptionClassName (index) {
    return (index === this.state.activeIndex)
      ? 'option active'
      : 'option'
  }

  createOptionDisabled = (option, index) => {
    const { text } = option

    return (
      <li
        key={index}
        className='option'>
        {toOptionText(text)}
      </li>
    )
  }

  createOption = (option, index) => {
    const { text } = option

    return (
      <li
        key={index}
        className={this.createOptionClassName(index)}
        onMouseOver={() => this.activeIndex(index)}
        onClick={() => this.handleOptionClick(index)}>
        {toOptionText(text)}
      </li>
    )
  }

  createOptionsClassName () {
    return (this.state.hasActiveOptions)
      ? 'options active'
      : 'options'
  }

  createOptionsDisabled () {
    const { options } = this.props

    if (options.length) {
      return (
        <ul
          className='options'>
          {options.map(this.createOptionDisabled)}
        </ul>
      )
    }
  }

  createOptions () {
    const { options } = this.props

    if (options.length) {
      return (
        <ul
          className={this.createOptionsClassName()}
          onMouseEnter={this.handleOptionsEnter}
          onMouseLeave={this.handleOptionsLeave}>
          {options.map(this.createOption)}
        </ul>
      )
    }
  }

  componentWillReceiveProps ({ index }) {
    const value = toNumber(index)

    this.setState({ selectIndex: isNaN(value) ? NaN : value })
  }

  shouldComponentUpdate (props, state) {
    if (props !== this.props) return true
    return (
      (state.selectIndex !== this.state.selectIndex) ||
      (state.hasActiveOptions !== this.state.hasActiveOptions) ||
      (state.activeEnter !== this.state.activeEnter) ||
      (state.activeIndex !== this.state.activeIndex)
    )
  }

  render () {
    const { disabled } = this.props
    return (disabled)
      ? (
        <div className='react-select-element disabled' onFocus={noFocus}>
          {this.createSelectedOptionDisabled()}
          {this.createOptionsDisabled()}
        </div>
      )
      : (
        <div className='react-select-element'>
          {this.createSelectedOption()}
          {this.createOptions()}
        </div>
      )
  }
}

SelectElement.propTypes = {
  defaultIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  tabIndex: PropTypes.number,
  options: PropTypes.array,
  onChange: PropTypes.func,
  accessKey: PropTypes.string,
  disabled: PropTypes.bool
}

SelectElement.defaultProps = {
  defaultIndex: 0,
  tabIndex: 0,
  options: [],
  disabled: false
}
