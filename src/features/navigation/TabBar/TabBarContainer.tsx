import React from 'react'
import styled from 'styled-components/native'

import { useNetInfoContext } from 'libs/network/NetInfoWrapper'
import { getShadow, getSpacing } from 'ui/theme'

import { useCustomSafeInsets } from '../../../ui/theme/useCustomSafeInsets'

export const TabBarContainer = ({ children }: { children: React.ReactNode }) => {
  const { bottom } = useCustomSafeInsets()
  const netInfo = useNetInfoContext()
  return (
    <MainContainer>
      <RowContainer>{children}</RowContainer>
      <SafeAreaPlaceholder safeHeight={netInfo.isConnected ? bottom : 0} />
    </MainContainer>
  )
}

const RowContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  paddingHorizontal: getSpacing(4),
})

const SafeAreaPlaceholder = styled.View<{ safeHeight: number }>(({ safeHeight }) => ({
  height: safeHeight,
}))

const MainContainer = styled.View(({ theme }) => ({
  borderTopStyle: 'solid',
  borderTopWidth: getSpacing(1 / 4),
  borderTopColor: theme.colors.greyMedium,
  width: '100%',
  backgroundColor: theme.uniqueColors.tabBar,
  position: 'absolute',
  bottom: 0,
  ...getShadow({
    shadowOffset: { width: 0, height: getSpacing(1 / 4) },
    shadowRadius: getSpacing(1),
    shadowColor: theme.colors.black,
    shadowOpacity: 0.2,
  }),
}))
