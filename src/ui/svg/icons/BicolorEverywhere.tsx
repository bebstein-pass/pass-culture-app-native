import React from 'react'
import { Defs, LinearGradient, Path, Stop } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { svgIdentifier } from 'ui/svg/utils'

import { AccessibleIcon } from './types'

const BicolorEverywhereSvg: React.FunctionComponent<AccessibleIcon> = ({
  size,
  color,
  color2,
  accessibilityLabel,
  testID,
}) => {
  const { id, fill } = svgIdentifier()

  return (
    <AccessibleSvg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      accessibilityLabel={accessibilityLabel}
      testID={testID}>
      <Defs>
        <LinearGradient id={id} x1="28.841%" x2="71.159%" y1="0%" y2="100%">
          <Stop offset="0%" stopColor={color} />
          <Stop offset="100%" stopColor={color2} />
        </LinearGradient>
      </Defs>
      <Path
        fill={fill}
        clipRule="evenodd"
        fillRule="evenodd"
        d="M23 3.5C23 2.94772 23.4477 2.5 24 2.5C28.9723 2.5 33 6.52772 33 11.5C33 13.148 32.347 14.7588 31.8983 15.796C31.6504 16.3728 30.1253 19.3059 28.7021 22.0228C27.9809 23.3994 27.274 24.743 26.7473 25.7423C26.484 26.242 26.2657 26.6557 26.1133 26.9445L25.8743 27.3969L24.99 26.93C25.8741 27.3973 25.8743 27.3969 25.8743 27.3969C25.8683 27.4082 25.8619 27.4199 25.8554 27.431C25.0303 28.8563 22.9697 28.8563 22.1446 27.431L22.1351 27.4143L22.1278 27.4009C22.1278 27.4009 22.1278 27.4009 22.1372 27.396C22.1441 27.3923 22.1562 27.3858 22.1773 27.3745L23.0092 26.9304L22.1278 27.4009L21.8922 26.9588C21.7419 26.6768 21.5267 26.2725 21.2669 25.7832C20.7471 24.8047 20.0483 23.4859 19.3325 22.1257C19.2352 21.9408 19.1374 21.7546 19.0394 21.568C16.7033 22.6297 14.7676 24.4187 13.5212 26.6462C13.603 26.6962 13.6789 26.7589 13.7461 26.8341L16.4842 29.902C17.1884 30.683 17.4271 31.7649 17.1282 32.766L16.1373 36.069C15.9782 36.5962 16.2736 37.1503 16.8078 37.3123L16.809 37.3127L19.5941 38.1442C20.5539 38.4395 21.3143 39.1919 21.6044 40.1707L22.9482 44.1824C22.9789 44.274 22.9956 44.367 22.9994 44.4589C23.3293 44.4861 23.663 44.5 24 44.5C27.5853 44.5 30.8033 42.9279 33.0021 40.4353C33.0025 40.4287 33.003 40.422 33.0036 40.4153C33.3104 36.8066 31.9479 34.3953 30.5206 32.8678C29.7993 32.0958 29.0571 31.5466 28.4967 31.1918C28.2174 31.0148 27.9858 30.8878 27.8283 30.8069C27.7496 30.7665 27.6897 30.7377 27.6518 30.72C27.6329 30.7112 27.6195 30.7052 27.6121 30.7019L27.6056 30.699C27.0993 30.4817 26.864 29.8955 27.0799 29.3883C27.2963 28.8801 27.8836 28.6436 28.3918 28.86L28 29.78C28.3918 28.86 28.3923 28.8602 28.3928 28.8604L28.3939 28.8609L28.3967 28.8621L28.4041 28.8653L28.4261 28.875C28.4439 28.8829 28.4679 28.8938 28.4977 28.9077C28.5572 28.9355 28.6399 28.9754 28.7424 29.028C28.947 29.1332 29.2313 29.2896 29.5668 29.5021C30.2361 29.926 31.1195 30.5793 31.9819 31.5023C33.2689 32.8796 34.4996 34.851 34.9065 37.512C35.6085 35.9868 36 34.2892 36 32.5C36 28.8718 34.395 25.6239 31.8556 23.4262C31.438 23.0647 31.3924 22.4332 31.7539 22.0156C32.1153 21.598 32.7468 21.5525 33.1644 21.9139C36.125 24.4762 38 28.2682 38 32.5C38 40.2323 31.7323 46.5 24 46.5C16.2677 46.5 10 40.2323 10 32.5C10 26.8666 13.3243 22.0156 18.111 19.7936C17.1392 17.9276 16.3048 16.2921 16.095 15.78L16.0945 15.7786L16.0737 15.7283C15.5491 14.456 15 13.1242 15 11.5C15 9.46521 15.6754 7.58361 16.8243 6.07431C17.1588 5.63486 17.7862 5.54978 18.2257 5.8843C18.6651 6.21881 18.7502 6.84623 18.4157 7.28569C17.5246 8.45639 17 9.91479 17 11.5C17 12.6933 17.3956 13.6872 17.9445 15.0189L17.9455 15.0214C18.1918 15.6233 19.6544 18.4424 21.1025 21.1943C21.8167 22.5516 22.5141 23.8678 23.0331 24.845C23.2926 25.3335 23.5074 25.7371 23.6574 26.0186L23.8807 26.4376C23.8964 26.4618 23.9124 26.4743 23.9269 26.4823C23.9457 26.4927 23.9709 26.5 24 26.5C24.0291 26.5 24.0543 26.4927 24.0731 26.4823C24.0874 26.4744 24.1032 26.4621 24.1187 26.4386L24.3446 26.0108C24.4969 25.7224 24.7149 25.3091 24.978 24.8099C25.5042 23.8114 26.2103 22.4694 26.9304 21.0947C28.388 18.3124 29.856 15.4841 30.0609 15.0061L30.0622 15.0029C30.5135 13.96 31 12.6914 31 11.5C31 7.63228 27.8677 4.5 24 4.5C23.4477 4.5 23 4.05228 23 3.5ZM20.801 44.069L19.7018 40.7877C19.6973 40.7741 19.693 40.7604 19.689 40.7467C19.5943 40.4176 19.3404 40.1599 19.0093 40.0568L16.2339 39.2282L16.231 39.2273C14.6463 38.7489 13.7423 37.084 14.2224 35.4918L15.2118 32.194C15.3124 31.8563 15.232 31.4993 14.9981 31.2405L14.9939 31.2359L12.6458 28.605C12.2272 29.8263 12 31.1365 12 32.5C12 38.0199 15.7264 42.669 20.801 44.069ZM23.9999 9.64001C22.9722 9.64001 22.1399 10.4723 22.1399 11.5C22.1399 12.5277 22.9722 13.36 23.9999 13.36C25.0276 13.36 25.8599 12.5277 25.8599 11.5C25.8599 10.9477 26.3076 10.5 26.8599 10.5C27.4122 10.5 27.8599 10.9477 27.8599 11.5C27.8599 13.6323 26.1322 15.36 23.9999 15.36C21.8676 15.36 20.1399 13.6323 20.1399 11.5C20.1399 9.36773 21.8676 7.64001 23.9999 7.64001C24.5522 7.64001 24.9999 8.08773 24.9999 8.64001C24.9999 9.1923 24.5522 9.64001 23.9999 9.64001Z"
      />
    </AccessibleSvg>
  )
}

export const BicolorEverywhere = styled(BicolorEverywhereSvg).attrs(
  ({ color, color2, size, theme }) => ({
    color: color ?? theme.colors.primary,
    color2: color2 ?? theme.colors.secondary,
    size: size ?? theme.icons.sizes.standard,
  })
)``
