import React, { FunctionComponent, useCallback } from 'react'
import styled from 'styled-components/native'

import { AuthenticationButton } from 'features/auth/components/AuthenticationButton/AuthenticationButton'
import { StepperOrigin } from 'features/navigation/RootNavigator/types'
import { analytics } from 'libs/analytics/provider'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { AppModalWithIllustration } from 'ui/components/modals/AppModalWithIllustration'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { BicolorUserFavorite } from 'ui/svg/icons/BicolorUserFavorite'
import { getSpacing, Typo } from 'ui/theme'
import { LINE_BREAK } from 'ui/theme/constants'

interface Props {
  visible: boolean
  offerId: number
  dismissModal: () => void
}

export const FavoriteAuthModal: FunctionComponent<Props> = ({ visible, offerId, dismissModal }) => {
  const closeModal = useCallback(() => {
    analytics.logQuitFavoriteModalForSignIn(offerId)
    dismissModal()
  }, [dismissModal, offerId])

  const signUp = useCallback(() => {
    analytics.logSignUpFromOffer(offerId)
    analytics.logSignUpClicked({ from: 'offer_favorite' })
    dismissModal()
  }, [dismissModal, offerId])

  const signIn = useCallback(() => {
    analytics.logSignInFromOffer(offerId)
    dismissModal()
  }, [dismissModal, offerId])

  return (
    <AppModalWithIllustration
      visible={visible}
      title={'Identifie-toi pour' + LINE_BREAK + 'retrouver tes favoris'}
      Illustration={UserFavorite}
      hideModal={closeModal}>
      <StyledBody>
        Ton compte te permettra de retrouver tous tes bons plans en un clin d’oeil&nbsp;!
      </StyledBody>
      <StyledButtonContainer>
        <InternalTouchableLink
          as={ButtonPrimary}
          wording="Créer un compte"
          navigateTo={{
            screen: 'SignupForm',
            params: { from: StepperOrigin.FAVORITE, offerId },
          }}
          onBeforeNavigate={signUp}
        />
      </StyledButtonContainer>
      <StyledAuthenticationButton
        type="login"
        params={{ from: StepperOrigin.FAVORITE, offerId }}
        onAdditionalPress={signIn}
      />
    </AppModalWithIllustration>
  )
}

const StyledAuthenticationButton = styled(AuthenticationButton).attrs(({ theme }) => ({
  linkColor: theme.designSystem.color.text.brandSecondary,
}))``

const StyledButtonContainer = styled.View({
  width: '100%',
  marginTop: getSpacing(6),
  marginBottom: getSpacing(4),
})

const StyledBody = styled(Typo.Body)({
  textAlign: 'center',
})

const UserFavorite = styled(BicolorUserFavorite).attrs(({ theme }) => ({
  color: theme.designSystem.color.icon.brandPrimary,
  color2: theme.designSystem.color.icon.brandPrimary,
}))``
