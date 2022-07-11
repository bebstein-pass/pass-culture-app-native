import React from 'react'
import { UseQueryResult } from 'react-query'
import { mocked } from 'ts-jest/utils'

import { BookingsResponse, SubcategoriesResponseModel } from 'api/gen'
import { useBookings } from 'features/bookings/api/queries'
import { analytics } from 'libs/firebase/analytics'
import { useNetInfo as useNetInfoDefault } from 'libs/network/useNetInfo'
import { useSubcategories } from 'libs/subcategories/useSubcategories'
import { flushAllPromises, render } from 'tests/utils'

import { bookingsSnap as mockBookings } from '../api/bookingsSnap'

import { OnGoingBookingsList } from './OnGoingBookingsList'

jest.mock('react-query')

jest.mock('features/bookings/api/queries')
const mockUseBookings = mocked(useBookings)
mockUseBookings.mockReturnValue({
  data: mockBookings,
  isLoading: false,
  isFetching: false,
} as UseQueryResult<BookingsResponse, unknown>)

jest.mock('libs/subcategories/useSubcategories')
const mockUseSubcategories = mocked(useSubcategories)
mockUseSubcategories.mockReturnValue({
  isLoading: false,
} as UseQueryResult<SubcategoriesResponseModel, unknown>)

jest.mock('libs/network/useNetInfo', () => jest.requireMock('@react-native-community/netinfo'))
const mockUseNetInfo = useNetInfoDefault as jest.Mock

describe('<OnGoingBookingsList /> - Analytics', () => {
  mockUseNetInfo.mockReturnValue({ isConnected: true, isInternetReachable: true })

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

  describe('offline', () => {
    it('should allow pull to refetch when netInfo.isConnected && netInfo.isInternetReachable', () => {
      const refetch = jest.fn()
      const loadingBookings = {
        data: {
          ended_bookings: [],
          ongoing_bookings: [],
        } as BookingsResponse,
        isLoading: false,
        isFetching: false,
        refetch: refetch as unknown,
      } as UseQueryResult<BookingsResponse, unknown>
      mockUseBookings.mockReturnValueOnce(loadingBookings)
      const { getByTestId } = render(<OnGoingBookingsList />)

      const flatList = getByTestId('OnGoingBookingsList')
      expect(flatList).toBeDefined()
      expect(flatList.props.onRefresh).toBeDefined()
    })
    it('should not allow pull to refetch when !netInfo.isConnected or !netInfo.isInternetReachable', () => {
      mockUseNetInfo.mockReturnValueOnce({ isConnected: true, isInternetReachable: false })
      const refetch = jest.fn()
      const loadingBookings = {
        data: {
          ended_bookings: [],
          ongoing_bookings: [],
        } as BookingsResponse,
        isLoading: false,
        isFetching: false,
        refetch: refetch as unknown,
      } as UseQueryResult<BookingsResponse, unknown>
      mockUseBookings.mockReturnValueOnce(loadingBookings)
      const { getByTestId } = render(<OnGoingBookingsList />)

      const flatList = getByTestId('OnGoingBookingsList')
      expect(flatList).toBeDefined()
      expect(flatList.props.onRefresh).not.toBeDefined()
    })
  })

  describe('displays the placeholder', () => {
    it('when bookings are loading', () => {
      const loadingBookings = {
        data: undefined,
        isLoading: true,
        isFetching: false,
      } as UseQueryResult<BookingsResponse, unknown>
      mockUseBookings.mockReturnValueOnce(loadingBookings)
      const { queryByTestId } = render(<OnGoingBookingsList />)

      const placeholder = queryByTestId('BookingsPlaceholder')

      expect(placeholder).toBeTruthy()
    })

    it('when subcategories are loading', () => {
      const loadingSubcategories = {
        isLoading: true,
      } as UseQueryResult<SubcategoriesResponseModel, unknown>
      mockUseSubcategories.mockReturnValueOnce(loadingSubcategories)
      const { queryByTestId } = render(<OnGoingBookingsList />)

      const placeholder = queryByTestId('BookingsPlaceholder')

      expect(placeholder).toBeTruthy()
    })
  })

  it('should trigger logEvent "BookingsScrolledToBottom" when reaching the end', () => {
    const { getByTestId } = render(<OnGoingBookingsList />)
    const flatList = getByTestId('OnGoingBookingsList')

    flatList.props.onScroll({ nativeEvent: nativeEventMiddle })
    expect(analytics.logBookingsScrolledToBottom).not.toHaveBeenCalled()

    flatList.props.onScroll({ nativeEvent: nativeEventBottom })

    expect(analytics.logBookingsScrolledToBottom).toHaveBeenCalledTimes(1)
  })

  it('should trigger logEvent "BookingsScrolledToBottom" only once', () => {
    const { getByTestId } = render(<OnGoingBookingsList />)
    const flatList = getByTestId('OnGoingBookingsList')

    // 1st scroll to bottom => trigger
    flatList.props.onScroll({ nativeEvent: nativeEventBottom })
    expect(analytics.logBookingsScrolledToBottom).toHaveBeenCalledTimes(1)

    // 2nd scroll to bottom => NOT trigger
    flatList.props.onScroll({ nativeEvent: nativeEventMiddle })
    flatList.props.onScroll({ nativeEvent: nativeEventBottom })
    flushAllPromises()

    expect(analytics.logBookingsScrolledToBottom).toHaveBeenCalledTimes(1)
  })
})
