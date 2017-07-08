import React from 'react'
import PropTypes from 'prop-types'

const toNumber = (v) => isNaN(v) ? 0 : parseInt(v, 10)
/*
 *  User 'accesskey' events are raised as clicks but they have no co-ordinates
 *  (because they're not actually clicks)
 *
 *  This is a woolly way of distinguishing between 'click' and 'click-like' events
 */
const isEventProbablyAccessKey = ({ pageX, pageY, screenX, screenY }) => !(pageX || pageY || screenX || screenY)

export default class SelectElement extends React.Component {
  state = {
    selectIndex: toNumber(this.props.selectedIndex),
    hasActiveOptions: false,
    activeEnter: false,
    activeIndex: 0,
    activeChars: ''
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
    const { selectIndex: activeIndex } = this.state
    this.setState({ activeIndex })
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

  returnFocus = () => this.selectedOption.focus()
  acceptFocus = () => true /* simplify a conditional! */

  handleClick = (event) => {
    if (isEventProbablyAccessKey(event)) { // it's probably an accessKey event (which raises a click)
      this.returnFocus()
    } else { // it's probably a click
      this.setState({ hasActiveOptions: true })
    }
  }

  handleOptionClick = (index) => {
    const { onChange } = this.props

    this.selectIndex(index)
    this.setState({ hasActiveOptions: false })
    onChange(index)
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

    let i = 0
    const n = chars.length
    const j = options.length
    for (i, j; i < j; i = i + 1) {
      const { text } = options[i]
      const optionText = this.createOptionText(text).toLowerCase()
      if (optionText.substr(0, n) === chars) {
        return i
      }
    }
    return NaN
  }

  findChar (char) {
    const { options } = this.props

    let i = 0
    const j = options.length
    for (i, j; i < j; i = i + 1) {
      const { text } = options[i]
      const optionText = this.createOptionText(text).toLowerCase()
      if (optionText.charAt(0) === char) {
        return i
      }
    }
    return NaN
  }

  handleOptionsKeyChar (keyChar) {
    const { activeChars } = this.state
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    let activeIndex
    if (!isNaN(activeIndex = this.findChars(chars))) {
      this.setState({ activeIndex })
      this.setState({ activeChars: chars })
    } else {
      if (!isNaN(activeIndex = this.findChar(char))) {
        this.setState({ activeIndex })
        this.setState({ activeChars: char })
      }
    }
  }

  handleKeyChar (keyChar) {
    const { activeChars } = this.state
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    let selectIndex
    if (!isNaN(selectIndex = this.findChars(chars))) {
      const { onChange } = this.props

      this.setState({ selectIndex })
      this.setState({ activeChars: chars })
      onChange(selectIndex)
    } else {
      if (activeChars !== char) {
        if (!isNaN(selectIndex = this.findChar(char))) {
          const { onChange } = this.props

          this.setState({ selectIndex })
          this.setState({ activeChars: char })
          onChange(selectIndex)
        }
      }
    }
  }

  handleOptionsKeyCode (keyCode) {
    switch (keyCode) {
      case 13:
      case 32:
      {
        const { activeIndex: selectIndex } = this.state
        const { onChange } = this.props

        this.setState({ selectIndex })
        this.setState({ hasActiveOptions: false })
        onChange(selectIndex)
        break
      }
      case 38: // arrow up
        return this.decrementActiveIndex()
      case 40: // arrow down
        return this.incrementActiveIndex()
    }
  }

  handleKeyCode (keyCode) {
    if (keyCode === 40) {
      this.setState({ hasActiveOptions: true })
    }
  }

  selectIndex (selectIndex) {
    this.setState({ selectIndex })
  }

  activeIndex (activeIndex) {
    this.setState({ activeIndex })
  }

  decrementActiveIndex () {
    const { activeIndex } = this.state

    this.setState({ activeIndex: Math.max(activeIndex - 1, this.lowerBound) })
  }

  incrementActiveIndex () {
    const { activeIndex } = this.state

    this.setState({ activeIndex: Math.min(activeIndex + 1, this.upperBound) })
  }

  createOptionText (text) {
    return (text !== undefined) ? text.toString() : '\uFEFF'
  }

  createSelectedOption () {
    const {
      selectIndex,
      activeEnter,
      hasActiveOptions
    } = this.state

    const {
      options,
      accessKey,
      tabIndex
    } = this.props

    const { text } = options[selectIndex] || {}

    return (
      <div
        accessKey={accessKey}
        tabIndex={tabIndex}
        className='selectedOption'
        onFocus={(activeEnter)
          ? this.acceptFocus /* Bonkers but I like it. Soz-oh */
          : this.handleFocus}
        onBlur={(activeEnter)
          ? this.returnFocus
          : this.handleBlur}
        onClick={this.handleClick}
        onKeyPress={(hasActiveOptions)
          ? this.handleOptionsKeyPress
          : this.handleKeyPress}
        onKeyUp={(hasActiveOptions)
          ? this.handleOptionsKeyUp
          : this.handleKeyUp}
        ref={this.handleRef}>
        {this.createOptionText(text)}
      </div>
    )
  }

  createOptionClassName (index) {
    return (index === this.state.activeIndex)
      ? 'option active'
      : 'option'
  }

  createOption = (option, index) => {
    const { text } = option

    return (
      <li
        key={index}
        className={this.createOptionClassName(index)}
        onMouseOver={() => this.activeIndex(index)}
        onClick={() => this.handleOptionClick(index)}>
        {this.createOptionText(text)}
      </li>
    )
  }

  createOptionsClassName () {
    return (this.state.hasActiveOptions)
      ? 'options active'
      : 'options'
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

  componentWillReceiveProps ({ selectedIndex }) {
    this.setState({ selectIndex: toNumber(selectedIndex) })
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
    return (
      <div className='selectElement'>
        {this.createSelectedOption()}
        {this.createOptions()}
      </div>
    )
  }
}

SelectElement.propTypes = {
  selectedIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  tabIndex: PropTypes.number,
  options: PropTypes.array,
  onChange: PropTypes.func,
  accessKey: PropTypes.string
}

SelectElement.defaultProps = {
  selectedIndex: 0,
  tabIndex: 0,
  options: [],
  onChange: () => {}
}
