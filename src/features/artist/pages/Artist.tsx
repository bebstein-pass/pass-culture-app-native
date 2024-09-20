import { useRoute } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'

import { ArtistBody } from 'features/artist/components/ArtistBody/ArtistBody'
import { PageNotFound } from 'features/navigation/pages/PageNotFound'
import { UseRouteType } from 'features/navigation/RootNavigator/types'
import { useOffer } from 'features/offer/api/useOffer'
import { getOfferArtists } from 'features/offer/helpers/getOfferArtists/getOfferArtists'
import { useFeatureFlag } from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import { RemoteStoreFeatureFlags } from 'libs/firebase/firestore/types'
import { useSubcategoriesMapping } from 'libs/subcategories'

export type Artist = {
  name: string
  bio?: string
}

export const Artist: FunctionComponent = () => {
  const enableArtistPage = useFeatureFlag(RemoteStoreFeatureFlags.WIP_ARTIST_PAGE)
  const { params } = useRoute<UseRouteType<'Artist'>>()
  const { data: offer } = useOffer({ offerId: params.fromOfferId })
  const subcategoriesMapping = useSubcategoriesMapping()

  if (!offer) return null

  const subcategory = subcategoriesMapping[offer?.subcategoryId]
  const artists = getOfferArtists(subcategory.categoryId, offer)

  if (!artists) return null

  const artistInfo: Artist = {
    name: artists,
    bio: undefined,
  }

  return enableArtistPage ? (
    <ArtistBody offer={offer} subcategory={subcategory} artist={artistInfo} />
  ) : (
    <PageNotFound />
  )
}
