import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { ButtonQuaternaryBlack } from 'ui/components/buttons/ButtonQuaternaryBlack'
import { VariantsTemplate, type Variants, type VariantsStory } from 'ui/storybook/VariantsTemplate'
import { Email } from 'ui/svg/icons/Email'

const meta: ComponentMeta<typeof ButtonQuaternaryBlack> = {
  title: 'ui/buttons/ButtonQuaternaryBlack',
  component: ButtonQuaternaryBlack,
}
export default meta

const variantConfig: Variants<typeof ButtonQuaternaryBlack> = [
  // Default
  {
    label: 'ButtonQuaternaryBlack default',
    props: { wording: 'Confirmer' },
  },
  {
    label: 'ButtonQuaternaryBlack default disabled',
    props: { wording: 'Confirmer', disabled: true },
  },
  {
    label: 'ButtonQuaternaryBlack default loading',
    props: { wording: 'Confirmer', isLoading: true },
  },
  {
    label: 'ButtonQuaternaryBlack default with icon',
    props: { wording: 'Confirmer', icon: Email },
  },
  {
    label: 'ButtonQuaternaryBlack default disabled with icon',
    props: { wording: 'Confirmer', disabled: true, icon: Email },
  },
]

const Template: VariantsStory<typeof ButtonQuaternaryBlack> = (args) => (
  <VariantsTemplate
    variants={variantConfig}
    Component={ButtonQuaternaryBlack}
    defaultProps={args}
  />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'ButtonQuaternaryBlack'
