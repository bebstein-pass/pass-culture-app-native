import React, { FunctionComponent, useEffect } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import { useShowForceUpdateWhenDisableActivation } from 'features/forceUpdate/helpers/useShowForceUpdateWhenDisableActivation'
import { navigateToHomeConfig } from 'features/navigation/helpers/navigateToHome'
import { StepperOrigin } from 'features/navigation/RootNavigator/types'
import { useFunctionOnce } from 'libs/hooks'
import { BatchEvent, BatchProfile } from 'libs/react-native-batch'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonTertiaryBlack } from 'ui/components/buttons/ButtonTertiaryBlack'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { GenericOfficialPage } from 'ui/pages/GenericOfficialPage'
import { PlainArrowNext } from 'ui/svg/icons/PlainArrowNext'
import { Spacer, TypoDS } from 'ui/theme'

export const VerifyEligibility: FunctionComponent = () => {
  useEffect(() => {
    BatchProfile.trackEvent(BatchEvent.screenViewVerifyEligibility)
  }, [])

  useShowForceUpdateWhenDisableActivation()

  const triggerBatch = useFunctionOnce(() =>
    BatchProfile.trackEvent(BatchEvent.hasValidatedEligibleAccount)
  )

  return (
    <GenericOfficialPage
      title="Vérifie ton identité pour débloquer ton crédit"
      buttons={[
        <InternalTouchableLink
          key={1}
          as={ButtonPrimary}
          wording="Commencer la vérification"
          navigateTo={{ screen: 'Stepper', params: { from: StepperOrigin.VERIFY_ELIGIBILITY } }}
        />,
        <InternalTouchableLink
          key={2}
          as={ButtonTertiaryBlack}
          icon={PlainArrowNext}
          wording="Vérifier mon identité plus tard"
          navigateTo={navigateToHomeConfig}
          onBeforeNavigate={triggerBatch}
        />,
      ]}>
      <View>
        <StyledBody>
          Nous avons besoin de vérifier ton identité. Si tu es éligible tu pourras bénéficier de
          l’aide financière de l’État.
        </StyledBody>
        <Spacer.Column numberOfSpaces={4} />
        <TypoDS.BodyAccent>
          Assure-toi que toutes les informations que tu nous transmets sont correctes pour faciliter
          ton inscription.
        </TypoDS.BodyAccent>
      </View>
    </GenericOfficialPage>
  )
}

const StyledBody = styled(TypoDS.Body)(({ theme }) => ({
  color: theme.colors.greyDark,
}))
