import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { VariantsTemplate, type Variants, type VariantsStory } from 'ui/storybook/VariantsTemplate'

import { SelectionLabel } from './SelectionLabel'

const meta: ComponentMeta<typeof SelectionLabel> = {
  title: 'Features/search/SelectionLabel',
  component: SelectionLabel,
}
export default meta

const variantConfig: Variants<typeof SelectionLabel> = [
  {
    label: 'SelectionLabel',
    props: {
      label: 'Cinéma',
      selected: false,
    },
  },
  {
    label: 'Selected SelectionLabel',
    props: {
      label: 'Cinéma',
      selected: true,
    },
  },
  {
    label: 'Very long SelectionLabel',
    props: {
      label: 'Conférences, rencontres, spectacles, expositions et visites',
      selected: false,
    },
  },
  {
    label: 'Selected Very long SelectionLabel',
    props: {
      label: 'Conférences, rencontres, spectacles, expositions et visites',

      selected: true,
    },
  },
]

const Template: VariantsStory<typeof SelectionLabel> = () => (
  <VariantsTemplate variants={variantConfig} Component={SelectionLabel} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'SelectionLabel'
