import React from 'react'

import { actions } from '@storybook/addon-actions'

import InfiniteSelectElementWithScrollIntoView from './InfiniteSelectElementWithScrollIntoView'

import {
  OPTIONS,
  SORTED_OPTIONS,
  RANDOM_OPTIONS,
  LARGER_OPTIONS
} from '../common/options.mjs'

export default {
  title: 'Class Component Examples/Infinite Select Element With Scroll Into View',
  component: InfiniteSelectElementWithScrollIntoView,
  argTypes: {
    children: {
      control: false,
      table: {
        disable: true
      }
    },
    onChange: {
      action: 'changed'
    }
  }
}

const Template = (args) => <InfiniteSelectElementWithScrollIntoView {...args} />

export const Options = Template.bind({})

Options.args = {
  id: 'infinite-select-element',
  options: OPTIONS,
  ...actions('onChange')
}

export const SortedOptions = Template.bind({})

SortedOptions.args = {
  id: 'infinite-select-element',
  options: SORTED_OPTIONS,
  ...actions('onChange')
}

export const RandomOptions = Template.bind({})

RandomOptions.args = {
  id: 'infinite-select-element',
  options: RANDOM_OPTIONS,
  ...actions('onChange')
}

export const LargerOptions = Template.bind({})

LargerOptions.args = {
  id: 'infinite-select-element',
  options: LARGER_OPTIONS,
  ...actions('onChange')
}
