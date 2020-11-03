import * as React from 'react'
import Svg, { Path, G } from 'react-native-svg'

export const IdeaIcon: React.FC = (): JSX.Element => {
  return (
    <Svg>
      <G fill="none" fillRule="evenodd">
        <G fill="#FFF">
          <G>
            <Path
              d="M31.13 42.676c.484 0 .876.392.876.875 0 .443-.33.81-.756.867l-.12.008h-6.446c-.483 0-.875-.392-.875-.875 0-.443.329-.809.756-.867l.119-.008h6.447zm.94-3.827c.482 0 .874.392.874.875 0 .443-.329.81-.756.867l-.119.008h-8.324c-.483 0-.875-.392-.875-.875 0-.443.33-.809.756-.867l.119-.008h8.324zm-2.502-27.112c4.862.55 8.838 4.456 9.464 9.306.489 3.777-.98 7.4-3.813 9.754-.371.31-.923.258-1.232-.113-.309-.372-.258-.924.113-1.233 2.377-1.975 3.607-5.008 3.197-8.184-.524-4.05-3.863-7.332-7.926-7.79-5.435-.614-10.12 3.6-10.12 9.002 0 2.338.887 4.534 2.458 6.203.666.711 1.062 1.626 1.123 2.59l.008.265v2.102c0 .44.327.803.75.86l.118.008h8.877c.484 0 .875.392.875.875 0 .443-.329.81-.756.867l-.119.008h-8.877c-1.385 0-2.52-1.076-2.612-2.438l-.006-.18v-2.102c0-.615-.234-1.206-.657-1.657-1.872-1.989-2.933-4.613-2.933-7.4 0-6.444 5.592-11.473 12.068-10.743zm-1.942 4.425c.185.446-.027.958-.473 1.143-2.254.935-3.754 3.138-3.754 5.619 0 .483-.391.875-.875.875-.483 0-.875-.392-.875-.875 0-3.195 1.932-6.032 4.834-7.235.446-.186.958.026 1.143.473z"
              transform="translate(-34 -935) translate(34 935)"
            />
          </G>
        </G>
      </G>
    </Svg>
  )
}
