import { SearchGroupNameEnumv2 } from 'api/gen'
import { SearchCategoriesIllustrations } from 'features/search/enums'
import { useAvailableCategories } from 'features/search/helpers/useAvailableCategories/useAvailableCategories'
import { PLACEHOLDER_DATA } from 'libs/subcategories/placeholderData'
import { theme } from 'theme'
import { categoriesIcons } from 'ui/svg/icons/bicolor/exports/categoriesIcons'
import { gradientColorsMapping } from 'ui/theme/gradientColorsMapping'

let mockData = PLACEHOLDER_DATA
jest.mock('libs/subcategories/useSubcategories', () => ({
  useSubcategories: () => ({
    data: mockData,
  }),
}))

describe('useAvailableCategories', () => {
  it('should all availables categories', () => {
    const categories = useAvailableCategories()

    expect(categories).toHaveLength(14)
    expect(categories).toEqual(
      expect.arrayContaining([
        {
          icon: categoriesIcons.Conference,
          illustration: SearchCategoriesIllustrations.ConcertsFestivals,
          facetFilter: SearchGroupNameEnumv2.CONCERTS_FESTIVALS,
          baseColor: theme.colors.goldDark,
          gradients: gradientColorsMapping.Gold,
          position: 1,
          textColor: theme.colors.lilacDark,
          borderColor: theme.colors.goldLight200,
          fillColor: theme.colors.goldLight100,
        },
        {
          icon: categoriesIcons.Cinema,
          illustration: SearchCategoriesIllustrations.FilmsSeriesCinema,
          facetFilter: SearchGroupNameEnumv2.CINEMA,
          position: 2,
          baseColor: theme.colors.aquamarineDark,
          gradients: gradientColorsMapping.Aquamarine,
          textColor: theme.colors.skyBlueDark,
          borderColor: theme.colors.coral,
          fillColor: theme.colors.coralLight,
        },
        {
          icon: categoriesIcons.Cinema,
          illustration: SearchCategoriesIllustrations.FilmsSeriesCinema,
          facetFilter: SearchGroupNameEnumv2.FILMS_DOCUMENTAIRES_SERIES,
          position: 3,
          baseColor: theme.colors.deepPinkDark,
          gradients: gradientColorsMapping.DeepPink,
          textColor: theme.colors.aquamarineDark,
          borderColor: theme.colors.deepPink,
          fillColor: theme.colors.deepPinkLight,
        },
        {
          icon: categoriesIcons.Book,
          illustration: SearchCategoriesIllustrations.Books,
          facetFilter: SearchGroupNameEnumv2.LIVRES,
          position: 4,
          baseColor: theme.colors.skyBlueDark,
          gradients: gradientColorsMapping.SkyBlue,
          textColor: theme.colors.coralDark,
          borderColor: theme.colors.skyBlue,
          fillColor: theme.colors.skyBlueLight,
        },
        {
          icon: categoriesIcons.Disk,
          illustration: SearchCategoriesIllustrations.CDVinylsOnlineMusic,
          facetFilter: SearchGroupNameEnumv2.CD_VINYLE_MUSIQUE_EN_LIGNE,
          position: 5,
          baseColor: theme.colors.lilacDark,
          gradients: gradientColorsMapping.Lilac,
          textColor: theme.colors.deepPinkDark,
          borderColor: theme.colors.lilac,
          fillColor: theme.colors.lilacLight,
        },
        {
          icon: categoriesIcons.Palette,
          illustration: SearchCategoriesIllustrations.ArtsCrafts,
          facetFilter: SearchGroupNameEnumv2.ARTS_LOISIRS_CREATIFS,
          position: 6,
          baseColor: theme.colors.coralDark,
          gradients: gradientColorsMapping.Coral,
          textColor: theme.colors.lilacDark,
          borderColor: theme.colors.aquamarineDark,
          fillColor: theme.colors.aquamarineLight,
        },
        {
          icon: categoriesIcons.Show,
          illustration: SearchCategoriesIllustrations.Shows,
          facetFilter: SearchGroupNameEnumv2.SPECTACLES,
          position: 7,
          baseColor: theme.colors.aquamarineDark,
          gradients: gradientColorsMapping.Aquamarine,
          textColor: theme.colors.lilacDark,
          borderColor: theme.colors.goldLight200,
          fillColor: theme.colors.goldLight100,
        },
        {
          icon: categoriesIcons.Museum,
          illustration: SearchCategoriesIllustrations.MuseumCulturalVisits,
          facetFilter: SearchGroupNameEnumv2.MUSEES_VISITES_CULTURELLES,
          position: 8,
          baseColor: theme.colors.goldDark,
          gradients: gradientColorsMapping.Gold,
          textColor: theme.colors.skyBlueDark,
          borderColor: theme.colors.coral,
          fillColor: theme.colors.coralLight,
        },
        {
          icon: categoriesIcons.VideoGame,
          illustration: SearchCategoriesIllustrations.GamesVideoGames,
          facetFilter: SearchGroupNameEnumv2.JEUX_JEUX_VIDEOS,
          position: 9,
          baseColor: theme.colors.skyBlueDark,
          gradients: gradientColorsMapping.SkyBlue,
          textColor: theme.colors.aquamarineDark,
          borderColor: theme.colors.deepPink,
          fillColor: theme.colors.deepPinkLight,
        },
        {
          icon: categoriesIcons.Instrument,
          illustration: SearchCategoriesIllustrations.MusicalInstruments,
          facetFilter: SearchGroupNameEnumv2.INSTRUMENTS,
          position: 10,
          baseColor: theme.colors.deepPinkDark,
          gradients: gradientColorsMapping.DeepPink,
          textColor: theme.colors.coralDark,
          borderColor: theme.colors.skyBlue,
          fillColor: theme.colors.skyBlueLight,
        },
        {
          icon: categoriesIcons.Press,
          illustration: SearchCategoriesIllustrations.MediaPress,
          facetFilter: SearchGroupNameEnumv2.MEDIA_PRESSE,
          position: 11,
          baseColor: theme.colors.lilacDark,
          gradients: gradientColorsMapping.Lilac,
          textColor: theme.colors.deepPinkDark,
          borderColor: theme.colors.lilac,
          fillColor: theme.colors.lilacLight,
        },
        {
          icon: categoriesIcons.Card,
          illustration: SearchCategoriesIllustrations.YouthCards,
          facetFilter: SearchGroupNameEnumv2.CARTES_JEUNES,
          position: 12,
          baseColor: theme.colors.goldDark,
          gradients: gradientColorsMapping.Gold,
          textColor: theme.colors.lilacDark,
          borderColor: theme.colors.aquamarineDark,
          fillColor: theme.colors.aquamarineLight,
        },
        {
          icon: categoriesIcons.Microphone,
          illustration: SearchCategoriesIllustrations.ConferencesMeetings,
          facetFilter: SearchGroupNameEnumv2.RENCONTRES_CONFERENCES,
          position: 13,
          baseColor: theme.colors.aquamarineDark,
          gradients: gradientColorsMapping.Aquamarine,
          textColor: theme.colors.lilacDark,
          borderColor: theme.colors.goldLight200,
          fillColor: theme.colors.goldLight100,
        },
        {
          icon: categoriesIcons.LiveEvent,
          illustration: SearchCategoriesIllustrations.OnlineEvents,
          position: 14,
          facetFilter: SearchGroupNameEnumv2.EVENEMENTS_EN_LIGNE,
          baseColor: theme.colors.aquamarineDark,
          gradients: gradientColorsMapping.Aquamarine,
          textColor: theme.colors.skyBlueDark,
          borderColor: theme.colors.coral,
          fillColor: theme.colors.coralLight,
        },
      ])
    )
  })

  it('should only available catégories from backend', () => {
    mockData = {
      ...mockData,
      searchGroups: [
        { name: SearchGroupNameEnumv2.ARTS_LOISIRS_CREATIFS, value: 'Arts & loisirs créatifs' },
        { name: SearchGroupNameEnumv2.CARTES_JEUNES, value: 'Cartes jeunes' },
      ],
    }
    const categories = useAvailableCategories()

    expect(categories).toEqual([
      {
        icon: categoriesIcons.Palette,
        illustration: SearchCategoriesIllustrations.ArtsCrafts,
        facetFilter: SearchGroupNameEnumv2.ARTS_LOISIRS_CREATIFS,
        position: 6,
        baseColor: theme.colors.coralDark,
        gradients: [theme.colors.coral, theme.colors.coralDark],
        textColor: theme.colors.lilacDark,
        borderColor: theme.colors.aquamarineDark,
        fillColor: theme.colors.aquamarineLight,
      },
      {
        icon: categoriesIcons.Card,
        illustration: SearchCategoriesIllustrations.YouthCards,
        facetFilter: SearchGroupNameEnumv2.CARTES_JEUNES,
        position: 12,
        baseColor: theme.colors.goldDark,
        gradients: [theme.colors.gold, theme.colors.goldDark],
        textColor: theme.colors.lilacDark,
        borderColor: theme.colors.aquamarineDark,
        fillColor: theme.colors.aquamarineLight,
      },
    ])
  })

  it('should return empty array when no categories from backend', () => {
    mockData = {
      ...mockData,
      searchGroups: [],
    }
    const categories = useAvailableCategories()

    expect(categories).toEqual([])
  })
})
