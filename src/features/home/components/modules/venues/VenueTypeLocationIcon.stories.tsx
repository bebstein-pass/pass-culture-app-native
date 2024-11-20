import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { theme } from 'theme'
import { VariantsTemplate, type Variants, type VariantsStory } from 'ui/storybook/VariantsTemplate'
import { Bag } from 'ui/svg/icons/bicolor/Bag'

import { VenueTypeLocationIcon } from './VenueTypeLocationIcon'

const meta: ComponentMeta<typeof VenueTypeLocationIcon> = {
  title: 'Features/Home/VenueTypeLocationIcon',
  component: VenueTypeLocationIcon,
}
export default meta

const variantConfig: Variants<typeof VenueTypeLocationIcon> = [
  {
    label: 'VenueTypeLocationIcon with color',
    props: {
      VenueTypeIcon: Bag,
      iconColor: theme.colors.greySemiDark,
      backgroundColor: theme.colors.greyLight,
    },
  },
  {
    label: 'VenueTypeLocationIcon without color',
    props: {
      VenueTypeIcon: Bag,
    },
  },
]

const Template: VariantsStory<typeof VenueTypeLocationIcon> = () => (
  <VariantsTemplate variants={variantConfig} Component={VenueTypeLocationIcon} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'VenueTypeLocationIcon'
