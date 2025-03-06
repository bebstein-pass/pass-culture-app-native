import { getScreenPath } from './getScreenPath'

jest.mock('libs/firebase/analytics/analytics')

jest.mock('libs/firebase/remoteConfig/remoteConfig.services')

describe('getScreenPath()', () => {
  const ProfileStack = {
    screen: 'ProfileStackNavigator',
    params: { screen: 'Profile', params: undefined },
  }

  const SearchStack = {
    screen: 'SearchStackNavigator',
    params: { screen: 'SearchLanding', params: undefined },
  }

  it.each`
    screen             | params                        | expectedPath
    ${'TabNavigator'}  | ${{ screen: 'Home' }}         | ${'/accueil'}
    ${'TabNavigator'}  | ${ProfileStack}               | ${'/profil'}
    ${'TabNavigator'}  | ${SearchStack}                | ${'/recherche/accueil'}
    ${'Offer'}         | ${{ id: 666, from: 'offer' }} | ${'/offre/666?from=offer'}
    ${'UnknownScreen'} | ${undefined}                  | ${'/UnknownScreen'}
  `(
    `should return $expectedPath when screen=$screen and params=$params`,
    ({ screen, params, expectedPath }) => {
      expect(getScreenPath(screen, params)).toEqual(expectedPath)
    }
  )
})
