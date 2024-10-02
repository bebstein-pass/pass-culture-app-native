import React, { FC, useCallback, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components/native'

import type { OfferPreviewResponse } from 'api/gen'
import {
  getDateString,
  getMovieScreenings,
} from 'features/offer/components/MovieScreeningCalendar/useMovieScreeningCalendar'
import { useSelectedDateScreening } from 'features/offer/components/MovieScreeningCalendar/useSelectedDateScreenings'
import { MovieOffer } from 'features/offer/components/MoviesScreeningCalendar/getNextMoviesByDate'
import { NextScreeningButton } from 'features/offer/components/MoviesScreeningCalendar/NextScreeningButton'
import { handleMovieCalendarScroll } from 'features/offer/components/MoviesScreeningCalendar/utils'
import { useOfferCTAButton } from 'features/offer/components/OfferCTAButton/useOfferCTAButton'
import { formatDuration } from 'features/offer/helpers/formatDuration/formatDuration'
import { VenueOffers } from 'features/venue/api/useVenueOffers'
import { useSubcategoriesMapping } from 'libs/subcategories'
import { useScrollToAnchor } from 'ui/components/anchor/AnchorContext'
import { EventCardList } from 'ui/components/eventCard/EventCardList'
import { HorizontalOfferTile } from 'ui/components/tiles/HorizontalOfferTile'
import { Spacer } from 'ui/theme'

type MovieOfferTileProps = {
  movieOffer: MovieOffer
  venueOffers: VenueOffers
  date: Date
  isLast: boolean
  nextScreeningDate?: Date
  setSelectedDate: (date: Date) => void
  nextDateIndex: number
  flatListRef: React.MutableRefObject<FlatList | null>
  flatListWidth: number
  itemWidth: number
}

export const MovieOfferTile: FC<MovieOfferTileProps> = ({
  venueOffers,
  date,
  movieOffer: { offer },
  isLast,
  nextScreeningDate,
  setSelectedDate,
  nextDateIndex,
  flatListRef,
  flatListWidth,
  itemWidth,
}) => {
  const movieScreenings = getMovieScreenings(offer.stocks)
  const scrollToAnchor = useScrollToAnchor()

  const selectedScreeningStock = useMemo(
    () => movieScreenings[getDateString(String(date))],
    [movieScreenings, date]
  )

  const subcategoriesMapping = useSubcategoriesMapping()

  const { bookingData, selectedDateScreenings } = useSelectedDateScreening(
    selectedScreeningStock,
    offer.isExternalBookingsDisabled
  )

  const scrollToMiddleElement = useCallback(
    (currentIndex: number) => {
      const { offset } = handleMovieCalendarScroll(currentIndex, flatListWidth, itemWidth)

      flatListRef.current?.scrollToOffset({
        animated: true,
        offset,
      })
    },
    [flatListRef, flatListWidth, itemWidth]
  )

  const {
    onPress: onPressOfferCTA,
    CTAOfferModal,
    movieScreeningUserData,
  } = useOfferCTAButton(offer, subcategoriesMapping[offer.subcategoryId], bookingData)

  const eventCardData = useMemo(
    () => selectedDateScreenings(offer.venue.id, onPressOfferCTA, movieScreeningUserData),
    [movieScreeningUserData, offer.venue.id, onPressOfferCTA, selectedDateScreenings]
  )
  const offerScreeningOnSelectedDates = useMemo(
    () => venueOffers.hits.find((item) => Number(item.objectID) === offer.id),
    [offer.id, venueOffers.hits]
  )
  return (
    <React.Fragment>
      <View>
        {offerScreeningOnSelectedDates ? (
          <HorizontalOfferTile
            offer={offerScreeningOnSelectedDates}
            analyticsParams={{
              from: 'venue',
            }}
            price={undefined}
            subtitles={getSubtitles(offer)}
            withRightArrow
          />
        ) : null}
      </View>
      <Spacer.Column numberOfSpaces={4} />
      {nextScreeningDate ? (
        <View>
          <NextScreeningButton
            date={nextScreeningDate}
            onPress={() => {
              scrollToAnchor('venue-calendar')
              setSelectedDate(nextScreeningDate)
              scrollToMiddleElement(nextDateIndex)
            }}
          />
        </View>
      ) : (
        <EventCardList
          data={eventCardData}
          analyticsFrom="venue"
          offerId={Number(offerScreeningOnSelectedDates?.objectID)}
        />
      )}
      <Spacer.Column numberOfSpaces={4} />
      {isLast ? null : <Divider />}
      <Spacer.Column numberOfSpaces={4} />
      {CTAOfferModal}
    </React.Fragment>
  )
}

const getSubtitles = (offer: OfferPreviewResponse): string[] => {
  const genre = offer.extraData?.genres?.length ? offer.extraData?.genres?.join(' / ') : ''
  const duration = formatDuration(offer.extraData?.durationMinutes)

  return [genre, duration]
}

const Divider = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.greyMedium,
}))
