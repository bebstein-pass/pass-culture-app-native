import * as React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from './types'

const BulbSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  accessibilityLabel,
  testID,
}) => (
  <AccessibleSvg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    accessibilityLabel={accessibilityLabel}
    testID={testID}>
    <Path
      fill={color}
      clipRule="evenodd"
      fillRule="evenodd"
      d="M7.17558 4.11023C8.41155 2.75882 10.2359 1.93265 12.2522 2.00692C15.6989 2.13691 18.5069 5.01476 18.4737 8.38686C18.4595 9.77611 17.989 11.0563 17.1962 12.0906L17.1954 12.0916C16.1594 13.4499 15.56 15.0922 15.56 16.8061V16.8512C15.56 17.2174 15.2649 17.4977 14.9085 17.4977H9.09122C8.7333 17.4977 8.43973 17.2109 8.43973 16.8613V16.8061C8.43973 15.1052 7.85756 13.4619 6.81348 12.1053C6.00539 11.051 5.52597 9.7475 5.52597 8.32674C5.52597 8.04996 5.2963 7.82559 5.01298 7.82559C4.72967 7.82559 4.5 8.04996 4.5 8.32674C4.5 9.97281 5.05669 11.4856 5.99257 12.7065L5.99317 12.7073C6.90851 13.8964 7.41375 15.3299 7.41375 16.8061V16.8613C7.41375 17.7645 8.16667 18.5 9.09122 18.5H14.9085C15.8345 18.5 16.5859 17.768 16.5859 16.8512V16.8061C16.5859 15.3229 17.1047 13.8883 18.0178 12.6909C18.938 11.4902 19.4831 10.0043 19.4997 8.39691L19.4997 8.39671C19.5382 4.48231 16.2932 1.15614 12.2915 1.00536L12.2911 1.00535C9.95729 0.919314 7.84202 1.87721 6.4105 3.44243C6.22174 3.64883 6.23999 3.96563 6.45126 4.15004C6.66253 4.33445 6.98682 4.31662 7.17558 4.11023ZM9.11674 19.75C8.77612 19.75 8.5 19.9739 8.5 20.25C8.5 20.5261 8.77612 20.75 9.11674 20.75H14.8833C15.2239 20.75 15.5 20.5261 15.5 20.25C15.5 19.9739 15.2239 19.75 14.8833 19.75H9.11674ZM9 22.5C9 22.2239 9.29585 22 9.66079 22H14.3392C14.7042 22 15 22.2239 15 22.5C15 22.7761 14.7042 23 14.3392 23H9.66079C9.29585 23 9 22.7761 9 22.5ZM11.9999 3.5C11.7166 3.5 11.4869 3.72386 11.4869 4C11.4869 4.27614 11.7166 4.5 11.9999 4.5C14.2661 4.5 16.1038 6.29114 16.1038 8.5C16.1038 8.77614 16.3335 9 16.6168 9C16.9001 9 17.1298 8.77614 17.1298 8.5C17.1298 5.73886 14.8328 3.5 11.9999 3.5Z"
    />
  </AccessibleSvg>
)

export const Bulb = styled(BulbSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.smaller,
}))``
