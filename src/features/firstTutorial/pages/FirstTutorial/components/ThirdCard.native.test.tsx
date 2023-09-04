/* eslint-disable local-rules/independent-mocks */
import React, { RefObject } from 'react'
import Swiper from 'react-native-web-swiper'

import { analytics } from 'libs/analytics'
import { LocationWrapper, GeolocPermissionState } from 'libs/geolocation'
import { requestGeolocPermission } from 'libs/geolocation/requestGeolocPermission'
import { act, fireEvent, render, waitFor } from 'tests/utils'
import { GenericAchievement } from 'ui/components/achievements'

import { ThirdCard } from './ThirdCard'

const mockRequestGeolocPermission = jest.mocked(requestGeolocPermission)

describe('ThirdCard', () => {
  it('should render third card', () => {
    const firstTutorial = render(<ThirdCard index={0} activeIndex={0} lastIndex={0} />)
    expect(firstTutorial).toMatchSnapshot()
  })
  it('should not trigger analytics on refusal', async () => {
    mockRequestGeolocPermission.mockResolvedValue(GeolocPermissionState.DENIED)
    const ref = { current: { goToNext: jest.fn() } }
    const { getByText } = render(
      <LocationWrapper>
        <GenericAchievement screenName="FirstTutorial">
          <ThirdCard
            swiperRef={ref as unknown as RefObject<Swiper>}
            index={0}
            activeIndex={0}
            lastIndex={0}
          />
        </GenericAchievement>
      </LocationWrapper>
    )
    fireEvent.press(getByText('Utiliser ma position'))
    await waitFor(() => {
      expect(analytics.logHasActivateGeolocFromTutorial).toBeCalledTimes(0)
    })
  })

  it('should trigger analytics on acceptance', async () => {
    mockRequestGeolocPermission.mockResolvedValue(GeolocPermissionState.GRANTED)
    const ref = { current: { goToNext: jest.fn() } }
    const { getByText } = render(
      <LocationWrapper>
        <GenericAchievement screenName="FirstTutorial">
          <ThirdCard
            swiperRef={ref as unknown as RefObject<Swiper>}
            index={0}
            activeIndex={0}
            lastIndex={0}
          />
        </GenericAchievement>
      </LocationWrapper>
    )
    fireEvent.press(getByText('Utiliser ma position'))
    await waitFor(() => {
      expect(analytics.logHasActivateGeolocFromTutorial).toBeCalledTimes(1)
    })
  })

  it('should swipe to next card on button press', async () => {
    mockRequestGeolocPermission.mockResolvedValue(GeolocPermissionState.GRANTED)
    const ref = { current: { goToNext: jest.fn() } }
    const { getByText } = render(
      <LocationWrapper>
        <ThirdCard
          lastIndex={0}
          swiperRef={ref as unknown as RefObject<Swiper>}
          index={0}
          activeIndex={0}
        />
      </LocationWrapper>
    )
    await act(() => {
      fireEvent.press(getByText('Utiliser ma position'))
    })

    expect(ref.current?.goToNext).toHaveBeenCalledTimes(1)
  })
})
