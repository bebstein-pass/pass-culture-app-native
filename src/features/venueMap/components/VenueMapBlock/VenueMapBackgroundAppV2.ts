import { Appearance } from 'react-native'

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const VENUE_MAP_BACKGROUND_APP_V2 =
  Appearance.getColorScheme() === 'dark'
    ? require('../../../../../public/images/VenueMapBackgroundAppV2.dark.png')
    : require('../../../../../public/images/VenueMapBackgroundAppV2.png')
