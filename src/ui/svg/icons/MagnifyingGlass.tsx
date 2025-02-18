import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from './types'

const MagnifyingGlassSvg: React.FunctionComponent<AccessibleIcon> = ({
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
    testID={testID}>
    <Path
      fill={color}
      d="M20.3001 6.52563C12.9242 6.52563 6.94116 12.5087 6.94116 19.8846C6.94116 27.2605 12.9242 33.2436 20.3001 33.2436C27.6761 33.2436 33.6591 27.2605 33.6591 19.8846C33.6591 18.0217 33.277 16.2369 32.5904 14.6253C32.3739 14.1172 32.6104 13.5298 33.1184 13.3133C33.6265 13.0969 34.2139 13.3333 34.4304 13.8414C35.2207 15.6964 35.6591 17.7475 35.6591 19.8846C35.6591 28.3651 28.7806 35.2436 20.3001 35.2436C11.8196 35.2436 4.94116 28.3651 4.94116 19.8846C4.94116 11.4041 11.8196 4.52563 20.3001 4.52563C24.2156 4.52563 27.7828 5.98571 30.5022 8.39807C30.9154 8.76458 30.9532 9.39661 30.5867 9.80976C30.2202 10.2229 29.5881 10.2607 29.175 9.89422C26.8072 7.79377 23.7077 6.52563 20.3001 6.52563ZM32.9264 32.5108C33.317 32.1203 33.9501 32.1203 34.3407 32.5108L44.5971 42.7673C44.9876 43.1578 44.9876 43.791 44.5971 44.1815C44.2065 44.572 43.5734 44.572 43.1828 44.1815L32.9264 33.9251C32.5359 33.5345 32.5359 32.9014 32.9264 32.5108ZM12.6333 15.3441C12.9116 14.8671 12.7504 14.2547 12.2734 13.9764C11.7964 13.6981 11.184 13.8592 10.9057 14.3363C9.61883 16.5422 7.71299 21.9606 12.1967 27.1741C12.5569 27.5929 13.1882 27.6404 13.607 27.2803C14.0257 26.9201 14.0732 26.2888 13.7131 25.87C10.0252 21.5819 11.5559 17.1908 12.6333 15.3441Z"
    />
  </AccessibleSvg>
)

export const MagnifyingGlass = styled(MagnifyingGlassSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
