import { NavigationContainer } from '@react-navigation/native'
import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { PLACEHOLDER_DATA } from 'libs/subcategories/placeholderData'
import { offersFixture } from 'shared/offer/offer.fixture'
import { theme } from 'theme'
import { VariantsTemplate, type Variants, type VariantsStory } from 'ui/storybook/VariantsTemplate'

import { MarketingBlockExclusivity } from './MarketingBlockExclusivity'

// @ts-ignore import is unresolved
// eslint-disable-next-line import/no-unresolved
import { useQueryDecorator } from '/.storybook/mocks/react-query'

const meta: ComponentMeta<typeof MarketingBlockExclusivity> = {
  title: 'features/home/MarketingBlock/MarketingBlockExclusivity',
  component: MarketingBlockExclusivity,
  decorators: [
    useQueryDecorator,
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
  parameters: {
    useQuery: {
      subcategories: PLACEHOLDER_DATA,
      featureFlags: { get: () => ({ minimalBuildNumber: 1000000 }) },
    },
  },
}
export default meta

const variantConfig: Variants<typeof MarketingBlockExclusivity> = [
  {
    label: 'MarketingBlockExclusivity default',
    props: {
      moduleId: 'moduleId',
      offer: offersFixture[0],
    },
  },
  {
    label: 'MarketingBlockExclusivity with image',
    props: {
      moduleId: 'moduleId',
      offer: offersFixture[0],
      backgroundImageUrl:
        'https://storage.googleapis.com/passculture-metier-prod-production-assets-fine-grained/thumbs/mediations/9MPGW',
    },
  },
]

const Template: VariantsStory<typeof MarketingBlockExclusivity> = (args) => (
  <VariantsTemplate
    variants={variantConfig}
    Component={MarketingBlockExclusivity}
    defaultProps={args}
  />
)

// Todo(PC-35079) fix this story, read the associated ticket to follow the different choices offered
const AllVariants = Template.bind({})
AllVariants.storyName = 'MarketingBlockExclusivity'
AllVariants.parameters = {
  chromatic: { viewports: [theme.breakpoints.xs, theme.breakpoints.xl] },
}
