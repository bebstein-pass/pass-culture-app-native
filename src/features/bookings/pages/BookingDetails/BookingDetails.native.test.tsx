import React from 'react'
import { UseQueryResult } from 'react-query'

import { navigate, useRoute } from '__mocks__/@react-navigation/native'
import {
  BookingReponse,
  BookingsResponse,
  SubcategoriesResponseModelv2,
  SubcategoryIdEnum,
  WithdrawalTypeEnum,
} from 'api/gen'
import * as ongoingOrEndedBookingAPI from 'features/bookings/api/useOngoingOrEndedBooking'
import { bookingsSnap } from 'features/bookings/fixtures/bookingsSnap'
import * as bookingPropertiesAPI from 'features/bookings/helpers/getBookingProperties'
import { Booking } from 'features/bookings/types'
import { withAsyncErrorBoundary } from 'features/errors/hocs/withAsyncErrorBoundary'
import { openUrl } from 'features/navigation/helpers/openUrl'
import { analytics } from 'libs/analytics'
import * as useFeatureFlagAPI from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import * as OpenItinerary from 'libs/itinerary/useOpenItinerary'
import * as useNetInfoContextDefault from 'libs/network/NetInfoWrapper'
import { subcategoriesDataTest } from 'libs/subcategories/fixtures/subcategoriesResponse'
import { mockServer } from 'tests/mswServer'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { act, fireEvent, render, screen, waitFor } from 'tests/utils'
import { SNACK_BAR_TIME_OUT } from 'ui/components/snackBar/SnackBarContext'

import { BookingDetails as BookingDetailsDefault } from './BookingDetails'

const BookingDetails = withAsyncErrorBoundary(BookingDetailsDefault)

jest.mock('libs/itinerary/useItinerary', () => ({
  useItinerary: jest.fn(() => ({ availableApps: ['waze'], navigateTo: jest.fn() })),
}))

jest.unmock('react-native/Libraries/Animated/createAnimatedComponent')
jest.useFakeTimers()

jest.mock('features/navigation/navigationRef')
jest.mock('features/navigation/helpers/openUrl')
const mockedOpenUrl = openUrl as jest.MockedFunction<typeof openUrl>

const mockUseNetInfoContext = jest.spyOn(useNetInfoContextDefault, 'useNetInfoContext') as jest.Mock

const mockShowInfoSnackBar = jest.fn()
const mockShowErrorSnackBar = jest.fn()
jest.mock('ui/components/snackBar/SnackBarContext', () => ({
  ...jest.requireActual('ui/components/snackBar/SnackBarContext'),
  useSnackBarContext: jest.fn(() => ({
    showInfoSnackBar: mockShowInfoSnackBar,
    showErrorSnackBar: mockShowErrorSnackBar,
  })),
}))

let mockBookings = { ...bookingsSnap }

jest.mock('features/bookings/api/useBookings', () => ({
  useBookings: jest.fn(() => ({
    data: mockBookings,
  })),
}))

jest.mock('libs/firebase/analytics/analytics')

const useFeatureFlagSpy = jest.spyOn(useFeatureFlagAPI, 'useFeatureFlag').mockReturnValue(false)

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest.mock('react-native-safe-area-context', () => ({
  ...(jest.requireActual('react-native-safe-area-context') as Record<string, unknown>),
  useSafeAreaInsets: () => ({ bottom: 16, right: 16, left: 16, top: 16 }),
}))

jest.mock('@batch.com/react-native-plugin', () =>
  jest.requireActual('__mocks__/libs/react-native-batch')
)

describe('BookingDetails', () => {
  let ongoingBookings = mockBookings.ongoing_bookings[0]
  let endedBookings = mockBookings.ended_bookings[0]

  beforeEach(() => {
    ongoingBookings = mockBookings.ongoing_bookings[0]
    endedBookings = mockBookings.ended_bookings[0]

    mockServer.getApi<SubcategoriesResponseModelv2>('/v1/subcategories/v2', subcategoriesDataTest)
    mockUseNetInfoContext.mockReturnValue({ isConnected: true })
  })

  afterEach(() => {
    mockBookings = { ...bookingsSnap }
  })

  beforeAll(() => {
    useRoute.mockImplementation(() => ({
      params: {
        id: 456,
      },
    }))
  })

  it('should call useOngoingOrEndedBooking with the right parameters', async () => {
    const useOngoingOrEndedBooking = jest.spyOn(
      ongoingOrEndedBookingAPI,
      'useOngoingOrEndedBooking'
    )

    renderBookingDetails(ongoingBookings)

    await screen.findByText('Ma réservation')

    expect(useOngoingOrEndedBooking).toHaveBeenCalledWith(456)
  })

  it('should render correctly', async () => {
    const booking: BookingsResponse['ongoing_bookings'][number] = structuredClone(ongoingBookings)
    booking.completedUrl = 'https://example.com'
    renderBookingDetails(booking)

    await screen.findByText('Ma réservation')

    expect(screen).toMatchSnapshot()
  })

  describe('<DetailedBookingTicket />', () => {
    it('should display booking token', async () => {
      renderBookingDetails(ongoingBookings)

      await screen.findByText('Ma réservation')

      expect(await screen.findByText('352UW4')).toBeOnTheScreen()
    })

    it('should display offer link button if offer is digital and open url on press', async () => {
      const booking: BookingsResponse['ongoing_bookings'][number] = structuredClone(ongoingBookings)
      booking.stock.offer.isDigital = true
      booking.completedUrl = 'https://example.com'

      renderBookingDetails(booking)

      const offerButton = screen.getByText('Accéder à l’offre en ligne')
      await act(async () => {
        fireEvent.press(offerButton)
      })

      expect(mockedOpenUrl).toHaveBeenCalledWith(
        booking.completedUrl,
        {
          analyticsData: {
            offerId: booking.stock.offer.id,
          },
        },
        true
      )
    })

    it('should not display offer link button if no url', async () => {
      renderBookingDetails(ongoingBookings)

      await screen.findByText('Ma réservation')

      expect(screen.queryByText('Accéder à l’offre')).not.toBeOnTheScreen()
    })

    it('should display booking qr code if offer is physical', async () => {
      const booking: BookingsResponse['ongoing_bookings'][number] = structuredClone(ongoingBookings)
      booking.stock.offer.isDigital = false
      renderBookingDetails(booking)

      await screen.findByText('Ma réservation')

      expect(await screen.findByTestId('qr-code')).toBeOnTheScreen()
    })

    it('should display EAN code if offer is a book (digital or physical)', async () => {
      const booking: BookingsResponse['ongoing_bookings'][number] = structuredClone(ongoingBookings)
      booking.stock.offer.subcategoryId = SubcategoryIdEnum.LIVRE_PAPIER
      renderBookingDetails(booking)

      await screen.findByText('Ma réservation')

      expect(await screen.findByText('123456789')).toBeOnTheScreen()
    })
  })

  describe('Offer rules', () => {
    it('should display rules for a digital offer', async () => {
      const booking = structuredClone(ongoingBookings)
      booking.stock.offer.isDigital = true

      renderBookingDetails(booking)

      await screen.findByText('Ma réservation')

      expect(
        await screen.findByText(
          'Ce code à 6 caractères est ta preuve d’achat\u00a0! N’oublie pas que tu n’as pas le droit de le revendre ou le céder.'
        )
      ).toBeOnTheScreen()
    })

    it('should display rules for a digital offer with activation code', async () => {
      const booking: BookingsResponse['ongoing_bookings'][number] = structuredClone(ongoingBookings)
      booking.stock.offer.isDigital = true
      booking.activationCode = {
        code: 'fdfdfsds',
      }

      renderBookingDetails(booking)

      await screen.findByText('Ma réservation')

      expect(
        await screen.findByText(
          'Ce code est ta preuve d’achat, il te permet d’accéder à ton offre\u00a0! N’oublie pas que tu n’as pas le droit de le revendre ou le céder.'
        )
      ).toBeOnTheScreen()
    })

    it.each([
      ['event', true, WithdrawalTypeEnum.on_site],
      ['physical', false, null],
    ])(
      'should display rules for a %s & non-digital offer',
      async (type, isEvent, withdrawalType) => {
        let booking: BookingsResponse['ongoing_bookings'][number] = structuredClone(ongoingBookings)

        booking = {
          ...booking,
          stock: { ...booking.stock, offer: { ...booking.stock.offer, withdrawalType } },
        }
        jest
          .spyOn(bookingPropertiesAPI, 'getBookingProperties')
          .mockReturnValue({ isEvent, isDigital: false, isPhysical: !isEvent })

        renderBookingDetails(booking)

        await screen.findByText('Ma réservation')

        expect(
          await screen.findByText(
            'Pour profiter de ta réservation, tu dois présenter ta carte d’identité et ce code à 6 caractères. N’oublie pas que tu n’as pas le droit de le revendre ou le céder.'
          )
        ).toBeOnTheScreen()
      }
    )
  })

  describe('withdrawalDetails', () => {
    it('should display withdrawal details', async () => {
      // @ts-expect-error: because of noUncheckedIndexedAccess
      ongoingBookings.stock.offer.withdrawalDetails = 'Voici comment récupérer ton bien'

      renderBookingDetails(ongoingBookings)

      await screen.findByText('Modalités de retrait')

      expect(screen.getByText('Voici comment récupérer ton bien')).toBeOnTheScreen()
    })

    it('should not display withdrawal details', async () => {
      const booking: BookingsResponse['ongoing_bookings'][number] = ongoingBookings

      booking.stock.offer.withdrawalDetails = undefined
      renderBookingDetails(booking)
      await screen.findByText('Ma réservation')

      const title = screen.queryByText('Modalités de retrait')
      const withdrawalText = screen.queryByTestId('withdrawalDetails')

      expect(title).not.toBeOnTheScreen()
      expect(withdrawalText).not.toBeOnTheScreen()
    })
  })

  describe('booking email contact', () => {
    it('should display booking email contact when there is a booking contact email', async () => {
      const booking: BookingsResponse['ongoing_bookings'][number] = ongoingBookings
      booking.stock.offer.bookingContact = 'bookingContactTest@email.com'
      renderBookingDetails(booking)
      await screen.findByText('Ma réservation')

      expect(screen.getByText('Contact de l’organisateur')).toBeOnTheScreen()
      expect(screen.getByText('bookingContactTest@email.com')).toBeOnTheScreen()
    })

    it('should not display booking email contact when there is no booking contact email', async () => {
      const booking: BookingsResponse['ongoing_bookings'][number] = ongoingBookings
      booking.stock.offer.bookingContact = undefined
      renderBookingDetails(booking)
      await screen.findByText('Ma réservation')

      expect(screen.queryByText("Contact de l'organisateur")).not.toBeOnTheScreen()
    })

    it("should open mail app and log ClickEmailOrganizer when clicking on Venue's mail address", async () => {
      const booking: BookingsResponse['ongoing_bookings'][number] = ongoingBookings
      booking.stock.offer.bookingContact = 'bookingContactTest@email.com'
      renderBookingDetails(booking)
      await screen.findByText('Ma réservation')

      fireEvent.press(screen.getByText('bookingContactTest@email.com'))

      expect(analytics.logClickEmailOrganizer).toHaveBeenCalledTimes(1)

      await act(() => {})

      expect(mockedOpenUrl).toHaveBeenCalledWith(
        `mailto:bookingContactTest@email.com`,
        undefined,
        true
      )
    })
  })

  it('should redirect to the Offer page and log event', async () => {
    const booking: BookingsResponse['ongoing_bookings'][number] = ongoingBookings
    renderBookingDetails(booking)

    const text = screen.getByText('Voir le détail de l’offre')
    await act(async () => {
      fireEvent.press(text)
    })

    const offerId = booking.stock.offer.id

    expect(navigate).toHaveBeenCalledWith('Offer', {
      id: offerId,
      from: 'bookingdetails',
    })
    expect(analytics.logConsultOffer).toHaveBeenCalledWith({ offerId, from: 'bookings' })
  })

  it('should not redirect to the Offer and showSnackBarError when not connected', async () => {
    mockUseNetInfoContext.mockReturnValueOnce({ isConnected: false })

    renderBookingDetails(ongoingBookings)

    const text = screen.getByText('Voir le détail de l’offre')
    await act(async () => {
      fireEvent.press(text)
    })

    const offerId = ongoingBookings.stock.offer.id

    expect(navigate).not.toHaveBeenCalledWith('Offer', {
      id: offerId,
      from: 'bookingdetails',
    })
    expect(analytics.logConsultOffer).not.toHaveBeenCalledWith({ offerId, from: 'bookings' })
    expect(mockShowErrorSnackBar).toHaveBeenCalledWith({
      message: `Impossible d’afficher le détail de l’offre. Connecte-toi à internet avant de réessayer.`,
      timeout: SNACK_BAR_TIME_OUT,
    })
  })

  describe('cancellation button', () => {
    it('should log event "CancelBooking" when cancelling booking', async () => {
      const booking: BookingsResponse['ongoing_bookings'][number] = structuredClone(ongoingBookings)
      const date = new Date()
      date.setDate(date.getDate() + 1)
      booking.confirmationDate = date.toISOString()
      renderBookingDetails(booking)

      const cancelButton = screen.getAllByTestId('Annuler ma réservation')[0]
      await act(async () => {
        if (cancelButton) {
          fireEvent.press(cancelButton)
        }
      })

      expect(analytics.logCancelBooking).toHaveBeenCalledWith(booking.stock.offer.id)
    })
  })

  describe('cancellation message', () => {
    describe('should display it and navigate to ended bookings', () => {
      beforeEach(() => {
        useRoute.mockImplementation(() => ({
          params: {
            id: 321,
          },
        }))
      })

      it('when booking is digital with expiration date', async () => {
        const booking: BookingsResponse['ongoing_bookings'][number] = {
          ...endedBookings,
          expirationDate: '2021-03-17T23:01:37.925926',
        }

        mockBookings = {
          ...mockBookings,
          // @ts-expect-error: because of noUncheckedIndexedAccess
          ended_bookings: [booking],
        }

        const nameCanceledBooking = booking.stock.offer.name
        renderBookingDetails(booking)

        await screen.findByText('Ma réservation')

        expect(mockShowInfoSnackBar).toHaveBeenCalledWith({
          message: `Ta réservation "${nameCanceledBooking}" a été annulée`,
          timeout: SNACK_BAR_TIME_OUT,
        })
        expect(navigate).toHaveBeenCalledWith('EndedBookings')
      })

      it('when booking is not digital with expiration date', async () => {
        const booking: BookingsResponse['ongoing_bookings'][number] = {
          ...endedBookings,
          expirationDate: '2021-03-17T23:01:37.925926',
          stock: {
            ...endedBookings.stock,
            offer: { ...endedBookings.stock.offer, isDigital: false },
          },
        }

        mockBookings = {
          ...mockBookings,
          // @ts-expect-error: because of noUncheckedIndexedAccess
          ended_bookings: [booking],
        }

        const nameCanceledBooking = booking.stock.offer.name
        renderBookingDetails(booking)

        await screen.findByText('Ma réservation')

        expect(mockShowInfoSnackBar).toHaveBeenCalledWith({
          message: `Ta réservation "${nameCanceledBooking}" a été annulée`,
          timeout: SNACK_BAR_TIME_OUT,
        })
        expect(navigate).toHaveBeenCalledWith('EndedBookings')
      })

      it('when booking is not digital without expiration date', async () => {
        const booking = {
          ...endedBookings,
          expirationDate: null,
          stock: {
            ...endedBookings.stock.offer,
            offer: { ...endedBookings.stock.offer, isDigital: false },
            price: 400,
            priceCategoryLabel: 'Cat 4',
            features: ['VOSTFR', '3D', 'IMAX'],
          },
        }

        mockBookings = {
          ...mockBookings,
          // @ts-expect-error: because of noUncheckedIndexedAccess
          ended_bookings: [booking],
        }

        const nameCanceledBooking = booking.stock.offer.name

        renderBookingDetails(booking)

        await screen.findByText('Ma réservation')

        expect(mockShowInfoSnackBar).toHaveBeenCalledWith({
          message: `Ta réservation "${nameCanceledBooking}" a été annulée`,
          timeout: SNACK_BAR_TIME_OUT,
        })
        expect(navigate).toHaveBeenCalledWith('EndedBookings')
      })
    })

    it('should not display it and not navigate when booking is digital without expiration date', async () => {
      renderBookingDetails(endedBookings)
      await screen.findByText('Ma réservation')

      expect(mockShowInfoSnackBar).not.toHaveBeenCalled()
      expect(navigate).not.toHaveBeenCalled()
    })

    describe('when booking improve feature flag is activated should display it and navigate to bookings', () => {
      beforeEach(() => {
        useFeatureFlagSpy.mockReturnValue(true)
        useRoute.mockImplementation(() => ({
          params: {
            id: 321,
          },
        }))
      })

      it('when booking is digital with expiration date', async () => {
        const booking: BookingsResponse['ongoing_bookings'][number] = {
          ...endedBookings,
          expirationDate: '2021-03-17T23:01:37.925926',
        }

        mockBookings = {
          ...mockBookings,
          // @ts-expect-error: because of noUncheckedIndexedAccess
          ended_bookings: [booking],
        }

        const nameCanceledBooking = booking.stock.offer.name
        renderBookingDetails(booking)

        await screen.findByText('Ma réservation')

        expect(mockShowInfoSnackBar).toHaveBeenCalledWith({
          message: `Ta réservation "${nameCanceledBooking}" a été annulée`,
          timeout: SNACK_BAR_TIME_OUT,
        })
        expect(navigate).toHaveBeenCalledWith('Bookings')
      })

      it('when booking is not digital with expiration date', async () => {
        const booking: BookingsResponse['ongoing_bookings'][number] = {
          ...endedBookings,
          expirationDate: '2021-03-17T23:01:37.925926',
          stock: {
            ...endedBookings.stock,
            offer: { ...endedBookings.stock.offer, isDigital: false },
          },
        }

        mockBookings = {
          ...mockBookings,
          // @ts-expect-error: because of noUncheckedIndexedAccess
          ended_bookings: [booking],
        }

        const nameCanceledBooking = booking.stock.offer.name
        renderBookingDetails(booking)

        await screen.findByText('Ma réservation')

        expect(mockShowInfoSnackBar).toHaveBeenCalledWith({
          message: `Ta réservation "${nameCanceledBooking}" a été annulée`,
          timeout: SNACK_BAR_TIME_OUT,
        })
        expect(navigate).toHaveBeenCalledWith('Bookings')
      })

      it('when booking is not digital without expiration date', async () => {
        const booking = {
          ...endedBookings,
          expirationDate: null,
          stock: {
            ...endedBookings.stock.offer,
            offer: { ...endedBookings.stock.offer, isDigital: false },
            price: 400,
            priceCategoryLabel: 'Cat 4',
            features: ['VOSTFR', '3D', 'IMAX'],
          },
        }

        mockBookings = {
          ...mockBookings,
          // @ts-expect-error: because of noUncheckedIndexedAccess
          ended_bookings: [booking],
        }

        const nameCanceledBooking = booking.stock.offer.name

        renderBookingDetails(booking)

        await screen.findByText('Ma réservation')

        expect(mockShowInfoSnackBar).toHaveBeenCalledWith({
          message: `Ta réservation "${nameCanceledBooking}" a été annulée`,
          timeout: SNACK_BAR_TIME_OUT,
        })
        expect(navigate).toHaveBeenCalledWith('Bookings')
      })
    })
  })

  describe('booking not found', () => {
    it('should render ScreenError BookingNotFound when booking is not found when data already exists', async () => {
      // We allow this console error because throwing an error when no booking is found 404
      jest.spyOn(global.console, 'error').mockImplementationOnce(() => null)

      renderBookingDetails(undefined, { dataUpdatedAt: new Date().getTime() })

      await screen.findByText('Réservation introuvable !')

      expect(
        screen.getByText(
          `Désolé, nous ne retrouvons pas ta réservation. Peut-être a-t-elle été annulée. N’hésite pas à retrouver la liste de tes réservations terminées et annulées pour t’en assurer.`
        )
      ).toBeOnTheScreen()
    })

    it('should not render ScreenError BookingNotFound when booking is not found and no data exists', async () => {
      renderBookingDetails(undefined, { dataUpdatedAt: 0 })

      await waitFor(() =>
        expect(screen.queryByText('Réservation introuvable\u00a0!')).not.toBeOnTheScreen()
      )
    })
  })

  describe('Itinerary', () => {
    it.each([
      ['isEvent == true', { isEvent: true }],
      ['isPhysical == true', { isPhysical: true, isDigital: false }],
    ])('should render the itinerary button when %s', async (_testLabel, dataProvider) => {
      const openItinerary = jest.spyOn(OpenItinerary, 'default').mockReturnValue({
        openItinerary: jest.fn(),
        canOpenItinerary: true,
      })
      const getBookingProperties = jest
        .spyOn(bookingPropertiesAPI, 'getBookingProperties')
        .mockReturnValue(dataProvider)

      renderBookingDetails(ongoingBookings)

      await screen.findByText('Ma réservation')

      const itineraryButton = await screen.findByText('Voir l’itinéraire')

      expect(itineraryButton).toBeOnTheScreen()

      openItinerary.mockRestore()
      getBookingProperties.mockRestore()
    })

    it.each([
      ['canOpenItinerary == false', false, {}],
      [
        'canOpenItinerary == true && isEvent == false && isPhysical == false',
        true,
        { isEvent: false, isPhysical: false },
      ],
      [
        'canOpenItinerary == true && isEvent == false && isPhysical == true && isDigital == true',
        true,
        { isEvent: false, isPhysical: true, isDigital: true },
      ],
    ])(
      'should not render the itinerary button when %s',
      async (_testLabel, canOpenItinerary, dataProvider) => {
        const openItinerary = jest.spyOn(OpenItinerary, 'default').mockReturnValue({
          openItinerary: jest.fn(),
          canOpenItinerary,
        })
        const getBookingProperties = jest
          .spyOn(bookingPropertiesAPI, 'getBookingProperties')
          .mockReturnValue(dataProvider)

        renderBookingDetails(ongoingBookings)

        await screen.findByText('Ma réservation')

        const itineraryButton = screen.queryByText('Voir l’itinéraire')

        expect(itineraryButton).not.toBeOnTheScreen()

        openItinerary.mockRestore()
        getBookingProperties.mockRestore()
      }
    )
  })

  describe('Analytics', () => {
    it('should trigger logEvent "BookingDetailsScrolledToBottom" when reaching the end', async () => {
      const nativeEventMiddle = {
        layoutMeasurement: { height: 1000 },
        contentOffset: { y: 400 }, // how far did we scroll
        contentSize: { height: 1600 },
      }
      const nativeEventBottom = {
        layoutMeasurement: { height: 1000 },
        contentOffset: { y: 900 },
        contentSize: { height: 1600 },
      }

      renderBookingDetails(ongoingBookings)

      const scrollView = screen.getByTestId('BookingDetailsScrollView')

      await act(async () => {
        await scrollView.props.onScroll({ nativeEvent: nativeEventMiddle })
      })

      expect(analytics.logBookingDetailsScrolledToBottom).not.toHaveBeenCalled()

      await act(async () => {
        await scrollView.props.onScroll({ nativeEvent: nativeEventBottom })
      })

      expect(analytics.logBookingDetailsScrolledToBottom).toHaveBeenCalledTimes(1)
    })
  })
})

function renderBookingDetails(booking?: Booking, options = {}) {
  jest.spyOn(ongoingOrEndedBookingAPI, 'useOngoingOrEndedBooking').mockReturnValue({
    data: booking,
    isLoading: false,
    isSuccess: true,
    isError: false,
    error: undefined,
    ...options,
  } as unknown as UseQueryResult<BookingReponse | null>)
  return render(reactQueryProviderHOC(<BookingDetails />))
}
