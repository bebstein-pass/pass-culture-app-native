import React from 'react'

import { VenueBanner } from 'features/venue/components/VenueBody/VenueBanner'
import { fireEvent, render, screen } from 'tests/utils/web'

jest.mock('react-native-safe-area-context', () => ({
  ...(jest.requireActual('react-native-safe-area-context') as Record<string, unknown>),
  useSafeAreaInsets: () => ({ bottom: 16, right: 16, left: 16, top: 16 }),
}))

const mockHandleImagePress = jest.fn()

describe('<VenueBanner />', () => {
  it('should call press handler when pressing image not from google', () => {
    render(
      <VenueBanner
        bannerUrl="https://image.com"
        bannerMeta={{ is_from_google: false, image_credit: 'François Boulo' }}
        handleImagePress={mockHandleImagePress}
      />
    )

    fireEvent.click(screen.getByTestId('venueImage'))

    expect(mockHandleImagePress).toHaveBeenCalledTimes(1)
  })

  it('should call press handler when pressing image from google', () => {
    render(
      <VenueBanner
        bannerUrl="https://image.com"
        bannerMeta={{ is_from_google: true, image_credit: 'François Boulo' }}
        handleImagePress={mockHandleImagePress}
      />
    )

    fireEvent.click(screen.getByTestId('venueImageWithGoogleWatermark'))

    expect(mockHandleImagePress).toHaveBeenCalledTimes(1)
  })

  it('should display default venue background', async () => {
    render(
      <VenueBanner
        bannerMeta={{ is_from_google: true, image_credit: 'François Boulo' }}
        handleImagePress={mockHandleImagePress}
      />
    )

    expect(await screen.findByTestId('defaultVenueBackground')).toBeInTheDocument()
  })
})
