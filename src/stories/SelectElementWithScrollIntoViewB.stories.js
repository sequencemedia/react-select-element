import React from 'react'

import { actions } from '@storybook/addon-actions'

import SelectElementWithScrollIntoViewB from './SelectElementWithScrollIntoViewB'

import {
  OPTIONS,
  SORTED_OPTIONS,
  RANDOM_OPTIONS,
  LARGER_OPTIONS
} from './common/options'

export default {
  title: 'Example/Select Element With Scroll Into View (B)',
  component: SelectElementWithScrollIntoViewB,
  argTypes: {
    onChange: {
      action: 'changed'
    }
  }
}

const Template = (args) => <SelectElementWithScrollIntoViewB {...args} />

export const Options = Template.bind({})

Options.args = {
  options: OPTIONS,
  ...actions('onChange')
}

export const SortedOptions = Template.bind({})

SortedOptions.args = {
  options: SORTED_OPTIONS,
  ...actions('onChange')
}

export const RandomOptions = Template.bind({})

RandomOptions.args = {
  options: RANDOM_OPTIONS,
  ...actions('onChange')
}

export const LargerOptions = Template.bind({})

LargerOptions.args = {
  options: LARGER_OPTIONS,
  ...actions('onChange')
}
