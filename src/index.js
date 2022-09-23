import React from 'react'
import ReactDOM from 'react-dom/client'
import PropTypes from 'prop-types'

const ENTER = 'Enter'
const SPACE = String.fromCharCode(32)

const isKeyEnter = ({ key }) => key === ENTER

const isKeySpace = ({ key }) => key === SPACE

/*
 *  'accesskey' events are raised as clicks with all-zero co-ordinates. All-zero
 *  coordinates are (of course) possible, but unlikely. This is a woolly way of
 *  identifying 'accesskey' events
 */
const isEventClickLike = ({ pageX, pageY, screenX, screenY }) => !(pageX || pageY || screenX || screenY)

const toOptionText = (t) => (t !== undefined) ? t.toString() : '\uFEFF'

const forward = (alpha, omega) => (alpha < omega) ? -1 : (alpha > omega) ? +1 : 0

const reverse = (alpha, omega) => (alpha < omega) ? +1 : (alpha > omega) ? -1 : 0

const forwardByOptionText = ({ text: alpha }, { text: omega }) => (
  forward(
    toOptionText(alpha).toLowerCase(),
    toOptionText(omega).toLowerCase()
  )
)

const reverseByOptionText = ({ text: alpha }, { text: omega }) => (
  reverse(
    toOptionText(alpha).toLowerCase(),
    toOptionText(omega).toLowerCase()
  )
)

const exactMatchFor = (chars) => ({ text }) => (
  toOptionText(text)
    .toLowerCase() === chars
)

const startMatchFor = (chars) => {
  const {
    length: n
  } = chars

  return ({ text }) => (
    toOptionText(text)
      .toLowerCase()
      .substr(0, n) === chars
  )
}

const match = (option) => (o) => option === o

const greaterThanFor = (chars) => ({ text }) => ( // find in the duplicated, sorted array
  toOptionText(text) // the smallest match greater than the chars?
    .toLowerCase() > chars
)

const smallerThanFor = (chars) => ({ text }) => ( // find in the duplicated, sorted array
  toOptionText(text) // the largest match hasSmallerThanMatch than the chars?
    .toLowerCase() < chars
)

/*
 * Matches exactly
 */
const getExactMatch = (options, chars) => options.find(exactMatchFor(chars))

/*
 * Matches exactly
 */
const hasExactMatch = (options, chars) => options.some(exactMatchFor(chars))

/*
 * Matches exactly
 */
const getExactMatchIndex = (options, chars) => (
  options
    .findIndex(match(
      getExactMatch(options, chars)
    ))
)

/*
 * Match from the start of the string
 */
const getStartMatch = (options, chars) => options.find(startMatchFor(chars))

/*
 * Match from the start of the string
 */
const hasStartMatch = (options, chars) => options.some(startMatchFor(chars))

/*
 * Match from the start of the string
 */
const getStartMatchIndex = (options, chars) => (
  options
    .findIndex(match(
      getStartMatch(options, chars)
    ))
)

/*
 *  Find the the smallest match greater than the chars!
 */
const getGreaterThanMatch = (options, chars) => options.find(greaterThanFor(chars))

/*
 *  Find the the smallest match greater than the chars!
 */
const hasGreaterThanMatch = (options, chars) => options.some(greaterThanFor(chars))

const getGreaterThanMatchIndex = (options, chars) => (
  options
    .findIndex(match(
      getGreaterThanMatch(
        Array.from(options).sort(forwardByOptionText),
        chars
      )
    ))
)

/*
 *  Find the the largest match smaller than the chars!
 */
const getSmallerThanMatch = (options, chars) => options.find(smallerThanFor(chars))

/*
 *  Find the the largest match smaller than the chars!
 */
const hasSmallerThanMatch = (options, chars) => options.some(smallerThanFor(chars))

const getSmallerThanMatchIndex = (options, chars) => (
  options
    .findIndex(match(
      getSmallerThanMatch(
        Array.from(options).sort(reverseByOptionText),
        chars
      )
    ))
)

const getSelectIndex = ({ index, defaultIndex }) => !isNaN(index) ? Number(index) : Number(defaultIndex)

export default class SelectElement extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectIndex: getSelectIndex(props),
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
      const n = Math.max(0, (offsetTop - i) + j)
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

  handleActiveOptionsKeyPress = (event) => {
    if (isKeyEnter(event) || isKeySpace(event)) return

    return this.handleActiveOptionsKeyChar(event)
  }

  handleKeyPress = (event) => this.handleKeyChar(event)

  handleActiveOptionsKeyUp = (event) => this.handleActiveOptionsKeyCode(event)

  handleActiveOptionsKeyDown = () => true

  handleKeyUp = (event) => this.handleKeyCode(event)

  handleKeyDown = () => true

  selectOptionRef = (ref) => (
    (ref)
      ? !!(this.selectOption = ref)
      : delete this.selectOption
  )

  optionsRef = (ref) => (
    (ref)
      ? !!(this.options = ref)
      : delete this.options
  )

  activeOptionRef = (ref) => (
    (ref)
      ? !!(this.activeOption = ref)
      : delete this.activeOption
  )

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

    this.setState({ activeChars: '' })
  }

  handleKeyArrowDown () {
    this.incrementActiveIndex()

    this.setState({ activeChars: '' })
  }

  /*
  const CHARS = activeChars.split('')
  const L = Math.max.apply(CHARS, CHARS.map((s) => s.charCodeAt()))
  const R = char.charCodeAt()
  */

  handleActiveOptionsKeyChar ({ charCode: keyChar }) {
    const { activeChars } = this.state
    const { options } = this.props
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
    const { activeChars } = this.state
    const { options } = this.props
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

  /*
   *  'shouldComponentUpdate()'
   */
  selectIndex (index) {
    const { selectIndex } = this.state

    /*
     * Is the index different to the index stored in state?
     */
    if (index !== selectIndex) {
      const { onChange } = this.props

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
        className='selected-option'>
        {toOptionText(text)}
      </div>
    )
  }

  createSelectedOptionReadOnly () {
    const { options } = this.props
    const { selectIndex } = this.state
    const { text } = options[selectIndex] || {}

    return (
      <div
        className='selected-option'>
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
        ref={this.selectOptionRef}
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
          : this.handleKeyDown}>
        {toOptionText(text)}
      </div>
    )
  }

  createOptionRef = (index) => {
    const { activeIndex } = this.state

    if (index === activeIndex) {
      return this.activeOptionRef
    }
  }

  createOptionClassName (index) {
    const { activeIndex } = this.state

    return (index === activeIndex)
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

  createOptionReadOnly = (option, index) => {
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
        ref={this.createOptionRef(index)}
        className={this.createOptionClassName(index)}
        onMouseOver={() => this.activeIndex(index)}
        onClick={() => this.handleOptionClick(index)}>
        {toOptionText(text)}
      </li>
    )
  }

  createOptionsClassName () {
    const { hasActiveOptions } = this.state

    return (hasActiveOptions)
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

  createOptionsReadOnly () {
    const { options } = this.props

    if (options.length) {
      return (
        <ul
          className='options'>
          {options.map(this.createOptionReadOnly)}
        </ul>
      )
    }
  }

  createOptions () {
    const { options } = this.props

    if (options.length) {
      return (
        <ul
          ref={this.optionsRef}
          className={this.createOptionsClassName()}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}>
          {options.map(this.createOption)}
        </ul>
      )
    }
  }

  static getDerivedStateFromProps (props) {
    return ('index' in props) ? { selectIndex: getSelectIndex(props) } : null
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

  renderDisabled () {
    return (
      <div className='react-select-element disabled'>
        {this.createSelectedOptionDisabled()}
        {this.createOptionsDisabled()}
      </div>
    )
  }

  renderReadOnly () {
    return (
      <div className='react-select-element readonly'>
        {this.createSelectedOptionReadOnly()}
        {this.createOptionsReadOnly()}
      </div>
    )
  }

  render () {
    const { disabled } = this.props

    if (disabled) {
      return this.renderDisabled()
    }

    const { readOnly } = this.props

    if (readOnly) {
      return this.renderReadOnly()
    }

    return (
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
  accessKey: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
}

SelectElement.defaultProps = {
  defaultIndex: 0,
  tabIndex: 0,
  options: [],
  disabled: false,
  readOnly: false
}
