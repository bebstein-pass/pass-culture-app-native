import React from 'react'

import * as jwt from '__mocks__/jwt-decode'
import { BookingsResponse, SubcategoriesResponseModelv2, UserProfileResponse } from 'api/gen'
import { AuthWrapper } from 'features/auth/context/AuthContext'
import { bookingsSnap } from 'features/bookings/fixtures/bookingsSnap'
import { Bookings } from 'features/bookings/pages/Bookings/Bookings'
import { beneficiaryUser } from 'fixtures/user'
import { decodedTokenWithRemainingLifetime } from 'libs/jwt/fixtures'
import { storage } from 'libs/storage'
import { placeholderData } from 'libs/subcategories/placeholderData'
import { mockServer } from 'tests/mswServer'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { measurePerformance, screen } from 'tests/utils'

jest.unmock('libs/jwt')
jest.spyOn(jwt, 'default').mockReturnValue(decodedTokenWithRemainingLifetime)

// Performance measuring is run multiple times so we need to increase the timeout
const TEST_TIMEOUT_IN_MS = 30000
jest.setTimeout(TEST_TIMEOUT_IN_MS)
jest.useFakeTimers({ legacyFakeTimers: true })

describe('<Bookings />', () => {
  beforeEach(() => {
    mockServer.getApiV1<UserProfileResponse>('/me', beneficiaryUser)
    mockServer.getApiV1<BookingsResponse>('/bookings', bookingsSnap)
    mockServer.getApiV1<SubcategoriesResponseModelv2>('/subcategories/v2', placeholderData)
  })

  it('Performance test for Bookings page', async () => {
    storage.saveString('access_token', 'token')
    storage.saveString('PASSCULTURE_REFRESH_TOKEN', 'token')
    await measurePerformance(
      reactQueryProviderHOC(
        <AuthWrapper>
          <Bookings />
        </AuthWrapper>
      ),
      {
        scenario: async () => {
          await screen.findByText('2 réservations en cours', {}, { timeout: TEST_TIMEOUT_IN_MS })
        },
      }
    )
  })
})
