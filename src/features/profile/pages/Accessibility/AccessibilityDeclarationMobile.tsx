import React from 'react'
import styled from 'styled-components/native'

import { contactSupport } from 'features/auth/helpers/contactSupport'
import { env } from 'libs/environment'
import { ButtonInsideText } from 'ui/components/buttons/buttonInsideText/ButtonInsideText'
import { Separator } from 'ui/components/Separator'
import { ExternalTouchableLink } from 'ui/components/touchableLink/ExternalTouchableLink'
import { ViewGap } from 'ui/components/ViewGap/ViewGap'
import { SecondaryPageWithBlurHeader } from 'ui/pages/SecondaryPageWithBlurHeader'
import { EmailFilled } from 'ui/svg/icons/EmailFilled'
import { ExternalSiteFilled } from 'ui/svg/icons/ExternalSiteFilled'
import { getSpacing, Spacer, TypoDS } from 'ui/theme'
import { DOUBLE_LINE_BREAK, SPACE } from 'ui/theme/constants'
import { getHeadingAttrs } from 'ui/theme/typographyAttrs/getHeadingAttrs'

const ANDROID_STORE_LINK = {
  url: `https://play.google.com/store/apps/details?id=${env.ANDROID_APP_ID}`,
}
const IOS_STORE_LINK = {
  url: `https://apps.apple.com/fr/app/pass-culture/id${env.IOS_APP_STORE_ID}`,
}
const rightsDefenderUrl = { url: 'https://formulaire.defenseurdesdroits.fr/' }
const rightsDelegateUrl = { url: 'https://www.defenseurdesdroits.fr/saisir/delegues' }

export function AccessibilityDeclarationMobile() {
  return (
    <SecondaryPageWithBlurHeader title="Déclaration d’accessibilité mobile" enableMaxWidth={false}>
      <ViewGap gap={6}>
        <TypoDS.BodyItalic>Cette déclaration a été établie le 30 janvier 2025.</TypoDS.BodyItalic>
        <TypoDS.Body>
          Le pass Culture s’engage à rendre ses applications iOS et Android accessibles conformément
          aux exigences du Référentiel d’Amélioration de l’Accessibilité des Médias (RAAM) et de la
          norme européenne EN 301 549, en application de la directive (UE) 2016/2102 sur
          l’accessibilité des sites web et des applications mobiles des organismes du secteur
          public.
        </TypoDS.Body>
        <TypoDS.Body>
          Cette déclaration d’accessibilité s’applique à{SPACE}
          <ExternalTouchableLink
            as={ButtonInsideText}
            wording="l’application iOS"
            icon={ExternalSiteFilled}
            externalNav={IOS_STORE_LINK}
          />
          {SPACE}et à{SPACE}
          <ExternalTouchableLink
            as={ButtonInsideText}
            wording="l’application Android"
            icon={ExternalSiteFilled}
            externalNav={ANDROID_STORE_LINK}
          />
          {SPACE}du pass Culture.
        </TypoDS.Body>
      </ViewGap>

      <StyledSeparator />

      <ViewGap gap={6}>
        <TitleText>État de conformité</TitleText>
        <TypoDS.Body>
          Les applications iOS et Android pass Culture sont non conformes avec la norme européenne
          EN 301 549 et le référentiel RAAM.
        </TypoDS.Body>
        <TypoDS.Body>
          Un audit d’accessibilité sera réalisé prochainement afin d’identifier et de corriger les
          éventuels obstacles à l’accessibilité numérique.
        </TypoDS.Body>
      </ViewGap>

      <StyledSeparator />

      <TitleText>
        Retour d’information et contact
        {DOUBLE_LINE_BREAK}
        <TypoDS.Body>
          Si vous n’arrivez pas à accéder à un contenu ou à un service, vous pouvez contacter le
          responsable de l’application pour être orienté vers une alternative accessible ou obtenir
          le contenu sous une autre forme.
        </TypoDS.Body>
      </TitleText>

      <TypoDS.Body>
        Contacter l’équipe support à l’adresse{SPACE}
        <ExternalTouchableLink
          as={ButtonInsideText}
          wording="support@passculture.app"
          accessibilityLabel="Ouvrir le gestionnaire mail pour contacter le support"
          justifyContent="flex-start"
          externalNav={contactSupport.forGenericQuestion}
          icon={EmailFilled}
        />
      </TypoDS.Body>

      <StyledSeparator />

      <ViewGap gap={6}>
        <TitleText>Voie de recours</TitleText>
        <TypoDS.Body>
          Cette procédure est à utiliser dans le cas suivant&nbsp;:
          {DOUBLE_LINE_BREAK}
          Vous avez signalé au responsable du site internet un défaut d’accessibilité qui vous
          empêche d’accéder à un contenu ou à un des services du portail et vous n’avez pas obtenu
          de réponse satisfaisante.
        </TypoDS.Body>
        <ViewGap gap={3}>
          <TypoDS.Body>
            Écrire un message au{SPACE}
            <ExternalTouchableLink
              as={ButtonInsideText}
              wording="Défenseur des droits"
              icon={ExternalSiteFilled}
              externalNav={rightsDefenderUrl}
            />
          </TypoDS.Body>
          <TypoDS.Body>
            Contacter le délégué du{SPACE}
            <ExternalTouchableLink
              as={ButtonInsideText}
              wording="Défenseur des droits dans votre région"
              icon={ExternalSiteFilled}
              externalNav={rightsDelegateUrl}
            />
          </TypoDS.Body>
          <TypoDS.Body>
            Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) Défenseur des droits
            Libre réponse 71120 75342 Paris CEDEX 07
          </TypoDS.Body>
        </ViewGap>
      </ViewGap>
      <Spacer.BottomScreen />
    </SecondaryPageWithBlurHeader>
  )
}

const TitleText = styled(TypoDS.Title4).attrs(getHeadingAttrs(2))``

const StyledSeparator = styled(Separator.Horizontal)({
  marginVertical: getSpacing(6),
})
