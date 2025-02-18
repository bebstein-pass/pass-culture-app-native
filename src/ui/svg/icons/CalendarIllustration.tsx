import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleIcon } from 'ui/svg/icons/types'

const CalendarIllustrationSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  accessibilityLabel,
  testID,
}) => {
  const height = typeof size === 'string' ? size : ((size as number) * 156) / 200
  return (
    <AccessibleSvg
      width={size}
      height={height}
      viewBox="0 0 200 156"
      accessibilityLabel={accessibilityLabel}
      testID={testID}>
      <Path
        fill={color}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M123.903 27.3333C120.953 27.3333 118.577 29.7128 118.577 32.6667V34.7999C118.612 34.9722 118.63 35.1506 118.63 35.3333C118.63 35.516 118.612 35.6944 118.577 35.8668V38C118.577 40.9539 120.953 43.3333 123.903 43.3333C125.374 43.3333 126.567 44.5272 126.567 46C126.567 47.4728 125.374 48.6667 123.903 48.6667C118.011 48.6667 113.25 43.8994 113.25 38H84.0067H79.3192C77.8483 38 76.6559 36.8061 76.6559 35.3333C76.6559 33.8606 77.8483 32.6667 79.3192 32.6667L81.3434 32.6667C81.3434 29.7128 78.9669 27.3333 76.0167 27.3333C73.0665 27.3333 70.69 29.7128 70.69 32.6667V38C70.69 40.9539 73.0665 43.3333 76.0167 43.3333C77.4876 43.3333 78.68 44.5272 78.68 46C78.68 47.4728 77.4876 48.6667 76.0167 48.6667C70.1246 48.6667 65.3633 43.8994 65.3633 38H57.32C54.3698 38 51.9933 40.3794 51.9933 43.3333V54H134.61C136.081 54 137.274 55.1939 137.274 56.6667C137.274 58.1394 136.081 59.3333 134.61 59.3333H51.9933V112.667C51.9933 120.021 57.9653 126 65.31 126H134.557C141.987 126 147.985 119.89 147.874 112.44L147.874 112.395L148.007 43.3572C147.94 40.3903 145.503 38 142.547 38H131.947H131.893H127.259C125.788 38 124.596 36.8061 124.596 35.3333C124.596 33.8606 125.788 32.6667 127.259 32.6667L129.23 32.6667C129.23 29.7128 126.854 27.3333 123.903 27.3333ZM86.67 32.6667H113.25C113.25 26.7672 118.011 22 123.903 22C129.796 22 134.557 26.7672 134.557 32.6667H142.547C148.425 32.6667 153.227 37.4099 153.333 43.2851L153.333 43.3385L153.2 112.384C153.343 122.789 144.963 131.333 134.557 131.333H65.31C55.0235 131.333 46.6667 122.966 46.6667 112.667V43.3333C46.6667 37.4339 51.428 32.6667 57.32 32.6667H65.3633C65.3633 26.7672 70.1246 22 76.0167 22C81.9088 22 86.67 26.7672 86.67 32.6667Z"
      />
    </AccessibleSvg>
  )
}

export const CalendarIllustration = styled(CalendarIllustrationSvg).attrs(
  ({ color, size, theme }) => ({
    color: color ?? theme.colors.black,
    size: size ?? theme.illustrations.sizes.medium,
  })
)``
