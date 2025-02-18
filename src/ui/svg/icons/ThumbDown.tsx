import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from './types'

const ThumbDownSvg: React.FunctionComponent<AccessibleIcon> = ({
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.123 4.06023L12.397 4.06023C9.50221 4.06023 7.0167 6.1296 6.49764 8.98873L4.10196 22.1547C3.77255 23.9142 4.25169 25.7036 5.38963 27.0732C6.53756 28.4428 8.20455 29.2325 9.99133 29.2325L17.9969 29.2325C16.9987 30.962 15.7609 34.0711 15.7609 38.7796C15.7609 41.5588 18.1965 43.998 20.9715 43.998C23.8463 43.998 26.1821 41.6588 26.1821 38.7796C26.1821 34.281 27.9289 30.0523 31.1032 26.8733L32.2043 25.7706C32.6834 27.1624 34.0031 28.1629 35.5552 28.1629L40.4564 28.1629C42.4129 28.1629 44 26.5733 44 24.6139L44 7.54914C44 5.58974 42.4129 4.00022 40.4564 4.00022L35.5652 4.00022C33.6088 4.00022 32.0216 5.58974 32.0116 7.54914L32.0116 23.1741C31.9551 23.2112 31.9015 23.2546 31.8519 23.3044L29.6957 25.4637C26.1422 29.0226 24.1857 33.7512 24.1857 38.7796C24.1857 40.5491 22.7483 41.9987 20.9715 41.9987C19.1648 41.9987 17.7573 40.2692 17.7573 38.7796C17.7573 32.1787 20.4239 29.1574 20.6118 28.9446C20.618 28.9376 20.6215 28.9336 20.6221 28.9326C20.9116 28.6427 21.0014 28.2129 20.8417 27.843C20.692 27.4631 20.3227 27.2232 19.9234 27.2232L9.99133 27.2232C8.80347 27.2232 7.68549 26.6933 6.92686 25.7836C6.16823 24.8739 5.85879 23.6742 6.06841 22.5046L8.4541 9.33862C8.80347 7.4392 10.4605 6.05962 12.387 6.05962L20.1131 6.05962C22.5487 6.05962 24.9343 6.47949 27.2202 7.29924C27.7393 7.48918 28.3083 7.21927 28.4979 6.69943C28.6876 6.17959 28.4181 5.60976 27.899 5.41981C25.4035 4.52009 22.7882 4.06023 20.123 4.06023ZM42.0036 24.6139C42.0036 25.4637 41.3148 26.1635 40.4564 26.1635L35.5652 26.1635C34.7068 26.1635 34.018 25.4637 34.018 24.6139L34.018 7.54914C34.018 6.6894 34.7068 5.99961 35.5553 5.99961L40.4564 5.99961C41.3149 5.99961 42.0036 6.6894 42.0036 7.54914L42.0036 24.6139Z"
      fill={color}
    />
  </AccessibleSvg>
)

export const ThumbDown = styled(ThumbDownSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
