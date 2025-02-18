import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleIcon } from 'ui/svg/icons/types'
const EmailSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  testID,
  accessibilityLabel,
}) => (
  <AccessibleSvg
    width={size}
    height={size}
    viewBox="0 0 48 49"
    testID={testID}
    accessibilityLabel={accessibilityLabel}>
    <Path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.99988 8.28503C5.39813 8.28503 3.99988 9.67964 3.99988 11.535V37.035C3.99988 37.174 4.00772 37.3104 4.02292 37.4439L16.3539 24.3812L6.45069 16.3622C6.02148 16.0147 5.95527 15.385 6.30282 14.9558C6.65037 14.5266 7.28007 14.4604 7.70928 14.8079L21.4814 25.9596C22.9437 27.1502 25.0463 27.1502 26.5086 25.9596L26.511 25.9577L43.9999 11.8079V11.535C43.9999 9.67964 42.6016 8.28503 40.9999 8.28503H36.8399C36.2876 8.28503 35.8399 7.83732 35.8399 7.28503C35.8399 6.73275 36.2876 6.28503 36.8399 6.28503H40.9999C43.8181 6.28503 45.9999 8.69043 45.9999 11.535V12.2674C46.0001 12.2788 46.0001 12.2902 45.9999 12.3015V37.035C45.9999 39.8796 43.8181 42.285 40.9999 42.285H6.99988C4.18162 42.285 1.99988 39.8796 1.99988 37.035V11.535C1.99988 8.69043 4.18162 6.28503 6.99988 6.28503H28.7799C29.3322 6.28503 29.7799 6.73275 29.7799 7.28503C29.7799 7.83732 29.3322 8.28503 28.7799 8.28503H6.99988ZM17.9128 25.6434L4.93415 39.3921C5.48055 39.9509 6.21584 40.285 6.99988 40.285H40.9999C41.7839 40.285 42.5192 39.9509 43.0656 39.3921L37.7525 33.7614C37.3735 33.3597 37.3919 32.7268 37.7936 32.3478C38.1953 31.9687 38.8282 31.9871 39.2072 32.3888L43.9769 37.4436C43.992 37.3103 43.9999 37.1739 43.9999 37.035V14.3805L31.6426 24.3784L36.5672 29.5988C36.9462 30.0006 36.9277 30.6335 36.526 31.0125C36.1243 31.3914 35.4914 31.373 35.1124 30.9712L30.0833 25.64L27.7714 27.5105L27.7703 27.5114C25.573 29.2996 22.417 29.2996 20.2197 27.5114L20.2186 27.5105L17.9128 25.6434Z"
    />
  </AccessibleSvg>
)

export const Email = styled(EmailSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
