import React, { Component } from 'react'

import SelectElement from 'react-select-element'

function DEFAULT_HANDLE_CHANGE () {
  //
}

export default class HiddenSelectElement extends Component {
  state = {}

  handleIndexChange = (index) => {
    const {
      options = [],
      onChange = DEFAULT_HANDLE_CHANGE
    } = this.props
    const {
      text
    } = options[index]

    this.setState({ value: text })
    onChange(index)
  }

  render () {
    const {
      value = ''
    } = this.state

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
  ...SelectElement.propTypes
}
