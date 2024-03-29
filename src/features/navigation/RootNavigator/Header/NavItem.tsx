import React from 'react'
import styled from 'styled-components/native'

import { menu } from 'features/navigation/TabBar/menu'
import { TabRouteName } from 'features/navigation/TabBar/types'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { InternalNavigationProps } from 'ui/components/touchableLink/types'
import { BicolorLogo } from 'ui/svg/icons/BicolorLogo'
import { AccessibleBicolorIcon } from 'ui/svg/icons/types'
import { getSpacing, Typo } from 'ui/theme'

interface NavItemInterface {
  isSelected?: boolean
  BicolorIcon: React.FC<AccessibleBicolorIcon>
  navigateTo: InternalNavigationProps['navigateTo']
  tabName: TabRouteName
  onBeforeNavigate?: () => void
}

export const NavItem: React.FC<NavItemInterface> = ({
  BicolorIcon,
  navigateTo,
  tabName,
  isSelected,
  onBeforeNavigate,
}) => (
  <StyledTouchableLink
    isSelected={isSelected}
    navigateTo={navigateTo}
    activeOpacity={1}
    on
    testID={`${tabName} tab`}
    onBeforeNavigate={onBeforeNavigate}
    accessibilityCurrent={isSelected ? 'page' : undefined}>
    <StyledIcon as={BicolorIcon} selected={isSelected} />
    <Title isSelected={isSelected}>{menu[tabName].displayName}</Title>
  </StyledTouchableLink>
)

const StyledIcon = styled(BicolorLogo).attrs<{ selected?: boolean }>(({ theme, selected }) => ({
  color: selected ? undefined : theme.colors.greyDark,
  size: theme.icons.sizes.small,
  thin: !selected,
}))<{ selected?: boolean }>``

const StyledTouchableLink = styled(InternalTouchableLink).attrs<{ isSelected?: boolean }>(
  ({ theme, isSelected }) => ({
    hoverUnderlineColor: isSelected ? theme.uniqueColors.brand : theme.colors.black,
  })
)<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  height: getSpacing(11),
  paddingHorizontal: getSpacing(4),
  borderWidth: 1,
  borderColor: isSelected ? theme.uniqueColors.brand : theme.colors.transparent,
  borderRadius: theme.borderRadius.button * 2,
}))

const Title = styled(Typo.ButtonText)<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  marginLeft: 12,
  color: isSelected ? theme.uniqueColors.brand : theme.colors.black,
}))
