import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { initialSearchState } from 'features/search/context/reducer'
import { FilterBehaviour } from 'features/search/enums'
import {
  OfferDuoModal,
  OfferDuoModalProps,
} from 'features/search/pages/modals/OfferDuoModal/OfferDuoModal'
import { SearchState } from 'features/search/types'
import { beneficiaryUser } from 'fixtures/user'
import { mockAuthContextWithUser } from 'tests/AuthContextUtils'
import { fireEvent, render, screen, waitFor } from 'tests/utils'

const searchId = uuidv4()
const searchState = { ...initialSearchState, searchId }
const mockSearchState = searchState
const mockDispatch = jest.fn()
jest.mock('features/search/context/SearchWrapper', () => ({
  useSearch: () => ({
    searchState: mockSearchState,
    dispatch: mockDispatch,
  }),
}))

jest.mock('features/auth/context/AuthContext')
const mockUser = { ...beneficiaryUser, domainsCredit: { all: { initial: 8000, remaining: 7000 } } }
mockAuthContextWithUser(mockUser)

const mockHideModal = jest.fn()
const mockOnClose = jest.fn()

jest.mock('react-native/Libraries/Animated/animations/TimingAnimation.js')

jest.mock('react-native-safe-area-context', () => ({
  ...(jest.requireActual('react-native-safe-area-context') as Record<string, unknown>),
  useSafeAreaInsets: () => ({ bottom: 16, right: 16, left: 16, top: 16 }),
}))

jest.mock('react-native/Libraries/Animated/createAnimatedComponent', () => {
  return function createAnimatedComponent(Component: unknown) {
    return Component
  }
})

describe('<OfferDuoModal/>', () => {
  it('should render modal correctly after animation and with enabled submit', async () => {
    renderOfferDuoModal()
    await screen.findByText('Uniquement les offres duo')

    expect(screen).toMatchSnapshot()
  })

  describe('modal header', () => {
    it('should have header when viewport width is mobile', () => {
      const isDesktopViewport = false
      renderOfferDuoModal({}, isDesktopViewport)

      const header = screen.queryByTestId('pageHeader')

      expect(header).toBeOnTheScreen()
    })

    describe('Buttons', () => {
      it('should close the modal and general filter page when pressing close button when the modal is opening from general filter page', async () => {
        renderOfferDuoModal({
          filterBehaviour: FilterBehaviour.APPLY_WITHOUT_SEARCHING,
          onClose: mockOnClose,
        })

        const closeButton = screen.getByTestId('Fermer')
        fireEvent.press(closeButton)

        expect(mockOnClose).toHaveBeenCalledTimes(1)
      })

      it('should only close the modal when pressing close button when the modal is opening from search results', async () => {
        renderOfferDuoModal()

        const closeButton = screen.getByTestId('Fermer')
        fireEvent.press(closeButton)

        expect(mockOnClose).not.toHaveBeenCalled()
      })
    })
  })

  describe('when user is logged in and beneficiary with credit', () => {
    beforeEach(() => {
      mockAuthContextWithUser(beneficiaryUser)
    })

    it('should toggle offerIsDuo', () => {
      renderOfferDuoModal()

      const toggle = screen.getByTestId('Interrupteur limitDuoOfferSearch')

      expect(toggle.props.accessibilityState).toEqual({
        disabled: false,
        checked: false,
      })

      fireEvent.press(toggle)

      expect(toggle.props.accessibilityState).toEqual({
        disabled: false,
        checked: true,
      })
    })
  })

  describe('click reset button', () => {
    it('should disable duo offer when click on reset button', () => {
      renderOfferDuoModal()

      const toggle = screen.getByTestId('Interrupteur limitDuoOfferSearch')

      fireEvent.press(toggle)

      const resetButton = screen.getByText('Réinitialiser')

      fireEvent.press(resetButton)

      expect(toggle.props.accessibilityState).toEqual({
        disabled: false,
        checked: false,
      })
    })
  })

  describe('should close the modal', () => {
    it('should close modal on submit', async () => {
      renderOfferDuoModal()
      const button = screen.getByText('Rechercher')

      fireEvent.press(button)

      await waitFor(() => {
        expect(mockHideModal).toHaveBeenCalledTimes(1)
      })
    })

    it('when pressing previous button', () => {
      renderOfferDuoModal()

      const previousButton = screen.getByTestId('Fermer')
      fireEvent.press(previousButton)

      expect(mockHideModal).toHaveBeenCalledTimes(1)
    })
  })

  describe('with "Appliquer le filtre" button', () => {
    it('should display alternative button title', async () => {
      renderOfferDuoModal({
        filterBehaviour: FilterBehaviour.APPLY_WITHOUT_SEARCHING,
      })

      await waitFor(() => {
        expect(screen.getByText('Appliquer le filtre')).toBeOnTheScreen()
      })
    })

    it('should update search state when pressing submit button', async () => {
      renderOfferDuoModal({
        filterBehaviour: FilterBehaviour.APPLY_WITHOUT_SEARCHING,
      })

      const toggle = screen.getByTestId('Interrupteur limitDuoOfferSearch')

      fireEvent.press(toggle)

      const searchButton = screen.getByText('Appliquer le filtre')

      fireEvent.press(searchButton)

      const expectedSearchParams: SearchState = {
        ...searchState,
        offerIsDuo: true,
      }

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'SET_STATE',
          payload: expectedSearchParams,
        })
      })
    })
  })

  describe('with "Rechercher" button', () => {
    it('should set search state view to Search results when selecting DUO offer and pressing button', async () => {
      renderOfferDuoModal()
      const toggle = screen.getByTestId('Interrupteur limitDuoOfferSearch')
      const button = screen.getByText('Rechercher')

      fireEvent.press(toggle)

      fireEvent.press(button)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'SET_STATE',
          payload: {
            ...mockSearchState,
            offerIsDuo: true,
          },
        })
      })
    })

    it('should use default filters without change when pressing button', async () => {
      renderOfferDuoModal()

      const button = screen.getByText('Rechercher')

      fireEvent.press(button)

      await waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith({
          type: 'SET_STATE',
          payload: {
            ...mockSearchState,
            offerIsDuo: false,
          },
        })
      })
    })
  })
})

function renderOfferDuoModal(
  { filterBehaviour = FilterBehaviour.SEARCH, onClose }: Partial<OfferDuoModalProps> = {},
  isDesktopViewport?: boolean
) {
  return render(
    <OfferDuoModal
      title="Type d’offre"
      accessibilityLabel="Ne pas filtrer sur les type d’offre et retourner aux résultats"
      isVisible
      hideModal={mockHideModal}
      filterBehaviour={filterBehaviour}
      onClose={onClose}
    />,
    { theme: { isDesktopViewport } }
  )
}
