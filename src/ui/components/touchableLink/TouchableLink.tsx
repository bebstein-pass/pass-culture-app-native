import { debounce } from 'lodash'
import React, { createRef, ElementType, useCallback, useEffect } from 'react'
import { NativeSyntheticEvent, Platform, TargetedEvent } from 'react-native'
import styled from 'styled-components/native'

import { accessibilityAndTestId } from 'libs/accessibilityAndTestId'
import { useHandleFocus } from 'libs/hooks/useHandleFocus'
import { useHandleHover } from 'libs/hooks/useHandleHover'
import { handleNavigationWrapper } from 'ui/components/touchableLink/handleNavigationWrapper'
import { TouchableLinkProps } from 'ui/components/touchableLink/types'
import { TouchableOpacity } from 'ui/components/TouchableOpacity'
// eslint-disable-next-line no-restricted-imports
import { ColorsEnum } from 'ui/theme/colors'
import { touchableFocusOutline } from 'ui/theme/customFocusOutline/touchableFocusOutline'
import { getHoverStyle } from 'ui/theme/getHoverStyle/getHoverStyle'

const PRESS_DEBOUNCE_WAIT = 300

export function TouchableLink({
  onBeforeNavigate,
  onAfterNavigate,
  handleNavigation,
  linkProps,
  children,
  highlight = false,
  disabled,
  onFocus,
  onBlur,
  as: Tag,
  hoverUnderlineColor,
  accessibilityLabel,
  testID,
  pressCooldownDelay = PRESS_DEBOUNCE_WAIT,
  ...rest
}: TouchableLinkProps) {
  const TouchableComponent = (
    highlight ? StyledTouchableHighlight : StyledTouchableOpacity
  ) as ElementType
  const TouchableLinkComponent = Tag || TouchableComponent
  const linkRef = createRef<HTMLAnchorElement>()
  const { onFocus: onFocusDefault, onBlur: onBlurDefault, isFocus } = useHandleFocus()
  const { onMouseEnter, onMouseLeave, isHover } = useHandleHover()

  const touchableOpacityProps =
    Platform.OS === 'web' && !disabled
      ? { ...linkProps, accessibilityRole: undefined }
      : { accessibilityRole: 'link' }

  const onLinkFocus = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      onFocusDefault()
      onFocus?.(e)
    },
    [onFocus, onFocusDefault]
  )

  const onLinkBlur = useCallback(
    (e: NativeSyntheticEvent<TargetedEvent>) => {
      onBlurDefault()
      onBlur?.(e)
    },
    [onBlur, onBlurDefault]
  )

  // useEffect ci-dessous pour le hack en VanillaJS
  useEffect(() => {
    // @ts-ignore en vanilla JS, le mouse click est un MouseEvent, pour rester consistant avec la fonction ci-dessous, nous ignorons ici et conservons le typing react
    linkRef.current?.addEventListener('click', preventDefault, true)

    return () => {
      // @ts-ignore en vanilla JS, le mouse click est un MouseEvent, pour rester consistant avec la fonction ci-dessous, nous ignorons ici et conservons le typing react
      // eslint-disable-next-line react-hooks/exhaustive-deps
      linkRef.current?.removeEventListener('click', preventDefault)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClick = disabled
    ? undefined
    : handleNavigationWrapper({ onBeforeNavigate, onAfterNavigate, handleNavigation })

  const debouncedPress =
    onClick && pressCooldownDelay
      ? debounce(onClick, pressCooldownDelay, { leading: true, trailing: false })
      : onClick

  return (
    <TouchableLinkComponent
      {...touchableOpacityProps}
      {...rest}
      disabled={disabled}
      isFocus={isFocus}
      isHover={isHover}
      hoverUnderlineColor={hoverUnderlineColor}
      onFocus={onLinkFocus}
      onBlur={onLinkBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPress={debouncedPress}
      {...accessibilityAndTestId(accessibilityLabel, testID)}>
      {children}
    </TouchableLinkComponent>
  )
}

const StyledTouchableOpacity = styled(TouchableOpacity)<{
  isFocus?: boolean
  isHover?: boolean
  hoverUnderlineColor?: ColorsEnum
}>(({ theme, isFocus, isHover, hoverUnderlineColor }) => ({
  ...touchableFocusOutline(theme, isFocus),
  ...getHoverStyle(hoverUnderlineColor ?? theme.colors.black, isHover),
}))

const StyledTouchableHighlight = styled.TouchableHighlight<{
  isFocus?: boolean
  isHover?: boolean
  hoverUnderlineColor?: ColorsEnum
}>(({ theme, isFocus, isHover, hoverUnderlineColor }) => ({
  textDecoration: 'none',
  ...touchableFocusOutline(theme, isFocus),
  ...getHoverStyle(hoverUnderlineColor ?? theme.colors.black, isHover),
}))
