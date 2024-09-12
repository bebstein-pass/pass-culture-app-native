import * as yup from 'yup'

export const EnvironmentSchema = yup.object({
  ACCESSIBILITY_LINK: yup.string().required(),
  ALGOLIA_APPLICATION_ID: yup.string().required(),
  ALGOLIA_OFFERS_INDEX_NAME: yup.string().required(),
  ALGOLIA_OFFERS_INDEX_NAME_B: yup.string().required(),
  ALGOLIA_SEARCH_API_PUBLIC_KEY: yup.string().required(),
  ALGOLIA_TOP_OFFERS_INDEX_NAME: yup.string().required(),
  ALGOLIA_VENUES_INDEX_NAME: yup.string().required(),
  ALGOLIA_SUGGESTIONS_INDEX_NAME: yup.string().required(),
  ALGOLIA_VENUES_INDEX_PLAYLIST_SEARCH_NEWEST: yup.string().required(),
  ALGOLIA_VENUES_INDEX_PLAYLIST_SEARCH: yup.string().required(),
  AMPLITUDE_API_PUBLIC_KEY: yup.string().required(),
  ANDROID_APP_ID: yup.string().required(),
  API_BASE_URL: yup.string().ensure(), // Set to empty string in __DEV__ (see src/libs/environment/env.web.ts)
  APPLE_STORE_URL: yup.string().required(),
  APPS_FLYER_DEV_PUBLIC_KEY: yup.string().required(),
  BOOKING_FEEDBACK_LINK: yup.string().required(),
  BOOKING_LIMIT_EXCEEDED_URL: yup.string().required(),
  CGU_LINK: yup.string().required(),
  CONTENTFUL_PUBLIC_ACCESS_TOKEN: yup.string().required(),
  CONTENTFUL_ENVIRONMENT: yup.string().required(),
  CONTENTFUL_SPACE_ID: yup.string().required(),
  COOKIES_POLICY_LINK: yup.string().required(),
  CULTURAL_SURVEY_TYPEFORM_ID: yup.string().required(),
  DATA_PRIVACY_CHART_LINK: yup.string().required(),
  DOC_CGU_URL: yup.string().required(),
  DOC_PERSONAL_DATA_URL: yup.string().required(),
  DMS_FRENCH_CITIZEN_URL: yup.string().required(),
  DMS_FOREIGN_CITIZEN_URL: yup.string().required(),
  EDUCONNECT_ALLOWED_DOMAIN: yup.string().required(),
  ENV: yup.string().required(),
  FAQ_LINK: yup.string().required(),
  FAQ_LINK_CREDIT: yup.string().required(),
  FAQ_LINK_DELETE_ACCOUNT: yup.string().required(),
  FAQ_LINK_EDUCONNECT_URL: yup.string().required(),
  FAQ_LINK_PERSONAL_DATA: yup.string().required(),
  FAQ_LINK_RESET_PASSORD_EMAIL_NOT_RECEIVED: yup.string().required(),
  FAQ_LINK_SIGNUP_CONFIRMATION_EMAIL_NOT_RECEIVED: yup.string().required(),
  FEATURE_FLIPPING_ONLY_VISIBLE_ON_TESTING: yup.boolean().required(),
  FIREBASE_API_PUBLIC_KEY: yup.string().required(),
  FIREBASE_APPID: yup.string().required(),
  FIREBASE_AUTHDOMAIN: yup.string().required(),
  FIREBASE_DYNAMIC_LINK_DOMAIN: yup.string().required(),
  FIREBASE_MESSAGINGSENDERID: yup.string().required(),
  FIREBASE_PROJECTID: yup.string().required(),
  FIREBASE_STORAGEBUCKET: yup.string().required(),
  GCP_IMAGE_COULD_STORAGE_NAME: yup.string().required(),
  GOOGLE_CLIENT_ID: yup.string().required(),
  GOOGLE_IOS_CLIENT_ID: yup.string().required(),
  GOOGLE_IOS_REVERSED_CLIENT_ID: yup.string().required(),
  GOOGLE_PLAY_STORE_URL: yup.string().required(),
  IOS_APP_ID: yup.string().required(),
  IOS_APP_STORE_ID: yup.string().required(),
  PASSCULTURE_DOWNLOAD_APP_URL: yup.string().required(),
  PRIVACY_POLICY_LINK: yup.string().required(),
  RESIZE_IMAGE_ON_DEMAND_URL: yup.string().required(),
  SENTRY_DSN: yup.string().required(),
  SENTRY_PROFILES_SAMPLE_RATE: yup.string().required(),
  SENTRY_TRACES_SAMPLE_RATE: yup.string().required(),
  SITE_PUBLIC_KEY: yup.string().required(),
  SUPPORT_EMAIL_ADDRESS: yup.string().required(),
  FRAUD_EMAIL_ADDRESS: yup.string().required(),
  URL_PREFIX: yup.string().required(),
  WEBAPP_V2_DOMAIN: yup.string().required(),
  // Below envs are injected by vite and are defined only on the Webapp
  COMMIT_HASH: yup.string().optional(),
  PUBLIC_URL: yup.string().optional(),
})
export type Environment = yup.InferType<typeof EnvironmentSchema>
