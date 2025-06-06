import React from 'react'

import { actions } from 'storybook/actions'

import ControlledSelectElement from './ControlledSelectElement'

import {
  OPTIONS,
  SORTED_OPTIONS,
  RANDOM_OPTIONS,
  LARGER_OPTIONS
} from '../common/options'

export default {
  title: 'Hooks Component/Controlled Select Element',
  component: ControlledSelectElement,
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

const Template = (args) => <ControlledSelectElement {...args} />

export const Options = Template.bind({})

Options.args = {
  id: 'controlled-select-element',
  options: OPTIONS,
  ...actions('onChange')
}

export const SortedOptions = Template.bind({})

SortedOptions.args = {
  id: 'controlled-select-element',
  options: SORTED_OPTIONS,
  ...actions('onChange')
}

export const RandomOptions = Template.bind({})

RandomOptions.args = {
  id: 'controlled-select-element',
  options: RANDOM_OPTIONS,
  ...actions('onChange')
}

export const LargerOptions = Template.bind({})

LargerOptions.args = {
  id: 'controlled-select-element',
  options: LARGER_OPTIONS,
  ...actions('onChange')
}
