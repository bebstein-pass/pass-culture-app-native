import React from 'react'
import styled from 'styled-components/native'

import { DomainsCredit } from 'api/gen'
import { useIsUserUnderageBeneficiary } from 'features/profile/helpers/useIsUserUnderageBeneficiary'
import { useGetPacificFrancToEuroRate } from 'libs/firebase/firestore/exchangeRates/useGetPacificFrancToEuroRate'
import { formatCurrencyFromCents } from 'libs/parsers/formatCurrencyFromCents'
import { useGetCurrencyToDisplay } from 'shared/currency/useGetCurrencyToDisplay'
import { Spacer, Typo } from 'ui/theme'
import { SPACE } from 'ui/theme/constants'

type BeneficiaryCeilingsProps = {
  domainsCredit: DomainsCredit
}

export function BeneficiaryCeilings({ domainsCredit }: BeneficiaryCeilingsProps) {
  const isUserUnderageBeneficiary = useIsUserUnderageBeneficiary()
  const currency = useGetCurrencyToDisplay()
  const euroToPacificFrancRate = useGetPacificFrancToEuroRate()

  if (isUserUnderageBeneficiary || domainsCredit.all.remaining === 0) return null
  return (
    <React.Fragment>
      {domainsCredit.digital ? (
        <React.Fragment>
          <Spacer.Column numberOfSpaces={6} />
          <Typo.Body testID="domains-credit-digital">
            dont
            {SPACE}
            <BodySecondary>
              {formatCurrencyFromCents(
                domainsCredit.digital.remaining,
                currency,
                euroToPacificFrancRate
              )}
            </BodySecondary>
            {SPACE}
            en offres numériques.
          </Typo.Body>
        </React.Fragment>
      ) : null}
      {domainsCredit.physical ? (
        <Typo.Body testID="domains-credit-physical">
          dont
          {SPACE}
          <BodySecondary>
            {formatCurrencyFromCents(
              domainsCredit.physical.remaining,
              currency,
              euroToPacificFrancRate
            )}
          </BodySecondary>
          {SPACE}
          en offres physiques.
        </Typo.Body>
      ) : null}
    </React.Fragment>
  )
}

const BodySecondary = styled(Typo.Body)(({ theme }) => ({
  color: theme.colors.secondary,
}))
