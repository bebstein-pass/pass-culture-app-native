import { Venue } from 'features/venue/types'
import { LocationMode } from 'libs/algolia'
import { getCurrentVenuesIndex } from 'libs/algolia/fetchAlgolia/helpers/getCurrentVenuesIndex'
import { mockedSuggestedVenues } from 'libs/venue/fixtures/mockedSuggestedVenues'

const venuesIndexSearch = 'algoliaVenuesIndexPlaylistSearch'
const venuesIndexSearchNewest = 'algoliaVenuesIndexPlaylistSearchNewest'

describe('getCurrentVenuesIndex', () => {
  it("should return algoliaVenuesIndexPlaylistSearchNewest when locationType is EVERYWHERE and user don't share his position", () => {
    const locationType = LocationMode.EVERYWHERE
    const result = getCurrentVenuesIndex({ locationType })

    expect(result).toEqual(venuesIndexSearchNewest)
  })

  it('should return algoliaVenuesIndexPlaylistSearch when locationType is EVERYWHERE and user shares his position', () => {
    const userLocation = { latitude: 48.90374, longitude: 2.48171 }
    const locationType = LocationMode.EVERYWHERE
    const result = getCurrentVenuesIndex({ locationType, userLocation })

    expect(result).toEqual(venuesIndexSearch)
  })

  it.each([LocationMode.AROUND_ME, LocationMode.AROUND_PLACE])(
    'should return algoliaVenuesIndexPlaylistSearch when locationType is %s',
    (locationType) => {
      const result = getCurrentVenuesIndex({ locationType })

      expect(result).toEqual(venuesIndexSearch)
    }
  )

  it('should return algoliaVenuesIndexPlaylistSearch when a venue is selected', () => {
    const venue: Venue = mockedSuggestedVenues[0]
    const result = getCurrentVenuesIndex({ venue })

    expect(result).toEqual(venuesIndexSearch)
  })

  it('should return algoliaVenuesIndexPlaylistSearchNewest when neither position, locationType and venue is defined', () => {
    const result = getCurrentVenuesIndex({})

    expect(result).toEqual(venuesIndexSearchNewest)
  })
})
