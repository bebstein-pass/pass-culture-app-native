import React, { FunctionComponent } from 'react'
import styled from 'styled-components/native'

import { BookingOfferResponse, OfferResponse, ReactionTypeEnum } from 'api/gen'
import { ReactionChoiceValidation } from 'features/reactions/components/ReactionChoiceValidation/ReactionChoiceValidation'
import { useSubcategory } from 'libs/subcategories'
import { Separator } from 'ui/components/Separator'
import { HorizontalTile } from 'ui/components/tiles/HorizontalTile'
import { ValidationMark } from 'ui/components/ValidationMark'
import { ViewGap } from 'ui/components/ViewGap/ViewGap'
import { getSpacing, Spacer, TypoDS } from 'ui/theme'

type Props = {
  offer: OfferResponse | BookingOfferResponse
  dateUsed: string
  handleOnPressReactionButton: (reactionType: ReactionTypeEnum) => void
  reactionStatus?: ReactionTypeEnum | null
}

export const ReactionChoiceModalBodyWithValidation: FunctionComponent<Props> = ({
  offer,
  dateUsed,
  reactionStatus,
  handleOnPressReactionButton,
}) => {
  const { categoryId } = useSubcategory(offer.subcategoryId)

  return (
    <React.Fragment>
      <Spacer.Column numberOfSpaces={6} />
      <ViewGap gap={6}>
        <TypoDS.Title3>Partage-nous ton avis&nbsp;!</TypoDS.Title3>
        <ViewGap gap={4}>
          <Separator.Horizontal />
          <HorizontalTileContainer gap={4}>
            <HorizontalTile title={offer.name} categoryId={categoryId} imageUrl={offer.image?.url}>
              <SubtitleContainer gap={1}>
                <ValidationMark isValid />
                <UsedText>Utilisé</UsedText>
                <DateUsedText>{dateUsed}</DateUsedText>
              </SubtitleContainer>
            </HorizontalTile>
          </HorizontalTileContainer>
          <Separator.Horizontal />
        </ViewGap>
        <StyledReactionChoiceValidation
          reactionStatus={reactionStatus}
          handleOnPressReactionButton={handleOnPressReactionButton}
        />
      </ViewGap>
    </React.Fragment>
  )
}

const HorizontalTileContainer = styled(ViewGap)({
  flexDirection: 'row',
  alignItems: 'center',
})

const SubtitleContainer = styled(ViewGap)({
  flexDirection: 'row',
  alignItems: 'center',
})

const UsedText = styled(TypoDS.BodyAccentXs)(({ theme }) => ({
  color: theme.colors.greenValid,
}))

const DateUsedText = styled(TypoDS.BodyAccentXs)(({ theme }) => ({
  color: theme.colors.greyDark,
}))

const StyledReactionChoiceValidation = styled(ReactionChoiceValidation)({
  marginBottom: getSpacing(12),
})
