import { Hit } from '@algolia/client-search'

import { SearchOfferResponse } from 'features/search/api/useSearchResults/useSearchResults'
import { captureAlgoliaError } from 'libs/algolia/fetchAlgolia/AlgoliaError'
import { buildOfferSearchParameters } from 'libs/algolia/fetchAlgolia/buildAlgoliaParameters/buildOfferSearchParameters'
import { offerAttributesToRetrieve } from 'libs/algolia/fetchAlgolia/buildAlgoliaParameters/offerAttributesToRetrieve'
import { client } from 'libs/algolia/fetchAlgolia/clients'
import { buildHitsPerPage } from 'libs/algolia/fetchAlgolia/utils'
import { SearchQueryParameters } from 'libs/algolia/types'
import { env } from 'libs/environment'
import { Position } from 'libs/geolocation'
import { Offer } from 'shared/offer/types'

type FetchOfferArgs = {
  parameters: SearchQueryParameters
  userLocation: Position
  isUserUnderage: boolean
  storeQueryID?: (queryID?: string) => void
  excludedObjectIds?: string[]
  indexSearch?: string
  isFromOffer?: boolean
}

export const fetchOffers = async ({
  parameters,
  userLocation,
  isUserUnderage,
  storeQueryID,
  indexSearch = env.ALGOLIA_OFFERS_INDEX_NAME,
  isFromOffer,
}: FetchOfferArgs): Promise<SearchOfferResponse> => {
  const searchParameters = buildOfferSearchParameters(parameters, userLocation, isUserUnderage)
  const index = client.initIndex(indexSearch)

  try {
    const response = await index.search<Offer>(parameters.query || '', {
      page: parameters.page ?? 0,
      ...buildHitsPerPage(parameters.hitsPerPage),
      ...searchParameters,
      attributesToRetrieve: offerAttributesToRetrieve,
      attributesToHighlight: [], // We disable highlighting because we don't need it
      /* Is needed to get a queryID, in order to send analytics events
         https://www.algolia.com/doc/api-reference/api-parameters/clickAnalytics/ */
      clickAnalytics: true,
      // To use exactly the query and not limit the duplicate offers
      ...(isFromOffer ? { typoTolerance: false, distinct: false } : {}),
    })

    if (storeQueryID) storeQueryID(response.queryID)

    return response
  } catch (error) {
    captureAlgoliaError(error)
    return { hits: [] as Hit<Offer>[], nbHits: 0, page: 0, nbPages: 0 }
  }
}
