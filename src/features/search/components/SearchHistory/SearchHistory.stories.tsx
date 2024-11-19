import { action } from '@storybook/addon-actions'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'

import { NativeCategoryIdEnumv2, SearchGroupNameEnumv2 } from 'api/gen'
import { SearchHistory } from 'features/search/components/SearchHistory/SearchHistory'
import { HistoryItem } from 'features/search/types'
import { VariantsTemplate } from 'ui/storybook/VariantsTemplate'

const meta: ComponentMeta<typeof SearchHistory> = {
  title: 'features/search/SearchHistory',
  component: SearchHistory,
  decorators: [(Story) => <Story />],
}
export default meta

const history: HistoryItem[] = [
  {
    query: 'one piece',
    createdAt: new Date('2023-09-26T00:00:00.000Z').getTime(),
    label: 'one piece',
  },
  {
    query: 'one piece',
    createdAt: new Date('2023-09-26T00:01:00.000Z').getTime(),
    category: SearchGroupNameEnumv2.LIVRES,
    categoryLabel: 'Livres',
    label: 'one piece dans Livres',
  },
  {
    query: 'dragon ball',
    createdAt: new Date('2023-09-26T00:02:00.000Z').getTime(),
    category: SearchGroupNameEnumv2.LIVRES,
    categoryLabel: 'Livres',
    nativeCategory: NativeCategoryIdEnumv2.LIVRES_PAPIER,
    nativeCategoryLabel: 'Livres papier',
    label: 'dragon ball dans Livres papier',
  },
]

const variantConfig = [
  {
    label: 'SearchHistory',
    props: {
      history,
      queryHistory: '',
      onPress: action('pressed!'),
      removeItem: action('removed!'),
    },
  },
  {
    label: 'SearchHistory with active query',
    props: {
      history: history.slice(0, -1),
      queryHistory: 'one',
      onPress: action('pressed!'),
      removeItem: action('removed!'),
    },
  },
]

const Template: ComponentStory<typeof VariantsTemplate> = () => (
  <VariantsTemplate variants={variantConfig} Component={SearchHistory} />
)

export const AllVariants = Template.bind({})
AllVariants.storyName = 'SearchHistory'
