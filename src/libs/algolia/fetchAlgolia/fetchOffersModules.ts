import { OffersPlaylistParameters } from 'features/home/types'
import { buildOffersModulesQueries } from 'libs/algolia/fetchAlgolia/fetchMultipleOffers/helpers/buildOffersModulesQueries'
import { multipleQueries } from 'libs/algolia/fetchAlgolia/multipleQueries'
import { Position } from 'libs/location'
import { Offer } from 'shared/offer/types'

type FetchMultipleOffersArgs = {
  paramsList: OffersPlaylistParameters[]
  userLocation: Position
  isUserUnderage: boolean
}

export const fetchOffersModules = async ({
  paramsList,
  userLocation,
  isUserUnderage,
}: FetchMultipleOffersArgs) => {
  const queries = buildOffersModulesQueries({
    paramsList,
    userLocation,
    isUserUnderage,
  })

  return multipleQueries<Offer>(queries)
}
