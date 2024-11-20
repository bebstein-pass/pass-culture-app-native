import { action } from '@storybook/addon-actions'
import { ComponentMeta } from '@storybook/react'
import React from 'react'

import { VariantsTemplate, type Variants, type VariantsStory } from 'ui/storybook/VariantsTemplate'
import { Email } from 'ui/svg/icons/Email'
import { PlainArrowNext } from 'ui/svg/icons/PlainArrowNext'

import { ButtonWithLinearGradient } from './ButtonWithLinearGradient'

const meta: ComponentMeta<typeof ButtonWithLinearGradient> = {
  title: 'ui/buttons/ButtonWithLinearGradient',
  component: ButtonWithLinearGradient,
}
export default meta

const variantConfig: Variants<typeof ButtonWithLinearGradient> = [
  {
    label: 'ButtonWithLinearGradient default',
    props: { onPress: action('press'), wording: 'Confirmer' },
  },
  {
    label: 'ButtonWithLinearGradient disabled',
    props: {
      onPress: action('press'),
      wording: 'Confirmer',
      isDisabled: true,
    },
  },
  {
    label: 'ButtonWithLinearGradient with fit content width',
    props: { onPress: action('press'), wording: 'Confirmer', fitContentWidth: true },
  },
  {
    label: 'ButtonWithLinearGradient with icon',
    props: { onPress: action('press'), wording: 'Consulter mes e-mails', icon: Email },
  },
  {
    label: 'ButtonWithLinearGradient with icon after wording',
    props: {
      onPress: action('press'),
      wording: 'C’est parti\u00a0!',
      icon: PlainArrowNext,
      iconAfterWording: true,
    },
  },
]

const Template: VariantsStory<typeof ButtonWithLinearGradient> = () => (
  <VariantsTemplate variants={variantConfig} Component={ButtonWithLinearGradient} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'ButtonWithLinearGradient'
