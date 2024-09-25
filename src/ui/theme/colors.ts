import { Appearance } from 'react-native'

// eslint-disable-next-line no-restricted-imports
// eslint-disable-next-line no-restricted-imports
// eslint-disable-next-line no-restricted-imports

import {
  ACTIVE_OPACITY as DARK_ACTIVE_OPACITY,
  ColorsEnum as DarkColorsEnum,
  UniqueColors as DarkUniqueColors,
} from 'ui/theme/darkColors'
import {
  ACTIVE_OPACITY as DEFAULT_ACTIVE_OPACITY,
  ColorsEnum as DefaultColorsEnum,
  UniqueColors as DefaultUniqueColors,
} from 'ui/theme/defaultColors'
// eslint-disable-next-line no-restricted-imports

let ColorsEnum: typeof DefaultColorsEnum
let ACTIVE_OPACITY: typeof DEFAULT_ACTIVE_OPACITY
let UniqueColors: typeof DefaultUniqueColors

const colorScheme = Appearance.getColorScheme()
if (colorScheme === 'dark') {
  ColorsEnum = DarkColorsEnum
  ACTIVE_OPACITY = DARK_ACTIVE_OPACITY
  UniqueColors = DarkUniqueColors
} else {
  ColorsEnum = DefaultColorsEnum
  ACTIVE_OPACITY = DEFAULT_ACTIVE_OPACITY
  UniqueColors = DefaultUniqueColors
}

export { ColorsEnum, ACTIVE_OPACITY, UniqueColors }
