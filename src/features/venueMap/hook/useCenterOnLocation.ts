import { RefObject } from 'react'
import { useWindowDimensions } from 'react-native'

import { PREVIEW_BOTTOM_MARGIN } from 'features/venueMap/components/VenueMapView/constant'
import type { Region, Map } from 'libs/maps/maps'
import { getSpacing } from 'ui/theme'

const CENTER_PIN_THRESHOLD = getSpacing(4)

type Params = {
  currentRegion: Region
  previewHeight: number
  mapViewRef: RefObject<Map>
  mapHeight: number
}

export const useCenterOnLocation = ({
  currentRegion,
  previewHeight,
  mapViewRef,
  mapHeight,
}: Params) => {
  const { width } = useWindowDimensions()

  return async (latitude: number, longitude: number) => {
    if (!mapViewRef?.current) return

    const region = { ...currentRegion, latitude, longitude }
    const point = await mapViewRef.current.pointForCoordinate({ latitude, longitude })

    const isBehindPreview =
      point.y > mapHeight - (PREVIEW_BOTTOM_MARGIN + previewHeight + CENTER_PIN_THRESHOLD)
    const isBehindHeader = point.y < CENTER_PIN_THRESHOLD
    const isBehindRightBorder = point.x > width - CENTER_PIN_THRESHOLD
    const isBehindLeftBorder = point.x < CENTER_PIN_THRESHOLD

    if (isBehindHeader || isBehindRightBorder || isBehindPreview || isBehindLeftBorder) {
      mapViewRef.current.animateToRegion(region)
    }
  }
}
