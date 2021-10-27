import { SearchParametersFields } from 'features/home/contentful'
import { LocationType } from 'features/search/enums'
import { SearchState } from 'features/search/types'
import { GeoCoordinates } from 'libs/geolocation'
import { getCategoriesFacetFilters } from 'libs/search/utils'

export const parseGeolocationParameters = (
  geolocation: GeoCoordinates | null,
  isGeolocated?: boolean,
  aroundRadius?: number
): SearchState['locationFilter'] | undefined => {
  const notGeolocatedButRadiusIsProvided = !isGeolocated && aroundRadius
  const geolocatedButGeolocationIsInvalid = isGeolocated && !geolocation

  if (notGeolocatedButRadiusIsProvided || geolocatedButGeolocationIsInvalid) return

  return isGeolocated && geolocation
    ? { locationType: LocationType.AROUND_ME, aroundRadius: aroundRadius || null }
    : { locationType: LocationType.EVERYWHERE }
}

export const parseSearchParameters = (
  parameters: SearchParametersFields,
  geolocation: GeoCoordinates | null
): SearchState | undefined => {
  const { aroundRadius, isGeolocated, priceMin, priceMax } = parameters

  const locationFilter = parseGeolocationParameters(geolocation, isGeolocated, aroundRadius)
  if (!locationFilter) return

  const beginningDatetime = parameters.beginningDatetime
    ? new Date(parameters.beginningDatetime)
    : null

  const endingDatetime = parameters.endingDatetime ? new Date(parameters.endingDatetime) : null

  return {
    beginningDatetime: beginningDatetime,
    endingDatetime: endingDatetime,
    hitsPerPage: parameters.hitsPerPage || null,
    locationFilter,
    // We receive category labels from contentful. We first have to map to facetFilters used for search
    // TODO(antoinewg) Make sure the categories are sorted to reuse react-query cache
    offerCategories: (parameters.categories || []).map(getCategoriesFacetFilters),
    offerIsDuo: parameters.isDuo || false,
    offerIsFree: parameters.isFree || false,
    offerIsNew: parameters.newestOnly || false,
    offerTypes: {
      isDigital: parameters.isDigital || false,
      isEvent: parameters.isEvent || false,
      isThing: parameters.isThing || false,
    },
    priceRange: _buildPriceRange({ priceMin, priceMax }),
    showResults: false,
    tags: parameters.tags || [],
    date: null,
    timeRange: null,
    query: '',
  }
}

const _buildPriceRange = ({ priceMin = 0, priceMax = 300 }): [number, number] => {
  return [priceMin, priceMax]
}
