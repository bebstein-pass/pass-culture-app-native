import algoliasearch from 'algoliasearch'

import { useSearchInfiniteQuery } from 'features/search/api/useSearchResults/useSearchResults'
import { initialSearchState } from 'features/search/context/reducer'
import { SearchState } from 'features/search/types'
import {
  mockedAlgoliaResponse,
  mockedAlgoliaVenueResponse,
} from 'libs/algolia/__mocks__/mockedAlgoliaResponse'
import { mockedFacets } from 'libs/algolia/__mocks__/mockedFacets'
import * as fetchSearchResults from 'libs/algolia/fetchAlgolia/fetchSearchResults/fetchSearchResults'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { flushAllPromisesWithAct, renderHook } from 'tests/utils'

jest.mock('algoliasearch')

const mockMultipleQueries = algoliasearch('', '').multipleQueries

describe('useSearchResults', () => {
  describe('useSearchInfiniteQuery', () => {
    it('should fetch offers, venues and all facets', async () => {
      renderHook(useSearchInfiniteQuery, {
        wrapper: ({ children }) => reactQueryProviderHOC(children),
        initialProps: initialSearchState,
      })

      await flushAllPromisesWithAct()

      expect(mockMultipleQueries).toHaveBeenNthCalledWith(1, [
        {
          indexName: 'algoliaOffersIndexName',
          params: {
            attributesToHighlight: [],
            attributesToRetrieve: [
              'offer.dates',
              'offer.isDigital',
              'offer.isDuo',
              'offer.isEducational',
              'offer.name',
              'offer.prices',
              'offer.subcategoryId',
              'offer.thumbUrl',
              'objectID',
              '_geoloc',
              'venue',
            ],
            clickAnalytics: true,
            facetFilters: [['offer.isEducational:false']],
            hitsPerPage: 20,
            numericFilters: [['offer.prices: 0 TO 300']],
            page: 0,
          },
          query: '',
        },
        {
          indexName: 'algoliaVenuesIndexPlaylistSearchNewest',
          params: { aroundRadius: 'all', clickAnalytics: true, hitsPerPage: 35, page: 0 },
          query: '',
        },
        {
          facets: [
            'offer.bookMacroSection',
            'offer.movieGenres',
            'offer.musicType',
            'offer.nativeCategoryId',
            'offer.showType',
          ],
          indexName: 'algoliaOffersIndexName',
          params: {
            facetFilters: [['offer.isEducational:false']],
            hitsPerPage: 20,
            numericFilters: [['offer.prices: 0 TO 300']],
            page: 0,
          },
          query: '',
        },
      ])
    })

    it('should not fetch again when focus on suggestion changes', async () => {
      const { rerender } = renderHook(
        (searchState: SearchState = initialSearchState) => useSearchInfiniteQuery(searchState),
        {
          wrapper: ({ children }) => reactQueryProviderHOC(children),
        }
      )

      await flushAllPromisesWithAct()
      rerender({ ...initialSearchState })

      expect(mockMultipleQueries).toHaveBeenCalledTimes(1)
    })

    // because of an Algolia issue, sometimes nbHits is at 0 even when there is some hits, cf PC-28287
    it('should show hit numbers even if nbHits is at 0 but hits are not null', async () => {
      jest.spyOn(fetchSearchResults, 'fetchSearchResults').mockResolvedValueOnce({
        offersResponse: { ...mockedAlgoliaResponse, nbHits: 0 },
        venuesResponse: mockedAlgoliaVenueResponse,
        facetsResponse: mockedFacets,
      })

      const { result } = renderHook(
        (searchState: SearchState = initialSearchState) => useSearchInfiniteQuery(searchState),
        {
          wrapper: ({ children }) => reactQueryProviderHOC(children),
        }
      )
      await flushAllPromisesWithAct()

      const hitNumber = result.current.nbHits

      expect(hitNumber).toEqual(4)
    })
  })
})
