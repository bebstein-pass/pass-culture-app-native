import { ComponentStory } from '@storybook/react'
import React from 'react'

import { IconsContainer as Icons } from 'features/internal/cheatcodes/pages/AppComponents/IconsContainer'
import {
  SecondaryAndBiggerIcons,
  SocialNetworkIcons,
  TertiaryAndSmallerIcons,
  UnconventionalIcons,
} from 'features/internal/cheatcodes/pages/AppComponents/iconsExports'
import { categoriesIcons } from 'ui/svg/icons/bicolor/exports/categoriesIcons'
import { culturalSurveyIcons } from 'ui/svg/icons/bicolor/exports/culturalSurveyIcons'
import { venueTypesIcons } from 'ui/svg/icons/bicolor/exports/venueTypesIcons'
import { SMALLER_ICON_SIZE, STANDARD_ICON_SIZE } from 'ui/theme/constants'

export default {
  title: 'Fondations/Icons',
}

const iconSets = [
  {
    title: 'SocialNetworkIcons',
    icons: SocialNetworkIcons,
  },
  {
    title: 'categoriesIcons',
    icons: categoriesIcons,
    isBicolor: true,
  },
  {
    title: 'venueTypesIcons',
    icons: venueTypesIcons,
    isBicolor: true,
  },
  {
    title: `SecondaryAndBiggerIcons ( > 20x20 ) should have a standard size of ${STANDARD_ICON_SIZE}`,
    icons: SecondaryAndBiggerIcons,
  },
  {
    title: `TertiaryAndSmallerIcons ( <= 20x20 ) should have a standard size of ${SMALLER_ICON_SIZE}`,
    icons: TertiaryAndSmallerIcons,
  },
  {
    title: 'UnconventionalIcons (to be standardized)',
    icons: UnconventionalIcons,
  },
  {
    title: 'culturalSurveyIcons',
    icons: culturalSurveyIcons,
    isBicolor: true,
  },
]

const Template: ComponentStory<typeof Icons> = () => (
  <React.Fragment>
    {iconSets.map((icon) => (
      <Icons key={icon.title} title={icon.title} icons={icon.icons} isBicolor={icon.isBicolor} />
    ))}
  </React.Fragment>
)

export const AllIcons = Template.bind({})
AllIcons.storyName = 'Icons'
