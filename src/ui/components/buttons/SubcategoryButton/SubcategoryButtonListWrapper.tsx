import React, { useMemo } from 'react'
import { ScrollViewProps, ViewStyle } from 'react-native'
import { useTheme } from 'styled-components/native'

import { SearchGroupNameEnumv2 } from 'api/gen'
import { useSearch } from 'features/search/context/SearchWrapper'
import { CATEGORY_CRITERIA } from 'features/search/enums'
import {
  sortCategoriesPredicate,
  useNativeCategories,
} from 'features/search/helpers/categoriesHelpers/categoriesHelpers'
import { NativeCategoryEnum } from 'features/search/types'
import { PLACEHOLDER_DATA } from 'libs/subcategories/placeholderData'
import { useSubcategories } from 'libs/subcategories/useSubcategories'
import { getSearchParams } from 'ui/components/buttons/SubcategoryButton/helpers'
import { SubcategoryButtonItem } from 'ui/components/buttons/SubcategoryButton/SubcategoryButton'
import { SubcategoryButtonList } from 'ui/components/buttons/SubcategoryButton/SubcategoryButtonList'

type StyledScrollViewProps = ScrollViewProps & {
  contentContainerStyle?: ViewStyle
}

type Props = {
  offerCategory: SearchGroupNameEnumv2
  scrollViewProps?: StyledScrollViewProps
}

export const SubcategoryButtonListWrapper: React.FC<Props> = ({ offerCategory }) => {
  const { data: subcategories = PLACEHOLDER_DATA } = useSubcategories()
  const { searchState } = useSearch()

  const { colors } = useTheme()
  const nativeCategories = useNativeCategories(offerCategory)
  const offerCategoryTheme = useMemo(
    () => ({
      backgroundColor: CATEGORY_CRITERIA[offerCategory]?.fillColor,
      borderColor: CATEGORY_CRITERIA[offerCategory]?.borderColor,
    }),
    [offerCategory]
  )

  const subcategoryButtonContent = useMemo(
    () =>
      nativeCategories
        .map(
          (nativeCategory): SubcategoryButtonItem => ({
            label: nativeCategory[1].label,
            backgroundColor: offerCategoryTheme.backgroundColor || colors.white,
            borderColor: offerCategoryTheme.borderColor || colors.black,
            nativeCategory: nativeCategory[0] as NativeCategoryEnum,
            position: nativeCategory[1].position,
            searchParams: getSearchParams(
              nativeCategory[0] as NativeCategoryEnum,
              subcategories,
              searchState
            ),
          })
        )
        .sort((a, b) => sortCategoriesPredicate(a, b)),
    [
      colors.black,
      colors.white,
      nativeCategories,
      offerCategoryTheme.backgroundColor,
      offerCategoryTheme.borderColor,
      searchState,
      subcategories,
    ]
  )

  return <SubcategoryButtonList subcategoryButtonContent={subcategoryButtonContent} />
}
