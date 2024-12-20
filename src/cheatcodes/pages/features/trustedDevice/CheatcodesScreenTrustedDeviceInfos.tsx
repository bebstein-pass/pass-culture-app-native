import React from 'react'

import { CheatcodesTemplateScreen } from 'cheatcodes/components/CheatcodesTemplateScreen'
import { useDeviceInfo } from 'features/trustedDevice/helpers/useDeviceInfo'
import { Spacer, Typo, TypoDS } from 'ui/theme'

export const CheatcodesScreenTrustedDeviceInfos = () => {
  const deviceInfo = useDeviceInfo()

  return (
    <CheatcodesTemplateScreen title="Trusted device debug infos" flexDirection="column">
      <TypoDS.Title3>Informations du device actuel</TypoDS.Title3>
      <Spacer.Column numberOfSpaces={2} />
      <Data title="Device ID" data={deviceInfo?.deviceId} />
      <Data title="Device Model ou Browser" data={deviceInfo?.source} />
      <Data title="Device OS" data={deviceInfo?.os} />
    </CheatcodesTemplateScreen>
  )
}

type DataProps = {
  title: string
  data?: string | null
}

const Data = ({ title, data }: DataProps) => (
  <React.Fragment>
    <Spacer.Column numberOfSpaces={2} />
    <Typo.ButtonText>{title}</Typo.ButtonText>
    {data ? (
      <Typo.ButtonTextSecondary>{data}</Typo.ButtonTextSecondary>
    ) : (
      <Typo.ButtonTextPrimary>Information non disponible</Typo.ButtonTextPrimary>
    )}
    <Spacer.Column numberOfSpaces={2} />
  </React.Fragment>
)
