import React from 'react'

import { AnimatedCategoryThematicHomeHeader } from 'features/home/components/headers/AnimatedCategoryThematicHomeHeader'
import { Color } from 'features/home/types'
import { reactQueryProviderHOC } from 'tests/reactQueryProviderHOC'
import { render, screen } from 'tests/utils'

jest.mock('features/profile/pages/NotificationSettings/usePushPermission', () => ({
  usePushPermission: jest.fn(() => ({
    pushPermission: 'granted',
  })),
}))

jest.mock('libs/firebase/analytics/analytics')

describe('AnimatedCategoryThematicHomeHeader', () => {
  it('should show title and subtitle if render correctly', async () => {
    renderAnimatedCategoryThematicHomeHeader()

    expect(await screen.findByText('Un titre')).toBeOnTheScreen()
    expect(screen.getByText('Un sous-titre')).toBeOnTheScreen()
  })
})

const renderAnimatedCategoryThematicHomeHeader = () => {
  render(
    reactQueryProviderHOC(
      <AnimatedCategoryThematicHomeHeader
        imageUrl="https://images.ctfassets.net/2bg01iqy0isv/5PmtxKY77rq0nYpkCFCbrg/4daa8767efa35827f22bb86e5fc65094/photo-lion_noir-et-blanc_laurent-breillat-610x610.jpeg"
        subtitle="Un sous-titre"
        title="Un titre"
        color={Color.Aquamarine}
      />
    )
  )
}
