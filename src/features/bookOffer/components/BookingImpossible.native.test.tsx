import * as React from 'react'

import { api } from 'api/api'
import { FavoriteResponse, PaginatedFavoritesResponse } from 'api/gen'
import { Step, initialBookingState } from 'features/bookOffer/context/reducer'
import { favoriteResponseSnap } from 'features/favorites/fixtures/favoriteResponseSnap'
import { analytics } from 'libs/analytics'
import { mockServer } from 'tests/mswServer'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { act, fireEvent, render, screen, waitFor } from 'tests/utils'

import { BookingImpossible } from './BookingImpossible'

jest.mock('libs/network/NetInfoWrapper')

jest.mock('libs/jwt/jwt')
jest.mock('features/auth/context/AuthContext', () => ({
  useAuthContext: jest.fn(() => ({ isLoggedIn: true })),
}))

const mockOfferId = favoriteResponseSnap.offer.id

const mockInitialBookingState = initialBookingState
const mockDismissModal = jest.fn()
const mockDispatch = jest.fn()
jest.mock('features/bookOffer/context/useBookingContext', () => ({
  useBookingContext: jest.fn(() => ({
    bookingState: { ...mockInitialBookingState, offerId: mockOfferId },
    dismissModal: mockDismissModal,
    dispatch: mockDispatch,
  })),
}))

const mockPostNativeV1SendOfferWebappLinkByEmailofferId = jest.spyOn(
  api,
  'postNativeV1SendOfferWebappLinkByEmailofferId'
)

const mockPostNativeV1SendOfferLinkByPushofferId = jest.spyOn(
  api,
  'postNativeV1SendOfferLinkByPushofferId'
)

describe('<BookingImpossible />', () => {
  describe('When offer is already favorite', () => {
    beforeEach(() => {
      const favoritesResponseWithOfferIn: PaginatedFavoritesResponse = {
        page: 1,
        nbFavorites: 1,
        favorites: [favoriteResponseSnap],
      }
      mockServer.getApi<PaginatedFavoritesResponse>(
        '/v1/me/favorites',
        favoritesResponseWithOfferIn
      )
    })

    it('should render correctly', async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))

      await screen.findByLabelText('Voir le détail de l’offre')

      expect(screen).toMatchSnapshot()
    })

    it('should render without CTAs', async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))

      await screen.findByLabelText('Voir le détail de l’offre')

      expect(screen.queryByText('Mettre en favoris')).not.toBeOnTheScreen()
    })

    it("should log 'BookingImpossibleiOS' on mount", async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))

      await screen.findByLabelText('Voir le détail de l’offre')

      expect(analytics.logBookingImpossibleiOS).toHaveBeenCalledTimes(1)
    })

    it("should dismiss modal when clicking on 'Voir le détail de l’offre'", async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))

      fireEvent.press(await screen.findByText('Voir le détail de l’offre'))

      expect(mockDismissModal).toHaveBeenCalledTimes(1)
    })
  })

  describe('When offer is not yet favorite', () => {
    beforeEach(() => {
      const favoritesResponseWithoutOfferIn: PaginatedFavoritesResponse = {
        page: 1,
        nbFavorites: 0,
        favorites: [],
      }
      const favoriteResponse: FavoriteResponse = favoriteResponseSnap
      mockServer.getApi<PaginatedFavoritesResponse>(
        '/v1/me/favorites',
        favoritesResponseWithoutOfferIn
      )
      mockServer.postApi('/v1/me/favorites', favoriteResponse)
      mockServer.postApi(`/v1/send_offer_link_by_push/${mockOfferId}`, {})
      mockServer.postApi(`/v1/send_offer_webapp_link_by_email/${mockOfferId}`, {
        favoriteResponse,
      })
    })

    it('should render correctly', async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))

      await screen.findByText(
        'Les conditions générales d’utilisation de l’App Store iOS ne permettent pas de réserver cette offre sur l’application.'
      )

      expect(screen).toMatchSnapshot()
    })

    it('should render with CTAs', async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))

      await screen.findByText(
        'Les conditions générales d’utilisation de l’App Store iOS ne permettent pas de réserver cette offre sur l’application.'
      )

      expect(screen.getByText('Mettre en favoris')).toBeOnTheScreen()
    })

    it('should send email/push notification when adding to favorites', async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))

      await act(async () => {
        const addToFavoriteButton = await screen.findByLabelText('Mettre en favoris')

        fireEvent.press(addToFavoriteButton)
      })

      expect(mockPostNativeV1SendOfferWebappLinkByEmailofferId).toHaveBeenCalledWith(mockOfferId)
      expect(mockPostNativeV1SendOfferLinkByPushofferId).toHaveBeenCalledWith(mockOfferId)
    })

    it('should log analytics event when adding to favorites', async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))

      fireEvent.press(screen.getByText('Mettre en favoris'))

      await waitFor(() => {
        expect(analytics.logHasAddedOfferToFavorites).toHaveBeenCalledTimes(1)
        expect(analytics.logHasAddedOfferToFavorites).toHaveBeenCalledWith({
          from: 'bookingimpossible',
          offerId: mockOfferId,
        })
        expect(mockDismissModal).toHaveBeenCalledTimes(1)
      })
    })

    it('should change booking step from date to confirmation', async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))
      await act(async () => {})

      expect(mockDispatch).toHaveBeenNthCalledWith(1, {
        type: 'CHANGE_STEP',
        payload: Step.CONFIRMATION,
      })
    })

    it("should dismiss modal when clicking on 'Retourner à l'offre'", async () => {
      render(reactQueryProviderHOC(<BookingImpossible />))
      await act(async () => {})

      fireEvent.press(await screen.findByText('Retourner à l’offre'))

      expect(mockDismissModal).toHaveBeenCalledTimes(1)
    })
  })
})
