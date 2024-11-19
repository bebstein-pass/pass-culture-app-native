import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { VariantsTemplate } from 'ui/storybook/VariantsTemplate'

import { SingleFilterButton } from './SingleFilterButton'

const meta: ComponentMeta<typeof SingleFilterButton> = {
  title: 'Features/search/SingleFilterButton',
  component: SingleFilterButton,
}
export default meta

const variantConfig = [
  {
    label: 'SingleFilterButton selected',
    props: { label: 'CD, vinyles, musique en ligne', isSelected: true },
  },
  {
    label: 'SingleFilterButton not selected',
    props: {
      label: 'CD, vinyles, musique en ligne',
      isSelected: false,
    },
  },
]

const Template: ComponentStory<typeof VariantsTemplate> = () => (
  <VariantsTemplate variants={variantConfig} Component={SingleFilterButton} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'SingleFilterButton'
