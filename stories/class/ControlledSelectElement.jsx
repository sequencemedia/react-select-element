import React from 'react'
import PropTypes from 'prop-types'

import {
  getSelectIndex
} from 'react-select-element/common'
import SelectElement from 'react-select-element'

function DEFAULT_HANDLE_CHANGE () {
  //
}

export default class ControlledSelectElement extends React.Component {
  state = {
    index: getSelectIndex(this.props) ?? 0
  }

  handleChange = (index) => {
    const {
      onChange = DEFAULT_HANDLE_CHANGE
    } = this.props

    onChange(index)

    this.setState({ index })
  }

  render () {
    const {
      index = 0
    } = this.state

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
