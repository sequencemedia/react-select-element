/**
 * @typedef {import('eslint').Linter.RulesRecord} RulesRecord
 */

import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/configs/recommended/merge'
import reactPlugin from '@eslint-react/eslint-plugin'
import storybookPlugin from 'eslint-plugin-storybook'

const reactParserOptions = {
  ecmaFeatures: {
    jsx: true
  }
}

const reactPlugins = {
  react: reactPlugin
}

const storybookPlugins = {
  storybook: storybookPlugin
}

/**
 * @type {RulesRecord}
 */
const reactRules = {
  'no-unused-vars': [
    'error',
    {
      varsIgnorePattern: 'React'
    }
  ],
  '@stylistic/quotes': [
    'error',
    'single'
  ],
  '@stylistic/jsx-quotes': [
    'error',
    'prefer-single'
  ],
  '@stylistic/indent': [
    'error',
    2,
    {
      SwitchCase: 1,
      ignoredNodes: [
        'TemplateLiteral *'
      ],
      offsetTernaryExpressions: true
    }
  ]
}

export default [
  /**
   *  React config for all `jsx` and `tsx` files
   */
  {
    ...reactPlugin.configs.recommended,
    files: [
      '**/*.jsx',
      '**/*.tsx'
    ]
  },
  /**
   *  Storybook config
   */
  ...storybookPlugin.configs['flat/recommended'],
  /**
   *  Standard config
   */
  standard({
    files: [
      '**/*.{mjs,cjs}'
    ],
    ignores: [
      'src',
      'stories',
      'tests'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }),
  standard({
    files: [
      'src/**/*.{mjs,cjs}',
      'stories/**/*.{mjs,cjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  }),
  standard({
    files: [
      'tests/**/*.{mjs,cjs}'
    ],
    languageOptions: {
      globals: {
        ...globals.mocha
      }
    }
  }),
  /**
   *  Standard config for all `jsx` and `tsx` files
   */
  standard({
    files: [
      'src/**/*.{jsx,tsx}',
      'stories/**/*.{jsx,tsx}'
    ],
    languageOptions: {
      parserOptions: {
        ...reactParserOptions
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      ...reactPlugins,
      ...storybookPlugins
    },
    rules: {
      ...reactRules
    }
  })
]
