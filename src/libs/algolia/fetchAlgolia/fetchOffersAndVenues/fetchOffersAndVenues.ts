import { Hit, SearchResponse } from '@algolia/client-search'

import { captureAlgoliaError } from 'libs/algolia/fetchAlgolia/AlgoliaError'
import { buildOfferSearchParameters } from 'libs/algolia/fetchAlgolia/buildAlgoliaParameters/buildOfferSearchParameters'
import { offerAttributesToRetrieve } from 'libs/algolia/fetchAlgolia/buildAlgoliaParameters/offerAttributesToRetrieve'
import { client } from 'libs/algolia/fetchAlgolia/clients'
import { buildSearchVenuePosition } from 'libs/algolia/fetchAlgolia/fetchOffersAndVenues/helpers/buildSearchVenuePosition'
import { getSearchVenueQuery } from 'libs/algolia/fetchAlgolia/fetchOffersAndVenues/helpers/getSearchVenueQuery'
import { buildHitsPerPage } from 'libs/algolia/fetchAlgolia/utils'
import { AlgoliaVenue, SearchQueryParameters } from 'libs/algolia/types'
import { env } from 'libs/environment'
import { Position } from 'libs/geolocation'
import { Offer } from 'shared/offer/types'

type FetchOfferAndVenuesArgs = {
  parameters: SearchQueryParameters
  userLocation: Position
  isUserUnderage: boolean
  storeQueryID?: (queryID?: string) => void
  excludedObjectIds?: string[]
  offersIndex?: string
  venuesIndex?: string
}

export const fetchOffersAndVenues = async ({
  parameters,
  userLocation,
  isUserUnderage,
  storeQueryID,
  offersIndex = env.ALGOLIA_OFFERS_INDEX_NAME,
  venuesIndex = env.ALGOLIA_VENUES_INDEX_NAME,
}: FetchOfferAndVenuesArgs) => {
  const searchParameters = buildOfferSearchParameters(parameters, userLocation, isUserUnderage)

  const queries = [
    {
      indexName: offersIndex,
      query: parameters.query || '',
      params: {
        page: parameters.page || 0,
        ...buildHitsPerPage(parameters.hitsPerPage),
        ...searchParameters,
        attributesToRetrieve: offerAttributesToRetrieve,
        attributesToHighlight: [], // We disable highlighting because we don't need it
        /* Is needed to get a queryID, in order to send analytics events
         https://www.algolia.com/doc/api-reference/api-parameters/clickAnalytics/ */
        clickAnalytics: true,
      },
    },
    {
      indexName: venuesIndex,
      query: getSearchVenueQuery(parameters),
      params: {
        page: 0,
        ...buildHitsPerPage(35),
        ...buildSearchVenuePosition(parameters.locationFilter, userLocation),
        clickAnalytics: true,
      },
    },
  ]

  try {
    const response = await client.multipleQueries<Offer | AlgoliaVenue>(queries)
    const [offersResponse, venuesResponse] = response.results as [
      SearchResponse<Offer>,
      SearchResponse<AlgoliaVenue>
    ]

    if (storeQueryID) storeQueryID(offersResponse.queryID)

    return { offersResponse, venuesResponse }
  } catch (error) {
    captureAlgoliaError(error)
    return {
      offersResponse: { hits: [] as Hit<Offer>[], nbHits: 0, page: 0, nbPages: 0 },
      venuesResponse: { hits: [] as Hit<AlgoliaVenue>[], nbHits: 0, page: 0, nbPages: 0 },
    }
  }
}
