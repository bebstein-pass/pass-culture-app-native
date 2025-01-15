import React from 'react'

import { navigate } from '__mocks__/@react-navigation/native'
import { StepperOrigin } from 'features/navigation/RootNavigator/types'
import { OnboardingWelcome } from 'features/tutorial/pages/onboarding/OnboardingWelcome'
import { analytics } from 'libs/analytics'
import { setFeatureFlags } from 'libs/firebase/firestore/featureFlags/__tests__/setFeatureFlags'
import { RemoteStoreFeatureFlags } from 'libs/firebase/firestore/types'
import { storage } from 'libs/storage'
import { fireEvent, render, waitFor, screen } from 'tests/utils'

jest.mock('react-native/Libraries/Animated/createAnimatedComponent', () => {
  return function createAnimatedComponent(Component: unknown) {
    return Component
  }
})

describe('OnboardingWelcome', () => {
  beforeEach(() => setFeatureFlags())

  it('should render correctly', () => {
    render(<OnboardingWelcome />)

    expect(screen).toMatchSnapshot()
  })

  it('should display subtitle with credit V2', () => {
    render(<OnboardingWelcome />)

    const subtitle =
      'Plus de 3 millions d’offres culturelles et un crédit à dépenser sur l’application si tu as entre 15 et 18 ans.'

    expect(screen.getByText(subtitle)).toBeOnTheScreen()
  })

  it('should redirect to OnboardingGeolocation when "C’est parti !" is clicked', async () => {
    render(<OnboardingWelcome />)

    const button = screen.getByText('C’est parti\u00a0!')
    fireEvent.press(button)

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('OnboardingGeolocation', undefined)
    })
  })

  it('should redirect to login when "Se connecter" is clicked', async () => {
    render(<OnboardingWelcome />)

    const loginButton = screen.getByText('Se connecter')
    fireEvent.press(loginButton)

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('Login', { from: StepperOrigin.ONBOARDING })
    })
  })

  it('should set has_seen_tutorials to true in local storage when "C’est parti !" is clicked', async () => {
    render(<OnboardingWelcome />)

    const button = screen.getByText('C’est parti\u00a0!')
    fireEvent.press(button)

    expect(await storage.readObject('has_seen_tutorials')).toBeTruthy()
  })

  it('should set has_seen_tutorials to true in local storage when "Se connecter" is clicked', async () => {
    render(<OnboardingWelcome />)

    const loginButton = screen.getByText('Se connecter')
    fireEvent.press(loginButton)

    expect(await storage.readObject('has_seen_tutorials')).toBeTruthy()
  })

  it('should log analytics when "C’est parti !" is clicked', async () => {
    render(<OnboardingWelcome />)

    const button = screen.getByText('C’est parti\u00a0!')
    fireEvent.press(button)

    expect(analytics.logOnboardingStarted).toHaveBeenCalledWith({ type: 'start' })
  })

  it('should log analytics when "Se connecter" is clicked', async () => {
    render(<OnboardingWelcome />)

    const loginButton = screen.getByText('Se connecter')
    fireEvent.press(loginButton)

    expect(analytics.logOnboardingStarted).toHaveBeenCalledWith({ type: 'login' })
  })

  describe('when enableCreditV3 activated', () => {
    beforeEach(() => setFeatureFlags([RemoteStoreFeatureFlags.ENABLE_CREDIT_V3]))

    it('should display subtitle with credit V3', () => {
      render(<OnboardingWelcome />)

      const subtitle =
        'Plus de 3 millions d’offres culturelles et un crédit à dépenser sur l’application si tu as 17 ou 18 ans.'

      expect(screen.getByText(subtitle)).toBeOnTheScreen()
    })
  })
})
