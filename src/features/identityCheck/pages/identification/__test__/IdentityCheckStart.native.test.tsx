import React from 'react'

import { initialIdentityCheckState as mockState } from 'features/identityCheck/context/reducer'
import { IdentityCheckStart } from 'features/identityCheck/pages/identification/IdentityCheckStart'
import { fireEvent, render } from 'tests/utils'

const mockNavigateToNextScreen = jest.fn()
jest.mock('features/identityCheck/useIdentityCheckNavigation', () => ({
  useIdentityCheckNavigation: () => ({
    navigateToNextScreen: mockNavigateToNextScreen,
  }),
}))
jest.mock('features/identityCheck/context/IdentityCheckContextProvider', () => ({
  useIdentityCheckContext: jest.fn(() => ({
    dispatch: jest.fn(),
    ...mockState,
  })),
}))

describe('<IdentityCheckStart/>', () => {
  it('should render correctly', () => {
    const renderAPI = render(<IdentityCheckStart />)
    expect(renderAPI).toMatchSnapshot()
  })

  it('should navigate to Ubble webview when user choose "Commencer la vérification"', () => {
    const { getByText } = render(<IdentityCheckStart />)
    expect(mockNavigateToNextScreen).not.toHaveBeenCalled()

    fireEvent.press(getByText('Commencer la vérification'))
    fireEvent.press(getByText("J'ai compris"))
    expect(mockNavigateToNextScreen).toHaveBeenCalledTimes(1)
  })

  it('should navigate to DMS modal when user choose "Transmettre un document"', () => {
    const { getByText, getByTestId } = render(<IdentityCheckStart />)
    expect(mockNavigateToNextScreen).not.toHaveBeenCalled()

    fireEvent.press(getByTestId('Transmettre un document'))
    getByText('Je suis de nationalité française')
    getByText('Je suis de nationalité étrangère')
  })
})
