/** @type { import('@storybook/react-webpack5').StorybookConfig } */
export default {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-webpack5-compiler-babel',
    '@chromatic-com/storybook'
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  }
}
