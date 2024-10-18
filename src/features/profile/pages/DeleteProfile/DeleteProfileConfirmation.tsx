import { useNavigation } from '@react-navigation/native'
import React from 'react'

import { useLogoutRoutine } from 'features/auth/helpers/useLogoutRoutine'
import { UseNavigationType } from 'features/navigation/RootNavigator/types'
import { getTabNavConfig } from 'features/navigation/TabBar/helpers'
import { useAnonymizeAccount } from 'features/profile/api/useAnonymizeAccount'
import { env } from 'libs/environment'
import { InfoBanner } from 'ui/components/banners/InfoBanner'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonQuaternarySecondary } from 'ui/components/buttons/ButtonQuarternarySecondary'
import { ButtonTertiaryBlack } from 'ui/components/buttons/ButtonTertiaryBlack'
import { SNACK_BAR_TIME_OUT, useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { ExternalTouchableLink } from 'ui/components/touchableLink/ExternalTouchableLink'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { GenericInfoPageWhite } from 'ui/pages/GenericInfoPageWhite'
import { BicolorProfileDeletion } from 'ui/svg/icons/BicolorProfileDeletion'
import { ExternalSiteFilled } from 'ui/svg/icons/ExternalSiteFilled'
import { Invalidate } from 'ui/svg/icons/Invalidate'
import { Spacer, Typo, TypoDS } from 'ui/theme'

export const DeleteProfileConfirmation = () => {
  const { navigate } = useNavigation<UseNavigationType>()
  const signOut = useLogoutRoutine()
  const { showErrorSnackBar } = useSnackBarContext()
  const { anonymizeAccount } = useAnonymizeAccount({
    onSuccess: async () => {
      await signOut()
      navigate('DeleteProfileSuccess')
    },
    onError: () => {
      showErrorSnackBar({
        message:
          'Une erreur s’est produite lors de ta demande de suppression de compte. Réessaie plus tard.',
        timeout: SNACK_BAR_TIME_OUT,
      })
    },
  })

  return (
    <GenericInfoPageWhite
      headerGoBack
      goBackParams={getTabNavConfig('Profile')}
      icon={BicolorProfileDeletion}
      separateIconFromTitle={false}
      title="Ta demande de suppression de compte"
      titleComponent={TypoDS.Title2}>
      <Typo.Body>
        Si tu confirmes ta demande, tu ne pourras plus accéder à ton compte et tes données
        personnelles seront supprimées (anonymisées).
      </Typo.Body>
      <Typo.Body>Tes réservations en cours seront également annulées et supprimées.</Typo.Body>
      <Spacer.Column numberOfSpaces={6} />
      <InfoBanner message="L’anonymisation de tes données personnelles empêche toute possibilité de te réidentifier à l’avenir.">
        <Spacer.Column numberOfSpaces={2} />
        <ExternalTouchableLink
          as={ButtonQuaternarySecondary}
          externalNav={{ url: env.FAQ_LINK_RIGHT_TO_ERASURE }}
          wording="Consultez notre FAQ"
          icon={ExternalSiteFilled}
          justifyContent="flex-start"
          inline
        />
      </InfoBanner>
      <Spacer.Column numberOfSpaces={6} />
      <ButtonPrimary wording="Supprimer mon compte" onPress={anonymizeAccount} />
      <Spacer.Column numberOfSpaces={4} />
      <InternalTouchableLink
        as={ButtonTertiaryBlack}
        wording="Annuler"
        navigateTo={{ screen: 'DeleteProfileReason' }}
        icon={Invalidate}
      />
    </GenericInfoPageWhite>
  )
}
