import { NavigationContainer } from '@react-navigation/native'
import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { SubscriptionTheme } from 'features/subscription/types'
import { VariantsTemplate, type Variants, type VariantsStory } from 'ui/storybook/VariantsTemplate'

import { SubscriptionThematicButton } from './SubscriptionThematicButton'

const meta: ComponentMeta<typeof SubscriptionThematicButton> = {
  title: 'Features/subscription/SubscriptionThematicButton',
  component: SubscriptionThematicButton,
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
}
export default meta

const variantConfig: Variants<typeof SubscriptionThematicButton> = [
  {
    label: 'SubscriptionThematicButton default',
    props: { thematic: SubscriptionTheme.CINEMA, checked: false },
  },
  {
    label: 'SubscriptionThematicButton checked',
    props: { thematic: SubscriptionTheme.CINEMA, checked: true },
  },
]
const Template: VariantsStory<typeof SubscriptionThematicButton> = () => (
  <VariantsTemplate variants={variantConfig} Component={SubscriptionThematicButton} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'SubscriptionThematicButton'
