import React, { useCallback, useEffect } from 'react'
import styled, { useTheme } from 'styled-components/native'

import { useAuthContext } from 'features/auth/context/AuthContext'
import { navigateToHome } from 'features/navigation/helpers/navigateToHome'
import { useResetRecreditAmountToShow } from 'features/profile/api/useResetRecreditAmountToShow'
import { useAppStateChange } from 'libs/appState'
import { useGetPacificFrancToEuroRate } from 'libs/firebase/firestore/exchangeRates/useGetPacificFrancToEuroRate'
import LottieView from 'libs/lottie'
import { formatCurrencyFromCents } from 'libs/parsers/formatCurrencyFromCents'
import { storage } from 'libs/storage'
import { useGetCurrencyToDisplay } from 'shared/currency/useGetCurrencyToDisplay'
import { getAge } from 'shared/user/getAge'
import { useAvailableCredit } from 'shared/user/useAvailableCredit'
import TutorialPassLogo from 'ui/animations/eighteen_birthday.json'
import { AnimatedProgressBar } from 'ui/components/bars/AnimatedProgressBar'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { Spacer } from 'ui/components/spacer/Spacer'
import { GenericInfoPageWhite } from 'ui/pages/GenericInfoPageWhite'
import { categoriesIcons } from 'ui/svg/icons/bicolor/exports/categoriesIcons'
import { getSpacing, Typo, TypoDS } from 'ui/theme'
import { getNoHeadingAttrs } from 'ui/theme/typographyAttrs/getNoHeadingAttrs'

export const RecreditBirthdayNotification = () => {
  const { user } = useAuthContext()
  const { uniqueColors } = useTheme()

  const age = getAge(user?.birthDate)

  const animationRef = React.useRef<LottieView>(null)
  const credit = useAvailableCredit()
  const currency = useGetCurrencyToDisplay()
  const euroToPacificFrancRate = useGetPacificFrancToEuroRate()
  const creditedAmount = formatCurrencyFromCents(
    user?.recreditAmountToShow ?? 3000,
    currency,
    euroToPacificFrancRate
  )
  const remainingCredit = formatCurrencyFromCents(
    credit?.amount ?? 3000,
    currency,
    euroToPacificFrancRate
  )
  const { showErrorSnackBar } = useSnackBarContext()

  const { mutate: resetRecreditAmountToShow, isLoading: isResetRecreditAmountToShowLoading } =
    useResetRecreditAmountToShow({
      onSuccess: () => {
        navigateToHome()
      },
      onError: () => {
        showErrorSnackBar({
          message: 'Une erreur est survenue',
        })
      },
    })

  const onPressContinue = () => {
    resetRecreditAmountToShow()
  }

  useEffect(() => {
    storage.saveObject('has_seen_birthday_notification_card', true)
  }, [])

  const playAnimation = useCallback(() => {
    const lottieAnimation = animationRef.current
    if (lottieAnimation) lottieAnimation.play(0, 62)
  }, [animationRef])

  useAppStateChange(playAnimation, undefined)
  useEffect(playAnimation, [playAnimation])

  const recreditMessage = age
    ? `Pour tes ${age} ans, ${creditedAmount} ont été ajoutés à ton compte. Tu disposes maintenant de\u00a0:`
    : ''

  return (
    <GenericInfoPageWhite animation={TutorialPassLogo} title="Bonne nouvelle&nbsp;!">
      <StyledSubtitle testID="recreditMessage">{recreditMessage}</StyledSubtitle>

      <Spacer.Column numberOfSpaces={4} />
      <ProgressBarContainer>
        <AnimatedProgressBar
          progress={1}
          color={uniqueColors.brand}
          icon={categoriesIcons.Show}
          isAnimated
        />
        <Amount>{remainingCredit}</Amount>
      </ProgressBarContainer>
      <Spacer.Column numberOfSpaces={4} />
      <StyledBody>Tu as jusqu’à la veille de tes 18 ans pour profiter de ton crédit.</StyledBody>
      <Spacer.Column numberOfSpaces={5} />
      <ButtonContainer>
        <ButtonPrimary
          wording="Continuer"
          onPress={onPressContinue}
          isLoading={isResetRecreditAmountToShowLoading}
        />
      </ButtonContainer>
    </GenericInfoPageWhite>
  )
}

const StyledSubtitle = styled(TypoDS.Title4).attrs(getNoHeadingAttrs())({
  textAlign: 'center',
})

const StyledBody = styled(Typo.Body)({
  textAlign: 'center',
})

const ProgressBarContainer = styled.View({
  paddingHorizontal: getSpacing(10),
})

const Amount = styled(TypoDS.Title2).attrs(getNoHeadingAttrs())(({ theme }) => ({
  textAlign: 'center',
  color: theme.uniqueColors.brand,
}))

const ButtonContainer = styled.View({
  alignItems: 'center',
})
