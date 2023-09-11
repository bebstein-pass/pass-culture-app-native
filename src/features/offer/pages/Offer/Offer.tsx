import { useFocusEffect, useRoute } from '@react-navigation/native'
import React, { FunctionComponent, useCallback, useEffect } from 'react'
import { NativeScrollEvent } from 'react-native'
import styled from 'styled-components/native'

import { NativeCategoryIdEnumv2, SearchGroupNameEnumv2 } from 'api/gen'
import { UseRouteType } from 'features/navigation/RootNavigator/types'
import { useOffer } from 'features/offer/api/useOffer'
import { useSimilarOffers } from 'features/offer/api/useSimilarOffers'
import { BottomBanner } from 'features/offer/components/BottomBanner/BottomBanner'
import { CTAButton } from 'features/offer/components/CTAButton/CTAButton'
import { OfferBody } from 'features/offer/components/OfferBody/OfferBody'
import { OfferHeader } from 'features/offer/components/OfferHeader/OfferHeader'
import { OfferWebHead } from 'features/offer/components/OfferWebHead'
import { PlaylistType } from 'features/offer/enums'
import { getIsFreeDigitalOffer } from 'features/offer/helpers/getIsFreeDigitalOffer/getIsFreeDigitalOffer'
import { getSearchGroupAndNativeCategoryFromSubcategoryId } from 'features/offer/helpers/getSearchGroupAndNativeCategoryFromSubcategoryId/getSearchGroupAndNativeCategoryFromSubcategoryId'
import { useCtaWordingAndAction } from 'features/offer/helpers/useCtaWordingAndAction/useCtaWordingAndAction'
import { analytics, isCloseToBottom } from 'libs/analytics'
import { useRemoteConfigContext } from 'libs/firebase/remoteConfig'
import useFunctionOnce from 'libs/hooks/useFunctionOnce'
import { BatchEvent, BatchUser } from 'libs/react-native-batch'
import { useSubcategories } from 'libs/subcategories/useSubcategories'
import { useBookOfferModal } from 'shared/offer/helpers/useBookOfferModal'
import { useOpacityTransition } from 'ui/animations/helpers/useOpacityTransition'
import { getSpacing, Spacer } from 'ui/theme'

const trackEventHasSeenOffer = () => BatchUser.trackEvent(BatchEvent.hasSeenOffer)

const OFFER_SEARCH_GROUPS_ELIGIBLE_FOR_SURVEY = [
  SearchGroupNameEnumv2.CONCERTS_FESTIVALS,
  SearchGroupNameEnumv2.LIVRES,
]
const OFFER_NATIVE_CATEGORIES_ELIGIBLE_FOR_SURVEY = [
  NativeCategoryIdEnumv2.SEANCES_DE_CINEMA,
  NativeCategoryIdEnumv2.VISITES_CULTURELLES,
]
const trackEventHasSeenOfferForSurvey = () => BatchUser.trackEvent(BatchEvent.hasSeenOfferForSurvey)

const PLAYLIST_HEIGHT = 300

const getPlaylistsHeight = (numberOfPlaylists: number) => {
  return PLAYLIST_HEIGHT * numberOfPlaylists
}

export const Offer: FunctionComponent = () => {
  const route = useRoute<UseRouteType<'Offer'>>()
  const trackEventHasSeenOfferOnce = useFunctionOnce(trackEventHasSeenOffer)
  const trackEventHasSeenOfferForSurveyOnce = useFunctionOnce(trackEventHasSeenOfferForSurvey)
  const offerId = route.params?.id
  const searchId = route.params?.searchId
  const from = route.params?.from

  const { data: offerResponse } = useOffer({ offerId })

  const logConsultWholeOffer = useFunctionOnce(() => {
    if (offerResponse) {
      analytics.logConsultWholeOffer(offerResponse.id)
    }
  })

  const { data: offer } = useOffer({ offerId })
  const { data } = useSubcategories()
  const { shouldUseAlgoliaRecommend } = useRemoteConfigContext()

  const { searchGroupName, nativeCategory } =
    getSearchGroupAndNativeCategoryFromSubcategoryId(data, offer?.subcategoryId) || {}
  const sameCategorySimilarOffers = useSimilarOffers({
    offerId,
    position: offer?.venue.coordinates,
    shouldUseAlgoliaRecommend,
    categoryIncluded: searchGroupName ?? SearchGroupNameEnumv2.NONE,
  })
  const hasSameCategorySimilarOffers = Boolean(sameCategorySimilarOffers?.length)

  const otherCategoriesSimilarOffers = useSimilarOffers({
    offerId,
    position: offer?.venue.coordinates,
    shouldUseAlgoliaRecommend,
    categoryExcluded: searchGroupName ?? SearchGroupNameEnumv2.NONE,
  })
  const hasOtherCategoriesSimilarOffers = Boolean(otherCategoriesSimilarOffers?.length)

  const fromOfferId = route.params?.fromOfferId

  const isFreeDigitalOffer = getIsFreeDigitalOffer(offer)

  const shouldTriggerBatchSurveyEvent =
    (searchGroupName && OFFER_SEARCH_GROUPS_ELIGIBLE_FOR_SURVEY.includes(searchGroupName)) ||
    (nativeCategory && OFFER_NATIVE_CATEGORIES_ELIGIBLE_FOR_SURVEY.includes(nativeCategory))

  const logSameCategoryPlaylistVerticalScroll = useFunctionOnce(() => {
    return analytics.logPlaylistVerticalScroll({
      fromOfferId,
      offerId,
      playlistType: PlaylistType.SAME_CATEGORY_SIMILAR_OFFERS,
      shouldUseAlgoliaRecommend,
    })
  })

  const logOtherCategoriesPlaylistVerticalScroll = useFunctionOnce(() => {
    return analytics.logPlaylistVerticalScroll({
      fromOfferId,
      offerId,
      playlistType: PlaylistType.OTHER_CATEGORIES_SIMILAR_OFFERS,
      shouldUseAlgoliaRecommend,
    })
  })

  const { headerTransition, onScroll } = useOpacityTransition({
    listener: ({ nativeEvent }) => {
      if (isCloseToBottom(nativeEvent)) {
        logConsultWholeOffer()
        if (shouldTriggerBatchSurveyEvent) {
          trackEventHasSeenOfferForSurveyOnce()
        }
      }
      handleLogPlaylistVerticalScroll(nativeEvent)
    },
  })

  const handleLogPlaylistVerticalScroll = (nativeEvent: NativeScrollEvent) => {
    // The log event is triggered when the similar offer playlist is visible
    const hasTwoSimilarOffersPlaylist =
      hasSameCategorySimilarOffers && hasOtherCategoriesSimilarOffers

    if (
      isCloseToBottom({
        ...nativeEvent,
        padding: getPlaylistsHeight(2),
      }) &&
      hasTwoSimilarOffersPlaylist
    ) {
      logSameCategoryPlaylistVerticalScroll()
    }

    if (
      isCloseToBottom({
        ...nativeEvent,
        padding: getPlaylistsHeight(1),
      })
    ) {
      if (hasTwoSimilarOffersPlaylist || hasOtherCategoriesSimilarOffers) {
        logOtherCategoriesPlaylistVerticalScroll()
      } else if (!hasTwoSimilarOffersPlaylist && hasSameCategorySimilarOffers) {
        logSameCategoryPlaylistVerticalScroll()
      }
    }
  }

  const {
    wording,
    onPress: onPressCTA,
    navigateTo,
    externalNav,
    modalToDisplay,
    isEndedUsedBooking,
    bottomBannerText,
    isDisabled,
  } = useCtaWordingAndAction({ offerId, from, searchId }) ?? {}

  const { OfferModal: CTAOfferModal, showModal: showOfferModal } = useBookOfferModal({
    modalToDisplay,
    offerId,
    isEndedUsedBooking,
  })

  useFocusEffect(
    useCallback(() => {
      trackEventHasSeenOfferOnce()
      if (route.params.openModalOnNavigation) {
        showOfferModal()
      }
    }, [trackEventHasSeenOfferOnce, route.params.openModalOnNavigation, showOfferModal])
  )

  useEffect(() => {
    let timeoutId: number
    if (shouldTriggerBatchSurveyEvent) {
      timeoutId = setTimeout(() => {
        trackEventHasSeenOfferForSurveyOnce()
      }, 5000)
    }

    return () => clearTimeout(timeoutId)
  }, [shouldTriggerBatchSurveyEvent, trackEventHasSeenOfferForSurveyOnce])

  const onPress = () => {
    onPressCTA?.()
    showOfferModal()
  }

  if (!offerResponse) return null

  return (
    <Container>
      <OfferWebHead offer={offerResponse} />
      <OfferBody
        offerId={offerId}
        onScroll={onScroll}
        sameCategorySimilarOffers={sameCategorySimilarOffers}
        otherCategoriesSimilarOffers={otherCategoriesSimilarOffers}
        shouldUseAlgoliaRecommend={shouldUseAlgoliaRecommend}
      />
      {/* OfferHeader is called after Body to implement the BlurView for iOS */}
      <OfferHeader
        title={offerResponse.name}
        headerTransition={headerTransition}
        offerId={offerResponse.id}
        searchId={searchId}
      />
      {!!wording && (
        <React.Fragment>
          <CallToActionContainer testID="CTA-button">
            <CTAButton
              wording={wording}
              onPress={onPress}
              navigateTo={navigateTo}
              externalNav={externalNav}
              isDisabled={isDisabled}
              isFreeDigitalOffer={isFreeDigitalOffer}
            />
            <Spacer.Column numberOfSpaces={bottomBannerText ? 4.5 : 6} />
          </CallToActionContainer>
          {bottomBannerText ? <BottomBanner text={bottomBannerText} /> : <Spacer.BottomScreen />}
        </React.Fragment>
      )}

      {CTAOfferModal}
    </Container>
  )
}

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
}))

const CallToActionContainer = styled.View({
  marginHorizontal: getSpacing(6),
})
