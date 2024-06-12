import type { ReadonlyDeep } from 'type-fest'

import { SubcategoryIdEnum } from 'api/gen'
import { Offer } from 'shared/offer/types'
import { toMutable } from 'shared/types/toMutable'

export const VenueOffersResponseSnap = toMutable([
  {
    _geoloc: { lat: 47.8898, lng: -2.83593 },
    objectID: '223342',
    offer: {
      dates: [1629312300, 1629485100, 1629657900],
      isDigital: false,
      isDuo: true,
      name: 'Titane - VF',
      prices: [0, 0, 0],
      subcategoryId: SubcategoryIdEnum.CINE_PLEIN_AIR,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-ehp-testing-assets/thumbs/products/FARMG',
    },
    venue: {},
  },
  {
    _geoloc: { lat: 47.8898, lng: -2.83593 },
    objectID: '223338',
    offer: {
      dates: [1629312300, 1629485100, 1629657900],
      isDigital: false,
      isDuo: true,
      name: 'Bac Nord - VF',
      prices: [0, 0, 0],
      subcategoryId: SubcategoryIdEnum.CINE_PLEIN_AIR,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-ehp-testing-assets/thumbs/products/FARMG',
    },
    venue: {},
  },
  {
    _geoloc: { lat: 47.8898, lng: -2.83593 },
    objectID: '223339',
    offer: {
      dates: [1629312300, 1629485100, 1629657900],
      isDigital: false,
      isDuo: true,
      name: 'Black Widow - VF',
      prices: [0, 0, 0],
      subcategoryId: SubcategoryIdEnum.CINE_PLEIN_AIR,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-ehp-testing-assets/thumbs/products/FARMA',
    },
    venue: {},
  },
] as const satisfies ReadonlyDeep<Offer[]>)

export const VenueMoviesOffersResponseSnap: Offer[] = [
  {
    _geoloc: { lat: 47.8898, lng: -2.83593 },
    objectID: '223342',
    offer: {
      dates: [1629312300, 1629485100, 1629657900],
      isDigital: false,
      isDuo: true,
      name: 'Titane - VF',
      prices: [0, 0, 0],
      subcategoryId: SubcategoryIdEnum.SEANCE_CINE,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-ehp-testing-assets/thumbs/products/FARMG',
    },
    venue: {},
  },
  {
    _geoloc: { lat: 47.8898, lng: -2.83593 },
    objectID: '223338',
    offer: {
      dates: [1629312300, 1629485100, 1629657900],
      isDigital: false,
      isDuo: true,
      name: 'Bac Nord - VF',
      prices: [0, 0, 0],
      subcategoryId: SubcategoryIdEnum.SEANCE_CINE,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-ehp-testing-assets/thumbs/products/FARMG',
    },
    venue: {},
  },
  {
    _geoloc: { lat: 47.8898, lng: -2.83593 },
    objectID: '223339',
    offer: {
      dates: [1629312300, 1629485100, 1629657900],
      isDigital: false,
      isDuo: true,
      name: 'Black Widow - VF',
      prices: [0, 0, 0],
      subcategoryId: SubcategoryIdEnum.SEANCE_CINE,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-ehp-testing-assets/thumbs/products/FARMA',
    },
    venue: {},
  },
]
