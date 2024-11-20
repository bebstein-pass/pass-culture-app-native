import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { VariantsTemplate, type Variants, type VariantsStory } from 'ui/storybook/VariantsTemplate'

import { DotComponent } from './DotComponent'

const meta: ComponentMeta<typeof DotComponent> = {
  title: 'ui/DotComponent',
  component: DotComponent,
}
export default meta

const variantConfig: Variants<typeof DotComponent> = [
  {
    label: 'DotComponent done',
    props: { index: 1, activeIndex: 2, numberOfSteps: 3, isActive: false },
  },
  {
    label: 'DotComponent done neutral',
    props: {
      index: 1,
      activeIndex: 2,
      numberOfSteps: 3,
      isActive: false,
      withNeutralPreviousStepsColor: true,
    },
  },
  {
    label: 'DotComponent active',
    props: { index: 1, activeIndex: 1, numberOfSteps: 3, isActive: true },
  },
  {
    label: 'DotComponent to do',
    props: { index: 2, activeIndex: 1, numberOfSteps: 3, isActive: false },
  },
]

const Template: VariantsStory<typeof DotComponent> = () => (
  <VariantsTemplate variants={variantConfig} Component={DotComponent} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'DotComponent'
