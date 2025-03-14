import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent } from 'react'
import styled from 'styled-components/native'

import { CategoryThematicHomeHeader } from 'features/home/components/headers/CategoryThematicHomeHeader'
import { ThematicHomeHeader } from 'features/home/components/headers/ThematicHomeHeader'
import { CategoryThematicHeader, Color, ThematicHeaderType } from 'features/home/types'
import { UseNavigationType } from 'features/navigation/RootNavigator/types'
import { homeNavConfig } from 'features/navigation/TabBar/helpers'
import { useOpacityTransition } from 'ui/animations/helpers/useOpacityTransition'

export const CheatcodesScreenCategoryThematicHomeHeader: FunctionComponent = () => {
  const { headerTransition } = useOpacityTransition()
  const { navigate } = useNavigation<UseNavigationType>()
  const handleBackPress = () => navigate(...homeNavConfig)

  const thematicHomeHeader: CategoryThematicHeader = {
    type: ThematicHeaderType.Category,
    title: 'Un titre',
    subtitle: 'Un sous-titre',
    color: Color.SkyBlue,
    imageUrl:
      'https://images.ctfassets.net/2bg01iqy0isv/5PmtxKY77rq0nYpkCFCbrg/4daa8767efa35827f22bb86e5fc65094/photo-lion_noir-et-blanc_laurent-breillat-610x610.jpeg',
  }

  return (
    <Container>
      <ThematicHomeHeader
        headerTransition={headerTransition}
        thematicHeader={thematicHomeHeader}
        homeId="fakeEntryId"
        onBackPress={handleBackPress}
      />
      <CategoryThematicHomeHeader
        imageUrl={thematicHomeHeader.imageUrl}
        subtitle={thematicHomeHeader.subtitle}
        title={thematicHomeHeader.title}
        color={thematicHomeHeader.color}
      />
    </Container>
  )
}

const Container = styled.View({
  width: '100%',
  height: '100%',
})
