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

  handleKeyPress = (event) => {
    this.handleKeyChar(event.charCode)
  }

  handleOptionsKeyUp = (event) => {
    this.handleOptionsKeyCode(event.keyCode)
  }

  handleKeyUp = (event) => {
    this.handleKeyCode(event.keyCode)
  }

  handleRef = (ref) => { this.selectedOption = ref }

  handleKeyChar (keyChar) {
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

  selectIndex (index) {
    this.setState({ selectedIndex: index })
  }

  activeIndex (index) {
    this.setState({ activeIndex: index })
  }

  selectActiveIndex = (index) => {
    this.setState({ selectedIndex: this.state.activeIndex })
    this.setState({ hasActiveOptions: false })
  }

  decrementActiveIndex () {
    const activeIndex = Math.max(this.state.activeIndex - 1, 0)
    this.setState({ activeIndex: activeIndex })
  }

  incrementActiveIndex () {
    const activeIndex = Math.min(this.state.activeIndex + 1, this.state.options.length - 1)
    this.setState({ activeIndex: activeIndex })
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
        onKeyPress={this.handleKeyPress}
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
    I'm wondering about any performance benefits of 'shouldComponentUpdate()': I added it to
    throttle invocations of 'render()' when tabbing to the component. Since the state won't
    have changed, why call 'render()'?

    But for any other events at least one of these properties will have changed: so this method
    isn't throttling, it's simply an additional computation which is more often than not going to
    return true. Is it better to remove this method and always call 'render()'?

    I introduced 'shouldComponentUpdate()' when trying to throttle unecessary invocations to
    'createSelectedOption()' which had more logic in it than I was comfortable with, and too
    many arrow functions, but 'shouldComponentUpdate()' wasn't impacting that.

    I've removed the arrow functions from 'createSelectedOption()' and now use handlers (bound to
    the instance at instantiation) to extract values from the event and pass that data on to be
    consumed.

    'shouldComponentUpdate()' is brittle and a den of vipers, but I'm keeping it for this version.
  */
  shouldComponentUpdate (props, state) {
    return (
      (props !== this.props) || /* need to look again at the relationship between props and state in this component */
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
  options: [],
  onChange: () => {}
}
