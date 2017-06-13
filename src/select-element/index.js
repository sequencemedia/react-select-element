import React from 'react'
import PropTypes from 'prop-types'

export class SelectElement extends React.Component {
  state = {
    tabIndex: this.props.tabIndex,
    options: this.props.options,
    selectedIndex: this.props.selectedIndex,
    hasActiveOptions: false,
    activeEnter: false,
    activeIndex: 0,
    activeChars: ''
  }

  handleFocus = () => {
    this.setState({ activeIndex: this.state.selectedIndex })
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

  /*
    Eep
  */
  retainFocus = () => this.selectedOption.focus()
  acceptFocus = () => true /* kill an arrow function with a bound method to simplify a conditional? */

  handleClick = () => this.setState({ hasActiveOptions: true })

  handleOptionClick = (index) => {
    this.selectIndex(index)
    this.setState({ hasActiveOptions: false })
    this.props.onChange(index)
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

  handleRef = (ref) => { this.selectedOption = ref }

  findChars (chars) {
    const {
      options
    } = this.state
    let i = 0
    const n = chars.length
    const j = options.length
    for (i, j; i < j; i = i + 1) {
      const option = options[i]
      const optionText = this.createOptionText(option.text).toLowerCase()
      if (optionText.substr(0, n) === chars) {
        return i
      }
    }
    return null
  }

  findChar (char) {
    const {
      options
    } = this.state
    let i = 0
    const j = options.length
    for (i, j; i < j; i = i + 1) {
      const option = options[i]
      const optionText = this.createOptionText(option.text).toLowerCase()
      if (optionText.charAt(0) === char) {
        return i
      }
    }
    return null
  }

  handleOptionsKeyChar (keyChar) {
    const {
      activeChars
    } = this.state
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    let activeIndex
    if ((activeIndex = this.findChars(chars)) !== null) {
      this.setState({ activeIndex })
      this.setState({ activeChars: chars })
    } else {
      if ((activeIndex = this.findChar(char)) !== null) {
        this.setState({ activeIndex })
        this.setState({ activeChars: char })
      }
    }
  }

  handleKeyChar (keyChar) {
    const {
      activeChars
    } = this.state
    const char = String.fromCharCode(keyChar).toLowerCase()
    const chars = activeChars + char

    let selectedIndex
    if ((selectedIndex = this.findChars(chars)) !== null) {
      this.setState({ selectedIndex })
      this.setState({ activeChars: chars })
    } else {
      if ((selectedIndex = this.findChar(char)) !== null) {
        this.setState({ selectedIndex })
        this.setState({ activeChars: char })
      }
    }
  }

  handleOptionsKeyCode (keyCode) {
    switch (keyCode) {
      case 13:
      case 32:
        return this.selectActiveIndex()
      case 38: // arrow up
        return this.decrementActiveIndex()
      case 40: // arrow down
        return this.incrementActiveIndex()
    }
  }

  handleKeyCode (keyCode) {
    if (keyCode === 40) {
      return this.setState({ hasActiveOptions: true })
    }
  }

  selectIndex (selectedIndex) {
    this.setState({ selectedIndex })
  }

  activeIndex (activeIndex) {
    this.setState({ activeIndex })
  }

  selectActiveIndex = () => {
    this.setState({ selectedIndex: this.state.activeIndex })
    this.setState({ hasActiveOptions: false })
  }

  decrementActiveIndex () {
    const activeIndex = Math.max(this.state.activeIndex - 1, 0)
    this.setState({ activeIndex })
  }

  incrementActiveIndex () {
    const activeIndex = Math.min(this.state.activeIndex + 1, this.state.options.length - 1)
    this.setState({ activeIndex })
  }

  createOptionText (text) {
    return (text !== undefined) ? text.toString() : '\uFEFF'
  }

  createSelectedOption = () => {
    const {
      options,
      selectedIndex,
      tabIndex,
      activeEnter,
      hasActiveOptions
    } = this.state

    const selectedOptionText = (options[selectedIndex] || {}).text

    return (
      <div
        tabIndex={tabIndex}
        className='selectedOption'
        onFocus={(activeEnter)
          ? this.acceptFocus /* Bonkers but I like it. Soz-oh */
          : this.handleFocus}
        onBlur={(activeEnter)
          ? this.retainFocus
          : this.handleBlur}
        onClick={this.handleClick}
        onKeyPress={(hasActiveOptions)
          ? this.handleOptionsKeyPress
          : this.handleKeyPress}
        onKeyUp={(hasActiveOptions)
          ? this.handleOptionsKeyUp
          : this.handleKeyUp}
        ref={this.handleRef}>
        {this.createOptionText(selectedOptionText)}
      </div>
    )
  }

  createOptionClassName (index) {
    return (index === this.state.activeIndex)
      ? 'option active'
      : 'option'
  }

  createOption = (option, index) => {
    const optionText = option.text

    return (
      <li
        key={index}
        className={this.createOptionClassName(index)}
        onMouseOver={() => this.activeIndex(index)}
        onClick={() => this.handleOptionClick(index)}>
        {this.createOptionText(optionText)}
      </li>
    )
  }

  createOptionsClassName () {
    return (this.state.hasActiveOptions)
      ? 'options active'
      : 'options'
  }

  createOptions () {
    const options = this.state.options

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

  /*
   *  I hate 'shouldComponentUpdate()'
  */
  shouldComponentUpdate (props, state) {
    return (
      (props !== this.props) || /* need to look again at the relationship between props and state in this component */
      (state.selectedIndex !== this.state.selectedIndex) ||
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
  selectedIndex: PropTypes.number,
  tabIndex: PropTypes.number,
  options: PropTypes.array,
  onChange: PropTypes.func
}

SelectElement.defaultProps = {
  selectedIndex: 0,
  tabIndex: 0,
  options: [],
  onChange: () => {}
}
