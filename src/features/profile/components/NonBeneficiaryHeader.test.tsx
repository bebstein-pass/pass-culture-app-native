import mockdate from 'mockdate'
import React from 'react'
import { UseQueryResult } from 'react-query'

import { navigate } from '__mocks__/@react-navigation/native'
import { GetIdCheckTokenResponse } from 'api/gen'
import { analytics } from 'libs/analytics'
import { storage } from 'libs/storage'
import { render } from 'tests/utils'

import { NonBeneficiaryHeader } from './NonBeneficiaryHeader'

let mockDepositAmount = '300 €'

jest.mock('features/auth/api', () => ({
  useGetIdCheckToken: jest.fn(
    () =>
      ({
        isLoading: false,
        data: { token: 'thisIsATokenForIdCheck' },
      } as UseQueryResult<GetIdCheckTokenResponse>)
  ),
  useDepositAmount: () => mockDepositAmount,
}))
jest.mock('features/auth/settings')

describe('NonBeneficiaryHeader', () => {
  afterEach(async () => {
    await storage.clear('has_completed_idcheck')
  })

  afterAll(() => mockdate.reset())

  it('should render the right body for user under 18 years old', () => {
    const today = '2021-01-30T00:00:00Z'
    mockdate.set(new Date(today))
    const { getByTestId } = render(
      <NonBeneficiaryHeader
        email="john@doe.com"
        eligibilityStartDatetime="2021-01-31T00:00Z"
        eligibilityEndDatetime="2022-01-31T00:00Z"
      />
    )

    getByTestId('younger-badge')
  })

  it('should render the right body for 18 years old users, call analytics and navigate to idcheck', () => {
    const today = '2021-02-30T00:00:00Z'
    mockdate.set(new Date(today))
    const { getByTestId } = render(
      <NonBeneficiaryHeader
        email="john@doe.com"
        eligibilityStartDatetime="2021-02-30T00:00Z"
        eligibilityEndDatetime="2022-02-30T00:00Z"
      />
    )

    getByTestId('body-container-18')

    const banner = getByTestId('18-banner')
    banner.props.onClick()

    expect(analytics.logIdCheck).toBeCalledWith('Profile')
    expect(navigate).toBeCalledWith('IdCheck', {
      email: 'john@doe.com',
      licenceToken: 'thisIsATokenForIdCheck',
    })
  })

  it('should render the right body for 18 years old users if user has not completed idcheck', async () => {
    await storage.saveObject('has_completed_idcheck', false)

    const today = '2021-02-30T00:00:00Z'
    mockdate.set(new Date(today))
    const { getByTestId } = render(
      <NonBeneficiaryHeader
        email="john@doe.com"
        eligibilityStartDatetime="2021-02-30T00:00Z"
        eligibilityEndDatetime="2022-02-30T00:00Z"
      />
    )

    getByTestId('body-container-18')
  })

  it('should render the right body for 18 years old users if user has completed idcheck', async () => {
    await storage.saveObject('has_completed_idcheck', true)

    const today = '2021-02-30T00:00:00Z'
    mockdate.set(new Date(today))
    const { queryByTestId } = render(
      <NonBeneficiaryHeader
        email="john@doe.com"
        eligibilityStartDatetime="2021-02-30T00:00Z"
        eligibilityEndDatetime="2022-02-30T00:00Z"
      />
    )
    const container = queryByTestId('body-container')
    expect(container).toBeNull()
  })

  it('should render the right body for user above 18 years old', () => {
    const today = '2021-02-30T00:00:00'
    mockdate.set(new Date(today))
    const { queryByTestId } = render(
      <NonBeneficiaryHeader
        email="john@doe.com"
        eligibilityStartDatetime="2020-02-30T00:00Z"
        eligibilityEndDatetime="2021-02-30T00:00Z"
      />
    )
    const container = queryByTestId('body-container')
    expect(container).toBeNull()
  })
  it('should render the right body for user above 18 years old and in a department non eligible', () => {
    const today = '2021-02-30T00:00:00'
    mockdate.set(new Date(today))
    const { getByTestId } = render(
      <NonBeneficiaryHeader
        email="john@doe.com"
        eligibilityStartDatetime={undefined}
        eligibilityEndDatetime={undefined}
      />
    )
    const nonEligibleDepartmentBadge = getByTestId('non-eligible-department-badge')
    expect(nonEligibleDepartmentBadge).toBeTruthy()
  })
  it('should display correct depositAmount', () => {
    mockDepositAmount = '300 €'
    let { queryByText } = render(
      <NonBeneficiaryHeader
        email="john@doe.com"
        eligibilityStartDatetime="2021-02-30T00:00Z"
        eligibilityEndDatetime="2022-02-30T00:00Z"
      />
    )
    expect(queryByText(/Profite de 300€/)).toBeTruthy()

    mockDepositAmount = '500 €'
    queryByText = render(
      <NonBeneficiaryHeader
        email="john@doe.com"
        eligibilityStartDatetime="2021-02-30T00:00Z"
        eligibilityEndDatetime="2022-02-30T00:00Z"
      />
    ).queryByText
    expect(queryByText(/Profite de 500€/)).toBeTruthy()
  })
})
