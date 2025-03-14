import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import styled from 'styled-components/native'

import { getProfileStackConfig } from 'features/navigation/ProfileStackNavigator/getProfileStackConfig'
import { UseNavigationType } from 'features/navigation/RootNavigator/types'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonSecondary } from 'ui/components/buttons/ButtonSecondary'
import { ButtonTertiaryBlack } from 'ui/components/buttons/ButtonTertiaryBlack'
import { ViewGap } from 'ui/components/ViewGap/ViewGap'
import { GenericInfoPageWhiteLegacy } from 'ui/pages/GenericInfoPageWhiteLegacy'
import { Clear } from 'ui/svg/icons/Clear'
import { BicolorUserBlocked } from 'ui/svg/icons/UserBlocked'
import { TypoDS } from 'ui/theme'

export const DeleteProfileEmailHacked: FC = () => {
  const { navigate } = useNavigation<UseNavigationType>()

  const navigateToProfile = () => navigate(...getProfileStackConfig('Profile'))

  const navigateToChangeEmail = () => navigate('ChangeEmail')

  const navigateToSuspendAccount = () => {
    navigate('SuspendAccountConfirmationWithoutAuthentication')
  }

  return (
    <GenericInfoPageWhiteLegacy
      headerGoBack
      separateIconFromTitle={false}
      icon={BicolorUserBlocked}
      titleComponent={TypoDS.Title2}
      title="Sécurise ton compte">
      <ViewGap gap={8}>
        <ViewGap gap={6}>
          <TypoDS.BodyS>
            Tu as indiqué <TypoDS.BodyAccentS>que ta boite mail a été piratée</TypoDS.BodyAccentS>.
          </TypoDS.BodyS>
          <TypoDS.BodyS>
            Pour des raisons de <TypoDS.BodyAccentS>sécurité</TypoDS.BodyAccentS>, nous te
            conseillons de modifier ton mot de passe ou suspendre ton compte temporairement.
          </TypoDS.BodyS>
        </ViewGap>

        <ContentBottom>
          <ButtonPrimary wording="Modifier mon adresse e-mail" onPress={navigateToChangeEmail} />
          <ButtonSecondary wording="Suspendre mon compte" onPress={navigateToSuspendAccount} />
          <ButtonTertiaryBlack
            wording="Ne pas sécuriser mon compte"
            onPress={navigateToProfile}
            icon={Clear}
          />
        </ContentBottom>
      </ViewGap>
    </GenericInfoPageWhiteLegacy>
  )
}

const ContentBottom = styled(ViewGap).attrs({
  gap: 6,
})({
  alignItems: 'center',
})
