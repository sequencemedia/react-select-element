import React from 'react'
import PropTypes from 'prop-types'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import SelectElement from 'react-select-element'

const OPTIONS = [
  { text: 1 },
  { text: 2 },
  { text: 3 },
  { text: 4 }
]

const SORTED_OPTIONS = [
  { text: 'A' },
  { text: 'AA' },
  { text: 'AAA' },
  { text: 'B' },
  { text: 'BB' },
  { text: 'BBB' },
  { text: 'C' },
  { text: 'CC' },
  { text: 'CCC' }
]

const RANDOM_OPTIONS = [
  { text: 'C' },
  { text: 'BBB' },
  { text: 'AA' },
  { text: 'B' },
  { text: 'AAA' },
  { text: 'CC' },
  { text: 'A' },
  { text: 'CCC' },
  { text: 'BB' }
]

const LARGER_OPTIONS = [
  { text: 'A' },
  { text: 'AA' },
  { text: 'AAA' },
  { text: 'AAAA' },
  { text: 'AAAAA' },
  { text: 'B' },
  { text: 'BB' },
  { text: 'BBB' },
  { text: 'BBBB' },
  { text: 'BBBBB' },
  { text: 'C' },
  { text: 'CC' },
  { text: 'CCC' },
  { text: 'CCCC' },
  { text: 'CCCCC' },
  { text: 1 },
  { text: 2 },
  { text: 3 },
  { text: 4 },
  { text: 5 }
]

class ChangeSelectElement extends React.Component {
  state = {
    index: 0
  }

  handleChange = (index) => {
    this.setState({ index })

    const { action } = this.props
    action(index)
  }

  render () {
    const { index } = this.state
    const { options } = this.props

    return (
      <SelectElement
        index={index}
        onChange={this.handleChange}
        options={options}
      />
    )
  }
}

ChangeSelectElement.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ])
    })
  ),
  action: PropTypes.func
}

ChangeSelectElement.defaultProps = {
  options: OPTIONS,
  action: action('change')
}

storiesOf('SelectElement component', module)
  .add('With default props', () => (
    <SelectElement
      options={OPTIONS}
    />
  ))
  .add('With default props, defaultIndex', () => (
    <SelectElement
      options={OPTIONS}
      defaultIndex={1}
    />
  ))
  .add('With default props, index, onChange', () => {
    /**
     *  An 'onChange' prop indicates that the component's selected index is not
     *  managed internally: it will call the 'onChange' function with the 'index'
     *  as the only argument and expect it to be passed back as a prop
     */
    return (
      <ChangeSelectElement />
    )
  })
  .add('With default props, accessKey, tabIndex', () => (
    <div>
      <input type='text' tabIndex={1} />
      <SelectElement
        options={LARGER_OPTIONS}
        accessKey='A'
        tabIndex={3}
      />
      <input type='text' tabIndex={2} />
    </div>
  ))
  .add('With default props, readOnly', () => (
    <SelectElement
      options={OPTIONS}
      readOnly
    />
  ))
  .add('With default props, disabled', () => (
    <SelectElement
      options={OPTIONS}
      disabled
    />
  ))
  .add('With default props, sorted options', () => (
    <div>
      <SelectElement
        options={SORTED_OPTIONS}
      />
      <select>
        {SORTED_OPTIONS.map(({ text }, i) => (<option key={i}>{text}</option>))}
      </select>
    </div>
  ))
  .add('With default props, random options', () => (
    <div>
      <SelectElement
        options={RANDOM_OPTIONS}
      />
      <select>
        {RANDOM_OPTIONS.map(({ text }, i) => (<option key={i}>{text}</option>))}
      </select>
    </div>
  ))
