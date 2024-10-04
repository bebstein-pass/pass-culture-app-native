import React, { FunctionComponent, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import 'react-native-gesture-handler' // @react-navigation
import 'react-native-get-random-values' // required for `uuid` module to work
import { LogBox, Platform, StatusBar } from 'react-native'
import CodePush from 'react-native-code-push'

// if __DEV__ import if you want to debug
// import './why-did-you-render'
if (process.env.NODE_ENV === 'development') {
  import('react-native-devsettings')
}
import 'intl'
import 'intl/locale-data/jsonp/en'

import { AccessibilityFiltersWrapper } from 'features/accessibility/context/AccessibilityFiltersWrapper'
import { AuthWrapper } from 'features/auth/context/AuthWrapper'
import { SettingsWrapper } from 'features/auth/context/SettingsContext'
import { CulturalSurveyContextProvider } from 'features/culturalSurvey/context/CulturalSurveyContextProvider'
import { AsyncErrorBoundaryWithoutNavigation } from 'features/errors/pages/AsyncErrorBoundary'
import { ScreenErrorProvider } from 'features/errors/pages/ScreenErrorProvider'
import { FavoritesWrapper } from 'features/favorites/context/FavoritesWrapper'
import { SubscriptionContextProvider } from 'features/identityCheck/context/SubscriptionContextProvider'
import { AppNavigationContainer } from 'features/navigation/NavigationContainer'
import { PushNotificationsWrapper } from 'features/notifications/context/PushNotificationsWrapper'
import { SearchWrapper } from 'features/search/context/SearchWrapper'
import { ShareAppWrapper } from 'features/share/context/ShareAppWrapper'
import { OnboardingWrapper } from 'features/tutorial/context/OnboardingWrapper'
import { initAlgoliaAnalytics } from 'libs/algolia/analytics/initAlgoliaAnalytics'
import { SearchAnalyticsWrapper } from 'libs/algolia/analytics/SearchAnalyticsWrapper'
import { AutoImmediate, NextResume } from 'libs/codepush/options'
import { getIsMaestro } from 'libs/e2e/getIsMaestro'
import { env } from 'libs/environment'
import { AnalyticsInitializer } from 'libs/firebase/analytics/AnalyticsInitializer'
import { RemoteConfigProvider } from 'libs/firebase/remoteConfig/RemoteConfigProvider'
import { LocationWrapper } from 'libs/location'
import { eventMonitoring } from 'libs/monitoring'
import { NetInfoWrapper } from 'libs/network/NetInfoWrapper'
import { OfflineModeContainer } from 'libs/network/OfflineModeContainer'
import { BatchMessaging, BatchPush } from 'libs/react-native-batch'
import { configureGoogleSignin } from 'libs/react-native-google-sso/configureGoogleSignin'
import { SafeAreaProvider } from 'libs/react-native-save-area-provider'
import { ReactQueryClientProvider } from 'libs/react-query/ReactQueryClientProvider'
import { SplashScreenProvider } from 'libs/splashscreen'
import { ThemeProvider } from 'libs/styled'
import { theme } from 'theme'
import { SnackBarProvider } from 'ui/components/snackBar/SnackBarContext'

LogBox.ignoreLogs([
  'Setting a timer',
  'OfferNotFoundError', // custom error
  // The following warning is caused by TabNavigationContext which is updated by the `tabbar` prop
  // of TabNavigator. As of today, no bug has been observed which seems related to the warning.
  'Cannot update a component',
  'EventEmitter.removeListener',
])

const App: FunctionComponent = function () {
  useEffect(() => {
    StatusBar.setBarStyle('dark-content')
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true)
      StatusBar.setBackgroundColor('transparent', false)
    }
  }, [])

  useEffect(() => {
    eventMonitoring.init({ enabled: !__DEV__ })
    getIsMaestro().then((isMaestro) => isMaestro && LogBox.ignoreAllLogs())
  }, [])

  useEffect(() => {
    initAlgoliaAnalytics()
    BatchPush.requestNotificationAuthorization() //  For iOS and Android 13
    BatchMessaging.setFontOverride('Montserrat-Regular', 'Montserrat-Bold', 'Montserrat-Italic')
    configureGoogleSignin({
      webClientId: env.GOOGLE_CLIENT_ID,
      iosClientId: env.GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
    })
  }, [])

  return (
    <RemoteConfigProvider>
      <ReactQueryClientProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <ErrorBoundary FallbackComponent={AsyncErrorBoundaryWithoutNavigation}>
              <AnalyticsInitializer>
                {/* All react-query calls should be nested inside NetInfoWrapper to ensure the user has internet connection */}
                <NetInfoWrapper>
                  <SettingsWrapper>
                    <AuthWrapper>
                      <LocationWrapper>
                        <AccessibilityFiltersWrapper>
                          <FavoritesWrapper>
                            <SearchAnalyticsWrapper>
                              <SearchWrapper>
                                <SnackBarProvider>
                                  <CulturalSurveyContextProvider>
                                    <SubscriptionContextProvider>
                                      <SplashScreenProvider>
                                        <PushNotificationsWrapper>
                                          <ShareAppWrapper>
                                            <OnboardingWrapper>
                                              <OfflineModeContainer>
                                                <ScreenErrorProvider>
                                                  <AppNavigationContainer />
                                                </ScreenErrorProvider>
                                              </OfflineModeContainer>
                                            </OnboardingWrapper>
                                          </ShareAppWrapper>
                                        </PushNotificationsWrapper>
                                      </SplashScreenProvider>
                                    </SubscriptionContextProvider>
                                  </CulturalSurveyContextProvider>
                                </SnackBarProvider>
                              </SearchWrapper>
                            </SearchAnalyticsWrapper>
                          </FavoritesWrapper>
                        </AccessibilityFiltersWrapper>
                      </LocationWrapper>
                    </AuthWrapper>
                  </SettingsWrapper>
                </NetInfoWrapper>
              </AnalyticsInitializer>
            </ErrorBoundary>
          </SafeAreaProvider>
        </ThemeProvider>
      </ReactQueryClientProvider>
    </RemoteConfigProvider>
  )
}

const config = env.ENV === 'testing' ? AutoImmediate : NextResume

const AppWithoutMonitoring = App
const AppWithMonitoring = eventMonitoring.wrap(AppWithoutMonitoring) as React.ComponentType<{
  tab?: string
}>
const AppWithCodepush = __DEV__ ? AppWithMonitoring : CodePush(config)(AppWithMonitoring)

/**
 * We have an import bug in the test file App.native.test.tsx with the new eventMonitoring wrapper : WEIRD !!! :
 * Element type is invalid: expected a string (for built-in components) or a class/function (for composite components)
 * but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
 * So we define the old App wrapper for the test to pass
 */
export { AppWithCodepush as App, AppWithoutMonitoring }
