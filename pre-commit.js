require('@babel/register')({
  ignore: [
    /node_modules/
  ]
})

const debug = require('debug')

const {
  default: preCommit = () => {
    log('`preCommit` is not available')
  }
} = require('./build/pre-commit')

const log = debug('react-select-element:pre-commit')

log('`react-select-element` is awake')

module.exports = preCommit()
