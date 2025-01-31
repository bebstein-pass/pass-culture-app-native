import React from 'react'
import { View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

import { DURATION_IN_MS, customEaseInOut } from 'features/tutorial/helpers/animationProps'
import { TutorialType } from 'features/tutorial/types'
import { analytics } from 'libs/analytics/provider'
import { AnimatedView, NAV_DELAY_IN_MS } from 'libs/react-native-animatable'
import { useDepositAmountsByAge } from 'shared/user/useDepositAmountsByAge'
import { InternalStep } from 'ui/components/InternalStep/InternalStep'
import { StepVariant } from 'ui/components/VerticalStepper/types'
import { Warning } from 'ui/svg/icons/BicolorWarning'
import { CakeOneCandle } from 'ui/svg/icons/CakeOneCandle'
import { CakeTwoCandles } from 'ui/svg/icons/CakeTwoCandles'
import { Spacer, TypoDS, getSpacing } from 'ui/theme'
import { getNoHeadingAttrs } from 'ui/theme/typographyAttrs/getNoHeadingAttrs'

type Age = 17 | 18

type CreditStep = 17 | 18 | 'information'

type CreditComponentPropsV3 = {
  creditStep: CreditStep
  iconComponent?: React.JSX.Element
  children?: React.ReactNode
}

interface Props extends TutorialType {
  age: Age
  stepperProps: CreditComponentPropsV3[]
  testID?: string
}

export const CreditTimelineV3 = ({ stepperProps, age, testID }: Props) => {
  const { seventeenYearsOldDeposit, eighteenYearsOldDeposit } = useDepositAmountsByAge()

  const depositsByAge = new Map<Props['age'], string>([
    [17, seventeenYearsOldDeposit],
    [18, eighteenYearsOldDeposit],
  ])
  const SpaceBetweenBlock = 3

  return (
    <Container testID={testID}>
      {stepperProps.map((props, index) => {
        const isLast = index === stepperProps.length - 1
        const isFirst = index === 0
        if (props.creditStep === 'information') {
          const iconComponent = props.iconComponent ?? <GreyWarning />
          return (
            <InternalStep
              key={'information ' + index}
              variant={StepVariant.complete}
              isLast={isLast}
              iconComponent={iconComponent}
              addMoreSpacingToIcons>
              <Spacer.Column numberOfSpaces={SpaceBetweenBlock} />
              {props.children}
              <Spacer.Column numberOfSpaces={SpaceBetweenBlock} />
            </InternalStep>
          )
        }

        const containerAnimation = {
          from: {
            transform: [{ scale: 0.95 }],
          },
          to: {
            transform: [{ scale: 1 }],
          },
        }

        const animatedViewProps = {
          duration: DURATION_IN_MS,
          animation: containerAnimation,
          delay: NAV_DELAY_IN_MS,
          easing: customEaseInOut,
        }

        return (
          <InternalStep
            key={props.creditStep}
            variant={StepVariant.complete}
            iconComponent={props.creditStep === 17 ? <GreyCakeOneCandle /> : <GreyCakeTwoCandles />}
            isFirst={isFirst}
            isLast={isLast}
            addMoreSpacingToIcons>
            <Spacer.Column numberOfSpaces={SpaceBetweenBlock} />
            <TouchableWithoutFeedback onPress={() => analytics.logTrySelectDeposit(age)}>
              <StyledAnimatedView {...animatedViewProps}>
                <View>
                  <BodySecondary>{`à ${props.creditStep} ans`}</BodySecondary>
                  <Spacer.Column numberOfSpaces={1} />
                  <TitleSecondary>{`Tu reçois ${depositsByAge.get(props.creditStep) ?? ''}`}</TitleSecondary>
                  {props.children}
                </View>
              </StyledAnimatedView>
            </TouchableWithoutFeedback>
            <Spacer.Column numberOfSpaces={SpaceBetweenBlock} />
          </InternalStep>
        )
      })}
    </Container>
  )
}

const BodySecondary = styled(TypoDS.Body)(({ theme }) => ({
  color: theme.colors.secondary,
}))

const GreyCakeOneCandle = styled(CakeOneCandle).attrs(({ theme }) => ({
  color: theme.colors.greySemiDark,
}))``

const GreyCakeTwoCandles = styled(CakeTwoCandles).attrs(({ theme }) => ({
  color: theme.colors.greySemiDark,
}))``

const Container = styled.View({
  flexGrow: 1,
  flexDirection: 'column',
})

const GreyWarning = styled(Warning).attrs(({ theme }) => ({
  color: theme.colors.greySemiDark,
  size: theme.icons.sizes.smaller,
}))({
  marginHorizontal: getSpacing(1.5),
})

const TitleSecondary = styled(TypoDS.Title3).attrs(getNoHeadingAttrs)(({ theme }) => ({
  color: theme.colors.secondary,
  marginBottom: getSpacing(2),
}))

const StyledAnimatedView = styled(AnimatedView)(({ theme }) => ({
  borderColor: theme.colors.greySemiDark,
  borderWidth: getSpacing(0.25),
  borderRadius: getSpacing(1),
  backgroundColor: theme.colors.white,
  padding: getSpacing(4),
  overflow: 'hidden',
}))
