import algoliasearch from 'algoliasearch'

import { SearchGroupNameEnumv2 } from 'api/gen'
import {
  buildAlgoliaFilter,
  fetchOffersByArtist,
} from 'features/offer/api/fetchOffersByArtist/fetchOffersByArtist'
import { offerAttributesToRetrieve } from 'libs/algolia/fetchAlgolia/buildAlgoliaParameters/offerAttributesToRetrieve'

jest.mock('algoliasearch')

const mockInitIndex = algoliasearch('', '').initIndex
const search = mockInitIndex('').search as jest.Mock

describe('fetchOffersByArtist', () => {
  it('should execute the query if artist is provided, searchGroupName is a book, and artist is not "collectif"', async () => {
    await fetchOffersByArtist({
      artists: 'Eiichiro Oda',
      searchGroupName: SearchGroupNameEnumv2.LIVRES,
      venueLocation: { latitude: 47.65904, longitude: -2.75922 },
    })

    expect(search).toHaveBeenCalledWith('', {
      page: 0,
      filters: 'offer.artist:"Eiichiro Oda"',
      hitsPerPage: 30,
      attributesToRetrieve: [...offerAttributesToRetrieve, 'offer.artist', 'offer.ean'],
      attributesToHighlight: [],
      aroundRadius: 50000,
      aroundLatLng: '47.65904, -2.75922',
    })
  })

  it('should not execute the query if artist is provided, searchGroupName is not a book and artist is not "collectif"', async () => {
    await fetchOffersByArtist({
      artists: 'Eiichiro Oda',
      searchGroupName: SearchGroupNameEnumv2.FILMS_SERIES_CINEMA,
      venueLocation: { latitude: 47.65904, longitude: -2.75922 },
    })

    expect(search).not.toHaveBeenCalled()
  })

  it('should not execute the query if artist is provided, searchGroupName is a book, and artist is "COLLECTIF"', async () => {
    await fetchOffersByArtist({
      artists: 'COLLECTIF',
      searchGroupName: SearchGroupNameEnumv2.FILMS_SERIES_CINEMA,
      venueLocation: { latitude: 47.65904, longitude: -2.75922 },
    })

    expect(search).not.toHaveBeenCalled()
  })

  it('should not execute the query if artist is provided, searchGroupName is a book, and artist is "COLLECTIFS"', async () => {
    await fetchOffersByArtist({
      artists: 'COLLECTIFS',
      searchGroupName: SearchGroupNameEnumv2.FILMS_SERIES_CINEMA,
      venueLocation: { latitude: 47.65904, longitude: -2.75922 },
    })

    expect(search).not.toHaveBeenCalled()
  })
})

describe('buildAlgoliaFilter', () => {
  it('should build the correct filter when artist is provided', () => {
    const filter = buildAlgoliaFilter({
      artists: 'Eiichiro Oda',
    })

    expect(filter).toEqual('offer.artist:"Eiichiro Oda"')
  })

  it('should handle multiple artists and ean', () => {
    const filter = buildAlgoliaFilter({
      artists: 'Eiichiro Oda ; Another Artist',
    })

    expect(filter).toEqual('offer.artist:"Eiichiro Oda"')
  })
})
