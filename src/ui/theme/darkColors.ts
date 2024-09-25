/*
export enum ColorsEnum {
  ACCENT = '#ff9900', // Inversé de bleu à orange
  ATTENTION = '#0015ff', // Inversé de jaune à bleu
  ATTENTION_LIGHT = '#000830', // Inversé en teinte très sombre
  BLACK = '#ffffff', // Inversé de noir à blanc
  ERROR = '#49ffda', // Inversé de rouge à turquoise clair
  ERROR_LIGHT = '#031713', // Teinte sombre inversée
  GREEN_VALID = '#ea77b0', // Inversé de vert à rose clair
  GREEN_LIGHT = '#d34191', // Vert clair inversé en rose
  GREY_DARK = '#969591', // Inversé en gris clair
  GREY_SEMI_DARK = '#6f6b62', // Inversé en gris moyen
  GREY_MEDIUM = '#34332e', // Inversé en gris foncé
  GREY_LIGHT = '#0e0e0b', // Inversé en gris très sombre
  BROWN_LIGHT = '#73918b', // Inversé en teinte plus claire
  PRIMARY = '#14ffaa', // Inversé de rose à vert clair
  PRIMARY_DISABLED = '#006641', // Inversé en vert foncé
  PRIMARY_DARK = '#3effb9', // Inversé de rouge à vert clair
  SECONDARY = '#cdf69f', // Inversé de violet à vert clair
  SECONDARY_LIGHT_100 = '#0c1300', // Inversé en très sombre
  SECONDARY_LIGHT_200 = '#9edc20', // Inversé en vert vif
  SECONDARY_DARK = '#dafd93', // Inversé en vert pastel
  TERTIARY = '#33e98c', // Inversé de rose à vert vif
  TRANSPARENT = 'transparent', // Inversé reste transparent
  WHITE = '#161617', // Inversé de blanc à noir
  GOLD_DARK = '#46a4fe', // Inversé de marron/orange à bleu vif
  GOLD = '#0560e9', // Inversé de doré à bleu foncé
  GOLD_LIGHT_200 = '#044653', // Inversé en teinte sombre
  GOLD_LIGHT_100 = '#000a27', // Inversé en bleu très sombre
  AQUAMARINE_DARK = '#f17a8b', // Inversé de vert à rose
  AQUAMARINE = '#d82357', // Inversé en rose vif
  AQUAMARINE_LIGHT = '#240015', // Inversé en teinte très sombre
  SKY_BLUE_DARK = '#f18748', // Inversé de bleu à orange
  SKY_BLUE = '#df3a16', // Inversé en rouge-orangé
  SKY_BLUE_LIGHT = '#290700', // Inversé en rouge sombre
  DEEP_PINK_DARK = '#3fec8e', // Inversé en vert vif
  DEEP_PINK = '#13cb87', // Inversé en vert vif
  DEEP_PINK_LIGHT = '#002816', // Inversé en vert très sombre
  CORAL_DARK = '#35c1ec', // Inversé en bleu vif
  CORAL = '#078cc2', // Inversé en bleu plus foncé
  CORAL_LIGHT = '#001233', // Inversé en bleu très sombre
  LILAC_DARK = '#7cc816', // Inversé en vert vif
  LILAC = '#527800', // Inversé en vert foncé
  LILAC_LIGHT = '#151c00', // Inversé en teinte très sombre
}

export enum UniqueColors {
  BRAND = '#78ff78', // Inversé de violet à vert
  BRAND_DARK = '#f8f3c9', // Inversé de bleu très sombre à teinte claire
  GREEN_DISABLED = '#472838', // Inversé en rouge foncé
  GREY_OVERLAY = '#ffffff80', // Inversé en blanc transparent
  BACKGROUND_COLOR = '#222222', // Inversé de gris clair à sombre
  BACKGROUND_SURFACE = '#dedede', // Inversé en surface claire
  FOREGROUND_COLOR = '#111111', // Inversé en teinte très sombre
  TAB_BAR = '#000000f8', // Inversé en noir
}

export const ACTIVE_OPACITY = 0.7 // Conservé inchangé
*/
/*
export enum ColorsEnum {
  ACCENT = '#ff00ff', // Un rose fluorescent
  ATTENTION = '#ff69b4', // Rose bonbon éclatant
  ATTENTION_LIGHT = '#ffb6c1', // Rose clair très doux, mais criard
  BLACK = '#ff1493', // Rose foncé à la place du noir
  ERROR = '#ff00aa', // Un rose saturé pour l'erreur
  ERROR_LIGHT = '#ff99cc', // Un rose pastel flashy
  GREEN_VALID = '#ff007f', // Rose au lieu du vert
  GREEN_LIGHT = '#ff80bf', // Rose très clair
  GREY_DARK = '#ff33cc', // Un violet-rose saturé à la place du gris foncé
  GREY_SEMI_DARK = '#ff66ff', // Un rose clair
  GREY_MEDIUM = '#ffccff', // Rose très clair
  GREY_LIGHT = '#ffeeff', // Rose pâle à la place du gris clair
  BROWN_LIGHT = '#ffaaff', // Violet-rose criard à la place du marron clair
  PRIMARY = '#ff00ff', // Couleur primaire en fuchsia saturé
  PRIMARY_DISABLED = '#ffccff', // Rose pastel très doux
  PRIMARY_DARK = '#ff0099', // Rose très vif pour la version foncée
  SECONDARY = '#ff66cc', // Rose flashy pour la couleur secondaire
  SECONDARY_LIGHT_100 = '#ffe6ff', // Rose pâle éclatant
  SECONDARY_LIGHT_200 = '#ff99ff', // Rose pastel criard
  SECONDARY_DARK = '#ff3399', // Rose foncé très saturé
  TERTIARY = '#ff33ff', // Encore du rose ultra flashy
  TRANSPARENT = 'transparent', // Transparent, inchangé
  WHITE = '#ff66ff', // Rose clair à la place du blanc
  GOLD_DARK = '#ff0066', // Rose saturé à la place de l'or foncé
  GOLD = '#ff66b2', // Rose pastel à la place de l'or
  GOLD_LIGHT_200 = '#ff99cc', // Rose pastel pour une teinte dorée
  GOLD_LIGHT_100 = '#ffb3d9', // Rose clair saturé
  AQUAMARINE_DARK = '#ff33ff', // Rose fluo à la place du vert
  AQUAMARINE = '#ff66ff', // Rose clair à la place de l'aquamarine
  AQUAMARINE_LIGHT = '#ff99ff', // Rose pastel
  SKY_BLUE_DARK = '#ff66cc', // Rose flashy à la place du bleu
  SKY_BLUE = '#ff33ff', // Rose vif à la place du bleu ciel
  SKY_BLUE_LIGHT = '#ffb3ff', // Rose pastel très clair
  DEEP_PINK_DARK = '#ff0099', // Rose foncé saturé
  DEEP_PINK = '#ff00cc', // Rose fluo pour être bien "dégueulasse"
  DEEP_PINK_LIGHT = '#ff66ff', // Rose clair fluo
  CORAL_DARK = '#ff33ff', // Rose saturé à la place du corail foncé
  CORAL = '#ff99ff', // Rose pastel clair
  CORAL_LIGHT = '#ffccff', // Rose très doux et délavé
  LILAC_DARK = '#ff00ff', // Un fuchsia saturé
  LILAC = '#ff99ff', // Rose pastel
  LILAC_LIGHT = '#ffe6ff', // Rose très pâle
}

export enum UniqueColors {
  BRAND = '#ff00ff', // Rose saturé pour la couleur de marque
  BRAND_DARK = '#ff3399', // Rose foncé éclatant
  GREEN_DISABLED = '#ff66b2', // Rose pastel pour le désactivé
  GREY_OVERLAY = '#ff00cc80', // Rose transparent
  BACKGROUND_COLOR = '#ffb3ff', // Rose pâle pour le fond
  BACKGROUND_SURFACE = '#ff66ff', // Rose clair pour les surfaces
  FOREGROUND_COLOR = '#ff0099', // Rose vif pour le texte
  TAB_BAR = '#ff99ff', // Rose pastel pour la barre d'onglet
}

export const ACTIVE_OPACITY = 0.5 // Opacité réduite pour un effet délavé
*/
export enum ColorsEnum {
  ACCENT = '#00ccff',
  ATTENTION = '#ffea00',
  ATTENTION_LIGHT = '#fff7cf',
  BLACK = '#FFFFFF',
  ERROR = '#b60025',
  ERROR_LIGHT = '#fce8ec',
  GREEN_VALID = '#15884f',
  GREEN_LIGHT = '#2cbe6e',
  GREY_DARK = '#C8C8C8',
  GREY_SEMI_DARK = '#90949D',
  GREY_MEDIUM = '#CBCDD2',
  GREY_LIGHT = '#34305F',
  BROWN_LIGHT = '#4169E1',
  PRIMARY = '#EB0055',
  PRIMARY_DISABLED = '#ff99be',
  PRIMARY_DARK = '#c10046',
  SECONDARY = '#6123DF',
  SECONDARY_LIGHT_100 = '#4169E1',
  SECONDARY_LIGHT_200 = '#f3f3f3',
  SECONDARY_DARK = '#4169E1',
  TERTIARY = '#cc1673',
  TRANSPARENT = 'transparent',
  WHITE = '#161640',
  GOLD_DARK = '#FA9F16',
  GOLD = '#4169E1',
  GOLD_LIGHT_200 = '#FA9F16',
  GOLD_LIGHT_100 = '#34305F',
  AQUAMARINE_DARK = '#27DCA8',
  AQUAMARINE = '#27DCA8',
  AQUAMARINE_LIGHT = '#34305F',
  SKY_BLUE_DARK = '#20C5E9',
  SKY_BLUE = '#20C5E9',
  SKY_BLUE_LIGHT = '#34305F',
  DEEP_PINK_DARK = '#EC3478',
  DEEP_PINK = '#EC3478',
  DEEP_PINK_LIGHT = '#34305F',
  CORAL_DARK = '#F8733D',
  CORAL = '#F8733D',
  CORAL_LIGHT = '#34305F',
  LILAC_DARK = '#AD87FF',
  LILAC = '#AD87FF',
  LILAC_LIGHT = '#34305F',
}

export enum UniqueColors {
  BRAND = '#FFFFFF',
  BRAND_DARK = '#4169E1',
  GREEN_DISABLED = '#4169E1',
  GREY_OVERLAY = '#4169E1',
  BACKGROUND_COLOR = '#3d1e8b',
  BACKGROUND_SURFACE = '#4169E1',
  FOREGROUND_COLOR = '#4e28ae',
  TAB_BAR = '#171718',
  WHITE = '#FFF',
  BLACK = '#171718',
  SPECIFIC_GREY = '#2C2C2E',
}

export const ACTIVE_OPACITY = 0.5
/*
  export enum ColorsEnum {
    ACCENT = '#00F',
    ATTENTION = '#00F',
    ATTENTION_LIGHT = '#00F',
    BLACK = '#00F',
    ERROR = '#00F',
    ERROR_LIGHT = '#00F',
    GREEN_VALID = '#00F',
    GREEN_LIGHT = '#00F',
    GREY_DARK = '#00F',
    GREY_SEMI_DARK = '#00F',
    GREY_MEDIUM = '#00F',
    GREY_LIGHT = '#00F',
    BROWN_LIGHT = '#00F',
    PRIMARY = '#00F',
    PRIMARY_DISABLED = '#00F',
    PRIMARY_DARK = '#00F',
    SECONDARY = '#00F',
    SECONDARY_LIGHT_100 = '#00F',
    SECONDARY_LIGHT_200 = '#00F',
    SECONDARY_DARK = '#00F',
    TERTIARY = '#00F',
    TRANSPARENT = '#00F',
    WHITE = '#00F',
    GOLD_DARK = '#00F',
    GOLD = '#00F',
    GOLD_LIGHT_200 = '#00F',
    GOLD_LIGHT_100 = '#00F',
    AQUAMARINE_DARK = '#00F',
    AQUAMARINE = '#00F',
    AQUAMARINE_LIGHT = '#00F',
    SKY_BLUE_DARK = '#00F',
    SKY_BLUE = '#00F',
    SKY_BLUE_LIGHT = '#00F',
    DEEP_PINK_DARK = '#00F',
    DEEP_PINK = '#00F',
    DEEP_PINK_LIGHT = '#00F',
    CORAL_DARK = '#00F',
    CORAL = '#00F',
    CORAL_LIGHT = '#00F',
    LILAC_DARK = '#00F',
    LILAC = '#00F',
    LILAC_LIGHT = '#00F',
  }
  
  export enum UniqueColors {
    BRAND = '#00F',
    BRAND_DARK = '#00F',
    GREEN_DISABLED = '#00F',
    GREY_OVERLAY = '#00F',
    BACKGROUND_COLOR = '#00F',
    BACKGROUND_SURFACE = '#00F',
    FOREGROUND_COLOR = '#00F',
    TAB_BAR = '#00F',
    SCROLL_TO_TOP = '#00F',
  }
  
  export const ACTIVE_OPACITY = 0.5
  /**/
