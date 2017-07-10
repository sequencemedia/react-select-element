import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const toNumber = (v) => isNaN(v) ? NaN : parseInt(v, 10)

/*
 *  'accesskey' events are raised as clicks with all-zero co-ordinates. All-zero
 *  coordinates are (of course) possible, but unlikely. This is a woolly way of
 *  identifying 'accesskey' events
 */
const isEventClickLike = ({ pageX, pageY, screenX, screenY }) => !(pageX || pageY || screenX || screenY)

const toOptionText = (t) => (t !== undefined) ? t.toString() : '\uFEFF'

export default class SelectElement extends React.Component {
  constructor (props) {
    super(props)
    const { index, defaultIndex } = this.props
    const value = toNumber(index)
    const selectIndex = isNaN(value) ? toNumber(defaultIndex) : value

    this.state = {
      selectIndex,
      hasActiveOptions: false,
      activeEnter: false,
      activeIndex: 0,
      activeChars: ''
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

  scrollOptionIntoView (element) {
    if (ReactDOM.findDOMNode(this).contains(element)) {
      const { options } = this
      const {
        offsetTop,
        offsetHeight
      } = element
      const {
        scrollTop,
        clientHeight
      } = options

      const i = (clientHeight / 2)
      const j = (offsetHeight / 2)
      const n = Math.max(0, (offsetTop - (i + j)))
      if (n !== scrollTop) options.scrollTop = n
    }
  }

  toLowerBound () {
    this.setState({ activeIndex: this.lowerBound })
  }

  toUpperBound () {
    this.setState({ activeIndex: this.upperBound })
  }

  selectOptionFocus () {
    this.selectOption.focus()
  }

  handleFocus = () => {
    const { selectIndex } = this.state

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
    this.selectOptionFocus()
  }

  handleClick = (event) => {
    if (isEventClickLike(event)) { // it's probably an accessKey event
      this.selectOptionFocus()
    } else { // it's probably a mouse click
      this.setState({ hasActiveOptions: true })
    }
  }

  handleOptionClick = (index) => {
    this.setState({ hasActiveOptions: false })
    this.selectIndex(index)
    this.selectOptionFocus()
  }

  handleActiveOptionsKeyPress = (event) => this.handleActiveOptionsKeyChar(event)

  handleKeyPress = (event) => this.handleKeyChar(event)

  handleActiveOptionsKeyUp = (event) => this.handleActiveOptionsKeyCode(event)

  handleActiveOptionsKeyDown = () => true

  handleKeyUp = (event) => this.handleKeyCode(event)

  handleKeyDown = () => true

  selectOptionRef = (ref) => (ref) ? !!(this.selectOption = ref) : delete this.selectOption

  optionsRef = (ref) => (ref) ? !!(this.options = ref) : delete this.options

  optionRef = (index) => {
    const { activeIndex } = this.state

    if (index === activeIndex) {
      return (ref) => (ref) ? !!(this.activeOption = ref) : delete this.activeOption
    }
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

  handleKeySpace () {
    this.setState({ hasActiveOptions: false })

    const { activeIndex } = this.state

    this.selectIndex(activeIndex)
  }

  handleKeyEnter () {
    this.setState({ hasActiveOptions: false })

    const { activeIndex } = this.state

    this.selectIndex(activeIndex)
  }

  handleKeyEscape () {
    this.setState({ hasActiveOptions: false })
  }

  getOptionsFirstChild () {
    return (this.options
      .firstChild
    ) || null
  }

  getOptionsLastChild () {
    return (this.options
      .lastChild
    ) || null
  }

  getActiveOptionPreviousSibling () {
    return (this.activeOption
      .previousSibling
    ) || null
  }

  getActiveOptionNextSibling () {
    return (this.activeOption
      .nextSibling
    ) || null
  }

  handleKeyArrowUp () {
    this.decrementActiveIndex()
  }

  handleKeyArrowDown () {
    this.incrementActiveIndex()
  }

  handleActiveOptionsKeyChar ({ charCode: keyChar }) {
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

  handleKeyChar ({ charCode: keyChar }) {
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
    const { options } = this.props
    const { selectIndex } = this.state
    const { text } = options[selectIndex] || {}

    return (
      <div
        className='selected-option'
        ref={this.selectOptionRef}>
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
          : this.handleKeyDown}
        ref={this.selectOptionRef}>
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
        onClick={() => this.handleOptionClick(index)}
        ref={this.optionRef(index)}>
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
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          ref={this.optionsRef}>
          {options.map(this.createOption)}
        </ul>
      )
    }
  }

  componentWillReceiveProps ({ index }) {
    const selectIndex = toNumber(index)

    this.setState({ selectIndex })
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
        <div className='react-select-element disabled'>
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
