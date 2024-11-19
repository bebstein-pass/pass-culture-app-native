import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { SubcategoryIdEnum, WithdrawalTypeEnum } from 'api/gen'
import { ThreeShapesTicket } from 'features/bookings/components/ThreeShapesTicket'
import { VariantsTemplate } from 'ui/storybook/VariantsTemplate'

import { TicketBody } from './TicketBody'

const meta: ComponentMeta<typeof TicketBody> = {
  title: 'features/bookings/TicketBody',
  component: TicketBody,
  parameters: {
    axe: {
      // Disabled this rule because we use SvgIdentifier for all Illustration linearGradient id
      disabledRules: ['duplicate-id'],
    },
  },
}
export default meta

const variantConfig = [
  {
    label: 'TicketBody default',
    props: {
      withdrawalDelay: 1000,
      withdrawalType: WithdrawalTypeEnum.on_site,
    },
  },
  {
    label: 'TicketBody external booking',
    props: {
      withdrawalDelay: 1000,
      externalBookings: { barcode: 'PASSCULTURE:v3;TOKEN:352UW4', seat: 'A12' },
    },
  },
  {
    label: 'TicketBody with subcategory should have QR Code',
    props: {
      withdrawalDelay: 1000,
      qrCodeData: '1234',
      subcategoryId: SubcategoryIdEnum.ABO_BIBLIOTHEQUE,
    },
  },
  {
    label: 'TicketBody no ticket needed',
    props: { withdrawalDelay: 1000, withdrawalType: WithdrawalTypeEnum.no_ticket },
  },
  {
    label: 'TicketBody by email with beginning date',
    props: { withdrawalDelay: 1000, withdrawalType: WithdrawalTypeEnum.by_email },
  },
]

const Template: ComponentStory<typeof TicketBody> = () => (
  <ThreeShapesTicket>
    <VariantsTemplate variants={variantConfig} Component={TicketBody} />
  </ThreeShapesTicket>
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'TicketBody'
