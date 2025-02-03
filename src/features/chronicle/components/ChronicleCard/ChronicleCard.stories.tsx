import { ComponentMeta } from '@storybook/react'
import React from 'react'
import { View } from 'react-native'

import { ChronicleCard } from 'features/chronicle/components/ChronicleCard/ChronicleCard'
import { ButtonTertiaryBlack } from 'ui/components/buttons/ButtonTertiaryBlack'
import { VariantsTemplate, type Variants, type VariantsStory } from 'ui/storybook/VariantsTemplate'

const meta: ComponentMeta<typeof ChronicleCard> = {
  title: 'ui/ChronicleCard',
  component: ChronicleCard,
}
export default meta

const baseProps = {
  id: 1,
  title: 'Olivier, 15 ans',
  subtitle: 'Membre du book club',
  description:
    'Pour moi, cette biographie n’est pas comme une autre. Cela concerne le créateur de Star Wars, le premier film...',
  date: 'Juin 2024',
}

const variantConfig: Variants<typeof ChronicleCard> = [
  {
    label: 'ChronicleCard default',
    props: { ...baseProps },
  },
  {
    label: 'ChronicleCard with see more button',
    props: {
      ...baseProps,
      children: (
        <View>
          <ButtonTertiaryBlack wording="Voir plus" />
        </View>
      ),
    },
  },
]

const Template: VariantsStory<typeof ChronicleCard> = (args) => (
  <VariantsTemplate variants={variantConfig} Component={ChronicleCard} defaultProps={args} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'ChronicleCard'
