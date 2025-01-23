import React from 'react'
import { Path } from 'react-native-svg'
import styled from 'styled-components/native'

import { AccessibleSvg } from 'ui/svg/AccessibleSvg'
import { AccessibleIcon } from 'ui/svg/icons/types'

function CakeOneCandleSvg({ size, testID, accessibilityLabel, color }: AccessibleIcon) {
  return (
    <AccessibleSvg
      width={size}
      height={size}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      viewBox="0 0 32 32">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0552 0.0769348C16.2668 0.0769348 16.4564 0.208638 16.5317 0.407899L18.0613 4.45724C18.0834 4.51559 18.0947 4.57749 18.0947 4.63992C18.0947 5.61206 17.4549 6.4521 16.565 6.68826V7.268H17.0749C17.6381 7.268 18.0947 7.72794 18.0947 8.2953V12.4045C18.0947 12.4932 18.0835 12.5792 18.0625 12.6613H23.0316C24.6674 12.6613 25.9978 13.9902 25.9978 15.634V18.4206C25.9978 19.2944 25.6218 20.0793 25.0239 20.6228H26.0728C27.6923 20.6228 29.002 21.9476 29.002 23.5802V28.9658C29.002 30.5968 27.6924 31.9231 26.0728 31.9231H5.41754C3.79902 31.9231 2.48828 30.597 2.48828 28.9658V25.8235V23.5802C2.48828 21.9475 3.79919 20.6228 5.41754 20.6228H7.08579C6.48802 20.0793 6.11251 19.2944 6.11251 18.4206V15.634C6.11251 13.9904 7.44115 12.6613 9.07847 12.6613H14.0478C14.0268 12.5792 14.0156 12.4932 14.0156 12.4045V8.2953C14.0156 7.72794 14.4722 7.268 15.0354 7.268H15.5453V6.68827C14.6552 6.45208 14.0156 5.61179 14.0156 4.63992C14.0156 4.57749 14.0269 4.51559 14.049 4.45724L15.5786 0.407899C15.6539 0.208638 15.8435 0.0769348 16.0552 0.0769348ZM16.0534 8.2953H15.0354V12.4045H17.0749V8.2953H16.0569C16.0563 8.2953 16.0557 8.2953 16.0552 8.2953C16.0546 8.2953 16.054 8.2953 16.0534 8.2953ZM15.0385 4.72615C15.0801 5.30212 15.5352 5.72706 16.0552 5.72706C16.5749 5.72706 17.0302 5.30225 17.0718 4.72615L16.0552 2.03479L15.0385 4.72615ZM9.07847 13.6886C7.99916 13.6886 7.13226 14.563 7.13226 15.634V16.2574L13.2011 16.3211C13.4826 16.324 13.7085 16.5564 13.7056 16.84C13.7027 17.1237 13.472 17.3513 13.1904 17.3483L7.13226 17.2847V18.4206C7.13226 19.4916 7.99916 20.366 9.07847 20.366H23.0316C24.1099 20.366 24.978 19.4914 24.978 18.4206V15.634C24.978 14.5633 24.1099 13.6886 23.0316 13.6886H9.07847ZM3.50804 26.3372H9.6266C9.90819 26.3372 10.1365 26.1072 10.1365 25.8235C10.1365 25.5398 9.90819 25.3099 9.6266 25.3099H3.50804V23.5802C3.50804 22.5126 4.36463 21.6501 5.41754 21.6501H26.0728C27.1265 21.6501 27.9823 22.5125 27.9823 23.5802V28.9658C27.9823 30.0324 27.1264 30.8958 26.0728 30.8958H5.41754C4.3648 30.8958 3.50804 30.0322 3.50804 28.9658V26.3372ZM16.51 16.321C16.2284 16.321 16.0001 16.551 16.0001 16.8347C16.0001 17.1184 16.2284 17.3483 16.51 17.3483H17.5297C17.8113 17.3483 18.0396 17.1184 18.0396 16.8347C18.0396 16.551 17.8113 16.321 17.5297 16.321H16.51ZM13.1958 25.3099C12.9142 25.3099 12.6859 25.5398 12.6859 25.8235C12.6859 26.1072 12.9142 26.3372 13.1958 26.3372H14.2155C14.4971 26.3372 14.7254 26.1072 14.7254 25.8235C14.7254 25.5398 14.4971 25.3099 14.2155 25.3099H13.1958ZM18.2945 25.3099C18.0129 25.3099 17.7847 25.5398 17.7847 25.8235C17.7847 26.1072 18.0129 26.3372 18.2945 26.3372H19.3143C19.5959 26.3372 19.8242 26.1072 19.8242 25.8235C19.8242 25.5398 19.5959 25.3099 19.3143 25.3099H18.2945Z"
        fill={color}
      />
    </AccessibleSvg>
  )
}

export const CakeOneCandle = styled(CakeOneCandleSvg).attrs(({ color, size, theme }) => ({
  color: color ?? theme.colors.black,
  size: size ?? theme.icons.sizes.standard,
}))``
