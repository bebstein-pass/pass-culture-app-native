import React from 'react'
import { Animated } from 'react-native'
import { Share } from 'react-native'

import { OfferResponse } from 'api/gen'
import { useAuthContext } from 'features/auth/context/AuthContext'
import { paginatedFavoritesResponseSnap } from 'features/favorites/fixtures/paginatedFavoritesResponseSnap'
import { mockGoBack } from 'features/navigation/__mocks__/useGoBack'
import { offerResponseSnap } from 'features/offer/fixtures/offerResponse'
import { analytics } from 'libs/analytics'
import { mockServer } from 'tests/mswServer'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { act, fireEvent, render, screen, waitFor } from 'tests/utils'
import {
  showSuccessSnackBar,
  showErrorSnackBar,
  hideSnackBar,
  showInfoSnackBar,
} from 'ui/components/snackBar/__mocks__/SnackBarContext'
import { useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'

import { OfferHeader } from '../OfferHeader/OfferHeader'

const mockShare = jest.spyOn(Share, 'share').mockImplementation(jest.fn())

jest.mock('features/auth/context/AuthContext')
const mockUseAuthContext = useAuthContext as jest.MockedFunction<typeof useAuthContext>
mockUseAuthContext.mockReturnValue({
  isLoggedIn: true,
  setIsLoggedIn: jest.fn(),
  refetchUser: jest.fn(),
  isUserLoading: false,
})

jest.mock('ui/components/snackBar/SnackBarContext', () => ({
  useSnackBarContext: jest.fn(() => ({})),
}))
const mockedUseSnackBarContext = useSnackBarContext as jest.MockedFunction<
  typeof useSnackBarContext
>

mockedUseSnackBarContext.mockReturnValue({
  hideSnackBar,
  showInfoSnackBar,
  showSuccessSnackBar,
  showErrorSnackBar,
})

jest.useFakeTimers({ legacyFakeTimers: true })

describe('<OfferHeader />', () => {
  it('should render all the icons', async () => {
    renderOfferHeader()
    await act(async () => {})

    expect(screen.queryByTestId('animated-icon-back')).toBeOnTheScreen()
    expect(screen.queryByTestId('animated-icon-share')).toBeOnTheScreen()
    expect(screen.queryByTestId('animated-icon-favorite')).toBeOnTheScreen()
  })

  it('should goBack when we press on the back button', async () => {
    renderOfferHeader()
    await act(async () => {})

    fireEvent.press(await screen.findByTestId('animated-icon-back'))

    expect(mockGoBack).toHaveBeenCalledTimes(1)
  })

  it('should fully display the title at the end of the animation', async () => {
    const { animatedValue } = renderOfferHeader()

    expect(screen.getByTestId('offerHeaderName').props.accessibilityHidden).toBeTruthy()
    expect(screen.getByTestId('offerHeaderName').props.style.opacity).toBe(0)

    act(() => {
      Animated.timing(animatedValue, { duration: 100, toValue: 1, useNativeDriver: false }).start()
      jest.advanceTimersByTime(100)
    })

    await waitFor(() => {
      expect(screen.getByTestId('offerHeaderName').props.accessibilityHidden).toBe(false)
      expect(screen.getByTestId('offerHeaderName').props.style.opacity).toBe(1)
    })
  })

  it('should log analytics when clicking on the share button', async () => {
    renderOfferHeader()

    const shareButton = screen.getByLabelText('Partager')
    await act(async () => {
      fireEvent.press(shareButton)
    })

    expect(analytics.logShare).toHaveBeenNthCalledWith(1, {
      type: 'Offer',
      from: 'offer',
      offerId: mockOffer.id,
    })
  })

  it('should share when clicking on the share button', async () => {
    renderOfferHeader()

    const shareButton = screen.getByLabelText('Partager')
    await act(async () => {
      fireEvent.press(shareButton)
    })

    expect(mockShare).toHaveBeenCalledWith(
      {
        message:
          'Retrouve "Sous les étoiles de Paris - VF" chez "PATHE BEAUGRENELLE" sur le pass Culture\u00a0:\n',
        url: 'https://webapp-v2.example.com/offre/116656?utm_gen=product&utm_campaign=share_offer&utm_medium=header',
      },
      { subject: 'Je t’invite à découvrir une super offre sur le pass Culture\u00a0!' }
    )
  })
})

const mockOffer = offerResponseSnap

function renderOfferHeader() {
  mockServer.getApiV1('/me/favorites', paginatedFavoritesResponseSnap)
  mockServer.getApiV1<OfferResponse>(`/offer/${mockOffer.id}`, offerResponseSnap)

  const animatedValue = new Animated.Value(0)
  render(
    reactQueryProviderHOC(
      <OfferHeader
        title="Some very nice offer"
        headerTransition={animatedValue}
        offer={mockOffer}
      />
    )
  )
  return { animatedValue }
}
