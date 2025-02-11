import { PlaylistOffersParams } from 'features/home/types'
import { captureAlgoliaError } from 'libs/algolia/fetchAlgolia/AlgoliaError'
import { buildOfferSearchParameters } from 'libs/algolia/fetchAlgolia/buildAlgoliaParameters/buildOfferSearchParameters'
import { offerAttributesToRetrieve } from 'libs/algolia/fetchAlgolia/buildAlgoliaParameters/offerAttributesToRetrieve'
import { multipleQueries } from 'libs/algolia/fetchAlgolia/multipleQueries'
import { searchResponsePredicate } from 'libs/algolia/fetchAlgolia/searchResponsePredicate'
import { buildHitsPerPage } from 'libs/algolia/fetchAlgolia/utils'
import { MultipleOffersResult } from 'libs/algolia/types'
import { env } from 'libs/environment/env'
import { Offer } from 'shared/offer/types'

type FetchMultipleOffersArgs = {
  paramsList: PlaylistOffersParams[]
  isUserUnderage: boolean
  indexName?: string
  venueId?: number
}

export const fetchMultipleOffers = async ({
  paramsList,
  isUserUnderage,
  indexName = env.ALGOLIA_OFFERS_INDEX_NAME,
}: FetchMultipleOffersArgs): Promise<MultipleOffersResult> => {
  const queries = paramsList.map((params) => ({
    indexName,
    query: params.offerParams.query,
    params: {
      ...buildHitsPerPage(params.offerParams.hitsPerPage),
      ...buildOfferSearchParameters(params.offerParams, params.locationParams, isUserUnderage),
      attributesToHighlight: [], // We disable highlighting because we don't need it
      attributesToRetrieve: [...offerAttributesToRetrieve, 'offer.isHeadline'],
    },
  }))

  try {
    const results = await multipleQueries<Offer>(queries)
    const searchResponseResults = results.filter(searchResponsePredicate)

    return searchResponseResults
  } catch (error) {
    captureAlgoliaError(error)
    return []
  }
}
