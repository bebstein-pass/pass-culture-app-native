export enum RemoteStoreCollections {
  APPLICATION_VERSIONS = 'applicationVersions',
  COOKIES_LAST_UPDATE = 'cookiesLastUpdate',
  FEATURE_FLAGS = 'featureFlags',
  MAINTENANCE = 'maintenance',
  UBBLE = 'ubble',
}

export enum RemoteStoreDocuments {
  COOKIES_LAST_UPDATE_BUILD_VERSION = 'buildVersion',
  COOKIES_LAST_UPDATE_DATE = 'lastUpdated',
  MAINTENANCE_IS_ON = 'maintenanceIsOn',
  MAINTENANCE_MESSAGE = 'message',
  MINIMAL_BUILD_NUMBER = 'minimalBuildNumber',
  UBBLE_ETA_MESSAGE = 'etaMessage',
}

export enum RemoteStoreFeatureFlags {
  DISABLE_OLD_CHANGE_EMAIL = 'disableOldChangeEmail',
  ENABLE_MUSIC_LIVE_BOOKING_SURVEY = 'enableMusicLiveBookingSurvey',
  FAKE_DOOR_ARTIST = 'fakeDoorArtist',
  WIP_APP_V2_BUSINESS_BLOCK = 'wipAppV2BusinessBlock',
  WIP_APP_V2_CATEGORY_BLOCK = 'wipAppV2CategoryBlock',
  WIP_APP_V2_CIRCLE_NAV_BUTTONS = 'wipAppV2CircleNavButtons',
  WIP_APP_V2_LOCATION_WIDGET = 'wipAppV2LocationWidget',
  WIP_APP_V2_SEARCH_LANDING_HEADER = 'wipAppV2SearchLandingHeader',
  WIP_APP_V2_MULTI_VIDEO_MODULE = 'wipAppV2MultiVideoModule',
  WIP_APP_V2_SEARCH_CATEGORY_BLOCK = 'wipAppV2SearchCategoryBlock',
  WIP_APP_V2_SYSTEM_BLOCK = 'wipAppV2SystemBlock',
  WIP_APP_V2_TAB_BAR = 'wipAppV2TabBar',
  WIP_APP_V2_THEMATIC_HOME_HEADER = 'wipAppV2ThematicHomeHeader',
  WIP_APP_V2_VENUE_LIST = 'wipAppV2VenueList',
  WIP_APP_V2_VENUE_MAP_BLOCK = 'wipAppV2VenueMapBlock',
  WIP_APP_V2_VIDEO_9_16 = 'wipAppV2Video9:16',
  WIP_APP_V2_VIDEO_710_WEB = 'wipAppV2Video710Web',
  WIP_BOOKING_IMPROVE = 'wipBookingImprove',
  WIP_CINEMA_OFFER_VENUE_BLOCK = 'wipCinemaOfferVenueBlock',
  WIP_DISABLE_STORE_REVIEW = 'wipDisabledStoreReview',
  WIP_DISPLAY_SEARCH_NB_FACET_RESULTS = 'wipDisplaySearchNbFacetResults',
  WIP_ENABLE_ACCES_LIBRE = 'wipEnableAccesLibre',
  WIP_ENABLE_EMAIL_VALIDATION_RESEND = 'wipEnableEmailValidationResend',
  WIP_ENABLE_GOOGLE_SSO = 'wipEnableGoogleSSO',
  WIP_ENABLE_GTL_PLAYLISTS_IN_BOOKSTORE_VENUES = 'wipEnableGTLPlaylistsInBookstoreVenues',
  WIP_ENABLE_NEW_CHANGE_EMAIL = 'wipEnableNewChangeEmail',
  WIP_ENABLE_NEW_XP_CINE_FROM_VENUE = 'wipEnableNewXpCineFromVenue',
  WIP_PAGE_SEARCH_N1 = 'wipPageSearchN1',
  WIP_NEW_HIGHLIGHT_THEMATIC_MODULE = 'wipNewHighlightThematicModule',
  WIP_NEW_HOME_MODULE_SIZES = 'wipNewHomeModuleSizes',
  WIP_NEW_MAPPING_BOOKS = 'wipNewMappingBooks',
  WIP_NEW_OFFER_TILE = 'wipNewOfferTile',
  WIP_REACTION_FAKE_DOOR = 'wipReactionFakeDoor',
  WIP_REACTION_FEATURE = 'wipReactionFeature',
  WIP_SAME_ARTIST_PLAYLIST = 'wipSameArtistPlaylist',
  WIP_SEARCH_ACCESSIBILITY_FILTER = 'wipSearchAccessibilityFilter',
  WIP_STEPPER_RETRY_UBBLE = 'wipStepperRetryUbble',
  WIP_VENUE_MAP = 'wipVenueMap',
  WIP_OFFERS_IN_BOTTOM_SHEET = 'wipOffersInBottomSheet',
  WIP_VENUE_MAP_IN_SEARCH = 'wipVenueMapInSearch',
  WIP_ENABLE_DYNAMIC_OPENING_HOURS = 'wipEnableDynamicOpeningHours',
  WIP_NEW_EXCLUSIVITY_MODULE = 'wipNewExclusivityModule',
  TARGET_XP_CINE_FROM_OFFER = 'targetXpCineFromOffer',
  WIP_ARTIST_PAGE = 'wipArtistPage',
}
