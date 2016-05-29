require('babel-register')({ ignore: /node_modules\/(?!(react-select-element)).*/ })
module.exports = require('./lib')
