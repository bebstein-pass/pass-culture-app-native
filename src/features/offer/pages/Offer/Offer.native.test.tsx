import { rest } from 'msw'

import { mockedBookingApi } from '__mocks__/fixtures/booking'
import { BookingsResponse, SearchGroupNameEnumv2 } from 'api/gen'
import { useAuthContext } from 'features/auth/context/AuthContext'
import { openUrl } from 'features/navigation/helpers/openUrl'
import * as useSimilarOffers from 'features/offer/api/useSimilarOffers'
import { PlaylistType } from 'features/offer/enums'
import { offerResponseSnap } from 'features/offer/fixtures/offerResponse'
import { offerId, renderOfferPage } from 'features/offer/helpers/renderOfferPageTestUtil'
import { beneficiaryUser } from 'fixtures/user'
import { mockedAlgoliaResponse } from 'libs/algolia/__mocks__/mockedAlgoliaResponse'
import { analytics } from 'libs/analytics'
import { env } from 'libs/environment'
import * as useFeatureFlagAPI from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import { server } from 'tests/server'
import { act, fireEvent, screen, waitFor } from 'tests/utils'
import { SNACK_BAR_TIME_OUT } from 'ui/components/snackBar/SnackBarContext'

jest.mock('features/auth/context/AuthContext')
const mockUseAuthContext = useAuthContext as jest.MockedFunction<typeof useAuthContext>

const useSimilarOffersSpy = jest.spyOn(useSimilarOffers, 'useSimilarOffers').mockImplementation()

let mockShouldUseAlgoliaRecommend = false
jest.mock('libs/firebase/remoteConfig/RemoteConfigProvider', () => ({
  useRemoteConfigContext: () => ({
    shouldUseAlgoliaRecommend: mockShouldUseAlgoliaRecommend,
  }),
}))

const mockShowErrorSnackBar = jest.fn()
jest.mock('ui/components/snackBar/SnackBarContext', () => ({
  useSnackBarContext: () => ({
    showErrorSnackBar: mockShowErrorSnackBar,
  }),
}))

jest.mock('features/navigation/helpers/openUrl')
const mockedOpenUrl = openUrl as jest.MockedFunction<typeof openUrl>

jest.spyOn(useFeatureFlagAPI, 'useFeatureFlag').mockReturnValue(true)

const offerDigitalAndFree = {
  isDigital: true,
  stocks: [
    {
      id: 118929,
      beginningDatetime: '2021-01-04T13:30:00',
      price: 0,
      isBookable: true,
      isExpired: false,
      isForbiddenToUnderage: false,
      isSoldOut: false,
      features: [],
    },
  ],
}

jest.useFakeTimers({ legacyFakeTimers: true })

describe('<Offer />', () => {
  beforeEach(() => {
    mockUseAuthContext.mockReturnValue({
      isLoggedIn: false,
      setIsLoggedIn: jest.fn(),
      refetchUser: jest.fn(),
      isUserLoading: false,
    })
  })

  it('animates on scroll', async () => {
    renderOfferPage()
    expect(screen.getByTestId('offerHeaderName').props.style.opacity).toBe(0)

    await act(async () => {
      const scrollContainer = screen.getByTestId('offer-container')
      fireEvent.scroll(scrollContainer, scrollEvent)
    })

    expect(screen.getByTestId('offerHeaderName').props.style.opacity).toBe(1)
  })

  it('should display authentication modal when clicking on "Réserver l’offre"', async () => {
    mockUseAuthContext.mockReturnValueOnce({
      isLoggedIn: false,
      setIsLoggedIn: jest.fn(),
      isUserLoading: false,
      refetchUser: jest.fn(),
      user: undefined,
    })

    renderOfferPage()

    const bookingOfferButton = await screen.findByText('Réserver l’offre')
    await act(async () => {
      fireEvent.press(bookingOfferButton)
    })

    expect(screen.queryByText('Identifie-toi pour réserver l’offre')).toBeOnTheScreen()
  })

  it('should log analytics when display authentication modal', async () => {
    mockUseAuthContext.mockImplementationOnce(() => ({
      isLoggedIn: false,
      setIsLoggedIn: jest.fn(),
      refetchUser: jest.fn(),
      isUserLoading: false,
    }))

    renderOfferPage()

    const bookingOfferButton = await screen.findByText('Réserver l’offre')
    await act(async () => {
      fireEvent.press(bookingOfferButton)
    })

    expect(analytics.logConsultAuthenticationModal).toHaveBeenNthCalledWith(1, offerId)
  })

  describe('with similar offers', () => {
    it('should pass offer venue position to `useSimilarOffers`', async () => {
      renderOfferPage()

      await act(async () => {})

      expect(useSimilarOffersSpy).toHaveBeenNthCalledWith(1, {
        categoryIncluded: SearchGroupNameEnumv2.FILMS_SERIES_CINEMA,
        offerId: offerResponseSnap.id,
        position: offerResponseSnap.venue.coordinates,
        shouldUseAlgoliaRecommend: false,
      })
      expect(useSimilarOffersSpy).toHaveBeenNthCalledWith(2, {
        categoryExcluded: SearchGroupNameEnumv2.FILMS_SERIES_CINEMA,
        offerId: offerResponseSnap.id,
        position: offerResponseSnap.venue.coordinates,
        shouldUseAlgoliaRecommend: false,
      })
    })

    it('should log two logPlaylistVerticalScroll events when scrolling vertical and reaching the bottom when there are 2 playlists', async () => {
      useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)
      useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)

      const { getByTestId } = renderOfferPage()
      const scrollView = getByTestId('offer-container')

      await act(async () => {
        fireEvent.scroll(scrollView, nativeEventBottom)
      })

      expect(analytics.logPlaylistVerticalScroll).toHaveBeenNthCalledWith(1, {
        fromOfferId: undefined,
        offerId: 116656,
        playlistType: PlaylistType.SAME_CATEGORY_SIMILAR_OFFERS,
        shouldUseAlgoliaRecommend: false,
      })
      expect(analytics.logPlaylistVerticalScroll).toHaveBeenNthCalledWith(2, {
        fromOfferId: undefined,
        offerId: 116656,
        playlistType: PlaylistType.OTHER_CATEGORIES_SIMILAR_OFFERS,
        shouldUseAlgoliaRecommend: false,
      })
    })

    it('should not log two logPlaylistVerticalScroll events when scrolling vertical and reaching the bottom when playlist are empty', async () => {
      useSimilarOffersSpy.mockReturnValueOnce([])
      useSimilarOffersSpy.mockReturnValueOnce([])
      const { getByTestId } = renderOfferPage()
      const scrollView = getByTestId('offer-container')

      await act(async () => {
        fireEvent.scroll(scrollView, nativeEventBottom)
      })

      await waitFor(() => {
        expect(analytics.logPlaylistVerticalScroll).not.toHaveBeenNthCalledWith(1, {
          fromOfferId: undefined,
          offerId: 116656,
          playlistType: PlaylistType.SAME_CATEGORY_SIMILAR_OFFERS,
          shouldUseAlgoliaRecommend: false,
        })
        expect(analytics.logPlaylistVerticalScroll).not.toHaveBeenNthCalledWith(2, {
          fromOfferId: undefined,
          offerId: 116656,
          playlistType: PlaylistType.OTHER_CATEGORIES_SIMILAR_OFFERS,
          shouldUseAlgoliaRecommend: false,
        })
      })
    })

    describe('When there is only same category similar offers playlist', () => {
      beforeAll(() => {
        useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)
        useSimilarOffersSpy.mockReturnValueOnce([])
      })

      it('should log logPlaylistVerticalScroll event with same category similar offers playlist param when scrolling vertical and reaching the bottom ', async () => {
        const { getByTestId } = renderOfferPage()
        const scrollView = getByTestId('offer-container')

        await act(async () => {
          fireEvent.scroll(scrollView, nativeEventBottom)
        })

        expect(analytics.logPlaylistVerticalScroll).toHaveBeenNthCalledWith(1, {
          fromOfferId: undefined,
          offerId: 116656,
          playlistType: PlaylistType.SAME_CATEGORY_SIMILAR_OFFERS,
          shouldUseAlgoliaRecommend: false,
        })
      })

      it('should not log logPlaylistVerticalScroll event with other categories similar offers playlist param when scrolling vertical and reaching the bottom', async () => {
        const { getByTestId } = renderOfferPage()
        const scrollView = getByTestId('offer-container')

        await act(async () => {
          fireEvent.scroll(scrollView, nativeEventBottom)
        })

        expect(analytics.logPlaylistVerticalScroll).not.toHaveBeenCalledWith({
          fromOfferId: undefined,
          offerId: 116656,
          playlistType: PlaylistType.OTHER_CATEGORIES_SIMILAR_OFFERS,
          shouldUseAlgoliaRecommend: false,
        })
      })
    })

    describe('When there is only other categories similar offers playlist', () => {
      beforeAll(() => {
        useSimilarOffersSpy.mockReturnValueOnce([])
        useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)
      })

      it('should log logPlaylistVerticalScroll event with other categories similar offers playlist param when scrolling vertical and reaching the bottom', async () => {
        const { getByTestId } = renderOfferPage()
        const scrollView = getByTestId('offer-container')

        await act(async () => {
          fireEvent.scroll(scrollView, nativeEventBottom)
        })

        expect(analytics.logPlaylistVerticalScroll).toHaveBeenNthCalledWith(1, {
          fromOfferId: undefined,
          offerId: 116656,
          playlistType: PlaylistType.OTHER_CATEGORIES_SIMILAR_OFFERS,
          shouldUseAlgoliaRecommend: false,
        })
      })

      it('should not log logPlaylistVerticalScroll event with same category similar offers playlist param when scrolling vertical and reaching the bottom', async () => {
        const { getByTestId } = renderOfferPage()
        const scrollView = getByTestId('offer-container')

        await act(async () => {
          fireEvent.scroll(scrollView, nativeEventBottom)
        })

        expect(analytics.logPlaylistVerticalScroll).not.toHaveBeenCalledWith({
          fromOfferId: undefined,
          offerId: 116656,
          playlistType: PlaylistType.SAME_CATEGORY_SIMILAR_OFFERS,
          shouldUseAlgoliaRecommend: false,
        })
      })
    })

    it('should not log logPlaylistVerticalScroll event when scrolling vertical and not reaching the bottom', async () => {
      useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)
      useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)
      renderOfferPage()
      const scrollView = screen.getByTestId('offer-container')

      await act(async () => {
        fireEvent.scroll(scrollView, nativeEventTop)
      })

      expect(analytics.logPlaylistVerticalScroll).not.toHaveBeenNthCalledWith(1, {
        fromOfferId: undefined,
        offerId: 116656,
        playlistType: PlaylistType.SAME_CATEGORY_SIMILAR_OFFERS,
        shouldUseAlgoliaRecommend: false,
      })
      expect(analytics.logPlaylistVerticalScroll).not.toHaveBeenNthCalledWith(2, {
        fromOfferId: undefined,
        offerId: 116656,
        playlistType: PlaylistType.OTHER_CATEGORIES_SIMILAR_OFFERS,
        shouldUseAlgoliaRecommend: false,
      })
    })

    it('should log logPlaylistVerticalScroll with the event param fromOfferId & offerId', async () => {
      useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)
      useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)
      const fromOfferId = 1
      const offerId = 116656
      renderOfferPage(fromOfferId)
      const scrollView = screen.getByTestId('offer-container')

      await act(async () => {
        fireEvent.scroll(scrollView, nativeEventBottom)
      })

      expect(analytics.logPlaylistVerticalScroll).toHaveBeenNthCalledWith(1, {
        fromOfferId,
        offerId,
        playlistType: PlaylistType.SAME_CATEGORY_SIMILAR_OFFERS,
        shouldUseAlgoliaRecommend: false,
      })
      expect(analytics.logPlaylistVerticalScroll).toHaveBeenNthCalledWith(2, {
        fromOfferId,
        offerId,
        playlistType: PlaylistType.OTHER_CATEGORIES_SIMILAR_OFFERS,
        shouldUseAlgoliaRecommend: false,
      })
    })

    describe('When A/B Testing activated', () => {
      beforeEach(() => {
        mockShouldUseAlgoliaRecommend = true
      })
      it('should log two logPlaylistVerticalScroll events when scrolling vertical and reaching the bottom when there are 2 playlists when A/B Testing activated', async () => {
        useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)
        useSimilarOffersSpy.mockReturnValueOnce(mockedAlgoliaResponse.hits)
        const { getByTestId } = renderOfferPage()
        const scrollView = getByTestId('offer-container')

        await act(async () => {
          fireEvent.scroll(scrollView, nativeEventBottom)
        })

        expect(analytics.logPlaylistVerticalScroll).toHaveBeenNthCalledWith(1, {
          fromOfferId: undefined,
          offerId: 116656,
          playlistType: PlaylistType.SAME_CATEGORY_SIMILAR_OFFERS,
          shouldUseAlgoliaRecommend: true,
        })
        expect(analytics.logPlaylistVerticalScroll).toHaveBeenNthCalledWith(2, {
          fromOfferId: undefined,
          offerId: 116656,
          playlistType: PlaylistType.OTHER_CATEGORIES_SIMILAR_OFFERS,
          shouldUseAlgoliaRecommend: true,
        })
      })
    })
  })

  it('should open booking modale when login after booking attempt', async () => {
    const newLocal = {
      isLoggedIn: true,
      setIsLoggedIn: jest.fn(),
      isUserLoading: false,
      refetchUser: jest.fn(),
      user: beneficiaryUser,
    }
    // Multiple renders force us to mock auth context as loggedIn user in this test
    // eslint-disable-next-line local-rules/independent-mocks
    mockUseAuthContext.mockReturnValue(newLocal)
    const fromOfferId = 1
    renderOfferPage(fromOfferId, undefined, true)

    await act(async () => {})

    expect(await screen.findByText('Valider la date')).toBeOnTheScreen()
  })

  it('should display reservation impossible when user has already booked the offer', async () => {
    const newLocal = {
      isLoggedIn: true,
      setIsLoggedIn: jest.fn(),
      isUserLoading: false,
      refetchUser: jest.fn(),
      user: beneficiaryUser,
    }
    // Multiple renders force us to mock auth context as loggedIn user in this test
    // eslint-disable-next-line local-rules/independent-mocks
    mockUseAuthContext.mockReturnValue(newLocal)

    const expectedResponse: BookingsResponse = {
      ended_bookings: [
        {
          ...mockedBookingApi,
          stock: {
            ...mockedBookingApi.stock,
            offer: { ...mockedBookingApi.stock.offer, id: offerId },
          },
          dateUsed: '2023-02-14T10:10:08.800599Z',
        },
      ],
      hasBookingsAfter18: false,
      ongoing_bookings: [],
    }

    server.use(
      rest.get(env.API_BASE_URL + '/native/v1/bookings', async (_, res, ctx) =>
        res(ctx.status(200), ctx.json(expectedResponse))
      )
    )

    renderOfferPage(mockedBookingApi.id)

    fireEvent.press(screen.getByText('Voir les disponibilités'))

    await waitFor(() => {
      expect(screen.queryByText('Réservation impossible')).toBeOnTheScreen()
    })
  })

  describe('When offer is digital and free and not already booked', () => {
    const expectedResponse: BookingsResponse = {
      ended_bookings: [],
      hasBookingsAfter18: false,
      ongoing_bookings: [
        {
          ...mockedBookingApi,
          stock: {
            ...mockedBookingApi.stock,
            offer: { ...mockedBookingApi.stock.offer, ...offerDigitalAndFree },
          },
          dateUsed: '2023-02-14T10:10:08.800599Z',
          completedUrl: 'https://www.google.fr/',
        },
      ],
    }
    describe('When booking API response is success', () => {
      it('should directly book and redirect to the offer when pressing button to book the offer', async () => {
        server.use(
          rest.get(env.API_BASE_URL + '/native/v1/bookings', async (_, res, ctx) =>
            res(ctx.status(200), ctx.json(expectedResponse))
          )
        )

        server.use(
          rest.post(env.API_BASE_URL + '/native/v1/bookings', (req, res, ctx) =>
            res(ctx.status(200), ctx.json({ bookingId: 123 }))
          )
        )

        // Multiple renders force us to mock auth context as loggedIn user in this test
        // eslint-disable-next-line local-rules/independent-mocks
        const newLocal = {
          isLoggedIn: true,
          setIsLoggedIn: jest.fn(),
          isUserLoading: false,
          refetchUser: jest.fn(),
          user: beneficiaryUser,
        }
        // Multiple renders force us to mock auth context as loggedIn user in this test
        // eslint-disable-next-line local-rules/independent-mocks
        mockUseAuthContext.mockReturnValue(newLocal)

        renderOfferPage(undefined, offerDigitalAndFree)

        await act(async () => {
          fireEvent.press(screen.getByText('Accéder à l’offre en ligne'))
        })

        expect(mockedOpenUrl).toHaveBeenNthCalledWith(1, 'https://www.google.fr/')
      })

      it('should not display an error message when pressing button to book the offer', async () => {
        server.use(
          rest.get(env.API_BASE_URL + '/native/v1/bookings', async (_, res, ctx) =>
            res(ctx.status(200), ctx.json(expectedResponse))
          )
        )

        server.use(
          rest.post(env.API_BASE_URL + '/native/v1/bookings', (req, res, ctx) =>
            res(ctx.status(200), ctx.json({ bookingId: 123 }))
          )
        )

        // Multiple renders force us to mock auth context as loggedIn user in this test
        // eslint-disable-next-line local-rules/independent-mocks
        const newLocal = {
          isLoggedIn: true,
          setIsLoggedIn: jest.fn(),
          isUserLoading: false,
          refetchUser: jest.fn(),
          user: beneficiaryUser,
        }
        // Multiple renders force us to mock auth context as loggedIn user in this test
        // eslint-disable-next-line local-rules/independent-mocks
        mockUseAuthContext.mockReturnValue(newLocal)

        renderOfferPage(undefined, offerDigitalAndFree)

        await act(async () => {
          fireEvent.press(screen.getByText('Accéder à l’offre en ligne'))
        })

        expect(mockShowErrorSnackBar).not.toHaveBeenCalled()
      })
    })

    describe('When booking API response is error', () => {
      it('should not direclty redirect to the offer when pressing button to book the offer', async () => {
        server.use(
          rest.get(env.API_BASE_URL + '/native/v1/bookings', async (_, res, ctx) =>
            res(ctx.status(200), ctx.json(expectedResponse))
          )
        )

        server.use(
          rest.post(env.API_BASE_URL + '/native/v1/bookings', (req, res, ctx) =>
            res(ctx.status(400))
          )
        )

        // Multiple renders force us to mock auth context as loggedIn user in this test
        // eslint-disable-next-line local-rules/independent-mocks
        const newLocal = {
          isLoggedIn: true,
          setIsLoggedIn: jest.fn(),
          isUserLoading: false,
          refetchUser: jest.fn(),
          user: beneficiaryUser,
        }
        // Multiple renders force us to mock auth context as loggedIn user in this test
        // eslint-disable-next-line local-rules/independent-mocks
        mockUseAuthContext.mockReturnValue(newLocal)

        renderOfferPage(undefined, offerDigitalAndFree)

        await act(async () => {
          fireEvent.press(screen.getByText('Accéder à l’offre en ligne'))
        })

        expect(mockedOpenUrl).not.toHaveBeenCalled()
      })

      it('should display an error message when pressing button to book the offer', async () => {
        server.use(
          rest.get(env.API_BASE_URL + '/native/v1/bookings', async (_, res, ctx) =>
            res(ctx.status(200), ctx.json(expectedResponse))
          )
        )

        server.use(
          rest.post(env.API_BASE_URL + '/native/v1/bookings', (req, res, ctx) =>
            res(ctx.status(400))
          )
        )

        // Multiple renders force us to mock auth context as loggedIn user in this test
        // eslint-disable-next-line local-rules/independent-mocks
        const newLocal = {
          isLoggedIn: true,
          setIsLoggedIn: jest.fn(),
          isUserLoading: false,
          refetchUser: jest.fn(),
          user: beneficiaryUser,
        }
        // Multiple renders force us to mock auth context as loggedIn user in this test
        // eslint-disable-next-line local-rules/independent-mocks
        mockUseAuthContext.mockReturnValue(newLocal)

        renderOfferPage(undefined, offerDigitalAndFree)

        await act(async () => {
          fireEvent.press(screen.getByText('Accéder à l’offre en ligne'))
        })

        expect(mockShowErrorSnackBar).toHaveBeenNthCalledWith(1, {
          message: 'Désolé, il est impossible d’ouvrir le lien. Réessaie plus tard.',
          timeout: SNACK_BAR_TIME_OUT,
        })
      })
    })
  })

  describe('When offer is digital and free and already booked', () => {
    const expectedResponse: BookingsResponse = {
      ended_bookings: [],
      hasBookingsAfter18: false,
      ongoing_bookings: [
        {
          ...mockedBookingApi,
          stock: {
            ...mockedBookingApi.stock,
            offer: { ...mockedBookingApi.stock.offer, ...offerDigitalAndFree },
          },
          dateUsed: '2023-02-14T10:10:08.800599Z',
          completedUrl: 'https://www.google.fr/',
        },
      ],
    }

    it('should directly redirect to the offer when pressing offer access button', async () => {
      server.use(
        rest.get(env.API_BASE_URL + '/native/v1/bookings', async (_, res, ctx) =>
          res(ctx.status(200), ctx.json(expectedResponse))
        )
      )

      // Multiple renders force us to mock auth context as loggedIn user in this test
      // eslint-disable-next-line local-rules/independent-mocks
      const newLocal = {
        isLoggedIn: true,
        setIsLoggedIn: jest.fn(),
        isUserLoading: false,
        refetchUser: jest.fn(),
        user: { ...beneficiaryUser, bookedOffers: { 116656: 123 } },
      }
      // Multiple renders force us to mock auth context as loggedIn user in this test
      // eslint-disable-next-line local-rules/independent-mocks
      mockUseAuthContext.mockReturnValue(newLocal)

      renderOfferPage(undefined, offerDigitalAndFree)

      await act(async () => {
        fireEvent.press(screen.getByText('Accéder à l’offre en ligne'))
      })

      expect(mockedOpenUrl).toHaveBeenCalledTimes(1)
    })
  })
})

const scrollEvent = {
  nativeEvent: {
    contentOffset: { y: 200 },
    layoutMeasurement: { height: 1000 },
    contentSize: { height: 1900 },
  },
}

const nativeEventBottom = {
  nativeEvent: {
    layoutMeasurement: { height: 1000 },
    contentOffset: { y: 900 },
    contentSize: { height: 1900 },
  },
}

const nativeEventTop = {
  nativeEvent: {
    layoutMeasurement: { height: 1000 },
    contentOffset: { y: 100 },
    contentSize: { height: 1900 },
  },
}
