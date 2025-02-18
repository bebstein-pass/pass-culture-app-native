import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'

import { AccessibleIcon } from './types'

const HandicapMentalSvg = ({ color, size, accessibilityLabel, testID }: AccessibleIcon) => {
  return (
    <AccessibleSvg
      width={size}
      height={size}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      viewBox="0 0 48 48"
      fill={color}>
      <Path d="M34.8868 8.85249C31.9009 6.11226 28.1599 4.49709 25.0461 4.54737C22.5095 4.59235 21.0485 4.87723 20.2255 5.16195C21.8467 5.9912 23.3833 7.21364 24.5408 8.99347C25.8035 10.9349 26.5714 13.4725 26.5714 16.7484C26.5714 20.7318 27.0749 23.9623 27.5752 26.1886C27.8253 27.3016 28.0744 28.1627 28.2588 28.7404C28.3511 29.0293 28.4271 29.2472 28.479 29.3901C28.5049 29.4616 28.5248 29.5143 28.5377 29.5478L28.5516 29.5836L28.5542 29.5901L28.5544 29.5905L28.5544 29.5906C28.7363 30.041 28.575 30.5566 28.1682 30.8248L25.5805 32.5309L25.7462 34.9895C25.7476 35.0099 25.7484 35.0301 25.7485 35.0502C27.1095 35.0291 28.399 34.8025 29.3718 34.5712C29.8798 34.4504 30.2948 34.3299 30.5802 34.2406C30.7227 34.196 30.8324 34.1593 30.9047 34.1344C30.9409 34.122 30.9677 34.1125 30.9845 34.1065L31.0022 34.1001L31.0048 34.0991C31.4163 33.9463 31.88 34.0703 32.159 34.4078C32.4381 34.7454 32.4708 35.2222 32.2403 35.5944L31.1197 37.4044C29.9333 39.3275 27.8206 40.4963 25.5428 40.4963C25.1907 40.4963 24.8423 40.4681 24.5006 40.4133C24.5018 40.5945 24.5124 40.8384 24.5327 41.1496C24.5429 41.3066 24.5552 41.4779 24.5682 41.6571L24.5682 41.658C24.5958 42.0389 24.6258 42.4555 24.6432 42.846C24.665 43.334 24.672 43.8621 24.6195 44.3293C26.081 44.5895 27.6349 44.2225 28.8358 43.2317L31.6952 40.8718C32.2125 40.4455 32.7054 39.9947 33.1723 39.5218C35.8278 36.8322 37.645 33.4252 38.3672 29.7063L38.3676 29.7045C38.7624 27.6916 39.1583 25.5438 39.4551 23.6592C39.7555 21.7519 39.9429 20.1826 39.9429 19.291C39.9429 15.2963 37.8611 11.5821 34.8868 8.85249ZM18.0682 6.49678C18.0102 6.48399 17.954 6.46629 17.8999 6.44411C14.8926 5.52522 10.8035 5.46616 7.58767 7.53734C7.11082 7.84446 6.47399 7.70886 6.16527 7.23447C5.85655 6.76008 5.99286 6.12654 6.46971 5.81941C10.0639 3.50454 14.4232 3.43977 17.7785 4.28685C17.974 4.07056 18.23 3.86338 18.5569 3.67342C19.6104 3.06135 21.5099 2.56346 25.0102 2.50146L25.0118 2.50143C28.7893 2.4401 33.0193 4.35457 36.2817 7.34857C39.556 10.3535 42 14.5784 42 19.291C42 20.3626 41.7862 22.0789 41.4875 23.9759C41.1852 25.8954 40.784 28.0704 40.3868 30.0956C39.4461 34.938 36.8308 39.2966 33.0088 42.4466L30.1493 44.8065C28.2166 46.401 25.6426 46.8386 23.36 46.1242L23.3365 46.1293L23.3347 46.1297C20.1743 46.7817 17.5069 46.5443 15.0394 45.6404C12.5988 44.7464 10.4094 43.2198 8.17519 41.3914C7.73651 41.0324 7.67346 40.3877 8.03438 39.9513C8.39529 39.515 9.04348 39.4523 9.48216 39.8113C11.6606 41.5939 13.6368 42.946 15.7503 43.7202C17.6353 44.4107 19.6741 44.6572 22.1189 44.2716C22.2398 44.1058 22.4056 43.9839 22.5913 43.915C22.6076 43.6511 22.6052 43.3209 22.5881 42.9366C22.5719 42.5731 22.5456 42.209 22.5192 41.8447L22.5191 41.844C22.5056 41.6566 22.492 41.4691 22.4798 41.2817C22.4476 40.7857 22.4187 40.2219 22.4782 39.8137C22.4815 39.7907 22.4856 39.768 22.4905 39.7456C21.4711 39.2119 20.5941 38.4124 19.9681 37.4078L19.9665 37.4052L18.8453 35.5944C18.6149 35.2222 18.6476 34.7454 18.9267 34.4078C19.0203 34.2946 19.1346 34.2054 19.2608 34.1426C19.533 33.9135 19.9035 33.8022 20.3066 33.9016C21.2583 34.1472 22.4001 34.3928 23.6573 34.5862L23.488 32.0748C23.4633 31.7082 23.6381 31.3566 23.946 31.1536L26.3631 29.56C26.3423 29.4969 26.3207 29.4302 26.2982 29.3599C26.097 28.7297 25.8318 27.8107 25.5676 26.635C25.0393 24.2839 24.5142 20.9026 24.5142 16.7484C24.5142 13.7991 23.8267 11.6626 22.8136 10.1049C21.805 8.5541 20.4305 7.51045 18.9398 6.81286C18.6623 6.69968 18.3711 6.59387 18.0682 6.49678ZM25.089 38.4269L25.1016 37.092C25.2477 37.0961 25.3948 37.0983 25.5428 37.0983C26.8461 37.0983 28.081 36.9292 29.0933 36.7271C28.2546 37.8043 26.948 38.4497 25.5428 38.4497C25.3904 38.4497 25.2389 38.442 25.089 38.4269ZM17.7716 25.3016C18.5801 24.7065 19.3129 24.717 19.8659 24.8592L20.7946 25.2849C21.239 25.6309 21.8815 25.5561 22.2334 25.116C22.587 24.6737 22.5133 24.0299 22.0687 23.6782L21.4411 24.4632C22.0687 23.6782 22.0683 23.6778 22.0679 23.6775L22.067 23.6768L22.0651 23.6753L22.0607 23.6719L22.0496 23.6633C22.0411 23.6568 22.0305 23.6488 22.0178 23.6395C21.9925 23.6208 21.9589 23.5967 21.9175 23.5684C21.8348 23.512 21.7199 23.4383 21.5764 23.3581C21.2918 23.1989 20.8824 23.007 20.381 22.8779C19.3525 22.6133 17.951 22.6238 16.5481 23.6564C16.0914 23.9925 15.9951 24.6333 16.333 25.0876C16.6709 25.5419 17.315 25.6377 17.7716 25.3016ZM20.7889 25.2807L20.7897 25.281L20.791 25.2821L20.7931 25.2837L20.7946 25.2849L20.7917 25.2828L20.7889 25.2807ZM20.7889 25.2807C20.7822 25.2757 20.7704 25.2673 20.7539 25.2561C20.7155 25.2298 20.6524 25.1891 20.5685 25.1421C20.3982 25.0469 20.1552 24.9337 19.8659 24.8592L20.7889 25.2807ZM30.1145 25.3016C30.923 24.7065 31.6557 24.717 32.2087 24.8592L33.1375 25.2849C33.3784 25.4725 33.6775 25.5364 33.957 25.4855C34.193 25.4424 34.4151 25.3175 34.5763 25.116C34.9299 24.6737 34.8561 24.0299 34.4115 23.6782L34.0314 24.1536C34.4114 23.6781 34.4111 23.6778 34.4107 23.6775L34.4099 23.6768L34.408 23.6753L34.4036 23.6719L34.3924 23.6633L34.3783 23.6526L34.3607 23.6395C34.3354 23.6208 34.3018 23.5967 34.2604 23.5684C34.2092 23.5335 34.1458 23.4921 34.0709 23.4465C34.0247 23.4184 33.9741 23.3887 33.9193 23.3581C33.6347 23.1989 33.2252 23.007 32.7238 22.8779C31.6954 22.6133 30.2939 22.6238 28.8909 23.6564C28.4343 23.9925 28.338 24.6333 28.6758 25.0876C29.0137 25.5419 29.6578 25.6377 30.1145 25.3016ZM33.1317 25.2807L33.1325 25.281L33.1338 25.2821L33.136 25.2837L33.1375 25.2849L33.1346 25.2828L33.1317 25.2807ZM33.1317 25.2807L33.1167 25.2699L33.0968 25.2561C33.0583 25.2298 32.9953 25.1891 32.9113 25.1421C32.7411 25.0469 32.498 24.9337 32.2087 24.8592L33.1317 25.2807Z" />
    </AccessibleSvg>
  )
}

export const HandicapMental = styled(HandicapMentalSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
