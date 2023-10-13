import mockdate from 'mockdate'
import React from 'react'
import { Linking, Platform, Share as NativeShare } from 'react-native'
import Share, { Social } from 'react-native-share'
import { UseQueryResult } from 'react-query'

import { useRoute } from '__mocks__/@react-navigation/native'
import { VenueResponse } from 'api/gen'
import { useVenue } from 'features/venue/api/useVenue'
import { VenueBody } from 'features/venue/components/VenueBody/VenueBody'
import {
  venueWithNoAddressResponseSnap,
  venueResponseSnap,
} from 'features/venue/fixtures/venueResponseSnap'
import { placeholderData } from 'libs/subcategories/placeholderData'
import { act, fireEvent, render, screen, waitFor } from 'tests/utils'
import { Network } from 'ui/components/ShareMessagingApp'

mockdate.set(new Date('2021-08-15T00:00:00Z'))

jest.mock('react-query')

jest.mock('features/venue/api/useVenueOffers')
jest.mock('features/venue/api/useVenue')
const mockedUseVenue = jest.mocked(useVenue)

const mockSubcategories = placeholderData.subcategories
const mockHomepageLabels = placeholderData.homepageLabels
jest.mock('libs/subcategories/useSubcategories', () => ({
  useSubcategories: () => ({
    data: {
      subcategories: mockSubcategories,
      homepageLabels: mockHomepageLabels,
    },
  }),
}))

const canOpenURLSpy = jest.spyOn(Linking, 'canOpenURL')
const mockShareSingle = jest.spyOn(Share, 'shareSingle')
const mockNativeShare = jest
  .spyOn(NativeShare, 'share')
  .mockResolvedValue({ action: NativeShare.sharedAction })

const venueId = venueResponseSnap.id

describe('<VenueBody />', () => {
  it('should render public name, postalcode and city if no address', async () => {
    mockedUseVenue.mockReturnValueOnce({
      data: venueWithNoAddressResponseSnap,
    } as UseQueryResult<VenueResponse>)

    const venueWithNoAddressId = venueWithNoAddressResponseSnap.id
    await renderVenueBody(venueWithNoAddressId)

    const addressTexts = screen.getAllByText('Le Petit Rintintin 3, 15000 Milan')
    expect(addressTexts.length).toEqual(2)
  })

  it('should not show venue banner in where section', async () => {
    await renderVenueBody(venueId)
    expect(screen.queryByTestId(`Lieu ${venueResponseSnap.name}`)).not.toBeOnTheScreen()
  })

  it('should show withdrawalDetails', async () => {
    await renderVenueBody(venueId)
    expect(screen.queryByText('Modalités de retrait')).toBeOnTheScreen()
  })

  it('should not show withdrawalDetails if withdrawalDetails is null', async () => {
    mockedUseVenue.mockReturnValueOnce({
      data: { ...venueResponseSnap, withdrawalDetails: null },
    } as UseQueryResult<VenueResponse>)
    await renderVenueBody(venueId)
    expect(screen.queryByText('Modalités de retrait')).not.toBeOnTheScreen()
  })

  it('should open social medium on share button press', async () => {
    canOpenURLSpy.mockResolvedValueOnce(true)
    await renderVenueBody(venueId)

    await act(async () => {
      fireEvent.press(await screen.findByText(`Envoyer sur ${[Network.instagram]}`))
    })

    expect(mockShareSingle).toHaveBeenCalledWith({
      social: Social.Instagram,
      message: encodeURIComponent(
        `Retrouve "${venueResponseSnap.name}" sur le pass Culture\nhttps://webapp-v2.example.com/lieu/5543?utm_gen=product&utm_campaign=share_venue&utm_medium=social_media&utm_source=Instagram`
      ),
      type: 'text',
      url: undefined,
    })
  })

  describe('on Android', () => {
    beforeAll(() => (Platform.OS = 'android'))
    afterAll(() => (Platform.OS = 'ios'))

    it('should open social medium on share button press', async () => {
      // FIXME(PC-21174): This warning comes from android 'Expected style "elevation: 16px" to be unitless' due to shadow style
      jest.spyOn(global.console, 'warn').mockImplementationOnce(() => null)
      jest.spyOn(global.console, 'warn').mockImplementationOnce(() => null)
      canOpenURLSpy.mockResolvedValueOnce(true)
      await renderVenueBody(venueId)

      await act(async () => {
        fireEvent.press(await screen.findByText(`Envoyer sur ${[Network.instagram]}`))
      })

      expect(mockShareSingle).toHaveBeenCalledWith({
        social: Social.Instagram,
        message: encodeURIComponent(
          `Retrouve "${venueResponseSnap.name}" sur le pass Culture\nhttps://webapp-v2.example.com/lieu/5543?utm_gen=product&utm_campaign=share_venue&utm_medium=social_media&utm_source=Instagram`
        ),
        type: 'text',
        url: undefined,
      })
    })
  })

  it('should open native share modal on "Plus d’options" press', async () => {
    await renderVenueBody(venueId)

    await act(async () => {
      fireEvent.press(screen.getByText('Plus d’options'))
    })

    expect(mockNativeShare).toHaveBeenCalledTimes(1)
  })
})

async function renderVenueBody(id: number) {
  useRoute.mockImplementation(() => ({ params: { id } }))
  render(<VenueBody venueId={id} onScroll={jest.fn()} />)
  await waitFor(() => screen.getByTestId('venue-container'))
}
