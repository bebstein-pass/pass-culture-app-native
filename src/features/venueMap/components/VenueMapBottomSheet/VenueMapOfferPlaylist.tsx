import React, { Fragment, useCallback } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

import { OfferTile } from 'features/offer/components/OfferTile/OfferTile'
import { PlaylistType } from 'features/offer/enums'
import { useGetPacificFrancToEuroRate } from 'libs/firebase/firestore/exchangeRates/useGetPacificFrancToEuroRate'
import { getDisplayPrice } from 'libs/parsers/getDisplayPrice'
import { useCategoryHomeLabelMapping, useCategoryIdMapping } from 'libs/subcategories'
import { useGetCurrencyToDisplay } from 'shared/currency/useGetCurrencyToDisplay'
import { Offer } from 'shared/offer/types'
import { ButtonTertiaryBlack } from 'ui/components/buttons/ButtonTertiaryBlack'
import { CustomListRenderItem, Playlist } from 'ui/components/Playlist'
import { PlainArrowNext } from 'ui/svg/icons/PlainArrowNext'
import { getSpacing, LENGTH_S, RATIO_HOME_IMAGE } from 'ui/theme'

type VenueMapOfferPlaylistProps = {
  offers: Offer[]
  playlistType: PlaylistType
  onPressMore?: () => void
}

const PLAYLIST_ITEM_HEIGHT = LENGTH_S
const PLAYLIST_ITEM_WIDTH = PLAYLIST_ITEM_HEIGHT * RATIO_HOME_IMAGE

const keyExtractor = (item: Offer) => item.objectID

export const VenueMapOfferPlaylist = ({
  offers,
  onPressMore,
  playlistType,
}: VenueMapOfferPlaylistProps) => {
  const currency = useGetCurrencyToDisplay()
  const euroToPacificFrancRate = useGetPacificFrancToEuroRate()
  const mapping = useCategoryIdMapping()
  const labelMapping = useCategoryHomeLabelMapping()

  const renderItem: CustomListRenderItem<Offer> = useCallback(
    ({ item }) => (
      <OfferTile
        offerId={Number(item.objectID)}
        categoryLabel={labelMapping[item.offer.subcategoryId]}
        categoryId={mapping[item.offer.subcategoryId]}
        subcategoryId={item.offer.subcategoryId}
        name={item.offer.name}
        offerLocation={item._geoloc}
        analyticsFrom="venueMap"
        thumbUrl={item.offer.thumbUrl}
        price={getDisplayPrice(item.offer.prices, currency, euroToPacificFrancRate)}
        width={PLAYLIST_ITEM_WIDTH}
        height={PLAYLIST_ITEM_HEIGHT}
        variant="new"
        isDuo={false}
        playlistType={playlistType}
      />
    ),
    [currency, euroToPacificFrancRate, labelMapping, mapping, playlistType]
  )

  return (
    <Fragment>
      <Playlist
        data={offers}
        itemHeight={PLAYLIST_ITEM_HEIGHT}
        itemWidth={PLAYLIST_ITEM_WIDTH}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        FlatListComponent={FlatList}
        testID="venueOfferPlaylist"
        itemSeparatorSize={getSpacing(2)}
        horizontalMargin={getSpacing(4)}
      />
      <StyleButtonTertiaryBlack
        inline
        wording="Voir les offres du lieu"
        onPress={onPressMore}
        icon={PlainArrowNext}
      />
    </Fragment>
  )
}

const StyleButtonTertiaryBlack = styled(ButtonTertiaryBlack)({
  transform: 'translateY(-10px)',
  paddingBottom: getSpacing(2),
})
