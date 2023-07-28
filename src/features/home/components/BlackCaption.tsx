import React from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { Typo, getSpacing } from 'ui/theme'

// no need to provide inline style property if BlackCaption is used as a styled component
// const StyledBlackCaption = styled(BlackCaption)({ // add style here })
export const BlackCaption = ({ label, style }: { label: string; style?: ViewStyle }) => {
  return (
    <BlackCaptionContainer style={style}>
      <BlackCaptionLabel>{label}</BlackCaptionLabel>
    </BlackCaptionContainer>
  )
}

const BlackCaptionContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.black,
  borderRadius: getSpacing(1),
  padding: getSpacing(1),
}))

const BlackCaptionLabel = styled(Typo.Caption)(({ theme }) => ({
  color: theme.colors.white,
}))
