import React from 'react'
import { useTheme } from 'styled-components/native'

import { OfferResponse } from 'api/gen'
import { extractStockDates } from 'features/offer/helpers/extractStockDates/extractStockDates'
import { formatDuration } from 'features/offer/helpers/formatDuration/formatDuration'
import { capitalizeFirstLetter, getFormattedDates } from 'libs/parsers/formatDates'
import { getOfferLocationName } from 'shared/offer/helpers/getOfferLocationName'
import { SummaryInfoProps } from 'ui/components/SummaryInfo'
import { CalendarS } from 'ui/svg/icons/CalendarS'
import { ClockFilled } from 'ui/svg/icons/ClockFilled'
import { Digital } from 'ui/svg/icons/Digital'
import { Stock } from 'ui/svg/icons/Stock'

type Props = {
  offer: OfferResponse
  isCinemaOffer?: boolean
}

export type SummaryInfoItem = SummaryInfoProps & {
  isDisplayed?: boolean
}

export const useOfferSummaryInfoList = ({ offer, isCinemaOffer }: Props) => {
  const theme = useTheme()
  const { venue, isDigital, isDuo, extraData } = offer
  const dates = extractStockDates(offer)
  const formattedDate = capitalizeFirstLetter(getFormattedDates(dates))
  const locationName = getOfferLocationName(venue, isDigital)
  const duration = extraData?.durationMinutes
    ? formatDuration(extraData.durationMinutes)
    : undefined

  const summaryInfoItems: SummaryInfoItem[] = [
    {
      isDisplayed: !!formattedDate && !isCinemaOffer,
      Icon: <CalendarS size={theme.icons.sizes.small} />,
      title: 'Dates',
      subtitle: formattedDate,
    },
    {
      isDisplayed: isDigital,
      Icon: <Digital size={theme.icons.sizes.small} />,
      title: 'En ligne',
      subtitle: locationName,
    },
    {
      isDisplayed: !!duration,
      Icon: <ClockFilled size={theme.icons.sizes.small} />,
      title: 'Durée',
      subtitle: duration,
    },
    {
      isDisplayed: isDuo,
      Icon: <Stock size={theme.icons.sizes.small} />,
      title: 'Duo',
      subtitle: 'Tu peux prendre deux places',
    },
  ]

  const displayedSummaryInfoItems = summaryInfoItems.filter((item) => item.isDisplayed)

  return { summaryInfoItems: displayedSummaryInfoItems }
}
