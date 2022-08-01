import React, { PropsWithChildren } from 'react'
import styled from 'styled-components/native'

import { DomainsCredit } from 'api/gen'
import { CreditProgressBar } from 'features/profile/components/CreditProgressBar'
import { formatToFrenchDecimal } from 'libs/parsers/getDisplayPrice'
import { Typo, Spacer } from 'ui/theme'

type CreditInfoProps = {
  totalCredit: DomainsCredit['all']
}

export function CreditInfo({ totalCredit }: PropsWithChildren<CreditInfoProps>) {
  return (
    <React.Fragment>
      <Hero>{formatToFrenchDecimal(totalCredit.remaining)}</Hero>
      <Spacer.Column numberOfSpaces={3} />
      <CreditProgressBar progress={totalCredit.remaining / totalCredit.initial} />
    </React.Fragment>
  )
}

const Hero = styled(Typo.Hero)(({ theme }) => ({
  color: theme.colors.secondary,
}))
