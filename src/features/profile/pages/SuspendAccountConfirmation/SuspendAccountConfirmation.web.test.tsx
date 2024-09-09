import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { NativeStackNavigationProp } from 'react-native-screens/native-stack'

import { EmailHistoryEventTypeEnum } from 'api/gen'
import { RootStackParamList } from 'features/navigation/RootNavigator/types'
import * as useEmailUpdateStatus from 'features/profile/helpers/useEmailUpdateStatus'
import { SuspendAccountConfirmation } from 'features/profile/pages/SuspendAccountConfirmation/SuspendAccountConfirmation'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { checkAccessibilityFor, render } from 'tests/utils/web'

type useEmailUpdateStatusMock = ReturnType<(typeof useEmailUpdateStatus)['useEmailUpdateStatus']>

jest.spyOn(useEmailUpdateStatus, 'useEmailUpdateStatus').mockReturnValue({
  data: {
    expired: false,
    newEmail: '',
    status: EmailHistoryEventTypeEnum.UPDATE_REQUEST,
  },
  isLoading: false,
} as useEmailUpdateStatusMock)

jest.mock('libs/firebase/analytics/analytics')
jest.mock('libs/firebase/remoteConfig/remoteConfig.services')

jest.mock('react-native-safe-area-context', () => ({
  ...(jest.requireActual('react-native-safe-area-context') as Record<string, unknown>),
  useSafeAreaInsets: () => ({ bottom: 16, right: 16, left: 16, top: 16 }),
}))

describe('<SuspendAccountConfirmation />', () => {
  describe('Accessibility', () => {
    const navigation = {
      navigate: jest.fn(),
    } as unknown as NativeStackNavigationProp<RootStackParamList, 'SuspendAccountConfirmation'>

    const route = {
      params: {
        token: 'example',
      },
    } as unknown as RouteProp<RootStackParamList, 'SuspendAccountConfirmation'>

    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        reactQueryProviderHOC(<SuspendAccountConfirmation navigation={navigation} route={route} />)
      )
      const results = await checkAccessibilityFor(container)

      expect(results).toHaveNoViolations()
    })
  })
})
