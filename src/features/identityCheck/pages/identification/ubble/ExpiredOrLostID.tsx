import React, { useEffect } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import { env } from 'libs/environment/env'
import { BatchEvent, BatchProfile } from 'libs/react-native-batch'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ExternalTouchableLink } from 'ui/components/touchableLink/ExternalTouchableLink'
import { GenericInfoPageWhiteLegacy } from 'ui/pages/GenericInfoPageWhiteLegacy'
import { BicolorIdCardError } from 'ui/svg/icons/BicolorIdCardError'
import { ExternalSiteFilled } from 'ui/svg/icons/ExternalSiteFilled'
import { getSpacing, Spacer, TypoDS } from 'ui/theme'

export const ExpiredOrLostID = (): React.JSX.Element => {
  useEffect(() => {
    BatchProfile.trackEvent(BatchEvent.screenViewExpiredOrLostId)
  }, [])

  return (
    <GenericInfoPageWhiteLegacy
      icon={StyledBicolorIdCardError}
      titleComponent={TypoDS.Title2}
      title="Ta pièce d’identité expirée ou perdue"
      separateIconFromTitle={false}
      headerGoBack
      mobileBottomFlex={0.5}>
      <StyledBody>
        Pour profiter du pass Culture tu as besoin de ta carte d’identité ou de ton passeport en
        cours de validité.
      </StyledBody>
      <Spacer.Column numberOfSpaces={1} />
      <StyledBody>
        Si ta pièce d’identité est expirée, elle sera refusée pour débloquer ton crédit.
      </StyledBody>
      <Spacer.Column numberOfSpaces={1} />
      <StyledBody>
        Tu peux tout de même déposer un dossier en passant par demarches-simplifiees.fr
      </StyledBody>
      <Spacer.Flex flex={1} />
      <View>
        <ExternalTouchableLink
          as={ButtonPrimary}
          wording="Aller sur demarches-simplifiees.fr"
          externalNav={{ url: env.DMS_FRENCH_CITIZEN_URL }}
          icon={ExternalSiteFilled}
        />
      </View>
    </GenericInfoPageWhiteLegacy>
  )
}

const StyledBicolorIdCardError = styled(BicolorIdCardError).attrs(({ theme }) => ({
  size: theme.illustrations.sizes.fullPage,
  color: theme.colors.secondary,
  color2: theme.colors.primary,
}))``

const StyledBody = styled(TypoDS.Body)({
  textAlign: 'center',
  marginBottom: getSpacing(5),
})
