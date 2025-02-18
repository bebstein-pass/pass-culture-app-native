import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleIcon } from 'ui/svg/icons/types'

const MapSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  accessibilityLabel,
  testID,
}) => (
  <AccessibleSvg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    accessibilityLabel={accessibilityLabel}
    testID={testID}>
    <Path
      d="M4.99638 14.4459L1.48869 15.9705C1.25701 16.0711 1 15.9021 1 15.6504V6.96684C1 6.83021 1.08326 6.70436 1.20995 6.64683L5 5V14.4387L4.99638 14.4459ZM10 5H6V14H10V5ZM14.7681 12.775L11 14V5.16603L14.5362 4.01845C14.7645 3.94442 15 4.10259 15 4.3247V12.4721C15 12.6101 14.9058 12.7346 14.7645 12.7784L14.7681 12.775Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.4236 8.38795C10.1747 8.38795 9.94772 8.25982 9.82325 8.04017C9.65485 7.729 8.23811 5.07124 8.0807 4.6832C8.05507 4.62096 8.02945 4.56605 8.00748 4.51114C7.87935 4.21827 7.76221 3.95835 7.76221 3.42387C7.76221 1.93025 8.93367 0.758789 10.4273 0.758789C11.9209 0.758789 13.0924 1.93025 13.0924 3.42387C13.0924 4.00228 12.9569 4.28783 12.8361 4.54408C12.8141 4.59168 12.7922 4.63927 12.7702 4.69052C12.6421 4.99437 11.1997 7.71802 11.0386 8.02553C10.9069 8.25616 10.6799 8.38429 10.4309 8.38429L10.4236 8.38795ZM10.4236 2.80519C10.0832 2.80519 9.80495 3.08341 9.80495 3.42387C9.80495 3.76433 10.0832 4.04255 10.4236 4.04255C10.7641 4.04255 11.0423 3.76433 11.0423 3.42387C11.0423 3.08341 10.7641 2.80519 10.4236 2.80519Z"
      fill={color}
    />
    <Path
      d="M10.4237 1.12865C11.6941 1.12865 12.7227 2.13538 12.7227 3.42765C12.7227 3.92186 12.6129 4.15615 12.5031 4.39045C12.4775 4.4417 12.4555 4.49295 12.4299 4.54786C12.3017 4.84805 10.7093 7.85725 10.7093 7.85725C10.6471 7.96707 10.5372 8.02199 10.4237 8.02199C10.3103 8.02199 10.2041 7.96707 10.1382 7.85725C10.1382 7.85725 8.57136 4.92859 8.41761 4.54786C8.38832 4.47465 8.35904 4.41241 8.33341 4.35018C8.21626 4.09026 8.12474 3.88525 8.12474 3.42765C8.12474 2.13172 9.15344 1.12865 10.4237 1.12865ZM10.4237 4.41241C10.9692 4.41241 11.4085 3.97311 11.4085 3.42765C11.4085 2.88219 10.9692 2.44289 10.4237 2.44289C9.87828 2.44289 9.43898 2.88219 9.43898 3.42765C9.43898 3.97311 9.87828 4.41241 10.4237 4.41241ZM10.4237 0.396484C8.72512 0.396484 7.39258 1.72903 7.39258 3.42765C7.39258 4.03901 7.53169 4.35018 7.66348 4.6467C7.68911 4.70162 7.71473 4.76019 7.74036 4.82609C7.90143 5.22145 9.22665 7.71082 9.49389 8.20503L9.50121 8.21601L9.50854 8.22699C9.6989 8.55281 10.0503 8.75781 10.4274 8.75781C10.8045 8.75781 11.1559 8.55647 11.3463 8.22699L11.3536 8.21601L11.3609 8.20503C11.6282 7.69617 12.9753 5.1519 13.1071 4.84073C13.1254 4.7968 13.1474 4.75287 13.1694 4.70894C13.2938 4.44902 13.4622 4.09392 13.4622 3.43131C13.4622 1.76197 12.1041 0.400145 10.4311 0.400145L10.4237 0.396484ZM10.4237 3.68025C10.2846 3.68025 10.1711 3.56676 10.1711 3.42765C10.1711 3.28854 10.2846 3.17505 10.4237 3.17505C10.5629 3.17505 10.6763 3.28854 10.6763 3.42765C10.6763 3.56676 10.5629 3.68025 10.4237 3.68025Z"
      fill="white"
    />
  </AccessibleSvg>
)

export const Map = styled(MapSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.small,
}))``
