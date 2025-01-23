import React from 'react'
import styled from 'styled-components/native'

import { TypoDS, getSpacing } from 'ui/theme'

export const CookiesConsentExplanations = () => (
  <StyledView>
    <TypoDS.Body>
      Les cookies sont des petits fichiers stockés sur ton appareil lorsque tu navigues. Nous
      utilisons les données collectées par ces cookies et traceurs pour t’offrir la meilleure
      expérience possible.
    </TypoDS.Body>
    <TypoDS.Body>
      Tu peux accéder aux réglages des cookies pour faire un choix éclairé et découvrir notre
      politique de gestion des cookies.
    </TypoDS.Body>
    <CaptionNeutralInfo>
      Ton choix est conservé pendant 6 mois et tu pourras le modifier dans les paramètres de
      confidentialité de ton profil à tout moment.
    </CaptionNeutralInfo>
  </StyledView>
)

const CaptionNeutralInfo = styled(TypoDS.BodyAccentXs)(({ theme }) => ({
  color: theme.colors.greyDark,
}))

const StyledView = styled.View({
  gap: getSpacing(4),
  paddingBottom: getSpacing(4),
})
