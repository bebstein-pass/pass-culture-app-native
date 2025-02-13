import React from 'react'
import styled from 'styled-components/native'

import { DomainsCredit } from 'api/gen/api'
import { BeneficiaryCeilings } from 'features/profile/components/BeneficiaryCeilings/BeneficiaryCeilings'
import { CreditExplanation } from 'features/profile/components/CreditExplanation/CreditExplanation'
import { CreditInfo } from 'features/profile/components/CreditInfo/CreditInfo'
import { EmptyCredit } from 'features/profile/components/EmptyCredit/EmptyCredit'
import { getCreditExpirationText } from 'features/profile/components/Header/CreditHeader/getCreditExpirationText'
import { HeaderWithGreyContainer } from 'features/profile/components/Header/HeaderWithGreyContainer/HeaderWithGreyContainer'
import { Subtitle } from 'features/profile/components/Subtitle/Subtitle'
import { getHeaderSubtitleProps } from 'features/profile/helpers/getHeaderSubtitleProps'
import { useIsUserUnderageBeneficiary } from 'features/profile/helpers/useIsUserUnderageBeneficiary'
import { setDateOneDayEarlier } from 'libs/dates'
import { useRemoteConfigContext } from 'libs/firebase/remoteConfig/RemoteConfigProvider'
import { useDepositAmountsByAge } from 'shared/user/useDepositAmountsByAge'
import { GenericBanner } from 'ui/components/ModuleBanner/GenericBanner'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { BicolorOffers } from 'ui/svg/icons/BicolorOffers'
import { Spacer, TypoDS } from 'ui/theme'

export type CreditHeaderProps = {
  showRemoteBanner: boolean
  firstName?: string | null
  lastName?: string | null
  age?: number
  domainsCredit?: DomainsCredit | null
  depositExpirationDate?: string
}

export function CreditHeader({
  showRemoteBanner,
  firstName,
  lastName,
  age,
  domainsCredit,
  depositExpirationDate,
}: CreditHeaderProps) {
  const { homeEntryIdFreeOffers } = useRemoteConfigContext()
  const depositAmount = useDepositAmountsByAge()
  const incomingCreditLabelsMap: Record<number, { label: string; highlightedLabel: string }> = {
    15: {
      label: 'À venir pour tes 16 ans\u00a0: ',
      highlightedLabel: `+ ${depositAmount.sixteenYearsOldDeposit}`,
    },
    16: {
      label: 'À venir pour tes 17 ans\u00a0: ',
      highlightedLabel: `+ ${depositAmount.seventeenYearsOldDeposit}`,
    },
    17: {
      label: 'À venir pour tes 18 ans\u00a0: ',
      highlightedLabel: `${depositAmount.eighteenYearsOldDeposit}`,
    },
  }
  const name = firstName && lastName ? `${firstName} ${lastName}` : ''
  const IsUserUnderageBeneficiary = useIsUserUnderageBeneficiary()

  if (!domainsCredit || !age) return null

  const isCreditEmpty = domainsCredit.all.remaining === 0
  const isDepositExpired = depositExpirationDate
    ? new Date(depositExpirationDate) < new Date()
    : false

  const subtitleProps = getHeaderSubtitleProps({
    isCreditEmpty,
    isDepositExpired,
    depositExpirationDate,
  })

  const isExpiredOrCreditEmptyWithNoUpcomingCredit =
    age >= 18 && (isDepositExpired || isCreditEmpty)
  const bannerText =
    depositExpirationDate && !isCreditEmpty
      ? getCreditExpirationText({
          depositExpirationDate: new Date(setDateOneDayEarlier(depositExpirationDate)),
          userStatus: IsUserUnderageBeneficiary ? 'underageBeneficiary' : 'beneficiary',
        })
      : undefined

  return (
    <HeaderWithGreyContainer
      showRemoteBanner={showRemoteBanner}
      title={name}
      bannerText={bannerText}
      subtitle={<Subtitle {...subtitleProps} />}
      withGreyContainer={!isExpiredOrCreditEmptyWithNoUpcomingCredit}>
      {isExpiredOrCreditEmptyWithNoUpcomingCredit ? (
        <InternalTouchableLink
          navigateTo={{
            screen: 'ThematicHome',
            params: { homeId: homeEntryIdFreeOffers, from: 'profile' },
          }}>
          <GenericBanner LeftIcon={<BicolorOffers />}>
            <TypoDS.BodyAccent>L’aventure continue&nbsp;!</TypoDS.BodyAccent>
            <Spacer.Column numberOfSpaces={1} />
            <StyledBody numberOfLines={3}>
              Tu peux profiter d’offres gratuites autour de toi.
            </StyledBody>
          </GenericBanner>
        </InternalTouchableLink>
      ) : (
        <React.Fragment>
          {isDepositExpired || isCreditEmpty ? null : (
            <React.Fragment>
              <CreditInfo totalCredit={domainsCredit.all} />
              <BeneficiaryCeilings domainsCredit={domainsCredit} />
            </React.Fragment>
          )}
          {incomingCreditLabelsMap[age] && !isCreditEmpty ? (
            <React.Fragment>
              <Spacer.Column numberOfSpaces={6} />
              <TypoDS.Body>
                {
                  /* @ts-expect-error: because of noUncheckedIndexedAccess */
                  incomingCreditLabelsMap[age].label
                }
                {/* @ts-expect-error: because of noUncheckedIndexedAccess */}
                <HighlightedBody>{incomingCreditLabelsMap[age].highlightedLabel}</HighlightedBody>
              </TypoDS.Body>
            </React.Fragment>
          ) : null}
          {isCreditEmpty ? <EmptyCredit age={age} /> : null}
          <Spacer.Column numberOfSpaces={1} />
          <CreditExplanation isDepositExpired={isDepositExpired} age={age} />
        </React.Fragment>
      )}
    </HeaderWithGreyContainer>
  )
}

const HighlightedBody = styled(TypoDS.Body)(({ theme }) => ({
  color: theme.colors.secondary,
}))

const StyledBody = styled(TypoDS.Body)(({ theme }) => ({
  color: theme.colors.greyDark,
}))
