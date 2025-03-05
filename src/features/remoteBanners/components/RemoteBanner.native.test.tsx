import React from 'react'

import * as NavigationHelpers from 'features/navigation/helpers/openUrl'
import { RemoteGenericBanner } from 'features/remoteBanners/banners/RemoteGenericBanner'
import {
  RemoteBannerRedirectionType,
  RemoteBannerType as RemoteBannerType,
} from 'features/remoteBanners/utils/remoteBannerSchema'
import { AccessibilityRole } from 'libs/accessibilityRole/accessibilityRole'
import { analytics } from 'libs/analytics/provider'
import { setFeatureFlags } from 'libs/firebase/firestore/featureFlags/__tests__/setFeatureFlags'
import { RemoteStoreFeatureFlags } from 'libs/firebase/firestore/types'
import { eventMonitoring } from 'libs/monitoring/services'
import { render, screen, userEvent } from 'tests/utils'

jest.mock('libs/firebase/analytics/analytics')

const openUrl = jest.spyOn(NavigationHelpers, 'openUrl')

jest.useFakeTimers()
const user = userEvent.setup()
const appStoreUrl = 'https://apps.apple.com/fr/app/pass-culture/id1557887412'

describe('<RemoteBanner/>', () => {
  it('should not be displayed when the showRemoteGenericBanner FF is disable', () => {
    setFeatureFlags()
    render(<RemoteGenericBanner from="profile" />)

    const banner = screen.queryByText('title 1')

    expect(banner).not.toBeOnTheScreen()
  })

  it('should displayed when redirection type is an expected value', () => {
    setFeatureFlags([
      {
        featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER,
        options: bannerExternalUrl,
      },
    ])
    render(<RemoteGenericBanner from="profile" />)

    const banner = screen.queryByText('title 1')

    expect(banner).toBeOnTheScreen()
  })

  it('should not be displayed when redirection type is an unexpected value', () => {
    setFeatureFlags([
      { featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER, options: bannerBadType },
    ])
    render(<RemoteGenericBanner from="profile" />)

    const banner = screen.queryByText('title 1')

    expect(banner).not.toBeOnTheScreen()
  })

  it('should log sentry when redirection type is an unexpected value', () => {
    setFeatureFlags([
      { featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER, options: bannerBadType },
    ])
    render(<RemoteGenericBanner from="profile" />)

    expect(eventMonitoring.captureException).toHaveBeenCalledWith(
      new Error(
        'RemoteBanner validation issue: ValidationError: redirectionType must be one of the following values: external, store'
      ),
      {
        extra: { objectToValidate: { ...bannerBadType } },
      }
    )
  })

  it('should navigate to store and a11y label should be correct when redirection is to app store', async () => {
    setFeatureFlags([
      { featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER, options: bannerAppStore },
    ])
    render(<RemoteGenericBanner from="profile" />)

    const banner = await screen.findByText('title 1')
    await user.press(banner)

    const accessibilityLabel = await screen.findByLabelText(`Nouvelle fenêtre : ${appStoreUrl}`)

    expect(accessibilityLabel).toBeTruthy()
    expect(openUrl).toHaveBeenCalledWith(appStoreUrl)
  })

  it('should navigate to url and a11y label should be correct when redirection is external', async () => {
    setFeatureFlags([
      {
        featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER,
        options: bannerExternalUrl,
      },
    ])
    render(<RemoteGenericBanner from="profile" />)

    const banner = await screen.findByText('title 1')
    await user.press(banner)

    const accessibilityLabel = await screen.findByLabelText(
      'Nouvelle fenêtre : https://www.test.fr'
    )

    expect(accessibilityLabel).toBeTruthy()
    expect(openUrl).toHaveBeenCalledWith('https://www.test.fr')
  })

  it('should be disabled and there should not be an a11y label when redirection is external, but url is an empty string', async () => {
    setFeatureFlags([
      {
        featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER,
        options: bannerExternalUrlWithMissingUrl,
      },
    ])
    render(<RemoteGenericBanner from="profile" />)

    const banner = await screen.findByText('title 1')
    await user.press(banner)

    const accessibilityLabel = screen.queryByLabelText('Nouvelle fenêtre : https://www.test.fr')

    expect(accessibilityLabel).toBeFalsy()
    expect(openUrl).not.toHaveBeenCalled()
  })

  it('should log analytics when user presses banner', async () => {
    setFeatureFlags([
      {
        featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER,
        options: bannerAppStore,
      },
    ])
    render(<RemoteGenericBanner from="profile" />)

    const banner = await screen.findByText('title 1')
    await user.press(banner)

    expect(analytics.logHasClickedRemoteGenericBanner).toHaveBeenCalledWith('profile', {
      ...bannerAppStore,
    })
  })

  describe('accessibility', () => {
    it('should have correct accessibilityRole for store redirection', async () => {
      setFeatureFlags([
        {
          featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER,
          options: bannerAppStore,
        },
      ])
      render(<RemoteGenericBanner from="profile" />)

      const linkBanner = await screen.findByRole(AccessibilityRole.LINK)

      expect(linkBanner).toBeTruthy()
    })

    it('should have correct accessibilityRole for external redirection', async () => {
      setFeatureFlags([
        {
          featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER,
          options: bannerExternalUrl,
        },
      ])
      render(<RemoteGenericBanner from="profile" />)

      const linkBanner = await screen.findByRole(AccessibilityRole.LINK)

      expect(linkBanner).toBeTruthy()
    })

    it('should have correct accessibilityLabel for store redirection', async () => {
      setFeatureFlags([
        {
          featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER,
          options: bannerAppStore,
        },
      ])
      render(<RemoteGenericBanner from="profile" />)

      const banner = await screen.findByText('title 1')
      await user.press(banner)

      const accessibilityLabel = await screen.findByLabelText(`Nouvelle fenêtre : ${appStoreUrl}`)

      expect(accessibilityLabel).toBeTruthy()
    })

    it('should have correct accessibilityLabel for external redirection', async () => {
      setFeatureFlags([
        {
          featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER,
          options: bannerExternalUrl,
        },
      ])
      render(<RemoteGenericBanner from="profile" />)

      const banner = await screen.findByText('title 1')
      await user.press(banner)

      const accessibilityLabel = await screen.findByLabelText(
        'Nouvelle fenêtre : https://www.test.fr'
      )

      expect(accessibilityLabel).toBeTruthy()
    })

    it('should not have accessibilityLabel if external URL is missing', async () => {
      setFeatureFlags([
        {
          featureFlag: RemoteStoreFeatureFlags.SHOW_REMOTE_GENERIC_BANNER,
          options: bannerExternalUrlWithMissingUrl,
        },
      ])
      render(<RemoteGenericBanner from="profile" />)

      const banner = await screen.findByText('title 1')
      await user.press(banner)

      const accessibilityLabel = screen.queryByLabelText('Nouvelle fenêtre : https://www.test.fr')

      expect(accessibilityLabel).toBeFalsy()
    })
  })
})

const bannerAppStore: RemoteBannerType = {
  title: 'title 1',
  subtitleMobile: 'subtitleMobile 1',
  subtitleWeb: 'subtitleWeb 1',
  redirectionUrl: 'https://www.test.fr',
  redirectionType: RemoteBannerRedirectionType.STORE,
}

const bannerExternalUrl: RemoteBannerType = {
  title: 'title 1',
  subtitleMobile: 'subtitleMobile 1',
  subtitleWeb: 'subtitleWeb 1',
  redirectionUrl: 'https://www.test.fr',
  redirectionType: RemoteBannerRedirectionType.EXTERNAL,
}

const bannerExternalUrlWithMissingUrl: Partial<RemoteBannerType> = {
  title: 'title 1',
  subtitleMobile: 'subtitleMobile 1',
  subtitleWeb: 'subtitleWeb 1',
  redirectionUrl: '',
  redirectionType: RemoteBannerRedirectionType.EXTERNAL,
}

const bannerBadType: Partial<RemoteBannerType> = {
  title: 'title 1',
  subtitleMobile: 'subtitleMobile 1',
  subtitleWeb: 'subtitleWeb 1',
  redirectionUrl: 'https://www.test.fr',
  redirectionType: 'other',
}
