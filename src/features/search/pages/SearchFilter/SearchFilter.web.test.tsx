import React from 'react'

import { SearchFilter } from 'features/search/pages/SearchFilter/SearchFilter'
import { placeholderData } from 'libs/subcategories/placeholderData'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { act, checkAccessibilityFor, render, screen, waitFor } from 'tests/utils/web'

const mockData = placeholderData
jest.mock('libs/subcategories/useSubcategories', () => ({
  useSubcategories: () => ({
    data: mockData,
  }),
}))

const mockHasNextPage = true
const mockFetchNextPage = jest.fn()
jest.mock('features/search/api/useSearchResults/useSearchResults', () => ({
  useSearchResults: () => ({
    data: mockData,
    hits: [],
    nbHits: 0,
    isFetching: false,
    isLoading: false,
    hasNextPage: mockHasNextPage,
    fetchNextPage: mockFetchNextPage,
    isFetchingNextPage: false,
  }),
}))

describe('<SearchFilter/>', () => {
  describe('Accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderSearchFilter()

      await act(async () => {
        const results = await checkAccessibilityFor(container)

        expect(results).toHaveNoViolations()
      })
    })
  })

  it('should display back button on header', async () => {
    renderSearchFilter()

    await act(async () => {}) // fixes 3 warnings "An update to %s inside a test was not wrapped in act" for LocationModal, PriceModal and DatesHoursModal

    await waitFor(() => {
      expect(screen.getByTestId('Revenir en arrière')).toBeInTheDocument()
    })
  })

  it('should not display close button on header', async () => {
    renderSearchFilter()

    await act(async () => {}) // fixes 3 warnings "An update to %s inside a test was not wrapped in act" for LocationModal, PriceModal and DatesHoursModal

    await waitFor(() => {
      expect(screen.queryByTestId('Fermer')).not.toBeInTheDocument()
    })
  })
})

const renderSearchFilter = () =>
  render(reactQueryProviderHOC(<SearchFilter />), {
    theme: { isDesktopViewport: true, isMobileViewport: false },
  })
