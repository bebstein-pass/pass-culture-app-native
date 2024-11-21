import { NavigationContainer } from '@react-navigation/native'
import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { OfferVenueButton } from 'features/offer/components/OfferVenueButton/OfferVenueButton'
import { offerResponseSnap } from 'features/offer/fixtures/offerResponse'
import { VariantsTemplate, type Variants, type VariantsStory } from 'ui/storybook/VariantsTemplate'

const meta: ComponentMeta<typeof OfferVenueButton> = {
  title: 'features/offer/OfferVenueButton',
  component: OfferVenueButton,
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
}
export default meta

const variantConfig: Variants<typeof OfferVenueButton> = [
  {
    label: 'OfferVenueButton default',
    props: { venue: offerResponseSnap.venue },
  },
  {
    label: 'OfferVenueButton without subtitle',
    props: { venue: { ...offerResponseSnap.venue, city: undefined } },
  },
]

const Template: VariantsStory<typeof OfferVenueButton> = (args) => (
  <VariantsTemplate variants={variantConfig} Component={OfferVenueButton} defaultProps={args} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'OfferVenueButton'
