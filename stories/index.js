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

const handleChange = (onChange) => ({ target: { value } }) => onChange(value)

class ControlledSelectElement extends React.Component {
  state = {
    index: this.props.index
  }

  handleChange = (index) => {
    this.setState({ index })

    const { onChange } = this.props

    onChange(index)
  }

  render () {
    const { index } = this.state

    return (
      <SelectElement
        {...this.props}
        onChange={this.handleChange}
        index={index}
      />
    )
  }
}

ControlledSelectElement.propTypes = {
  onChange: PropTypes.func,
  index: PropTypes.number,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ])
    })
  )
}

ControlledSelectElement.defaultProps = {
  onChange: () => {},
  index: 0,
  options: OPTIONS
}

class ControlledSelect extends React.Component {
  state = {
    value: this.props.value
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ value })

    const { onChange } = this.props

    console.log(onChange, value)

    onChange(value)
  }

  render () {
    const { value } = this.state
    const { options, ...props } = this.props
    return (
      <select
        {...props}
        onChange={this.handleChange}
        value={value}>
        {options.map(({ text }, i) => (
          <option key={i}>
            {text}
          </option>
        ))}
      </select>
    )
  }
}

ControlledSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ])
    })
  )
}

ControlledSelect.defaultProps = {
  onChange: () => {},
  value: 'A',
  options: OPTIONS
}

storiesOf('SelectElement component', module)
  .add('With default props', () => (
    <SelectElement
      options={OPTIONS}
      onChange={action('change')}
    />
  ))
  .add('With default props (defaultIndex)', () => (
    <SelectElement
      options={OPTIONS}
      defaultIndex={0}
      onChange={action('change')}
    />
  ))
  .add('With default props (index, onChange)', () => {
    /**
     *  An 'onChange' prop indicates that the component's selected index is not
     *  managed internally: it will call the 'onChange' function with the 'index'
     *  as the only argument and expect it to be passed back as a prop
     */
    return (
      <ControlledSelectElement
        options={OPTIONS}
        index={0}
        onChange={action('change')}
      />
    )
  })
  .add('With default props, accessKey, tabIndex (defaultIndex)', () => (
    <div>
      <input type='text' tabIndex={1} />
      <SelectElement
        options={LARGER_OPTIONS}
        accessKey='X'
        tabIndex={3}
        defaultIndex={0}
        onChange={action('change')}
      />
      <input type='text' tabIndex={2} />
      <select
        accessKey='Y'
        tabIndex={4}
        defaultValue='A'
        onChange={handleChange(action('change'))}>
        {LARGER_OPTIONS.map(({ text }, i) => (
          <option key={i}>
            {text}
          </option>
        ))}
      </select>
    </div>
  ))
  .add('With default props, accessKey, tabIndex (index, onChange)', () => (
    <div>
      <input type='text' tabIndex={1} />
      <ControlledSelectElement
        options={LARGER_OPTIONS}
        accessKey='X'
        tabIndex={3}
        onChange={action('change')}
      />
      <input type='text' tabIndex={2} />
      <ControlledSelect
        options={LARGER_OPTIONS}
        accessKey='Y'
        tabIndex={4}
        onChange={action('change')}
      />
    </div>
  ))
  .add('With default props, readOnly', () => (
    <SelectElement
      options={OPTIONS}
      readOnly
      onChange={action('change')}
    />
  ))
  .add('With default props, disabled', () => (
    <SelectElement
      options={OPTIONS}
      disabled
      onChange={action('change')}
    />
  ))
  .add('With default props, sorted options (defaultIndex)', () => (
    <div>
      <SelectElement
        options={SORTED_OPTIONS}
        defaultIndex={0}
        onChange={action('change')}
      />
      <select
        defaultValue='A'
        onChange={handleChange(action('change'))}>
        {SORTED_OPTIONS.map(({ text }, i) => (
          <option key={i}>
            {text}
          </option>
        ))}
      </select>
    </div>
  ))
  .add('With default props, sorted options (index, onChange)', () => (
    <div>
      <ControlledSelectElement
        options={SORTED_OPTIONS}
        onChange={action('change')}
      />
      <ControlledSelect
        options={SORTED_OPTIONS}
        onChange={action('change')}
      />
    </div>
  ))
  .add('With default props, random options (defaultIndex)', () => (
    <div>
      <SelectElement
        options={RANDOM_OPTIONS}
        defaultIndex={0}
        onChange={action('change')}
      />
      <select
        defaultValue='C'
        onChange={handleChange(action('change'))}>
        {RANDOM_OPTIONS.map(({ text }, i) => (
          <option key={i}>
            {text}
          </option>
        ))}
      </select>
    </div>
  ))
  .add('With default props, random options (index, onChange)', () => (
    <div>
      <ControlledSelectElement
        options={RANDOM_OPTIONS}
        index={0}
        onChange={action('change')}
      />
      <ControlledSelect
        options={RANDOM_OPTIONS}
        value='C'
        onChange={action('change')}
      />
    </div>
  ))
