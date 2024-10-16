import { Geoloc } from 'libs/algolia/types'
import { VenueTypeCode } from 'libs/parsers/venueType'
import { AccessibleIcon } from 'ui/svg/icons/types'

export interface Venue {
  label: string
  info: string
  venueId: number | null
  _geoloc?: Geoloc
  banner_url?: string | null
  venue_type?: VenueTypeCode | null
  postalCode?: string | null
  isPermanent?: boolean | null
}

export enum Tab {
  OFFERS = 'Offres disponibles',
  INFOS = 'Infos pratiques',
}

export type TabProps<TabKeyType extends string> = {
  tabListRef: React.MutableRefObject<null>
  selectedTab: TabKeyType
  setSelectedTab: (tab: TabKeyType) => void
  tabs: TabKeyType[]
}

export type OpeningHours = Partial<{
  MONDAY: OpeningHour[]
  TUESDAY: OpeningHour[]
  WEDNESDAY: OpeningHour[]
  THURSDAY: OpeningHour[]
  FRIDAY: OpeningHour[]
  SATURDAY: OpeningHour[]
  SUNDAY: OpeningHour[]
}>

export type OpeningHour = {
  open: string
  close: string
}

export type OpeningHoursStatusState = 'open' | 'open-soon' | 'close-soon' | 'close'

export type PastilleType = {
  label: string
  accessibilityLabel: string
}

export type TabType<TabKeyType extends string> = {
  key: TabKeyType
  Icon?: React.FC<AccessibleIcon>
  pastille?: PastilleType
}
