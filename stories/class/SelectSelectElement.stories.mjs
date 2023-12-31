import React from 'react'

import { actions } from '@storybook/addon-actions'

import SelectSelectElement from './SelectSelectElement'

import {
  OPTIONS,
  SORTED_OPTIONS,
  RANDOM_OPTIONS,
  LARGER_OPTIONS
} from '../common/options.mjs'

export default {
  title: 'Class Component Examples/Select Select Element',
  component: SelectSelectElement,
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

const Template = (args) => <SelectSelectElement {...args} />

export const Options = Template.bind({})

Options.args = {
  id: 'select-element',
  options: OPTIONS,
  ...actions('onChange')
}

export const SortedOptions = Template.bind({})

SortedOptions.args = {
  id: 'select-element',
  options: SORTED_OPTIONS,
  ...actions('onChange')
}

export const RandomOptions = Template.bind({})

RandomOptions.args = {
  id: 'select-element',
  options: RANDOM_OPTIONS,
  ...actions('onChange')
}

export const LargerOptions = Template.bind({})

LargerOptions.args = {
  id: 'select-element',
  options: LARGER_OPTIONS,
  ...actions('onChange')
}
