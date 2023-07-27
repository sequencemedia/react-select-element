import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SelectElement from 'react-select-element'

export default class HiddenSelectElement extends Component {
  state = {}

  handleIndexChange = (index) => {
    const { options, onChange } = this.props
    const { text } = options[index]

    this.setState({ value: text })
    onChange(index)
  }

  render () {
    const { value = '' } = this.state

    return (
      <div className='hidden-select'>
        <SelectElement
          {...this.props}
          onChange={this.handleIndexChange}
        />
        <input name='hidden-select' type='hidden' value={value} />
      </div>
    )
  }
}

HiddenSelectElement.propTypes = {
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

HiddenSelectElement.defaultProps = {
  onChange: () => {},
  index: 0,
  options: []
}
