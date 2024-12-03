import React from 'react'

import { ThematicSearchPlaylistList } from 'features/search/pages/ThematicSearch/ThematicSearchPlaylistList'
import { ThematicSearchPlaylistData } from 'features/search/pages/ThematicSearch/types'
import * as useFeatureFlagAPI from 'libs/firebase/firestore/featureFlags/useFeatureFlag'
import { mockBuilder } from 'tests/mockBuilder'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { render, screen, cleanup } from 'tests/utils'

jest.spyOn(useFeatureFlagAPI, 'useFeatureFlag').mockReturnValue(true) // WIP_NEW_OFFER_TILE in renderPassPlaylist.tsx

jest.mock('@shopify/flash-list', () => {
  const ActualFlashList = jest.requireActual('@shopify/flash-list').FlashList
  class MockFlashList extends ActualFlashList {
    componentDidMount() {
      super.componentDidMount()
      this.rlvRef?._scrollComponent?._scrollViewRef?.props?.onLayout({
        nativeEvent: { layout: { height: 250, width: 800 } },
      })
    }
  }
  return {
    ...jest.requireActual('@shopify/flash-list'),
    FlashList: MockFlashList,
  }
})

jest.mock('libs/firebase/analytics/analytics')

const DEFAULT_PLAYLIST_OFFERS = mockBuilder.searchResponseOffer({})
const DEFAULT_PLAYLIST_TITLE = 'Titre de la playlist'
const DEFAULT_PLAYLIST = { title: DEFAULT_PLAYLIST_TITLE, offers: DEFAULT_PLAYLIST_OFFERS }
const DEFAULT_PLAYLIST_WITHOUT_HITS = {
  title: DEFAULT_PLAYLIST_TITLE,
  offers: { hits: [] },
}

describe('ThematicSearchPlaylistList', () => {
  afterEach(cleanup)

  it('should render playlist properly', async () => {
    renderThematicSearchPlaylistList([DEFAULT_PLAYLIST], false)

    await screen.findByText(DEFAULT_PLAYLIST_TITLE)

    expect(await screen.findByText('Harry potter à l’école des sorciers')).toBeOnTheScreen()
  })

  it('should render OfferPlaylistSkeleton when playlists are loading', async () => {
    renderThematicSearchPlaylistList([DEFAULT_PLAYLIST], true)

    expect(screen.getByTestId('OfferPlaylistSkeleton')).toBeOnTheScreen()
  })

  it('should not return a playlist without offers', async () => {
    renderThematicSearchPlaylistList([DEFAULT_PLAYLIST_WITHOUT_HITS], false)

    expect(screen.queryByText(DEFAULT_PLAYLIST_TITLE)).not.toBeOnTheScreen()
  })
})

function renderThematicSearchPlaylistList(
  playlists: ThematicSearchPlaylistData[],
  arePlaylistsLoading: boolean
) {
  return render(
    reactQueryProviderHOC(
      <ThematicSearchPlaylistList playlists={playlists} isLoading={arePlaylistsLoading} />
    )
  )
}
