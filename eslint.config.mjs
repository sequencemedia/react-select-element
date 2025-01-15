import globals from 'globals'
import standard from '@sequencemedia/eslint-config-standard/configs/recommended/merge'
import babelParser from '@babel/eslint-parser'
import reactPlugin from 'eslint-plugin-react'
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

const reactRules = {
  'no-unused-vars': [
    'error',
    {
      varsIgnorePattern: 'React'
    }
  ],
  quotes: [
    'error',
    'single'
  ],
  'jsx-quotes': [
    'error',
    'prefer-single'
  ],
  'react/jsx-indent': [
    'error',
    2,
    {
      checkAttributes: true,
      indentLogicalExpressions: true
    }
  ]
}

const reactSettings = {
  react: {
    version: 'detect'
  }
}

export default [
  /**
   *  React config for all `jsx` and `tsx` files
   */
  {
    ...reactPlugin.configs.flat.recommended,
    settings: {
      ...reactPlugin.configs.flat.recommended.settings,
      ...reactSettings
    }
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
      parser: babelParser,
      parserOptions: {
        ...reactParserOptions,
        project: null
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
    },
    settings: {
      ...reactSettings,
      'import/resolver': {
        'babel-module': {}
      }
    }
  })
]
