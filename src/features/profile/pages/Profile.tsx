import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NativeScrollEvent, Platform, ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import { v4 as uuidv4 } from 'uuid'

import { useAuthContext } from 'features/auth/context/AuthContext'
import { useSettingsContext } from 'features/auth/context/SettingsContext'
import { useLogoutRoutine } from 'features/auth/helpers/useLogoutRoutine'
import { useFavoritesState } from 'features/favorites/context/FavoritesWrapper'
import { ProfileHeader } from 'features/profile/components/Header/ProfileHeader/ProfileHeader'
import { SectionWithSwitch } from 'features/profile/components/SectionWithSwitch/SectionWithSwitch'
import { SocialNetwork } from 'features/profile/components/SocialNetwork/SocialNetwork'
import { SHARE_APP_BANNER_IMAGE_SOURCE } from 'features/share/components/shareAppBannerImage'
import { shareApp } from 'features/share/helpers/shareApp'
import { TutorialTypes } from 'features/tutorial/enums'
import { AccessibilityRole } from 'libs/accessibilityRole/accessibilityRole'
import { isCloseToBottom } from 'libs/analytics'
import { analytics } from 'libs/analytics/provider'
import { env } from 'libs/environment/env'
import { useFeatureFlag } from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import { RemoteStoreFeatureFlags } from 'libs/firebase/firestore/types'
import { useRemoteConfigContext } from 'libs/firebase/remoteConfig/RemoteConfigProvider'
import useFunctionOnce from 'libs/hooks/useFunctionOnce'
import { GeolocPermissionState, useLocation } from 'libs/location'
import { useNetInfoContext } from 'libs/network/NetInfoWrapper'
import { OfflinePage } from 'libs/network/OfflinePage'
import { AccessibilityFooter } from 'shared/AccessibilityFooter/AccessibilityFooter'
import { getAge } from 'shared/user/getAge'
import { InputError } from 'ui/components/inputs/InputError'
import { Li } from 'ui/components/Li'
import { BannerWithBackground } from 'ui/components/ModuleBanner/BannerWithBackground'
import { Section } from 'ui/components/Section'
import { SectionRow } from 'ui/components/SectionRow'
import { StatusBarBlurredBackground } from 'ui/components/statusBar/statusBarBlurredBackground'
import { InternalNavigationProps } from 'ui/components/touchableLink/types'
import { VerticalUl } from 'ui/components/Ul'
import { ViewGap } from 'ui/components/ViewGap/ViewGap'
import { useDebounce } from 'ui/hooks/useDebounce'
import { useVersion } from 'ui/hooks/useVersion'
import { Bell } from 'ui/svg/icons/Bell'
import { BicolorProfile } from 'ui/svg/icons/BicolorProfile'
import { Bulb } from 'ui/svg/icons/Bulb'
import { Confidentiality } from 'ui/svg/icons/Confidentiality'
import { ExternalSite } from 'ui/svg/icons/ExternalSite'
import { HandicapMental } from 'ui/svg/icons/HandicapMental'
import { LegalNotices } from 'ui/svg/icons/LegalNotices'
import { LifeBuoy } from 'ui/svg/icons/LifeBuoy'
import { LocationPointer } from 'ui/svg/icons/LocationPointer'
import { SignOut } from 'ui/svg/icons/SignOut'
import { LogoMinistere } from 'ui/svg/LogoMinistere'
import { getSpacing, Spacer, TypoDS } from 'ui/theme'
import { SECTION_ROW_ICON_SIZE } from 'ui/theme/constants'

const isWeb = Platform.OS === 'web'

const DEBOUNCE_TOGGLE_DELAY_MS = 5000

const OnlineProfile: React.FC = () => {
  const enableAchievements = useFeatureFlag(RemoteStoreFeatureFlags.ENABLE_ACHIEVEMENTS)
  const enableSystemBanner = useFeatureFlag(RemoteStoreFeatureFlags.WIP_APP_V2_SYSTEM_BLOCK)
  const disableActivation = useFeatureFlag(RemoteStoreFeatureFlags.DISABLE_ACTIVATION)
  const showRemoteBanner = useFeatureFlag(RemoteStoreFeatureFlags.SHOW_REMOTE_BANNER)
  const enablePassForAll = useFeatureFlag(RemoteStoreFeatureFlags.ENABLE_PASS_FOR_ALL)

  const { dispatch: favoritesDispatch } = useFavoritesState()
  const { isLoggedIn, user } = useAuthContext()
  const { data: settings } = useSettingsContext()
  const enableCreditV3 = settings?.wipEnableCreditV3
  const signOut = useLogoutRoutine()
  const version = useVersion()
  const scrollViewRef = useRef<ScrollView | null>(null)
  const locationActivationErrorId = uuidv4()
  const userAge = getAge(user?.birthDate)
  const { displayInAppFeedback } = useRemoteConfigContext()
  const {
    geolocPositionError,
    permissionState,
    requestGeolocPermission,
    showGeolocPermissionModal,
  } = useLocation()
  const [isGeolocSwitchActive, setIsGeolocSwitchActive] = useState<boolean>(
    permissionState === GeolocPermissionState.GRANTED
  )

  const isCreditEmpty = user?.domainsCredit?.all.remaining === 0
  const isDepositExpired = user?.depositExpirationDate
    ? new Date(user?.depositExpirationDate) < new Date()
    : false
  const isExpiredOrCreditEmptyWithNoUpcomingCredit =
    userAge && userAge >= 18 && (isDepositExpired || isCreditEmpty)

  const shouldDisplayTutorial = !user?.isBeneficiary || isExpiredOrCreditEmptyWithNoUpcomingCredit

  const navigateTo15to18: InternalNavigationProps['navigateTo'] = enableCreditV3
    ? { screen: 'ProfileTutorialAgeInformationCreditV3' }
    : { screen: 'ProfileTutorialAgeInformation', params: { age: userAge } }
  const navigateToUnder15AndAbove18: InternalNavigationProps['navigateTo'] = enableCreditV3
    ? { screen: 'ProfileTutorialAgeInformationCreditV3' }
    : { screen: 'EligibleUserAgeSelection', params: { type: TutorialTypes.PROFILE_TUTORIAL } }
  const tutorialNavigateTo =
    userAge && userAge < 19 && userAge > 14 ? navigateTo15to18 : navigateToUnder15AndAbove18

  useFocusEffect(
    useCallback(() => {
      if (permissionState === GeolocPermissionState.GRANTED) {
        setIsGeolocSwitchActive(true)
      } else {
        setIsGeolocSwitchActive(false)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [geolocPositionError, permissionState])
  )

  const switchGeolocation = useCallback(async () => {
    if (permissionState === GeolocPermissionState.GRANTED) {
      favoritesDispatch({ type: 'SET_SORT_BY', payload: 'RECENTLY_ADDED' })
      showGeolocPermissionModal()
    } else if (permissionState === GeolocPermissionState.NEVER_ASK_AGAIN) {
      showGeolocPermissionModal()
    } else {
      await requestGeolocPermission()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionState])

  const debouncedLogLocationToggle = useDebounce(
    analytics.logLocationToggle,
    DEBOUNCE_TOGGLE_DELAY_MS
  )

  function scrollToTop() {
    if (scrollViewRef?.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
    }
  }
  const debouncedScrollToTop = useDebounce(scrollToTop, 400)

  useEffect(() => {
    if (!isLoggedIn) {
      debouncedScrollToTop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  const logProfilScrolledToBottom = useFunctionOnce(analytics.logProfilScrolledToBottom)

  function onScroll({ nativeEvent }: { nativeEvent: NativeScrollEvent }) {
    if (isCloseToBottom(nativeEvent)) {
      logProfilScrolledToBottom()
    }
  }

  const onShareBannerPress = useCallback(() => {
    analytics.logShareApp({ from: 'profile' })
    shareApp('profile_banner')
  }, [])

  return (
    <Container>
      <ScrollView
        bounces
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={16}
        testID="profile-scrollview">
        <ScrollViewContentContainer>
          <View accessibilityRole={AccessibilityRole.MAIN}>
            <ProfileHeader
              featureFlags={{
                enableAchievements,
                enableSystemBanner,
                disableActivation,
                showRemoteBanner,
                enablePassForAll,
              }}
              user={user}
            />
            <ProfileContainer>
              <Spacer.Column numberOfSpaces={4} />
              <Section title={isLoggedIn ? 'Paramètres du compte' : 'Paramètres de l’application'}>
                <VerticalUl>
                  {isLoggedIn ? (
                    <Li>
                      <Row
                        title="Informations personnelles"
                        type="navigable"
                        navigateTo={{ screen: 'PersonalData' }}
                        icon={BicolorProfile}
                      />
                    </Li>
                  ) : null}
                  <Li>
                    <Row
                      type="navigable"
                      title="Notifications"
                      icon={Bell}
                      navigateTo={{ screen: 'NotificationsSettings' }}
                    />
                  </Li>
                  <LiWithMarginVertical>
                    <SectionWithSwitch
                      icon={LocationPointer}
                      iconSize={SECTION_ROW_ICON_SIZE}
                      title="Activer ma géolocalisation"
                      active={isGeolocSwitchActive}
                      accessibilityDescribedBy={locationActivationErrorId}
                      toggle={() => {
                        switchGeolocation()
                        debouncedLogLocationToggle(!isGeolocSwitchActive)
                      }}
                      toggleLabel="Activer ma géolocalisation"
                    />
                    <InputError
                      visible={!!geolocPositionError}
                      messageId={geolocPositionError?.message}
                      numberOfSpacesTop={1}
                      relatedInputId={locationActivationErrorId}
                    />
                  </LiWithMarginVertical>
                </VerticalUl>
              </Section>
              <Section title="Aides">
                <VerticalUl>
                  {shouldDisplayTutorial ? (
                    <Li>
                      <Row
                        title="Comment ça marche&nbsp;?"
                        type="navigable"
                        navigateTo={tutorialNavigateTo}
                        onPress={() =>
                          analytics.logConsultTutorial({ age: userAge, from: 'ProfileHelp' })
                        }
                        icon={LifeBuoy}
                      />
                    </Li>
                  ) : null}
                  <Li>
                    <Row
                      title="Centre d’aide"
                      type="clickable"
                      externalNav={{ url: env.FAQ_LINK }}
                      icon={ExternalSite}
                    />
                  </Li>
                </VerticalUl>
              </Section>
              <Section title="Autres">
                <VerticalUl>
                  <Li>
                    <Row
                      title="Accessibilité"
                      type="navigable"
                      navigateTo={{ screen: 'Accessibility' }}
                      icon={HandicapMental}
                    />
                  </Li>
                  {displayInAppFeedback ? (
                    <Li>
                      <Row
                        title="Faire une suggestion"
                        type="navigable"
                        navigateTo={{ screen: 'FeedbackInApp' }}
                        icon={Bulb}
                      />
                    </Li>
                  ) : null}
                  <Li>
                    <Row
                      title="Informations légales"
                      type="navigable"
                      navigateTo={{ screen: 'LegalNotices' }}
                      icon={LegalNotices}
                    />
                  </Li>
                  <Li>
                    <Row
                      title="Confidentialité"
                      type="navigable"
                      navigateTo={{ screen: 'ConsentSettings' }}
                      icon={Confidentiality}
                    />
                  </Li>
                </VerticalUl>
              </Section>
              {isWeb ? null : (
                <Section title="Partager le pass Culture">
                  <Spacer.Column numberOfSpaces={4} />
                  <BannerWithBackground
                    backgroundSource={SHARE_APP_BANNER_IMAGE_SOURCE}
                    onPress={onShareBannerPress}>
                    <ShareAppContainer gap={1}>
                      <StyledButtonText>Partage le pass Culture</StyledButtonText>
                      <StyledBody>Recommande le bon plan à&nbsp;tes&nbsp;amis&nbsp;!</StyledBody>
                    </ShareAppContainer>
                  </BannerWithBackground>
                  <Spacer.Column numberOfSpaces={4} />
                </Section>
              )}
              <Section title="Suivre le pass Culture">
                <SocialNetwork />
              </Section>
              {isLoggedIn ? (
                <Section>
                  <Spacer.Column numberOfSpaces={4} />
                  <SectionRow
                    title="Déconnexion"
                    onPress={signOut}
                    type="clickable"
                    icon={SignOut}
                    iconSize={SECTION_ROW_ICON_SIZE}
                  />
                </Section>
              ) : null}
              <Section>
                <Version>
                  {version}
                  {isWeb ? `-${String(env.COMMIT_HASH)}` : ''}
                </Version>
                {isWeb ? null : (
                  <LogoMinistereContainer>
                    <LogoMinistere />
                  </LogoMinistereContainer>
                )}
              </Section>
              {isWeb ? null : <Spacer.TabBar />}
            </ProfileContainer>
          </View>
          {isWeb ? (
            <View accessibilityRole={AccessibilityRole.FOOTER}>
              <AccessibilityFooter />
            </View>
          ) : null}
        </ScrollViewContentContainer>
      </ScrollView>
      <StatusBarBlurredBackground />
    </Container>
  )
}

export function Profile() {
  const netInfo = useNetInfoContext()
  if (netInfo.isConnected) {
    return <OnlineProfile />
  }
  return <OfflinePage />
}

const Container = styled.View({ flex: 1 })

const ProfileContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.white,
  flexDirection: 'column',
  paddingHorizontal: theme.contentPage.marginHorizontal,
}))

const ScrollViewContentContainer = styled.View({
  flex: 1,
  flexDirection: 'column',
})

const Row = styled(SectionRow).attrs({ iconSize: SECTION_ROW_ICON_SIZE })({
  paddingVertical: getSpacing(4),
})

const ShareAppContainer = styled(ViewGap)(({ theme }) => ({
  paddingRight: theme.isSmallScreen ? 0 : getSpacing(8),
}))

const StyledBody = styled(TypoDS.Body)(({ theme }) => ({
  color: theme.colors.white,
}))

const StyledButtonText = styled(TypoDS.BodyAccent)(({ theme }) => ({
  color: theme.colors.white,
}))

const Version = styled(TypoDS.BodyAccentXs)(({ theme }) => ({
  color: theme.colors.greyDark,
  marginVertical: getSpacing(4),
}))

const LogoMinistereContainer = styled.View({
  width: getSpacing(40),
  height: getSpacing(28),
  marginBottom: getSpacing(4),
})

const LiWithMarginVertical = styled(Li)({
  marginVertical: getSpacing(4),
})
