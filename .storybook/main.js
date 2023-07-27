/** @type { import('@storybook/react-webpack5').StorybookConfig } */
export default {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-interactions',
    '@storybook/addon-links'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}
