import React, { FunctionComponent } from 'react'
import { Text } from 'react-native'

import { StepperOrigin } from 'features/navigation/RootNavigator/types'
import { OfferModal } from 'shared/offer/enums'
import { OfferModalProps, useBookOfferModal } from 'shared/offer/helpers/useBookOfferModal'
import { renderHook, render } from 'tests/utils'
import { LINE_BREAK } from 'ui/theme/constants'

jest.mock('react-query')

const mockBookingOfferModal = <Text>BookingOfferModal</Text>
jest.mock('features/bookOffer/pages/BookingOfferModal', () => ({
  BookingOfferModal: () => mockBookingOfferModal,
}))

const mockHideModal = jest.fn()
jest.mock('ui/components/modals/useModal.ts', () => ({
  useModal: jest.fn().mockReturnValue({
    visible: true,
    showModal: jest.fn(),
    hideModal: mockHideModal,
  }),
}))

const TestOfferModal: FunctionComponent<OfferModalProps> = (props) => {
  const { OfferModal } = useBookOfferModal(props)
  return OfferModal
}

describe('useOfferModal', () => {
  it('do not display anything when there is no modal to display', () => {
    const { result } = renderHook(() =>
      useBookOfferModal({ offerId: 1000, from: StepperOrigin.OFFER })
    )
    expect(result.current.OfferModal).toBeNull()
  })

  it('should return application processing modal when asked', () => {
    const { getByText } = render(
      <TestOfferModal
        modalToDisplay={OfferModal.APPLICATION_PROCESSING}
        offerId={1000}
        from={StepperOrigin.OFFER}
      />
    )
    expect(getByText('C’est pour bientôt\u00a0!')).toBeOnTheScreen()
  })

  it('should return authentication modal when asked', () => {
    const { getByText } = render(
      <TestOfferModal
        modalToDisplay={OfferModal.AUTHENTICATION}
        offerId={1000}
        from={StepperOrigin.OFFER}
      />
    )
    expect(getByText('Identifie-toi' + LINE_BREAK + 'pour réserver l’offre')).toBeOnTheScreen()
  })

  it('should return booking modal when asked', () => {
    const { getByText } = render(
      <TestOfferModal
        modalToDisplay={OfferModal.BOOKING}
        offerId={1000}
        from={StepperOrigin.OFFER}
      />
    )
    expect(getByText('BookingOfferModal')).toBeOnTheScreen()
  })

  it('should return error application modal when asked', () => {
    const { getByText } = render(
      <TestOfferModal
        modalToDisplay={OfferModal.ERROR_APPLICATION}
        offerId={1000}
        from={StepperOrigin.OFFER}
      />
    )
    expect(getByText('Tu n’as pas encore obtenu' + LINE_BREAK + 'ton crédit')).toBeOnTheScreen()
  })

  it('should return finish subscription modal when asked', () => {
    const { getByText } = render(
      <TestOfferModal
        modalToDisplay={OfferModal.FINISH_SUBSCRIPTION}
        offerId={1000}
        from={StepperOrigin.OFFER}
      />
    )
    expect(
      getByText('Débloque ton crédit' + LINE_BREAK + 'pour réserver cette offre')
    ).toBeOnTheScreen()
  })
})
