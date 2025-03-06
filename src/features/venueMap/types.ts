import { FunctionComponent } from 'react'

import { FILTERS_VENUE_TYPE_MAPPING } from 'features/venueMap/constant'
import { VenueTypeCode } from 'libs/parsers/venueType'
import { AccessibleIcon } from 'ui/svg/icons/types'

export type Size = { width: number; height: number }

export type VenuesCountByType = {
  [key in VenueTypeCode]: number
}

export type FilterGroupKey = keyof typeof FILTERS_VENUE_TYPE_MAPPING

export type FilterGroupData = {
  id: FilterGroupKey
  label: string
  color: string
  icon: FunctionComponent<AccessibleIcon>
}
