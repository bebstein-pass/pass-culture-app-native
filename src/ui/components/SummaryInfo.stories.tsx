import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { theme } from 'theme'
import { SummaryInfo } from 'ui/components/SummaryInfo'
import { VariantsTemplate } from 'ui/storybook/VariantsTemplate'
import { CalendarS } from 'ui/svg/icons/CalendarS'
const meta: ComponentMeta<typeof SummaryInfo> = {
  title: 'ui/SummaryInfo',
  component: SummaryInfo,
}
export default meta

const baseProps = {
  Icon: <CalendarS size={theme.icons.sizes.small} />,
  title: 'Info name',
}

const variantConfig = [
  {
    label: 'SummaryInfo default',
    props: baseProps,
  },
  {
    label: 'SummaryInfo with subtitle',
    props: {
      ...baseProps,
      subtitle: 'Lorem ipsum dolor sit amet consectetur. Hendrerit massa dolor blandit.',
    },
  },
]

const Template: ComponentStory<typeof VariantsTemplate> = () => (
  <VariantsTemplate variants={variantConfig} Component={SummaryInfo} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'SummaryInfo'
