import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from './types'

const PlayV2Svg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  accessibilityLabel,
  testID = 'PlayV2',
}) => (
  <AccessibleSvg
    width={size}
    height={size}
    viewBox="0 0 33 33"
    testID={testID}
    fill="none"
    accessibilityLabel={accessibilityLabel}>
    <Path
      d="M7.92591 30.4341C7.87258 30.4341 7.81925 30.4341 7.75924 30.4274C7.01924 30.3608 6.33924 29.9807 5.89924 29.3874C5.39258 28.7008 5.39258 27.7274 5.39258 25.7808V7.08742C5.39258 5.14742 5.39258 4.16742 5.89924 3.48075C6.33924 2.88075 7.01924 2.50075 7.75924 2.43408C8.61258 2.35408 9.43924 2.86742 11.0992 3.88075L26.6059 13.3541C28.0859 14.2607 28.8326 14.7141 29.1592 15.4474C29.4459 16.0874 29.4592 16.8208 29.2059 17.4674C28.9059 18.2141 28.1859 18.7008 26.7459 19.6674L20.5326 23.8407C20.2259 24.0474 19.8126 23.9608 19.6059 23.6608C19.3992 23.3541 19.4792 22.9408 19.7859 22.7341L25.9926 18.5608C27.1326 17.7941 27.8126 17.3341 27.9592 16.9741C28.0859 16.6608 28.0792 16.3008 27.9392 15.9941C27.7792 15.6408 27.0726 15.2074 25.9059 14.4941L10.4059 5.02742C9.08591 4.22075 8.29925 3.72742 7.87258 3.77408C7.51258 3.80742 7.17924 3.99408 6.96591 4.28075C6.71924 4.61408 6.71924 5.54742 6.71924 7.09408V25.7874C6.71924 27.3341 6.71924 28.2674 6.96591 28.6007C7.17924 28.8941 7.51258 29.0741 7.87258 29.1074C8.29925 29.1474 9.08591 28.6607 10.3992 27.8541L16.0726 24.3874C16.3859 24.1941 16.7992 24.2941 16.9926 24.6074C17.1859 24.9207 17.0859 25.3341 16.7726 25.5274L11.0992 28.9874C9.54591 29.9341 8.71924 30.4407 7.91924 30.4407L7.92591 30.4341Z"
      fill={color}
    />
  </AccessibleSvg>
)

export const PlayV2 = styled(PlayV2Svg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
