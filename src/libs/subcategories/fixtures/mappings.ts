import { GenreType } from 'api/gen'

export const categoryIdMappingSnap = {
  ABO_BIBLIOTHEQUE: 'LIVRE',
  ABO_CONCERT: 'MUSIQUE_LIVE',
  ABO_JEU_VIDEO: 'JEU',
  ABO_LIVRE_NUMERIQUE: 'LIVRE',
  ABO_LUDOTHEQUE: 'JEU',
  ABO_MEDIATHEQUE: 'FILM',
  ABO_PLATEFORME_MUSIQUE: 'MUSIQUE_ENREGISTREE',
  ABO_PLATEFORME_VIDEO: 'FILM',
  ABO_PRATIQUE_ART: 'PRATIQUE_ART',
  ABO_PRESSE_EN_LIGNE: 'MEDIA',
  ABO_SPECTACLE: 'SPECTACLE',
  ACHAT_INSTRUMENT: 'INSTRUMENT',
  ACTIVATION_EVENT: 'TECHNIQUE',
  ACTIVATION_THING: 'TECHNIQUE',
  APP_CULTURELLE: 'MEDIA',
  ATELIER_PRATIQUE_ART: 'PRATIQUE_ART',
  AUTRE_SUPPORT_NUMERIQUE: 'FILM',
  BON_ACHAT_INSTRUMENT: 'INSTRUMENT',
  CAPTATION_MUSIQUE: 'MUSIQUE_ENREGISTREE',
  CARTE_CINE_ILLIMITE: 'CINEMA',
  CARTE_CINE_MULTISEANCES: 'CINEMA',
  CARTE_JEUNES: 'CARTE_JEUNES',
  CARTE_MUSEE: 'MUSEE',
  CINE_PLEIN_AIR: 'CINEMA',
  CINE_VENTE_DISTANCE: 'CINEMA',
  CONCERT: 'MUSIQUE_LIVE',
  CONCOURS: 'JEU',
  CONFERENCE: 'CONFERENCE',
  DECOUVERTE_METIERS: 'CONFERENCE',
  ESCAPE_GAME: 'JEU',
  EVENEMENT_CINE: 'CINEMA',
  EVENEMENT_JEU: 'JEU',
  EVENEMENT_MUSIQUE: 'MUSIQUE_LIVE',
  EVENEMENT_PATRIMOINE: 'MUSEE',
  FESTIVAL_ART_VISUEL: 'MUSEE',
  FESTIVAL_CINE: 'CINEMA',
  FESTIVAL_LIVRE: 'LIVRE',
  FESTIVAL_MUSIQUE: 'MUSIQUE_LIVE',
  FESTIVAL_SPECTACLE: 'SPECTACLE',
  JEU_EN_LIGNE: 'JEU',
  JEU_SUPPORT_PHYSIQUE: 'TECHNIQUE',
  LIVESTREAM_EVENEMENT: 'SPECTACLE',
  LIVESTREAM_MUSIQUE: 'MUSIQUE_LIVE',
  LIVESTREAM_PRATIQUE_ARTISTIQUE: 'PRATIQUE_ART',
  LIVRE_AUDIO_PHYSIQUE: 'LIVRE',
  LIVRE_NUMERIQUE: 'LIVRE',
  LIVRE_PAPIER: 'LIVRE',
  LOCATION_INSTRUMENT: 'INSTRUMENT',
  MATERIEL_ART_CREATIF: 'BEAUX_ARTS',
  MUSEE_VENTE_DISTANCE: 'MUSEE',
  OEUVRE_ART: 'TECHNIQUE',
  PARTITION: 'INSTRUMENT',
  PLATEFORME_PRATIQUE_ARTISTIQUE: 'PRATIQUE_ART',
  PODCAST: 'MEDIA',
  PRATIQUE_ART_VENTE_DISTANCE: 'PRATIQUE_ART',
  RENCONTRE: 'CONFERENCE',
  RENCONTRE_EN_LIGNE: 'CONFERENCE',
  RENCONTRE_JEU: 'JEU',
  SALON: 'CONFERENCE',
  SEANCE_CINE: 'CINEMA',
  SEANCE_ESSAI_PRATIQUE_ART: 'PRATIQUE_ART',
  SPECTACLE_ENREGISTRE: 'SPECTACLE',
  SPECTACLE_REPRESENTATION: 'SPECTACLE',
  SPECTACLE_VENTE_DISTANCE: 'SPECTACLE',
  SUPPORT_PHYSIQUE_FILM: 'FILM',
  SUPPORT_PHYSIQUE_MUSIQUE_CD: 'MUSIQUE_ENREGISTREE',
  SUPPORT_PHYSIQUE_MUSIQUE_VINYLE: 'MUSIQUE_ENREGISTREE',
  TELECHARGEMENT_LIVRE_AUDIO: 'LIVRE',
  TELECHARGEMENT_MUSIQUE: 'MUSIQUE_ENREGISTREE',
  VISITE: 'MUSEE',
  VISITE_GUIDEE: 'MUSEE',
  VISITE_VIRTUELLE: 'MUSEE',
  VOD: 'FILM',
}

export const subcategoriesMappingSnap = {
  ABO_BIBLIOTHEQUE: {
    appLabel: 'Abonnement (bibliothèques, médiathèques...)',
    categoryId: 'LIVRE',
    homepageLabelName: 'LIVRES',
    isEvent: false,
    nativeCategoryId: 'BIBLIOTHEQUE',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'BIBLIOTHEQUES_MEDIATHEQUE',
  },
  ABO_CONCERT: {
    appLabel: 'Abonnement concert',
    categoryId: 'MUSIQUE_LIVE',
    homepageLabelName: 'CONCERT',
    isEvent: false,
    nativeCategoryId: 'CONCERTS_EVENEMENTS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'CONCERTS_FESTIVALS',
  },
  ABO_JEU_VIDEO: {
    appLabel: 'Abonnement jeux vidéos',
    categoryId: 'JEU',
    homepageLabelName: 'JEUX',
    isEvent: false,
    nativeCategoryId: 'JEUX_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'JEUX_JEUX_VIDEOS',
  },
  ABO_LIVRE_NUMERIQUE: {
    appLabel: 'Abonnement livres numériques',
    categoryId: 'LIVRE',
    homepageLabelName: 'LIVRES',
    isEvent: false,
    nativeCategoryId: 'LIVRES_NUMERIQUE_ET_AUDIO',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'LIVRES',
  },
  ABO_LUDOTHEQUE: {
    appLabel: 'Abonnement ludothèque',
    categoryId: 'JEU',
    homepageLabelName: 'JEUX',
    isEvent: false,
    nativeCategoryId: 'LUDOTHEQUE',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'JEUX_JEUX_VIDEOS',
  },
  ABO_MEDIATHEQUE: {
    appLabel: 'Abonnement médiathèque',
    categoryId: 'FILM',
    homepageLabelName: 'FILMS',
    isEvent: false,
    nativeCategoryId: 'MEDIATHEQUE',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'BIBLIOTHEQUES_MEDIATHEQUE',
  },
  ABO_PLATEFORME_MUSIQUE: {
    appLabel: 'Abonnement plateforme musicale',
    categoryId: 'MUSIQUE_ENREGISTREE',
    homepageLabelName: 'MUSIQUE',
    isEvent: false,
    nativeCategoryId: 'MUSIQUE_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'CD_VINYLE_MUSIQUE_EN_LIGNE',
  },
  ABO_PLATEFORME_VIDEO: {
    appLabel: 'Abonnement plateforme streaming',
    categoryId: 'FILM',
    homepageLabelName: 'FILMS',
    isEvent: false,
    nativeCategoryId: 'FILMS_SERIES_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  ABO_PRATIQUE_ART: {
    appLabel: 'Abonnement pratique artistique',
    categoryId: 'PRATIQUE_ART',
    homepageLabelName: 'BEAUX_ARTS',
    isEvent: false,
    nativeCategoryId: 'PRATIQUES_ET_ATELIERS_ARTISTIQUES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'ARTS_LOISIRS_CREATIFS',
  },
  ABO_PRESSE_EN_LIGNE: {
    appLabel: 'Abonnement presse en ligne',
    categoryId: 'MEDIA',
    homepageLabelName: 'MEDIAS',
    isEvent: false,
    nativeCategoryId: 'PRESSE_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'MEDIA_PRESSE',
  },
  ABO_SPECTACLE: {
    appLabel: 'Abonnement spectacle',
    categoryId: 'SPECTACLE',
    homepageLabelName: 'SPECTACLES',
    isEvent: false,
    nativeCategoryId: 'ABONNEMENTS_SPECTACLE',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'SPECTACLES',
  },
  ACHAT_INSTRUMENT: {
    appLabel: 'Achat instrument',
    categoryId: 'INSTRUMENT',
    homepageLabelName: 'INSTRUMENT',
    isEvent: false,
    nativeCategoryId: 'ACHAT_LOCATION_INSTRUMENT',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'INSTRUMENTS',
  },
  ACTIVATION_EVENT: {
    appLabel: 'Catégorie technique d’évènement d’activation',
    categoryId: 'TECHNIQUE',
    homepageLabelName: 'NONE',
    isEvent: true,
    nativeCategoryId: 'DEPRECIEE',
    onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
    searchGroupName: 'NONE',
  },
  ACTIVATION_THING: {
    appLabel: 'Catégorie technique de thing d’activation',
    categoryId: 'TECHNIQUE',
    homepageLabelName: 'NONE',
    isEvent: false,
    nativeCategoryId: 'DEPRECIEE',
    onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
    searchGroupName: 'NONE',
  },
  APP_CULTURELLE: {
    appLabel: 'Application culturelle',
    categoryId: 'MEDIA',
    homepageLabelName: 'MEDIAS',
    isEvent: false,
    nativeCategoryId: 'AUTRES_MEDIAS',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'MEDIA_PRESSE',
  },
  ATELIER_PRATIQUE_ART: {
    appLabel: 'Atelier, stage de pratique artistique',
    categoryId: 'PRATIQUE_ART',
    homepageLabelName: 'BEAUX_ARTS',
    isEvent: true,
    nativeCategoryId: 'PRATIQUES_ET_ATELIERS_ARTISTIQUES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'ARTS_LOISIRS_CREATIFS',
  },
  AUTRE_SUPPORT_NUMERIQUE: {
    appLabel: 'Autre support numérique',
    categoryId: 'FILM',
    homepageLabelName: 'FILMS',
    isEvent: false,
    nativeCategoryId: 'FILMS_SERIES_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  BON_ACHAT_INSTRUMENT: {
    appLabel: 'Bon d’achat instrument',
    categoryId: 'INSTRUMENT',
    homepageLabelName: 'INSTRUMENT',
    isEvent: false,
    nativeCategoryId: 'ACHAT_LOCATION_INSTRUMENT',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'INSTRUMENTS',
  },
  CAPTATION_MUSIQUE: {
    appLabel: 'Captation musicale',
    categoryId: 'MUSIQUE_ENREGISTREE',
    homepageLabelName: 'MUSIQUE',
    isEvent: false,
    nativeCategoryId: 'MUSIQUE_EN_LIGNE',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'CD_VINYLE_MUSIQUE_EN_LIGNE',
  },
  CARTE_CINE_ILLIMITE: {
    appLabel: 'Carte cinéma illimité',
    categoryId: 'CINEMA',
    homepageLabelName: 'CINEMA',
    isEvent: false,
    nativeCategoryId: 'CARTES_CINEMA',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  CARTE_CINE_MULTISEANCES: {
    appLabel: 'Carte cinéma multi-séances',
    categoryId: 'CINEMA',
    homepageLabelName: 'CINEMA',
    isEvent: false,
    nativeCategoryId: 'CARTES_CINEMA',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  CARTE_JEUNES: {
    appLabel: 'Carte jeunes',
    categoryId: 'CARTE_JEUNES',
    homepageLabelName: 'CARTE_JEUNES',
    isEvent: false,
    nativeCategoryId: 'CARTES_JEUNES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'CARTES_JEUNES',
  },
  CARTE_MUSEE: {
    appLabel: 'Abonnement musée, carte ou pass',
    categoryId: 'MUSEE',
    homepageLabelName: 'MUSEE',
    isEvent: false,
    nativeCategoryId: 'ABONNEMENTS_MUSEE',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'MUSEES_VISITES_CULTURELLES',
  },
  CINE_PLEIN_AIR: {
    appLabel: 'Cinéma plein air',
    categoryId: 'CINEMA',
    homepageLabelName: 'CINEMA',
    isEvent: true,
    nativeCategoryId: 'SEANCES_DE_CINEMA',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  CINE_VENTE_DISTANCE: {
    appLabel: 'Cinéma',
    categoryId: 'CINEMA',
    homepageLabelName: 'CINEMA',
    isEvent: false,
    nativeCategoryId: 'SEANCES_DE_CINEMA',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  CONCERT: {
    appLabel: 'Concert',
    categoryId: 'MUSIQUE_LIVE',
    homepageLabelName: 'CONCERT',
    isEvent: true,
    nativeCategoryId: 'CONCERTS_EVENEMENTS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'CONCERTS_FESTIVALS',
  },
  CONCOURS: {
    appLabel: 'Concours - jeux',
    categoryId: 'JEU',
    homepageLabelName: 'JEUX',
    isEvent: true,
    nativeCategoryId: 'CONCOURS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'JEUX_JEUX_VIDEOS',
  },
  CONFERENCE: {
    appLabel: 'Conférence',
    categoryId: 'CONFERENCE',
    homepageLabelName: 'RENCONTRES',
    isEvent: true,
    nativeCategoryId: 'CONFERENCES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'RENCONTRES_CONFERENCES',
  },
  DECOUVERTE_METIERS: {
    appLabel: 'Découverte des métiers',
    categoryId: 'CONFERENCE',
    homepageLabelName: 'RENCONTRES',
    isEvent: true,
    nativeCategoryId: 'SALONS_ET_METIERS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'RENCONTRES_CONFERENCES',
  },
  ESCAPE_GAME: {
    appLabel: 'Escape game',
    categoryId: 'JEU',
    homepageLabelName: 'JEUX',
    isEvent: false,
    nativeCategoryId: 'ESCAPE_GAMES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'JEUX_JEUX_VIDEOS',
  },
  EVENEMENT_CINE: {
    appLabel: 'Évènement cinéma',
    categoryId: 'CINEMA',
    homepageLabelName: 'CINEMA',
    isEvent: true,
    nativeCategoryId: 'EVENEMENTS_CINEMA',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  EVENEMENT_JEU: {
    appLabel: 'Évènements - jeux',
    categoryId: 'JEU',
    homepageLabelName: 'JEUX',
    isEvent: true,
    nativeCategoryId: 'RENCONTRES_EVENEMENTS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'JEUX_JEUX_VIDEOS',
  },
  EVENEMENT_MUSIQUE: {
    appLabel: 'Autre type d’évènement musical',
    categoryId: 'MUSIQUE_LIVE',
    homepageLabelName: 'CONCERT',
    isEvent: true,
    nativeCategoryId: 'CONCERTS_EVENEMENTS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'CONCERTS_FESTIVALS',
  },
  EVENEMENT_PATRIMOINE: {
    appLabel: 'Évènement et atelier patrimoine',
    categoryId: 'MUSEE',
    homepageLabelName: 'VISITES',
    isEvent: true,
    nativeCategoryId: 'EVENEMENTS_PATRIMOINE',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'MUSEES_VISITES_CULTURELLES',
  },
  FESTIVAL_ART_VISUEL: {
    appLabel: 'Festival d’arts visuels / arts numériques',
    categoryId: 'MUSEE',
    homepageLabelName: 'FESTIVAL',
    isEvent: true,
    nativeCategoryId: 'ARTS_VISUELS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'MUSEES_VISITES_CULTURELLES',
  },
  FESTIVAL_CINE: {
    appLabel: 'Festival de cinéma',
    categoryId: 'CINEMA',
    homepageLabelName: 'CINEMA',
    isEvent: true,
    nativeCategoryId: 'EVENEMENTS_CINEMA',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  FESTIVAL_LIVRE: {
    appLabel: 'Festival et salon du livre',
    categoryId: 'LIVRE',
    homepageLabelName: 'LIVRES',
    isEvent: true,
    nativeCategoryId: 'FESTIVAL_DU_LIVRE',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'LIVRES',
  },
  FESTIVAL_MUSIQUE: {
    appLabel: 'Festival de musique',
    categoryId: 'MUSIQUE_LIVE',
    homepageLabelName: 'FESTIVAL',
    isEvent: true,
    nativeCategoryId: 'FESTIVALS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'CONCERTS_FESTIVALS',
  },
  FESTIVAL_SPECTACLE: {
    appLabel: 'Festival',
    categoryId: 'SPECTACLE',
    homepageLabelName: 'SPECTACLES',
    isEvent: true,
    nativeCategoryId: 'SPECTACLES_REPRESENTATIONS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'SPECTACLES',
  },
  JEU_EN_LIGNE: {
    appLabel: 'Jeux en ligne',
    categoryId: 'JEU',
    homepageLabelName: 'JEUX',
    isEvent: false,
    nativeCategoryId: 'JEUX_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'JEUX_JEUX_VIDEOS',
  },
  JEU_SUPPORT_PHYSIQUE: {
    appLabel: 'Catégorie technique Jeu support physique',
    categoryId: 'TECHNIQUE',
    homepageLabelName: 'NONE',
    isEvent: false,
    nativeCategoryId: 'JEUX_PHYSIQUES',
    onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
    searchGroupName: 'NONE',
  },
  LIVESTREAM_EVENEMENT: {
    appLabel: 'Live stream d’évènement',
    categoryId: 'SPECTACLE',
    homepageLabelName: 'SPECTACLES',
    isEvent: true,
    nativeCategoryId: 'RENCONTRES_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'EVENEMENTS_EN_LIGNE',
  },
  LIVESTREAM_MUSIQUE: {
    appLabel: 'Livestream musical',
    categoryId: 'MUSIQUE_LIVE',
    homepageLabelName: 'MUSIQUE',
    isEvent: true,
    nativeCategoryId: 'CONCERTS_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'EVENEMENTS_EN_LIGNE',
  },
  LIVESTREAM_PRATIQUE_ARTISTIQUE: {
    appLabel: 'Pratique artistique - livestream',
    categoryId: 'PRATIQUE_ART',
    homepageLabelName: 'COURS',
    isEvent: true,
    nativeCategoryId: 'PRATIQUE_ARTISTIQUE_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'EVENEMENTS_EN_LIGNE',
  },
  LIVRE_AUDIO_PHYSIQUE: {
    appLabel: 'Livre audio sur support physique',
    categoryId: 'LIVRE',
    homepageLabelName: 'LIVRES',
    isEvent: false,
    nativeCategoryId: 'LIVRES_AUDIO_PHYSIQUES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'LIVRES',
  },
  LIVRE_NUMERIQUE: {
    appLabel: 'Livre numérique, e-book',
    categoryId: 'LIVRE',
    homepageLabelName: 'LIVRES',
    isEvent: false,
    nativeCategoryId: 'LIVRES_NUMERIQUE_ET_AUDIO',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'LIVRES',
  },
  LIVRE_PAPIER: {
    appLabel: 'Livre',
    categoryId: 'LIVRE',
    homepageLabelName: 'LIVRES',
    isEvent: false,
    nativeCategoryId: 'LIVRES_PAPIER',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'LIVRES',
  },
  LOCATION_INSTRUMENT: {
    appLabel: 'Location instrument',
    categoryId: 'INSTRUMENT',
    homepageLabelName: 'INSTRUMENT',
    isEvent: false,
    nativeCategoryId: 'ACHAT_LOCATION_INSTRUMENT',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'INSTRUMENTS',
  },
  MATERIEL_ART_CREATIF: {
    appLabel: 'Matériel arts créatifs',
    categoryId: 'BEAUX_ARTS',
    homepageLabelName: 'BEAUX_ARTS',
    isEvent: false,
    nativeCategoryId: 'MATERIELS_CREATIFS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'ARTS_LOISIRS_CREATIFS',
  },
  MUSEE_VENTE_DISTANCE: {
    appLabel: 'Musée vente à distance',
    categoryId: 'MUSEE',
    homepageLabelName: 'MUSEE',
    isEvent: false,
    nativeCategoryId: 'VISITES_CULTURELLES',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'MUSEES_VISITES_CULTURELLES',
  },
  OEUVRE_ART: {
    appLabel: 'Catégorie technique d’oeuvre d’art',
    categoryId: 'TECHNIQUE',
    homepageLabelName: 'NONE',
    isEvent: false,
    nativeCategoryId: 'ARTS_VISUELS',
    onlineOfflinePlatform: 'ONLINE_OR_OFFLINE',
    searchGroupName: 'ARTS_LOISIRS_CREATIFS',
  },
  PARTITION: {
    appLabel: 'Partition',
    categoryId: 'INSTRUMENT',
    homepageLabelName: 'INSTRUMENT',
    isEvent: false,
    nativeCategoryId: 'PARTITIONS_DE_MUSIQUE',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'INSTRUMENTS',
  },
  PLATEFORME_PRATIQUE_ARTISTIQUE: {
    appLabel: 'Plateforme de pratique artistique',
    categoryId: 'PRATIQUE_ART',
    homepageLabelName: 'PLATEFORME',
    isEvent: false,
    nativeCategoryId: 'PRATIQUE_ARTISTIQUE_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'ARTS_LOISIRS_CREATIFS',
  },
  PODCAST: {
    appLabel: 'Podcast',
    categoryId: 'MEDIA',
    homepageLabelName: 'MEDIAS',
    isEvent: false,
    nativeCategoryId: 'PODCAST',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'MEDIA_PRESSE',
  },
  PRATIQUE_ART_VENTE_DISTANCE: {
    appLabel: 'Pratique artistique - vente à distance',
    categoryId: 'PRATIQUE_ART',
    homepageLabelName: 'BEAUX_ARTS',
    isEvent: false,
    nativeCategoryId: 'PRATIQUE_ARTISTIQUE_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'ARTS_LOISIRS_CREATIFS',
  },
  RENCONTRE: {
    appLabel: 'Rencontre',
    categoryId: 'CONFERENCE',
    homepageLabelName: 'RENCONTRES',
    isEvent: true,
    nativeCategoryId: 'RENCONTRES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'RENCONTRES_CONFERENCES',
  },
  RENCONTRE_EN_LIGNE: {
    appLabel: 'Rencontre en ligne',
    categoryId: 'CONFERENCE',
    homepageLabelName: 'RENCONTRES',
    isEvent: true,
    nativeCategoryId: 'RENCONTRES_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'RENCONTRES_CONFERENCES',
  },
  RENCONTRE_JEU: {
    appLabel: 'Rencontres - jeux',
    categoryId: 'JEU',
    homepageLabelName: 'JEUX',
    isEvent: true,
    nativeCategoryId: 'RENCONTRES_EVENEMENTS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'JEUX_JEUX_VIDEOS',
  },
  SALON: {
    appLabel: 'Salon, Convention',
    categoryId: 'CONFERENCE',
    homepageLabelName: 'RENCONTRES',
    isEvent: true,
    nativeCategoryId: 'SALONS_ET_METIERS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'RENCONTRES_CONFERENCES',
  },
  SEANCE_CINE: {
    appLabel: 'Séance de cinéma',
    categoryId: 'CINEMA',
    homepageLabelName: 'CINEMA',
    isEvent: true,
    nativeCategoryId: 'SEANCES_DE_CINEMA',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  SEANCE_ESSAI_PRATIQUE_ART: {
    appLabel: 'Séance d’essai',
    categoryId: 'PRATIQUE_ART',
    homepageLabelName: 'BEAUX_ARTS',
    isEvent: true,
    nativeCategoryId: 'PRATIQUES_ET_ATELIERS_ARTISTIQUES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'ARTS_LOISIRS_CREATIFS',
  },
  SPECTACLE_ENREGISTRE: {
    appLabel: 'Spectacle enregistré',
    categoryId: 'SPECTACLE',
    homepageLabelName: 'SPECTACLES',
    isEvent: false,
    nativeCategoryId: 'SPECTACLES_ENREGISTRES',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'SPECTACLES',
  },
  SPECTACLE_REPRESENTATION: {
    appLabel: 'Spectacle, représentation',
    categoryId: 'SPECTACLE',
    homepageLabelName: 'SPECTACLES',
    isEvent: true,
    nativeCategoryId: 'SPECTACLES_REPRESENTATIONS',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'SPECTACLES',
  },
  SPECTACLE_VENTE_DISTANCE: {
    appLabel: 'Spectacle vivant - vente à distance',
    categoryId: 'SPECTACLE',
    homepageLabelName: 'SPECTACLES',
    isEvent: false,
    nativeCategoryId: 'SPECTACLES_REPRESENTATIONS',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'SPECTACLES',
  },
  SUPPORT_PHYSIQUE_FILM: {
    appLabel: 'Support physique (DVD, Blu-ray...)',
    categoryId: 'FILM',
    homepageLabelName: 'FILMS',
    isEvent: false,
    nativeCategoryId: 'DVD_BLU_RAY',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
  SUPPORT_PHYSIQUE_MUSIQUE_CD: {
    appLabel: 'CD',
    categoryId: 'MUSIQUE_ENREGISTREE',
    homepageLabelName: 'MUSIQUE',
    isEvent: false,
    nativeCategoryId: 'CD',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'CD_VINYLE_MUSIQUE_EN_LIGNE',
  },
  SUPPORT_PHYSIQUE_MUSIQUE_VINYLE: {
    appLabel: 'Vinyles et autres supports',
    categoryId: 'MUSIQUE_ENREGISTREE',
    homepageLabelName: 'MUSIQUE',
    isEvent: false,
    nativeCategoryId: 'VINYLES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'CD_VINYLE_MUSIQUE_EN_LIGNE',
  },
  TELECHARGEMENT_LIVRE_AUDIO: {
    appLabel: 'Livre audio à télécharger',
    categoryId: 'LIVRE',
    homepageLabelName: 'PLATEFORME',
    isEvent: false,
    nativeCategoryId: 'LIVRES_NUMERIQUE_ET_AUDIO',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'LIVRES',
  },
  TELECHARGEMENT_MUSIQUE: {
    appLabel: 'Téléchargement de musique',
    categoryId: 'MUSIQUE_ENREGISTREE',
    homepageLabelName: 'MUSIQUE',
    isEvent: false,
    nativeCategoryId: 'MUSIQUE_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'CD_VINYLE_MUSIQUE_EN_LIGNE',
  },
  VISITE: {
    appLabel: 'Visite',
    categoryId: 'MUSEE',
    homepageLabelName: 'VISITES',
    isEvent: true,
    nativeCategoryId: 'VISITES_CULTURELLES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'MUSEES_VISITES_CULTURELLES',
  },
  VISITE_GUIDEE: {
    appLabel: 'Visite guidée',
    categoryId: 'MUSEE',
    homepageLabelName: 'VISITES',
    isEvent: true,
    nativeCategoryId: 'VISITES_CULTURELLES',
    onlineOfflinePlatform: 'OFFLINE',
    searchGroupName: 'MUSEES_VISITES_CULTURELLES',
  },
  VISITE_VIRTUELLE: {
    appLabel: 'Visite virtuelle',
    categoryId: 'MUSEE',
    homepageLabelName: 'VISITES',
    isEvent: false,
    nativeCategoryId: 'VISITES_CULTURELLES_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'MUSEES_VISITES_CULTURELLES',
  },
  VOD: {
    appLabel: 'Vidéo à la demande',
    categoryId: 'FILM',
    homepageLabelName: 'FILMS',
    isEvent: false,
    nativeCategoryId: 'FILMS_SERIES_EN_LIGNE',
    onlineOfflinePlatform: 'ONLINE',
    searchGroupName: 'FILMS_SERIES_CINEMA',
  },
}

export const useSearchGroupLabelMappingSnap = {
  ARTS_LOISIRS_CREATIFS: 'Arts & loisirs créatifs',
  BIBLIOTHEQUES_MEDIATHEQUE: 'Bibliothèques, Médiathèques',
  CARTES_JEUNES: 'Cartes jeunes',
  CD_VINYLE_MUSIQUE_EN_LIGNE: 'CD, vinyles, musique en ligne',
  CONCERTS_FESTIVALS: 'Concerts & festivals',
  RENCONTRES_CONFERENCES: 'Conférences & rencontres',
  EVENEMENTS_EN_LIGNE: 'Évènements en ligne',
  FILMS_SERIES_CINEMA: 'Cinéma, films et séries',
  INSTRUMENTS: 'Instruments de musique',
  JEUX_JEUX_VIDEOS: 'Jeux & jeux vidéos',
  LIVRES: 'Livres',
  MEDIA_PRESSE: 'Médias & presse',
  MUSEES_VISITES_CULTURELLES: 'Musées & visites culturelles',
  NONE: 'Toutes les catégories',
  SPECTACLES: 'Spectacles',
}

export const useCategoryHomeLabelMappingSnap = {
  ABO_BIBLIOTHEQUE: 'Livre',
  ABO_CONCERT: 'Concert',
  ABO_JEU_VIDEO: 'Jeux',
  ABO_LIVRE_NUMERIQUE: 'Livre',
  ABO_LUDOTHEQUE: 'Jeux',
  ABO_MEDIATHEQUE: 'Films',
  ABO_PLATEFORME_MUSIQUE: 'Musique',
  ABO_PLATEFORME_VIDEO: 'Films',
  ABO_PRATIQUE_ART: 'Beaux-Arts',
  ABO_PRESSE_EN_LIGNE: 'Médias',
  ABO_SPECTACLE: 'Spectacle',
  ACHAT_INSTRUMENT: 'Instrument',
  ACTIVATION_EVENT: null,
  ACTIVATION_THING: null,
  APP_CULTURELLE: 'Médias',
  ATELIER_PRATIQUE_ART: 'Beaux-Arts',
  AUTRE_SUPPORT_NUMERIQUE: 'Films',
  BON_ACHAT_INSTRUMENT: 'Instrument',
  CAPTATION_MUSIQUE: 'Musique',
  CARTE_CINE_ILLIMITE: 'Cinéma',
  CARTE_CINE_MULTISEANCES: 'Cinéma',
  CARTE_JEUNES: 'Carte jeunes',
  CARTE_MUSEE: 'Musée',
  CINE_PLEIN_AIR: 'Cinéma',
  CINE_VENTE_DISTANCE: 'Cinéma',
  CONCERT: 'Concert',
  CONCOURS: 'Jeux',
  CONFERENCE: 'Rencontres',
  DECOUVERTE_METIERS: 'Rencontres',
  ESCAPE_GAME: 'Jeux',
  EVENEMENT_CINE: 'Cinéma',
  EVENEMENT_JEU: 'Jeux',
  EVENEMENT_MUSIQUE: 'Concert',
  EVENEMENT_PATRIMOINE: 'Visites',
  FESTIVAL_ART_VISUEL: 'Festival',
  FESTIVAL_CINE: 'Cinéma',
  FESTIVAL_LIVRE: 'Livre',
  FESTIVAL_MUSIQUE: 'Festival',
  FESTIVAL_SPECTACLE: 'Spectacle',
  JEU_EN_LIGNE: 'Jeux',
  JEU_SUPPORT_PHYSIQUE: null,
  LIVESTREAM_EVENEMENT: 'Spectacle',
  LIVESTREAM_MUSIQUE: 'Musique',
  LIVESTREAM_PRATIQUE_ARTISTIQUE: 'Cours',
  LIVRE_AUDIO_PHYSIQUE: 'Livre',
  LIVRE_NUMERIQUE: 'Livre',
  LIVRE_PAPIER: 'Livre',
  LOCATION_INSTRUMENT: 'Instrument',
  MATERIEL_ART_CREATIF: 'Beaux-Arts',
  MUSEE_VENTE_DISTANCE: 'Musée',
  OEUVRE_ART: null,
  PARTITION: 'Instrument',
  PLATEFORME_PRATIQUE_ARTISTIQUE: 'Plateforme',
  PODCAST: 'Médias',
  PRATIQUE_ART_VENTE_DISTANCE: 'Beaux-Arts',
  RENCONTRE: 'Rencontres',
  RENCONTRE_EN_LIGNE: 'Rencontres',
  RENCONTRE_JEU: 'Jeux',
  SALON: 'Rencontres',
  SEANCE_CINE: 'Cinéma',
  SEANCE_ESSAI_PRATIQUE_ART: 'Beaux-Arts',
  SPECTACLE_ENREGISTRE: 'Spectacle',
  SPECTACLE_REPRESENTATION: 'Spectacle',
  SPECTACLE_VENTE_DISTANCE: 'Spectacle',
  SUPPORT_PHYSIQUE_FILM: 'Films',
  SUPPORT_PHYSIQUE_MUSIQUE_CD: 'Musique',
  SUPPORT_PHYSIQUE_MUSIQUE_VINYLE: 'Musique',
  TELECHARGEMENT_LIVRE_AUDIO: 'Plateforme',
  TELECHARGEMENT_MUSIQUE: 'Musique',
  VISITE: 'Visites',
  VISITE_GUIDEE: 'Visites',
  VISITE_VIRTUELLE: 'Visites',
  VOD: 'Films',
}

export const useGenreTypeMappingFixture = {
  [GenreType.BOOK]: [
    { name: 'Art', value: 'Art' },
    { name: 'Arts Culinaires', value: 'Arts Culinaires' },
    { name: 'Bandes dessinées', value: 'Bandes dessinées' },
    { name: 'Carrière/Concours', value: 'Carrière/Concours' },
    { name: 'Droit', value: 'Droit' },
    { name: 'Economie', value: 'Economie' },
    { name: 'Faits, temoignages', value: 'Faits, temoignages' },
    { name: 'Gestion/entreprise', value: 'Gestion/entreprise' },
    { name: 'Géographie, cartographie', value: 'Géographie, cartographie' },
    { name: 'Histoire', value: 'Histoire' },
    { name: 'Humour', value: 'Humour' },
    { name: 'Informatique', value: 'Informatique' },
    { name: 'Jeunesse', value: 'Jeunesse' },
    { name: 'Jeux', value: 'Jeux' },
    { name: 'Langue', value: 'Langue' },
    { name: 'Littérature Etrangère', value: 'Littérature Etrangère' },
    { name: 'Littérature Europééne', value: 'Littérature Europééne' },
    { name: 'Littérature française', value: 'Littérature française' },
    { name: 'Loisirs', value: 'Loisirs' },
    { name: 'Manga', value: 'Manga' },
    { name: 'Marketing et audio-visuel', value: 'Marketing et audio-visuel' },
    { name: 'Policier', value: 'Policier' },
    { name: 'Poèsie, théâtre et spectacle', value: 'Poèsie, théâtre et spectacle' },
    { name: 'Psychanalyse, psychologie', value: 'Psychanalyse, psychologie' },
    { name: 'Religions, spiritualitées', value: 'Religions, spiritualitées' },
    { name: 'Santé', value: 'Santé' },
    {
      name: 'Science-fiction, fantastique & terreur',
      value: 'Science-fiction, fantastique & terreur',
    },
    {
      name: 'Sciences Humaines, Encyclopédie, dictionnaire',
      value: 'Sciences Humaines, Encyclopédie, dictionnaire',
    },
    { name: 'Sciences, vie & Nature', value: 'Sciences, vie & Nature' },
    { name: 'Scolaire & Parascolaire', value: 'Scolaire & Parascolaire' },
    { name: 'Sexualité', value: 'Sexualité' },
    { name: 'Sociologie', value: 'Sociologie' },
    { name: 'Sport', value: 'Sport' },
    { name: 'Tourisme', value: 'Tourisme' },
    { name: 'Vie pratique', value: 'Vie pratique' },
  ],
  [GenreType.MUSIC]: [
    { name: 'Autre', value: 'Autre' },
    { name: 'Blues', value: 'Blues' },
    { name: 'Chansons / Variétés', value: 'Chansons / Variétés' },
    { name: 'Classique', value: 'Classique' },
    { name: 'Country', value: 'Country' },
    { name: 'Electro', value: 'Electro' },
    { name: 'Folk', value: 'Folk' },
    { name: 'Gospel', value: 'Gospel' },
    { name: 'Hip-Hop/Rap', value: 'Hip-Hop/Rap' },
    { name: 'Jazz', value: 'Jazz' },
    { name: 'Metal', value: 'Metal' },
    { name: 'Musique du Monde', value: 'Musique du Monde' },
    { name: 'Pop', value: 'Pop' },
    { name: 'Punk', value: 'Punk' },
    { name: 'Reggae', value: 'Reggae' },
    { name: 'Rock', value: 'Rock' },
  ],
  [GenreType.MOVIE]: [
    { name: 'ACTION', value: 'Action' },
    { name: 'ANIMATION', value: 'Animation' },
    { name: 'MARTIAL_ARTS', value: 'Arts martiaux' },
    { name: 'ADVENTURE', value: 'Aventure' },
    { name: 'BIOPIC', value: 'Biopic' },
    { name: 'BOLLYWOOD', value: 'Bollywood' },
    { name: 'COMEDY', value: 'Comédie' },
    { name: 'COMEDY_DRAMA', value: 'Comédie dramatique' },
    { name: 'MUSICAL', value: 'Comédie musicale' },
    { name: 'CONCERT', value: 'Concert' },
    { name: 'DIVERS', value: 'Divers' },
    { name: 'DOCUMENTARY', value: 'Documentaire' },
    { name: 'DRAMA', value: 'Drame' },
    { name: 'KOREAN_DRAMA', value: 'Drame coréen' },
    { name: 'SPY', value: 'Espionnage' },
    { name: 'EXPERIMENTAL', value: 'Expérimental' },
    { name: 'FAMILY', value: 'Familial' },
    { name: 'FANTASY', value: 'Fantastique' },
    { name: 'WARMOVIE', value: 'Guerre' },
    { name: 'HISTORICAL', value: 'Historique' },
    { name: 'HISTORICAL_EPIC', value: 'Historique-épique' },
    { name: 'HORROR', value: 'Horreur' },
    { name: 'JUDICIAL', value: 'Judiciaire' },
    { name: 'MUSIC', value: 'Musique' },
    { name: 'OPERA', value: 'Opéra' },
    { name: 'PERFORMANCE', value: 'Performance' },
    { name: 'DETECTIVE', value: 'Policier' },
    { name: 'ROMANCE', value: 'Romance' },
    { name: 'SCIENCE_FICTION', value: 'Science-fiction' },
    { name: 'SPORT_EVENT', value: 'Sport' },
    { name: 'THRILLER', value: 'Thriller' },
    { name: 'WESTERN', value: 'Western' },
    { name: 'EROTIC', value: 'Érotique' },
  ],
  [GenreType.SHOW]: [
    { name: 'Arts de la rue', value: 'Arts de la rue' },
    { name: 'Autre', value: 'Autre' },
    {
      name: 'Autre (spectacle sur glace, historique, aquatique, …)  ',
      value: 'Autre (spectacle sur glace, historique, aquatique, …)  ',
    },
    { name: 'Cirque', value: 'Cirque' },
    { name: 'Danse', value: 'Danse' },
    { name: 'Humour / Café-théâtre', value: 'Humour / Café-théâtre' },
    { name: 'Opéra', value: 'Opéra' },
    { name: 'Pluridisciplinaire', value: 'Pluridisciplinaire' },
    { name: 'Spectacle Jeunesse', value: 'Spectacle Jeunesse' },
    {
      name: 'Spectacle Musical / Cabaret / Opérette',
      value: 'Spectacle Musical / Cabaret / Opérette',
    },
    { name: 'Théâtre', value: 'Théâtre' },
  ],
}
