import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from './types'

const MagnifyingGlassFilledSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  accessibilityLabel,
  testID,
}) => (
  <AccessibleSvg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    accessibilityLabel={accessibilityLabel}
    fill="none"
    testID={testID}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44ZM22 16.5C18.9624 16.5 16.5 18.9624 16.5 22C16.5 25.0376 18.9624 27.5 22 27.5C25.0376 27.5 27.5 25.0376 27.5 22C27.5 18.9624 25.0376 16.5 22 16.5ZM13.5 22C13.5 17.3056 17.3056 13.5 22 13.5C26.6944 13.5 30.5 17.3056 30.5 22C30.5 23.8054 29.9371 25.4794 28.9773 26.856L33.5607 31.4393C34.1464 32.0251 34.1464 32.9749 33.5607 33.5607C32.9749 34.1464 32.0251 34.1464 31.4393 33.5607L26.856 28.9773C25.4794 29.9371 23.8054 30.5 22 30.5C17.3056 30.5 13.5 26.6944 13.5 22Z"
      fill={color}
    />
  </AccessibleSvg>
)

export const MagnifyingGlassFilled = styled(MagnifyingGlassFilledSvg).attrs(
  ({ color, size, theme }) => ({
    color: color ?? theme.designSystem.color.icon.default,
    size: size ?? theme.icons.sizes.standard,
  })
)``
