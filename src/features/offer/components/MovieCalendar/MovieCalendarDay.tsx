import React from 'react'
import { View } from 'react-native'
import styled, { useTheme } from 'styled-components/native'

import { MovieCalendarBottomBar } from 'features/offer/components/MovieCalendar/MovieCalendarBottomBar'
import { TouchableOpacity } from 'ui/components/TouchableOpacity'
import { getSpacing, Typo } from 'ui/theme'

import { useMovieCalendarDay } from './useMovieCalendarDay'

type Props = {
  date: Date
  onTabChange: (date: Date) => void
  selectedDate?: Date
}

export const MovieCalendarDay: React.FC<Props> = ({ date, selectedDate, onTabChange }) => {
  const { isDesktopViewport } = useTheme()
  const { weekDay, dayDate, month, accessibilityLabel, isSelected } = useMovieCalendarDay(
    date,
    selectedDate
  )
  const { CalendarText } = StatusPattern[isSelected ? 'selected' : 'default']

  return (
    <CalendarCell onPress={() => onTabChange(date)}>
      <CalendarTextView accessibilityLabel={accessibilityLabel}>
        <CalendarText numberOfLines={1} isDesktopViewport={isDesktopViewport}>
          {weekDay}
        </CalendarText>
        <CalendarText numberOfLines={1} isDesktopViewport={isDesktopViewport}>
          {dayDate}
        </CalendarText>
        <CalendarText numberOfLines={1} isDesktopViewport={isDesktopViewport}>
          {month}
        </CalendarText>
      </CalendarTextView>
      {isSelected ? <SelectedBottomBar /> : null}
    </CalendarCell>
  )
}

const SelectedBottomBar = styled(MovieCalendarBottomBar)(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  borderRadius: getSpacing(1),
}))

const CalendarTextView = styled(View)({
  marginHorizontal: getSpacing(4),
  marginBottom: getSpacing(2),
})

const CalendarCell = styled(TouchableOpacity)({
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
})

const DefaultCalendarText = styled(Typo.ButtonText)<{ isDesktopViewport?: boolean }>(
  ({ theme, isDesktopViewport }) => ({
    color: theme.colors.greyDark,
    textAlign: 'center',
    width: getSpacing(isDesktopViewport ? 22 : 10),
  })
)

const SelectedCalendarText = styled(DefaultCalendarText)(({ theme }) => ({
  color: theme.colors.primary,
}))

const StatusPattern = {
  default: {
    CalendarText: DefaultCalendarText,
  },
  selected: {
    CalendarText: SelectedCalendarText,
  },
}
