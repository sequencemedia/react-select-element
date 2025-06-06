import React from 'react'

import { actions } from 'storybook/actions'

import HiddenSelectElement from './HiddenSelectElement'

import {
  OPTIONS,
  SORTED_OPTIONS,
  RANDOM_OPTIONS,
  LARGER_OPTIONS
} from '../common/options.mjs'

export default {
  title: 'Class Component Examples/Hidden Select Element',
  component: HiddenSelectElement,
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

const Template = (args) => <HiddenSelectElement {...args} />

export const Options = Template.bind({})

Options.args = {
  id: 'hidden-select-element',
  options: OPTIONS,
  ...actions('onChange')
}

export const SortedOptions = Template.bind({})

SortedOptions.args = {
  id: 'hidden-select-element',
  options: SORTED_OPTIONS,
  ...actions('onChange')
}

export const RandomOptions = Template.bind({})

RandomOptions.args = {
  id: 'hidden-select-element',
  options: RANDOM_OPTIONS,
  ...actions('onChange')
}

export const LargerOptions = Template.bind({})

LargerOptions.args = {
  id: 'hidden-select-element',
  options: LARGER_OPTIONS,
  ...actions('onChange')
}
