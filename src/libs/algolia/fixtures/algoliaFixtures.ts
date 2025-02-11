import { SearchResponse } from '@algolia/client-search'
import type { ReadonlyDeep } from 'type-fest'

import { SubcategoryIdEnum, VenueTypeCodeKey } from 'api/gen'
import { AlgoliaOfferWithArtistAndEan, AlgoliaVenue } from 'libs/algolia/types'
import { Offer } from 'shared/offer/types'
import { toMutable } from 'shared/types/toMutable'

export const mockedAlgoliaResponse = toMutable({
  hits: [
    {
      offer: {
        dates: [],
        isDigital: false,
        isDuo: false,
        name: 'La nuit des temps',
        prices: [28.0],
        subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
        thumbUrl:
          'https://storage.googleapis.com/passculture-metier-prod-production-assets-fine-grained/thumbs/mediations/CDNQ',
      },
      _geoloc: { lat: 48.94374, lng: 2.48171 },
      objectID: '102280',
      venue: {
        id: 1,
        name: 'Lieu 1',
        publicName: 'Lieu 1',
        address: '1 rue de la paix',
        postalCode: '75000',
        city: 'Paris',
      },
    },
    {
      offer: {
        dates: [],
        isDigital: false,
        isDuo: false,
        name: 'I want something more',
        prices: [23.0],
        subcategoryId: SubcategoryIdEnum.CONCERT,
        thumbUrl:
          'https://storage.googleapis.com/passculture-metier-prod-production-assets-fine-grained/thumbs/mediations/CDKQ',
      },
      _geoloc: { lat: 48.91265, lng: 2.4513 },
      objectID: '102272',
      venue: {
        id: 2,
        name: 'Lieu 2',
        publicName: 'Lieu 2',
        address: '2 rue de la paix',
        postalCode: '75000',
        city: 'Paris',
      },
    },
    {
      offer: {
        dates: [1605643200.0],
        isDigital: false,
        isDuo: true,
        name: 'Un lit sous une rivière',
        prices: [34.0],
        subcategoryId: SubcategoryIdEnum.CONCERT,
        thumbUrl:
          'https://storage.googleapis.com/passculture-metier-prod-production-assets-fine-grained/thumbs/mediations/CDBA',
      },
      _geoloc: { lat: 4.90339, lng: -52.31663 },
      objectID: '102249',
      venue: {
        id: 3,
        name: 'Lieu 3',
        publicName: 'Lieu 3',
        address: '3 rue de la paix',
        postalCode: '75000',
        city: 'Paris',
      },
    },
    {
      offer: {
        dates: [],
        isDigital: false,
        isDuo: false,
        name: 'I want something more',
        prices: [28.0],
        subcategoryId: SubcategoryIdEnum.CONCERT,
        thumbUrl:
          'https://storage.googleapis.com/passculture-metier-prod-production-assets-fine-grained/thumbs/mediations/CDZQ',
      },
      _geoloc: { lat: 4.90339, lng: -52.31663 },
      objectID: '102310',
      venue: {
        id: 4,
        name: 'Lieu 4',
        publicName: 'Lieu 4',
        address: '4 rue de la paix',
        postalCode: '75000',
        city: 'Paris',
      },
    },
  ],
  nbHits: 4,
  page: 0,
  nbPages: 1,
  hitsPerPage: 6,
  exhaustiveNbHits: true,
  query: '',
  params:
    'page=0&facetFilters=%5B%5B%22offer.category%3AMUSIQUE%22%2C%22offer.category%3AINSTRUMENT%22%5D%5D&numericFilters=%5B%5B%22offer.prices%3A+0+TO+300%22%5D%5D&hitsPerPage=6',
  processingTimeMS: 1,
} as const satisfies ReadonlyDeep<SearchResponse<Offer>>)

export const moreHitsForSimilarOffersPlaylist = toMutable([
  {
    offer: {
      dates: [],
      isDigital: false,
      isDuo: false,
      name: 'La nuit de tous les temps',
      prices: [28.0],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-prod-production-assets-fine-grained/thumbs/mediations/CDNQ',
    },
    _geoloc: { lat: 48.94374, lng: 2.48171 },
    objectID: '102281',
    venue: {},
  },
  {
    offer: {
      dates: [],
      isDigital: false,
      isDuo: false,
      name: 'I want something more and more',
      prices: [23.0],
      subcategoryId: SubcategoryIdEnum.CONCERT,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-prod-production-assets-fine-grained/thumbs/mediations/CDKQ',
    },
    _geoloc: { lat: 48.91265, lng: 2.4513 },
    objectID: '102273',
    venue: {},
  },
  {
    offer: {
      dates: [1605643200.0],
      isDigital: false,
      isDuo: true,
      name: 'Un lit sous une rivière pourpre',
      prices: [34.0],
      subcategoryId: SubcategoryIdEnum.CONCERT,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-prod-production-assets-fine-grained/thumbs/mediations/CDBA',
    },
    _geoloc: { lat: 4.90339, lng: -52.31663 },
    objectID: '102250',
    venue: {},
  },
  {
    offer: {
      dates: [],
      isDigital: false,
      isDuo: false,
      name: 'I want something more and more',
      prices: [28.0],
      subcategoryId: SubcategoryIdEnum.CONCERT,
      thumbUrl:
        'https://storage.googleapis.com/passculture-metier-prod-production-assets-fine-grained/thumbs/mediations/CDZQ',
    },
    _geoloc: { lat: 4.90339, lng: -52.31663 },
    objectID: '102311',
    venue: {},
  },
] as const)

export const mockedAlgoliaVenueResponse = toMutable({
  hits: [
    {
      city: 'CHATEAU-GONTIER-SUR-MAYENNE',
      postalCode: '53200',
      name: 'ESPACE CULTUREL LECLERC CHATEAU GONTIER',
      offerer_name: 'SAS AZE DIS',
      venue_type: VenueTypeCodeKey.CULTURAL_CENTRE,
      description: '',
      audio_disability: false,
      mental_disability: true,
      motor_disability: true,
      visual_disability: true,
      email: 'venue-4803-contact-email@anonymized.email',
      phone_number: '+33600004803',
      website: null,
      facebook: null,
      twitter: null,
      isPermanent: true,
      instagram: null,
      snapchat: null,
      banner_url:
        'https://storage.googleapis.com/passculture-metier-ehp-staging-assets-fine-grained/assets/venue_default_images/jan-antonin-kolar-hN_zCni3ILg-unsplash_1.png',
      _geoloc: {
        lat: 47.82939,
        lng: -0.68598,
      },
      objectID: '9774',
      _highlightResult: {
        name: {
          value: 'ESPACE CULTUREL LECLERC CHATEAU GONTIER',
          matchLevel: 'none',
          matchedWords: [],
          fullyHighlighted: false,
        },
      },
    },
    {
      city: 'CONCARNEAU',
      postalCode: '29900',
      name: 'CAC - Concarneau Scènes',
      offerer_name: 'COMMUNE DE CONCARNEAU',
      venue_type: VenueTypeCodeKey.CULTURAL_CENTRE,
      description: '',
      audio_disability: false,
      mental_disability: true,
      motor_disability: true,
      visual_disability: true,
      email: 'venue-28599-contact-email@anonymized.email',
      phone_number: '+33600028599',
      website: 'https://billetterie-concarneauscenes.tickandlive.com/',
      facebook: null,
      twitter: null,
      instagram: null,
      snapchat: null,
      isPermanent: true,
      banner_url:
        'https://storage.googleapis.com/passculture-metier-ehp-staging-assets-fine-grained/assets/venue_default_images/jan-antonin-kolar-hN_zCni3ILg-unsplash_1.png',
      _geoloc: {
        lat: 47.87007,
        lng: -3.92179,
      },
      objectID: '972',
      _highlightResult: {
        name: {
          value: 'CAC - Concarneau Scènes',
          matchLevel: 'none',
          matchedWords: [],
          fullyHighlighted: false,
        },
      },
    },
  ],
  nbHits: 4,
  page: 0,
  nbPages: 1,
  hitsPerPage: 6,
  exhaustiveNbHits: true,
  query: '',
  params:
    'page=0&facetFilters=%5B%5B%22offer.category%3AMUSIQUE%22%2C%22offer.category%3AINSTRUMENT%22%5D%5D&numericFilters=%5B%5B%22offer.prices%3A+0+TO+300%22%5D%5D&hitsPerPage=6',
  processingTimeMS: 1,
  userData: [
    {
      venue_playlist_title: 'test',
    },
  ],
} as const satisfies ReadonlyDeep<SearchResponse<AlgoliaVenue>>)

export const mockedAlgoliaOffersWithSameArtistResponse = toMutable([
  {
    offer: {
      artist: 'Eiichiro Oda',
      dates: [],
      ean: '9782344037102',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga one piece t91',
      prices: [6.99],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/998Q',
      bookFormat: 'Poche',
    },
    venue: {
      address: '19 RUE JOSEPH LE BRIX',
      city: 'VANNES',
      departmentCode: '56',
      id: 4070,
      name: 'Cheminant  Vannes',
      postalCode: '56000',
      publicName: 'Librairie Cheminant Vannes',
    },
    _geoloc: {
      lat: 47.65904,
      lng: -2.75922,
    },
    objectID: '16302',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723488525',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 1',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GU8A',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12794',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723489898',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 2',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUNQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12793',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723489904',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 3',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUNA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12792',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723489911',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 4',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUMQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12791',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723489928',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 5',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUMA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12790',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723489935',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 6',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GULQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12789',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723489942',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 7',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GULA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12788',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723489959',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 8',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUKQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12787',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723492539',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 9',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUKA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12786',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723492553',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 10',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUJQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12785',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723492560',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 11',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUJA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12784',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723492577',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 12',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GU9Q',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12783',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723492584',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 13',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GU9A',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12782',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723492591',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 14',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUHQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12781',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494724',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 16',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUGQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12777',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494731',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" -Tome 17',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUGA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12776',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494748',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 18',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUFQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12775',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494755',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 19',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUFA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12774',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494762',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 20',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUEQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12773',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494779',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 21',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUEA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12772',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494786',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 22',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUDQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12771',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494793',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 23',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUDA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12770',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494809',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 24',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUCQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12766',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494816',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 25',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUCA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12764',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494823',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 26',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUBQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12763',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494830',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 27',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUBA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12762',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494847',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 28',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUAQ',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12761',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494854',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 29',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GUAA',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12760',
  },
  {
    offer: {
      artist: 'Eiichiro ODA',
      dates: [],
      ean: '9782723494861',
      isDigital: false,
      isDuo: false,
      isEducational: false,
      name: 'Manga Série "One piece" - Tome 30',
      prices: [6.9],
      subcategoryId: SubcategoryIdEnum.LIVRE_PAPIER,
      thumbUrl: '/passculture-metier-ehp-staging-assets-fine-grained/thumbs/mediations/GT7Q',
    },
    venue: {
      address: '1 RUE DES FRANCS BOURGEOIS',
      city: 'STRASBOURG',
      departmentCode: '67',
      id: 2719,
      name: 'Librairie Kléber',
      postalCode: '67000',
      publicName: undefined,
    },
    _geoloc: {
      lat: 48.58276,
      lng: 7.74571,
    },
    objectID: '12759',
  },
] as const satisfies ReadonlyDeep<AlgoliaOfferWithArtistAndEan[]>)
