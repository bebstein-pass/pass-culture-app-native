import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'

import { ChronicleCardList } from 'features/chronicle/components/ChronicleCardList/ChronicleCardList'
import { CHRONICLE_CARD_WIDTH } from 'features/chronicle/constant'
import { ButtonSecondaryBlack } from 'ui/components/buttons/ButtonSecondaryBlack'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { TypoDS } from 'ui/theme'
import { getHeadingAttrs } from 'ui/theme/typographyAttrs/getHeadingAttrs'

import { ChronicleSectionProps } from './types'

export const ChronicleSectionBase = ({
  data,
  title,
  subtitle,
  ctaLabel,
  navigateTo,
  onSeeMoreButtonPress,
  style,
}: ChronicleSectionProps) => {
  return (
    <View style={style}>
      <Gutter>
        <TypoDS.Title3 {...getHeadingAttrs(3)}>{title}</TypoDS.Title3>
        {subtitle ? <StyledSubtitle>{subtitle}</StyledSubtitle> : null}
      </Gutter>
      <StyledChronicleCardlist data={data} onSeeMoreButtonPress={onSeeMoreButtonPress} />
      <Gutter>
        <InternalTouchableLink
          as={ButtonSecondaryBlack}
          wording={ctaLabel}
          navigateTo={navigateTo}
          // If i use styled-component in that case (i.e using "as" prop), i have an error in web :'(
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ alignSelf: 'center' }}
        />
      </Gutter>
    </View>
  )
}

const StyledChronicleCardlist = styled(ChronicleCardList).attrs(({ theme }) => ({
  contentContainerStyle: {
    paddingHorizontal: theme.contentPage.marginHorizontal,
    paddingVertical: theme.contentPage.marginHorizontal,
  },
  cardWidth: CHRONICLE_CARD_WIDTH,
  snapToInterval: CHRONICLE_CARD_WIDTH,
}))``

const Gutter = styled.View(({ theme }) => ({
  paddingHorizontal: theme.contentPage.marginHorizontal,
}))

const StyledSubtitle = styled(TypoDS.BodyAccentXs)(({ theme }) => ({
  color: theme.colors.greyDark,
}))
