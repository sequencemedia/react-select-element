import React from 'react'

export class SelectElement extends React.Component {
  state = {
    tabIndex: this.props.tabIndex,
    options: this.props.options,
    selectedIndex: this.props.selectedIndex
  }

  handleFocus = () => {
    this.setState({ activeIndex: this.state.selectedIndex })
  }

  handleBlur = () => {
    this.setState({ hasActiveOptions: false })
  }

  retainFocus = () => this.selectedOption.focus()

  handleClick = () => this.setState({ hasActiveOptions: true })

  handleOptionsKeyCode = (keyCode, charCode) => {
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

  handleOptionClick = (index) => {
    this.selectIndex(index)
    this.setState({ hasActiveOptions: false })
  }

  handleKeyChar = (keyChar) => {
    const char = String.fromCharCode(keyChar)
    const options = this.state.options
    let i = 0
    const j = options.length
    for (i, j; i < j; i = i + 1) {
      let option = options[i]
      let optionText = this.createOptionText(option.text)
      if (optionText.charAt(0) === char) {
        this.setState({ activeIndex: i })
        break
      }
    }
  }

  handleKeyCode = (keyCode) => {
    if (keyCode === 40) {
      return this.setState({ hasActiveOptions: true })
    }
  }

  selectActiveIndex = (index) => {
    this.setState({ selectedIndex: this.state.activeIndex })
    this.setState({ hasActiveOptions: false })
  }

  activeIndex (index) {
    this.setState({ activeIndex: index })
  }

  decrementActiveIndex () {
    const activeIndex = Math.max(this.state.activeIndex - 1, 0)
    this.setState({ activeIndex: activeIndex })
  }

  incrementActiveIndex () {
    const activeIndex = Math.min(this.state.activeIndex + 1, this.state.options.length - 1)
    this.setState({ activeIndex: activeIndex })
  }

  selectIndex = (index) => this.setState({ selectedIndex: index })

  createOptionText (text) {
    return (text !== undefined) ? text.toString() : '\uFEFF'
  }

  createSelectedOption = () => {
    const {
      options,
      selectedIndex,
      tabIndex
    } = this.state

    const selectedOptionText = (options[selectedIndex] || {}).text

    return (
      <div
        tabIndex={tabIndex}
        className='selectedOption'
        onFocus={(this.state.activeEnter)
          ? () => true
          : this.handleFocus}
        onBlur={(this.state.activeEnter)
          ? this.retainFocus
          : this.handleBlur}
        onClick={this.handleClick}
        onKeyPress={(event) => this.handleKeyChar(event.charCode)}
        onKeyUp={(this.state.hasActiveOptions)
          ? (event) => this.handleOptionsKeyCode(event.keyCode)
          : (event) => this.handleKeyCode(event.keyCode)}
        ref={(ref) => { this.selectedOption = ref }}>
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
    return (
      <li
        key={index}
        className={this.createOptionClassName(index)}
        onMouseOver={() => this.activeIndex(index)}
        onClick={() => this.handleOptionClick(index)}>
        {this.createOptionText(option.text)}
      </li>
    )
  }

  createOptionsClassName () {
    return (this.state.hasActiveOptions)
      ? 'options active'
      : 'options'
  }

  createOptions () {
    const {
      options
    } = this.state

    if (options.length) {
      return (
        <ul
          className={this.createOptionsClassName()}
          onMouseEnter={() => this.setState({
            activeEnter: true
          })}
          onMouseLeave={() => this.setState({
            activeEnter: false
          })}>
          {options.map(this.createOption)}
        </ul>
      )
    }
  }

  shouldComponentUpdate (props, state) {
    return (
      (props !== this.props) ||
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

SelectElement.defaultProps = {
  selectedIndex: 0,
  tabIndex: 0,
  options: []
}
