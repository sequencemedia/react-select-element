import React from 'react'
import PropTypes from 'prop-types'

import SelectElement from 'react-select-element'

export default class ControlledSelectElement extends React.Component {
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
  options: []
}
