import React from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'

import { BookingOfferResponseAddress, BookingReponse, BookingVenueResponse } from 'api/gen'
import { BookingPrecisions } from 'features/bookings/components/BookingPrecision'
import { TicketCutout } from 'features/bookings/components/TicketCutout'
import { getBookingLabels } from 'features/bookings/helpers'
import { BookingProperties } from 'features/bookings/types'
import { VenueBlockAddress, VenueBlockVenue } from 'features/offer/components/OfferVenueBlock/type'
import { VenueBlockWithItinerary } from 'features/offer/components/OfferVenueBlock/VenueBlockWithItinerary'
import { analytics } from 'libs/analytics/provider'
import { formatFullAddress } from 'shared/address/addressFormatter'
import { ErrorBanner } from 'ui/components/banners/ErrorBanner'
import { InfoBanner } from 'ui/components/banners/InfoBanner'
import { Separator } from 'ui/components/Separator'
import { IdCard } from 'ui/svg/icons/IdCard'
import { getSpacing, TypoDS } from 'ui/theme'

const VENUE_THUMBNAIL_SIZE = getSpacing(15)

export const BookingDetailsContent = ({
  properties,
  booking,
}: {
  properties: BookingProperties
  booking: BookingReponse
}) => {
  const { address } = booking?.stock.offer ?? {}
  const offerFullAddress = address
    ? formatFullAddress(address.street, address.postalCode, address.city)
    : undefined

  const { offer } = booking.stock
  const shouldDisplayItineraryButton =
    !!offerFullAddress && (properties.isEvent || (properties.isPhysical && !properties.isDigital))

  const { hourLabel, dayLabel } = getBookingLabels(booking, properties)

  const onEmailPress = () => {
    analytics.logClickEmailOrganizer()
  }

  return (
    <ScrollView>
      <TicketCutout
        hour={hourLabel == '' ? undefined : hourLabel}
        day={dayLabel == '' ? undefined : dayLabel}
        isDuo={properties.isDuo}
        venueInfo={
          <VenueBlockWithItinerary
            shouldDisplayItineraryButton={shouldDisplayItineraryButton}
            offerFullAddress={offerFullAddress}
            venue={getVenueBlockVenue(booking.stock.offer.venue)}
            address={getVenueBlockAddress(booking.stock.offer.address)}
            offerId={offer.id}
            thumbnailSize={VENUE_THUMBNAIL_SIZE}
          />
        }
        title={offer.name}
        infoBanner={
          <InfoBanner
            message="Tu auras besoin de ta carte d’identité pour accéder à l’évènement."
            icon={IdCard}
          />
        }>
        <TypoDS.Body>qrcode</TypoDS.Body>
      </TicketCutout>
      <ErrorBannerContainer>
        <ErrorBanner message="Tu n’as pas le droit de céder ou de revendre ton billet." />
      </ErrorBannerContainer>
      {booking.stock.offer.bookingContact || offer.withdrawalDetails ? (
        <React.Fragment>
          <StyledSeparator height={getSpacing(8)} />
          <BookingPrecisions
            bookingContactEmail={booking.stock.offer.bookingContact}
            withdrawalDetails={offer.withdrawalDetails}
            onEmailPress={onEmailPress}
          />
        </React.Fragment>
      ) : null}
      <StyledSeparator height={getSpacing(8)} />
    </ScrollView>
  )
}

function getVenueBlockVenue(venue: BookingVenueResponse): VenueBlockVenue {
  return venue
}

function getVenueBlockAddress(
  address: BookingOfferResponseAddress | null | undefined
): VenueBlockAddress | undefined {
  return address ?? undefined
}

const ErrorBannerContainer = styled.View({
  marginHorizontal: getSpacing(6),
  marginTop: getSpacing(8),
})
const StyledSeparator = styled(Separator.Horizontal)({
  marginVertical: getSpacing(8),
  height: getSpacing(2),
})
