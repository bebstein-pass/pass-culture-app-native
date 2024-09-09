import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { Accessibility } from 'features/profile/pages/Accessibility/Accessibility'
import { render, fireEvent, screen } from 'tests/utils'

jest.mock('libs/firebase/analytics/analytics')

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest.mock('react-native-safe-area-context', () => ({
  ...(jest.requireActual('react-native-safe-area-context') as Record<string, unknown>),
  useSafeAreaInsets: () => ({ bottom: 16, right: 16, left: 16, top: 16 }),
}))

jest.mock('@batch.com/react-native-plugin', () =>
  jest.requireActual('__mocks__/libs/react-native-batch')
)

jest.mock('react-native/Libraries/Animated/createAnimatedComponent', () => {
  return function createAnimatedComponent(Component: unknown) {
    return Component
  }
})

describe('Accessibility', () => {
  it('should render correctly', () => {
    render(<Accessibility />)

    expect(screen).toMatchSnapshot()
  })

  it.each`
    route                         | title
    ${'AccessibilityActionPlan'}  | ${'Schéma pluriannuel'}
    ${'AccessibilityDeclaration'} | ${'Déclaration d’accessibilité'}
    ${'AccessibilityEngagement'}  | ${'Les engagements du pass Culture'}
    ${'RecommendedPaths'}         | ${'Parcours recommandés'}
  `('should navigate to $route when $title is clicked', ({ route, title }) => {
    render(<Accessibility />)

    const row = screen.getByText(title)
    fireEvent.press(row)

    expect(navigate).toHaveBeenCalledWith(route, undefined)
  })
})
