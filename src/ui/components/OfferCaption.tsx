import React from 'react'
import { PixelRatio } from 'react-native'
import styled from 'styled-components/native'

import { GUTTER_DP, TypoDS } from 'ui/theme'

interface OfferCaptionProps {
  imageWidth: number
  price: string
  name?: string
  date?: string
}

export const OfferCaption = (props: OfferCaptionProps) => {
  const { imageWidth, name, date, price } = props
  return (
    <CaptionContainer imageWidth={imageWidth}>
      <TypoDS.BodyAccentXs numberOfLines={2}>{name}</TypoDS.BodyAccentXs>
      {date ? <CaptionNeutralInfo numberOfLines={1}>{date}</CaptionNeutralInfo> : null}
      <CaptionNeutralInfo testID="priceIsDuo">{price}</CaptionNeutralInfo>
    </CaptionContainer>
  )
}

const CaptionContainer = styled.View<{ imageWidth: number }>(({ imageWidth }) => ({
  maxWidth: imageWidth,
  marginTop: PixelRatio.roundToNearestPixel(GUTTER_DP / 2),
}))

const CaptionNeutralInfo = styled(TypoDS.BodyAccentXs)(({ theme }) => ({
  color: theme.colors.greyDark,
}))
