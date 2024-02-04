module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
          browsers: [
            'last 2 versions'
          ]
        },
        useBuiltIns: 'usage',
        corejs: 3
      }
    ],
    '@babel/react'
  ],
  plugins: [
    [
      'module-resolver', {
        alias: {
          'react-select-element': './src'
        }
      }
    ]
  ]
}
