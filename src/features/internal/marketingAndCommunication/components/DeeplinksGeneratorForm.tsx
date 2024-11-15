import omit from 'lodash/omit'
import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components/native'

import { NativeCategoryIdEnumv2, SearchGroupNameEnumv2 } from 'api/gen'
import { generateLongFirebaseDynamicLink } from 'features/deeplinks/helpers'
import { ControlledFilterSwitch } from 'features/internal/marketingAndCommunication/atoms/ControlledFilterSwitch'
import { DateChoice } from 'features/internal/marketingAndCommunication/atoms/DateChoice'
import { LocationFilterChoice } from 'features/internal/marketingAndCommunication/atoms/LocationFilterChoice'
import { OfferCategoryChoices } from 'features/internal/marketingAndCommunication/atoms/OfferCategoryChoices'
import { OfferNativeCategoryChoices } from 'features/internal/marketingAndCommunication/atoms/OfferNativeCategoryChoices'
import {
  FDL_CONFIG,
  MARKETING_CONFIG,
  ParamConfig,
  SCREENS_CONFIG,
  ScreensUsedByMarketing,
} from 'features/internal/marketingAndCommunication/config/deeplinksExportConfig'
import { getScreenPath } from 'features/navigation/RootNavigator/linking/getScreenPath'
import { getSearchStackConfig } from 'features/navigation/SearchStackNavigator/helpers'
import { isSearchStackScreen } from 'features/navigation/SearchStackNavigator/routes'
import { getTabNavConfig } from 'features/navigation/TabBar/helpers'
import { isTabScreen } from 'features/navigation/TabBar/routes'
import { MAX_PRICE } from 'features/search/helpers/reducer.helpers'
import { LocationFilter } from 'features/search/types'
import { env } from 'libs/environment'
import { LocationMode } from 'libs/location/types'
import { parseCurrency } from 'libs/parsers/getDisplayPrice'
import { Range } from 'libs/typesUtils/typeHelpers'
import { getErrorMessage } from 'shared/getErrorMessage/getErrorMessage'
import { Accordion } from 'ui/components/Accordion'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { Slider } from 'ui/components/inputs/Slider'
import { TextInput } from 'ui/components/inputs/TextInput'
import { RadioButton } from 'ui/components/radioButtons/RadioButton'
import { Separator } from 'ui/components/Separator'
import { SNACK_BAR_TIME_OUT, useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { useEnterKeyAction } from 'ui/hooks/useEnterKeyAction'
import { Warning as WarningDefault } from 'ui/svg/icons/BicolorWarning'
import { getSpacing, Spacer, Typo, TypoDS } from 'ui/theme'

export interface GeneratedDeeplink {
  universalLink: string
  firebaseLink: string
}

interface Props {
  onCreate: (generatedDeeplink: GeneratedDeeplink) => void
}

type DeeplinksAppParams = Record<string, unknown> & {
  priceRange?: Range<number> | null
  offerIsFree?: boolean
  minPrice?: string
  maxPrice?: string
}

export function getDefaultScreenParams(screenName: ScreensUsedByMarketing) {
  if (screenName === 'SearchResults') {
    return {
      locationFilter: { locationType: LocationMode.EVERYWHERE },
      from: 'deeplink',
    }
  }
  return { from: 'deeplink' }
}

export const DeeplinksGeneratorForm = ({ onCreate }: Props) => {
  const { appContentWidth, isMobileViewport } = useTheme()
  const [selectedScreen, setSelectedScreen] = useState<ScreensUsedByMarketing>('Home')
  const [screenParams, setScreenParams] = useState<Record<string, unknown>>({
    utm_gen: 'marketing',
  })

  const { showErrorSnackBar } = useSnackBarContext()

  const renderScreenItem = (screenName: ScreensUsedByMarketing) => {
    const onSelectScreenName = () => {
      setSelectedScreen(screenName)
      setScreenParams((prev) => ({ ...getDefaultScreenParams(screenName), utm_gen: prev.utm_gen }))
    }

    return (
      <React.Fragment key={screenName}>
        <RadioButton
          label={screenName}
          isSelected={selectedScreen === screenName}
          onSelect={onSelectScreenName}
        />
        <Separator.Horizontal />
      </React.Fragment>
    )
  }

  const renderScreenParam = (name: string, config: ParamConfig) => {
    function validate(value: unknown) {
      if (config.serverValidator) {
        config.serverValidator(value).catch((error) => {
          const errorMessage = getErrorMessage(error)
          showErrorSnackBar({
            message: `${name} invalide: ${errorMessage}`,
            timeout: SNACK_BAR_TIME_OUT,
          })
        })
      }
    }

    function onChangeText(text: string) {
      setScreenParams((prevPageParams) =>
        text.length === 0
          ? omit(prevPageParams, name)
          : {
              ...prevPageParams,
              [name]: text,
            }
      )
    }

    function onChangeStringArray(text: string) {
      setScreenParams((prevPageParams) =>
        text.length === 0
          ? omit(prevPageParams, name)
          : {
              ...prevPageParams,
              [name]: text.split(';'),
            }
      )
    }

    function onBlurValidate() {
      const value: unknown = screenParams[name]
      if (value) validate(value)
    }

    function onBooleanChange(value: boolean) {
      setScreenParams((prevPageParams) =>
        value
          ? {
              ...prevPageParams,
              [name]: value,
            }
          : omit(prevPageParams, name)
      )
    }

    function onChangePriceRange(value: number[]) {
      setScreenParams((prevPageParams) =>
        value[0] === 0 && value[1] === MAX_PRICE
          ? omit(prevPageParams, name)
          : {
              ...prevPageParams,
              [name]: value,
            }
      )
    }

    function onChangeOfferCategories(categories: SearchGroupNameEnumv2[]) {
      setScreenParams((prevPageParams) => {
        return {
          ...prevPageParams,
          [name]: categories.length ? categories : undefined,
          offerNativeCategories: undefined,
        }
      })
    }

    function onChangeOfferNativeCategories(nativeCategories: NativeCategoryIdEnumv2[]) {
      setScreenParams((prevPageParams) =>
        nativeCategories.length
          ? {
              ...prevPageParams,
              [name]: nativeCategories,
            }
          : omit(prevPageParams, name)
      )
    }

    function onChangeDate(date: Date | undefined) {
      setScreenParams((prevPageParams) =>
        date
          ? {
              ...prevPageParams,
              [name]: date,
            }
          : omit(prevPageParams, name)
      )
    }

    function onChangeLocationFilterChoice(locationFilter: LocationFilter | null) {
      setScreenParams((prevPageParams) =>
        locationFilter
          ? {
              ...prevPageParams,
              [name]: locationFilter,
            }
          : omit(prevPageParams, name)
      )
    }

    const placeholder = config.required ? `${name} (*)` : name
    const sliderLength = appContentWidth / (isMobileViewport ? 1 : 2) - getSpacing(2 * 2 * 6)
    return (
      <React.Fragment key={name}>
        <Spacer.Column numberOfSpaces={2} />
        {config.type === 'string' ? (
          <TextInput
            placeholder={placeholder}
            onBlur={onBlurValidate}
            onChangeText={onChangeText}
            defaultValue={screenParams[name] ? String(screenParams[name]) : undefined}
          />
        ) : null}
        {config.type === 'stringArray' ? (
          <TextInput
            placeholder={placeholder}
            onBlur={onBlurValidate}
            onChangeText={onChangeStringArray}
          />
        ) : null}
        {config.type === 'boolean' ? (
          <ControlledFilterSwitch onChange={onBooleanChange} name={config.description} />
        ) : null}
        {config.type === 'priceRange' ? (
          <PaddingContainer>
            <Slider
              showValues
              max={MAX_PRICE}
              sliderLength={sliderLength}
              formatValues={parseCurrency}
              onValuesChangeFinish={onChangePriceRange}
              minLabel="Prix minimum&nbsp;:"
              maxLabel="Prix maximum&nbsp;:"
            />
          </PaddingContainer>
        ) : null}
        {config.type === 'offerCategories' ? (
          <OfferCategoryChoices onChange={onChangeOfferCategories} />
        ) : null}
        {config.type === 'offerNativeCategories' && screenParams.offerCategories ? (
          <OfferNativeCategoryChoices
            categories={screenParams.offerCategories as SearchGroupNameEnumv2[]}
            onChange={onChangeOfferNativeCategories}
          />
        ) : null}
        {config.type === 'date' ? (
          <PaddingContainer>
            <DateChoice onChange={onChangeDate} />
          </PaddingContainer>
        ) : null}
        {config.type === 'locationFilter' ? (
          <LocationFilterChoice onChange={onChangeLocationFilterChoice} />
        ) : null}
        {config.description ? (
          <PaddingContainer>
            <StyledCaption>{config.description}</StyledCaption>
          </PaddingContainer>
        ) : null}
        <Separator.Horizontal />
      </React.Fragment>
    )
  }

  function areAllParamsValid() {
    const screenConfig = SCREENS_CONFIG[selectedScreen]
    for (const [paramName, paramConfig] of Object.entries(screenConfig)) {
      if (paramConfig.required && !screenParams[paramName]) {
        return false
      }
    }
    return true
  }

  function onPress() {
    if (!areAllParamsValid()) return

    const { appParams, marketingParams, fdlParams } = extractParams(screenParams)

    if (appParams.offerIsFree) {
      appParams.priceRange = null
      appParams.minPrice = '0'
      appParams.maxPrice = '0'
    } else {
      appParams.minPrice = appParams.priceRange?.[0]?.toString() ?? undefined
      appParams.maxPrice = appParams.priceRange?.[1]?.toString() ?? undefined
    }

    const appAndMarketingParams = { ...appParams, ...marketingParams }

    let screenPath = getScreenPath(selectedScreen, appAndMarketingParams)
    if (isTabScreen(selectedScreen)) {
      const tabNavConfig = getTabNavConfig(
        selectedScreen,
        appAndMarketingParams as Record<string, unknown>
      )

      screenPath = getScreenPath(...tabNavConfig)
    }
    if (isSearchStackScreen(selectedScreen)) {
      const searchStackConfig = getSearchStackConfig(selectedScreen, appAndMarketingParams)
      screenPath = getScreenPath(...searchStackConfig)
    }

    let universalLink = `https://${env.WEBAPP_V2_DOMAIN}${screenPath}`
    let firebaseLink = generateLongFirebaseDynamicLink(universalLink, fdlParams)

    if (selectedScreen === 'SearchResults' && appParams.URL) {
      universalLink = appParams.URL as string
      firebaseLink = generateLongFirebaseDynamicLink(universalLink, fdlParams)
    }

    onCreate({ universalLink, firebaseLink })
  }

  const paramsCount = useMemo(() => {
    const screenConfig = SCREENS_CONFIG[selectedScreen]
    return Object.keys(screenConfig).length
  }, [selectedScreen])

  const disabled = !areAllParamsValid()

  useEnterKeyAction(disabled ? undefined : onPress)

  const errorText = 'Seulement les "ids" disposent de validation\u00a0!'

  return (
    <React.Fragment>
      <Container>
        <StyledTitle4>Besoin d’un lien&nbsp;?</StyledTitle4>
        <Spacer.Column numberOfSpaces={6} />
        <Accordion title="Pages" defaultOpen>
          {Object.keys(SCREENS_CONFIG).map((key) =>
            renderScreenItem(key as ScreensUsedByMarketing)
          )}
        </Accordion>
        {paramsCount > 0 ? (
          <Accordion title={'Paramètres applicatifs' + ` (${paramsCount})`} defaultOpen>
            {Object.entries(SCREENS_CONFIG).map(([page, screenConfig]) => (
              <React.Fragment key={page}>
                {page === selectedScreen
                  ? Object.entries(screenConfig).map(([name, config]) =>
                      renderScreenParam(name, config)
                    )
                  : null}
              </React.Fragment>
            ))}
          </Accordion>
        ) : null}
        <Accordion title="Paramètres marketing" defaultOpen>
          {Object.entries(SCREENS_CONFIG).map(([page]) => (
            <React.Fragment key={page}>
              {page === selectedScreen
                ? Object.entries(MARKETING_CONFIG).map(([name, config]) =>
                    renderScreenParam(name, config)
                  )
                : null}
            </React.Fragment>
          ))}
        </Accordion>
        <Accordion title="Paramètres firebase dynamic link">
          {Object.keys(SCREENS_CONFIG).map((page) => (
            <React.Fragment key={page}>
              {page === selectedScreen
                ? Object.entries(FDL_CONFIG).map(([name, config]) =>
                    renderScreenParam(name, config)
                  )
                : null}
            </React.Fragment>
          ))}
        </Accordion>
      </Container>
      <BottomContainer>
        <ErrorContainer>
          <Warning />
          <Spacer.Row numberOfSpaces={2} />
          <ErrorText>{errorText}</ErrorText>
        </ErrorContainer>
        <ButtonPrimary wording="Générer le lien" disabled={disabled} onPress={onPress} />
      </BottomContainer>
    </React.Fragment>
  )
}

function extractParams(params: Record<string, unknown>) {
  const appParams: DeeplinksAppParams = {}
  const marketingParams: Record<string, unknown> = {}
  const fdlParams: Record<string, unknown> = {}
  for (const [paramName, paramValue] of Object.entries(params)) {
    if (paramName in FDL_CONFIG) fdlParams[paramName] = paramValue
    else if (paramName in MARKETING_CONFIG) marketingParams[paramName] = paramValue
    else {
      appParams[paramName] = paramValue
      // Force showResults for old versions compatibility
      if (paramName === 'view') appParams['showResults'] = 'true'
    }
  }
  return { appParams, marketingParams, fdlParams }
}

const Container = styled.ScrollView(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.white,
  flexDirection: 'column',
}))

const ErrorContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
})

const ErrorText = styled(Typo.Caption)(({ theme }) => ({
  paddingVertical: getSpacing(1.5),
  color: theme.colors.error,
}))

const StyledTitle4 = styled(TypoDS.Title4)({
  textAlign: 'center',
})

const BottomContainer = styled.View({
  paddingHorizontal: getSpacing(5),
  paddingVertical: getSpacing(4),
  alignItems: 'center',
})

const PaddingContainer = styled.View({
  padding: getSpacing(5),
})

const StyledCaption = styled(Typo.Caption)(({ theme }) => ({
  color: theme.colors.greyMedium,
}))

const Warning = styled(WarningDefault).attrs(({ theme }) => ({
  color: theme.colors.error,
  size: theme.icons.sizes.extraSmall,
}))``
