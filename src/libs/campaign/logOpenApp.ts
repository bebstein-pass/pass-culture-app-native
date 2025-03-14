import { TrackingStatus } from 'react-native-tracking-transparency'

import { analytics } from 'libs/analytics/provider'
import { campaignTracker, CampaignEvents } from 'libs/campaign'
// eslint-disable-next-line no-restricted-imports
import { firebaseAnalytics } from 'libs/firebase/analytics/analytics'

// Exported for tests only
export const logOpenAppRef = {
  hasLoggedOpenApp: false,
}

export const logOpenApp = async (trackingStatus: TrackingStatus) => {
  if (['authorized', 'unavailable'].includes(trackingStatus) && !logOpenAppRef.hasLoggedOpenApp) {
    logOpenAppRef.hasLoggedOpenApp = true
    const firebasePseudoId = await firebaseAnalytics.getAppInstanceId()
    const appsFlyerUserId = await campaignTracker.getUserId()
    await analytics.logOpenApp({ appsFlyerUserId })
    await campaignTracker.logEvent(CampaignEvents.OPEN_APP, {
      af_firebase_pseudo_id: firebasePseudoId,
    })
  }
}
