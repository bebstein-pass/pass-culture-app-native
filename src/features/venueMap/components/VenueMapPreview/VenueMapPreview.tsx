import React, { ComponentProps, FunctionComponent } from 'react'
import styled from 'styled-components/native'

import { styledButton } from 'ui/components/buttons/styledButton'
import { CloseButton } from 'ui/components/headers/CloseButton'
import { InternalTouchableLink } from 'ui/components/touchableLink/InternalTouchableLink'
import { VenueInfoHeader } from 'ui/components/VenueInfoHeader/VenueInfoHeader'
import { InformationTags } from 'ui/InformationTags/InformationTags'
import { getShadow, getSpacing } from 'ui/theme'

type Props = {
  venueName: string
  address: string
  bannerUrl: string
  tags: string[]
  onClose?: VoidFunction
  noBorder?: boolean
  iconSize?: number
  withRightArrow?: boolean
} & ComponentProps<typeof InternalTouchableLink>

const VENUE_THUMBNAIL_SIZE = getSpacing(12)

export const VenueMapPreview: FunctionComponent<Props> = ({
  venueName,
  address,
  bannerUrl,
  tags,
  onClose,
  iconSize,
  noBorder,
  withRightArrow,
  ...touchableProps
}) => {
  const Wrapper = noBorder ? InternalTouchableLink : Container
  return (
    <Wrapper {...touchableProps}>
      <Row>
        <StyledInformationTags tags={tags} />
        <StyledCloseButton onClose={onClose} size={iconSize} />
      </Row>
      <StyledVenueInfoHeader
        title={venueName}
        subtitle={address}
        imageSize={VENUE_THUMBNAIL_SIZE}
        showArrow={withRightArrow}
        imageURL={bannerUrl}
      />
    </Wrapper>
  )
}

const Container = styled(InternalTouchableLink)(({ theme }) => ({
  borderRadius: theme.borderRadius.radius,
  borderColor: theme.colors.greyDark,
  borderWidth: 1,
  padding: getSpacing(4),
  ...getShadow({
    shadowOffset: {
      width: 0,
      height: getSpacing(1),
    },
    shadowRadius: getSpacing(4),
    shadowColor: theme.colors.secondaryDark,
    shadowOpacity: 0.2,
  }),
}))

const Row = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
})

const StyledVenueInfoHeader = styled(VenueInfoHeader)({
  marginTop: getSpacing(2),
})

const StyledCloseButton = styledButton(CloseButton)({
  justifyContent: 'flex-start',
})

const StyledInformationTags = styled(InformationTags)({
  flexGrow: 1,
})
