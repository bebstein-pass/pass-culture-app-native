import {
  CategoryNameEnum,
  CategoryType,
  ExpenseDomain,
  OfferResponse,
  SubcategoryIdEnum,
} from 'api/gen'

export const mockOffer: OfferResponse = {
  id: 146112,
  accessibility: {
    audioDisability: null,
    mentalDisability: null,
    motorDisability: null,
    visualDisability: null,
  },
  description: null,
  expenseDomains: [ExpenseDomain.All],
  externalTicketOfficeUrl: null,
  extraData: {
    author: null,
    durationMinutes: 60,
    isbn: null,
    musicSubType: null,
    musicType: null,
    performer: null,
    showSubType: null,
    showType: null,
    stageDirector: null,
    speaker: null,
    visa: null,
  },
  isReleased: false,
  isExpired: false,
  isSoldOut: false,
  isDigital: false,
  isDuo: true,
  isEducational: false,
  name: 'Je ne sais pas ce que je dis',
  category: {
    categoryType: CategoryType.Event,
    label: 'Pratique artistique',
    name: CategoryNameEnum.LECON,
  },
  subcategoryId: SubcategoryIdEnum.EVENEMENTPATRIMOINE,
  stocks: [
    {
      id: 148409,
      beginningDatetime: new Date('2021-03-02T20:00:00'),
      bookingLimitDatetime: new Date('2021-03-02T20:00:00'),
      cancellationLimitDatetime: new Date('2021-03-08T12:14:57.081907'),
      isBookable: true,
      price: 2400,
      isExpired: false,
      isSoldOut: false,
    },
    {
      id: 148411,
      beginningDatetime: new Date('2021-03-02T10:00:00'),
      bookingLimitDatetime: new Date('2021-03-02T10:00:00'),
      cancellationLimitDatetime: new Date('2021-03-08T12:14:57.081907'),
      isBookable: false,
      price: 2400,
      isExpired: false,
      isSoldOut: false,
    },
    {
      id: 148410,
      beginningDatetime: new Date('2021-03-17T20:00:00'),
      bookingLimitDatetime: new Date('2021-03-17T20:00:00'),
      cancellationLimitDatetime: new Date('2021-03-10T12:14:57.082005'),
      isBookable: true,
      price: 2700,
      isExpired: false,
      isSoldOut: false,
    },
  ],
  image: {
    url:
      'https://storage.gra.cloud.ovh.net/v1/AUTH_688df1e25bd84a48a3804e7fa8938085/storage-pc-dev/thumbs/mediations/CW8Q',
    credit: null,
  },
  venue: {
    id: 2090,
    address: 'RUE DE CALI',
    city: 'Kourou',
    offerer: {
      name: 'Ferme des sarbacanes',
    },
    name: 'Cinéma de la fin',
    postalCode: '97310',
    publicName: null,
    coordinates: {
      latitude: 5.15839,
      longitude: -52.63741,
    },
    isPermanent: true,
  },
  withdrawalDetails: null,
}

export const mockDigitalOffer: OfferResponse = {
  id: 146113,
  accessibility: {
    audioDisability: null,
    mentalDisability: null,
    motorDisability: null,
    visualDisability: null,
  },
  description: null,
  expenseDomains: [ExpenseDomain.All],
  externalTicketOfficeUrl: null,
  extraData: {
    author: null,
    durationMinutes: 60,
    isbn: null,
    musicSubType: null,
    musicType: null,
    performer: null,
    showSubType: null,
    showType: null,
    stageDirector: null,
    speaker: null,
    visa: null,
  },
  isReleased: false,
  isExpired: false,
  isSoldOut: false,
  isDigital: true,
  isDuo: true,
  isEducational: false,
  name: 'Je ne sais pas ce que je dis',
  category: {
    categoryType: CategoryType.Thing,
    label: 'Jeux videos',
    name: CategoryNameEnum.JEUXVIDEO,
  },
  subcategoryId: SubcategoryIdEnum.JEUSUPPORTPHYSIQUE,
  stocks: [
    {
      id: 148401,
      beginningDatetime: new Date('2021-03-02T20:00:00'),
      bookingLimitDatetime: new Date('2021-03-02T20:00:00'),
      cancellationLimitDatetime: new Date('2021-03-08T12:14:57.081907'),
      isBookable: true,
      price: 2400,
      isExpired: false,
      isSoldOut: false,
    },
  ],
  image: {
    url:
      'https://storage.gra.cloud.ovh.net/v1/AUTH_688df1e25bd84a48a3804e7fa8938085/storage-pc-dev/thumbs/mediations/CW8Q',
    credit: null,
  },
  venue: {
    id: 2090,
    address: 'RUE DE CALI',
    city: 'Kourou',
    offerer: {
      name: 'Ferme des sarbacanes',
    },
    name: 'Cinéma de la fin',
    postalCode: '97310',
    publicName: null,
    coordinates: {
      latitude: 5.15839,
      longitude: -52.63741,
    },
    isPermanent: true,
  },
  withdrawalDetails: null,
}
