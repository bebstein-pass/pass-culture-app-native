import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleIcon } from 'ui/svg/icons/types'
const ExternalSiteFilledSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  testID,
  accessibilityLabel,
}) => (
  <AccessibleSvg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    testID={testID}
    accessibilityLabel={accessibilityLabel ?? 'Nouvelle fenêtre'}>
    <Path
      fill={color}
      d="M10.7 5C7.55198 5 5 7.55198 5 10.7V37.3C5 40.448 7.55198 43 10.7 43H37.3C40.448 43 43 40.448 43 37.3V10.7C43 7.55198 40.448 5 37.3 5H10.7ZM23.5017 15.5163C23.5017 14.6792 24.1804 14.0001 25.0181 14.0001H31.5606C32.9073 14.0001 34 15.0932 34 16.4394V22.9821C34 23.8193 33.3213 24.4983 32.4836 24.4983C31.6459 24.4983 30.9672 23.8193 30.9672 22.9821V19.1768L16.5887 33.5558C15.9965 34.148 15.0363 34.148 14.4441 33.5558C13.852 32.9637 13.852 32.0038 14.4441 31.4117L28.8227 17.0326H25.0181C24.1804 17.0326 23.5017 16.3535 23.5017 15.5163ZM15.0367 32.0039L30.0075 17.0326H30.0072L15.0365 32.0038C14.7715 32.2689 14.7715 32.6986 15.0365 32.9636C15.0539 32.981 15.072 32.9973 15.0907 33.0124C15.072 32.9973 15.054 32.9811 15.0367 32.9638C14.7716 32.6987 14.7716 32.269 15.0367 32.0039ZM33.1623 22.9821C33.1623 23.2691 32.9842 23.5145 32.7325 23.6137C32.9841 23.5144 33.1622 23.2691 33.1622 22.9821V16.8715L33.1623 16.8714V22.9821Z"
    />
  </AccessibleSvg>
)

export const ExternalSiteFilled = styled(ExternalSiteFilledSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.designSystem.color.icon.default,
  size: size ?? theme.icons.sizes.smaller,
}))``
