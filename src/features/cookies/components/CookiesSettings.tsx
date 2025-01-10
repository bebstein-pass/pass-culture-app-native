import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { v4 as uuidv4 } from 'uuid'

import { CookiesAccordion } from 'features/cookies/components/CookiesAccordion'
import { cookiesInfo } from 'features/cookies/components/cookiesInfo'
import { CookieCategoriesEnum } from 'features/cookies/enums'
import { useCookies } from 'features/cookies/helpers/useCookies'
import { useCookiesChoiceByCategory } from 'features/cookies/helpers/useCookiesChoiceByCategory'
import { CookiesChoiceSettings } from 'features/cookies/types'
import FilterSwitch from 'ui/components/FilterSwitch'
import { InputLabel } from 'ui/components/InputLabel/InputLabel'
import { styledInputLabel } from 'ui/components/InputLabel/styledInputLabel'
import { Spacer, TypoDS } from 'ui/theme'
import { getHeadingAttrs } from 'ui/theme/typographyAttrs/getHeadingAttrs'

const checkboxID = uuidv4()
const labelID = uuidv4()

export const CookiesSettings = ({
  settingsCookiesChoice,
  setSettingsCookiesChoice,
}: CookiesChoiceSettings) => {
  const { cookiesConsent } = useCookies()
  const cookiesChoiceByCategory = useCookiesChoiceByCategory(cookiesConsent)

  useFocusEffect(
    useCallback(() => {
      setSettingsCookiesChoice({
        customization: cookiesChoiceByCategory.customization,
        performance: cookiesChoiceByCategory.performance,
        marketing: cookiesChoiceByCategory.marketing,
      })
    }, [
      setSettingsCookiesChoice,
      cookiesChoiceByCategory.customization,
      cookiesChoiceByCategory.marketing,
      cookiesChoiceByCategory.performance,
    ])
  )

  const hasAcceptedAll = Object.values(settingsCookiesChoice).every((choice) => choice === true)

  const toggleAll = () => {
    setSettingsCookiesChoice({
      customization: !hasAcceptedAll,
      performance: !hasAcceptedAll,
      marketing: !hasAcceptedAll,
    })
  }

  const inputLabel = 'Tout accepter'

  return (
    <React.Fragment>
      <TypoDS.Title4 {...getHeadingAttrs(2)}>
        À quoi servent tes cookies et tes données&nbsp;?
      </TypoDS.Title4>
      <Spacer.Column numberOfSpaces={6} />
      <ChoiceContainer>
        <CaptionNeutralInfo>Je choisis mes cookies</CaptionNeutralInfo>
        <AcceptAllContainer>
          <StyledInputLabel id={labelID} htmlFor={checkboxID}>
            {inputLabel}
          </StyledInputLabel>
          <Spacer.Row numberOfSpaces={2} />
          <FilterSwitch
            active={hasAcceptedAll}
            accessibilityLabelledBy={labelID}
            checkboxID={checkboxID}
            toggle={toggleAll}
            testID={inputLabel}
          />
        </AcceptAllContainer>
      </ChoiceContainer>
      <Spacer.Row numberOfSpaces={4} />
      {Object.keys(cookiesInfo).map((cookie) => (
        <CookiesAccordion
          key={cookie}
          cookie={cookie as CookieCategoriesEnum}
          settingsCookiesChoice={settingsCookiesChoice}
          setSettingsCookiesChoice={setSettingsCookiesChoice}
        />
      ))}
    </React.Fragment>
  )
}

const ChoiceContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const CaptionNeutralInfo = styled(TypoDS.BodyAccentXs)(({ theme }) => ({
  color: theme.colors.greyDark,
  flexShrink: 1,
}))

const AcceptAllContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
})

const StyledInputLabel = styledInputLabel(InputLabel)(({ theme }) => ({
  ...theme.designSystem.typography.bodyAccentXs,
  color: theme.colors.greyDark,
}))
