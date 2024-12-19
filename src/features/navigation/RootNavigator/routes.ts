import { Artist } from 'features/artist/pages/Artist'
import { ForgottenPassword } from 'features/auth/pages/forgottenPassword/ForgottenPassword/ForgottenPassword'
import { ReinitializePassword } from 'features/auth/pages/forgottenPassword/ReinitializePassword/ReinitializePassword'
import { ResetPasswordEmailSent } from 'features/auth/pages/forgottenPassword/ResetPasswordEmailSent/ResetPasswordEmailSent'
import { ResetPasswordExpiredLink } from 'features/auth/pages/forgottenPassword/ResetPasswordExpiredLink/ResetPasswordExpiredLink'
import { Login } from 'features/auth/pages/login/Login'
import { AccountCreated } from 'features/auth/pages/signup/AccountCreated/AccountCreated'
import { AfterSignupEmailValidationBuffer } from 'features/auth/pages/signup/AfterSignupEmailValidationBuffer/AfterSignupEmailValidationBuffer'
import { NotYetUnderageEligibility } from 'features/auth/pages/signup/NotYetUnderageEligibility/NotYetUnderageEligibility'
import { SignupConfirmationEmailSentPage } from 'features/auth/pages/signup/SignupConfirmationEmailSent/SignupConfirmationEmailSentPage'
import { SignupConfirmationExpiredLink } from 'features/auth/pages/signup/SignupConfirmationExpiredLink/SignupConfirmationExpiredLink'
import { SignupForm } from 'features/auth/pages/signup/SignupForm'
import { VerifyEligibility } from 'features/auth/pages/signup/VerifyEligiblity/VerifyEligibility'
import { AccountReactivationSuccess } from 'features/auth/pages/suspendedAccount/AccountReactivationSuccess/AccountReactivationSuccess'
import { AccountStatusScreenHandler } from 'features/auth/pages/suspendedAccount/AccountStatusScreenHandler/AccountStatusScreenHandler'
import { FraudulentSuspendedAccount } from 'features/auth/pages/suspendedAccount/FraudulentSuspendedAccount/FraudulentSuspendedAccount'
import { SuspendedAccountUponUserRequest } from 'features/auth/pages/suspendedAccount/SuspendedAccountUponUserRequest/SuspendedAccountUponUserRequest'
import { EighteenBirthday } from 'features/birthdayNotifications/pages/EighteenBirthday'
import { RecreditBirthdayNotification } from 'features/birthdayNotifications/pages/RecreditBirthdayNotification'
import { BookingDetails } from 'features/bookings/pages/BookingDetails/BookingDetails'
import { EndedBookings } from 'features/bookings/pages/EndedBookings/EndedBookings'
import { BookingConfirmation } from 'features/bookOffer/pages/BookingConfirmation'
import { withAsyncErrorBoundary } from 'features/errors/hocs/withAsyncErrorBoundary'
import { BannedCountryError } from 'features/errors/pages/BannedCountryError'
import { FavoritesSorts } from 'features/favorites/pages/FavoritesSorts'
import { ThematicHome } from 'features/home/pages/ThematicHome'
import { DeeplinksGenerator } from 'features/internal/marketingAndCommunication/pages/DeeplinksGenerator'
import { UTMParameters } from 'features/internal/marketingAndCommunication/pages/UTMParameters'
import { PageNotFound } from 'features/navigation/pages/PageNotFound'
import { accessibilityRoutes } from 'features/navigation/RootNavigator/accessibilityRoutes'
import { cheatcodeRoutes } from 'features/navigation/RootNavigator/cheatcodeRoutes'
import { culturalSurveyRoutes } from 'features/navigation/RootNavigator/culturalSurveyRoutes'
import { tutorialRoutes } from 'features/navigation/RootNavigator/onboardingRoutes'
import { subscriptionRoutes } from 'features/navigation/RootNavigator/subscriptionRoutes'
import { trustedDeviceRoutes } from 'features/navigation/RootNavigator/trustedDeviceRoutes'
import { screenParamsParser, screenParamsStringifier } from 'features/navigation/screenParamsUtils'
import { tabNavigatorPathConfig } from 'features/navigation/TabBar/routes'
import { TabNavigator } from 'features/navigation/TabBar/TabNavigator'
import { Offer } from 'features/offer/pages/Offer/Offer'
import { OfferPreview } from 'features/offer/pages/OfferPreview/OfferPreview'
import { Achievements } from 'features/profile/pages/Achievements/Achievements'
import { ChangeCity } from 'features/profile/pages/ChangeCity/ChangeCity'
import { ChangeEmail } from 'features/profile/pages/ChangeEmail/ChangeEmail'
import { ChangeEmailExpiredLink } from 'features/profile/pages/ChangeEmail/ChangeEmailExpiredLink'
import { ChangeEmailSetPassword } from 'features/profile/pages/ChangeEmailSetPassword/ChangeEmailSetPassword'
import { ChangePassword } from 'features/profile/pages/ChangePassword'
import { ChangeStatus } from 'features/profile/pages/ChangeStatus/ChangeStatus'
import { ConfirmChangeEmail } from 'features/profile/pages/ConfirmChangeEmail/ConfirmChangeEmail'
import { ConsentSettings } from 'features/profile/pages/ConsentSettings/ConsentSettings'
import { ConfirmDeleteProfile } from 'features/profile/pages/DeleteProfile/ConfirmDeleteProfile'
import { DeactivateProfileSuccess } from 'features/profile/pages/DeleteProfile/DeactivateProfileSuccess'
import { DeleteProfileAccountHacked } from 'features/profile/pages/DeleteProfile/DeleteProfileAccountHacked'
import { DeleteProfileAccountNotDeletable } from 'features/profile/pages/DeleteProfile/DeleteProfileAccountNotDeletable'
import { DeleteProfileConfirmation } from 'features/profile/pages/DeleteProfile/DeleteProfileConfirmation'
import { DeleteProfileContactSupport } from 'features/profile/pages/DeleteProfile/DeleteProfileContactSupport'
import { DeleteProfileEmailHacked } from 'features/profile/pages/DeleteProfile/DeleteProfileEmailHacked'
import { DeleteProfileSuccess } from 'features/profile/pages/DeleteProfile/DeleteProfileSuccess'
import { SuspendAccountConfirmationWithoutAuthentication } from 'features/profile/pages/DeleteProfile/SuspendAccountConfirmationWithoutAuthentication'
import { DeleteProfileReason } from 'features/profile/pages/DeleteProfileReason/DeleteProfileReason'
import { FeedbackInApp } from 'features/profile/pages/FeedbackInApp/FeedbackInApp'
import { LegalNotices } from 'features/profile/pages/LegalNotices/LegalNotices'
import { NewEmailSelection } from 'features/profile/pages/NewEmailSelection/NewEmailSelection'
import { NotificationsSettings } from 'features/profile/pages/NotificationSettings/NotificationsSettings'
import { PersonalData } from 'features/profile/pages/PersonalData/PersonalData'
import { SuspendAccountConfirmation } from 'features/profile/pages/SuspendAccountConfirmation/SuspendAccountConfirmation'
import { TrackEmailChange } from 'features/profile/pages/TrackEmailChange/TrackEmailChange'
import { ValidateEmailChange } from 'features/profile/pages/ValidateEmailChange/ValidateEmailChange'
import { SearchFilter } from 'features/search/pages/SearchFilter/SearchFilter'
import { OnboardingSubscription } from 'features/subscription/page/OnboardingSubscription'
import { ProfileTutorialAgeInformation } from 'features/tutorial/pages/profileTutorial/ProfileTutorialAgeInformation'
import { Venue } from 'features/venue/pages/Venue/Venue'
import { VenuePreviewCarousel } from 'features/venue/pages/VenuePreviewCarousel/VenuePreviewCarousel'
import { VenueMap } from 'features/venueMap/pages/VenueMap/VenueMap'
import { ABTestingPOC } from 'libs/firebase/remoteConfig/ABTestingPOC'

import { RootRoute } from './types'

export const routes: RootRoute[] = [
  ...accessibilityRoutes,
  ...culturalSurveyRoutes,
  ...tutorialRoutes,
  ...subscriptionRoutes,
  ...trustedDeviceRoutes,
  ...cheatcodeRoutes,
  {
    name: 'Offer',
    component: Offer,
    pathConfig: {
      path: 'offre/:id',
      deeplinkPaths: ['offer/:id', 'offre', 'offer'],
      parse: screenParamsParser['Offer'],
    },
    options: { title: 'Offre' },
  },
  {
    name: 'OfferPreview',
    component: OfferPreview,
    pathConfig: {
      path: 'offre/:id/apercu',
      deeplinkPaths: ['offer/:id/apercu', 'offre/apercu', 'offer/apercu'],
      parse: screenParamsParser['OfferPreview'],
    },
    options: { title: 'Aperçu de l’offre' },
  },
  {
    name: 'BookingDetails',
    component: BookingDetails,
    pathConfig: {
      path: 'reservation/:id/details',
      deeplinkPaths: ['booking/:id/details'],
      parse: screenParamsParser['BookingDetails'],
    },
    secure: true,
  },
  {
    name: 'BookingConfirmation',
    component: BookingConfirmation,
    pathConfig: {
      path: 'reservation/:offerId/confirmation',
      deeplinkPaths: ['booking/:offerId/confirmation'],
      parse: screenParamsParser['BookingConfirmation'],
    },
    options: { title: 'Confirmation de réservation' },
    secure: true,
  },
  {
    name: 'EighteenBirthday',
    component: EighteenBirthday,
    path: 'anniversaire-18-ans',
    deeplinkPaths: ['eighteen'],
    options: { title: 'Anniversaire 18 ans' },
  },
  {
    name: 'RecreditBirthdayNotification',
    component: RecreditBirthdayNotification,
    path: 'recharge-credit-anniversaire',
    deeplinkPaths: ['recredit-birthday'],
    options: { title: 'Notification rechargement anniversaire' },
  },
  {
    name: 'PageNotFound',
    component: PageNotFound,
    path: '*',
    options: { title: 'Page introuvable' },
  },
  {
    name: 'AccountCreated',
    component: AccountCreated,
    path: 'creation-compte/confirmation',
    options: { title: 'Compte créé\u00a0!' },
  },
  {
    name: 'ConfirmChangeEmail',
    component: ConfirmChangeEmail,
    path: 'changement-email/confirmation',
    options: { title: 'Confirmation de changement d’email ' },
  },
  {
    name: 'ValidateEmailChange',
    component: ValidateEmailChange,
    path: 'changement-email/validation',
    options: { title: 'Confirmation de changement d’email ' },
  },
  {
    name: 'AfterSignupEmailValidationBuffer',
    component: AfterSignupEmailValidationBuffer,
    pathConfig: {
      path: 'signup-confirmation',
      deeplinkPaths: ['creation-compte/validation-email'],
      parse: screenParamsParser['AfterSignupEmailValidationBuffer'],
    },
  },
  {
    name: 'BannedCountryError',
    component: BannedCountryError,
    hoc: withAsyncErrorBoundary,
    path: 'erreur-pays',
  },
  {
    name: 'ChangeEmailExpiredLink',
    component: ChangeEmailExpiredLink,
    path: 'lien-modification-email-expire',
    options: { title: 'Lien de modification de l’email expiré' },
  },
  {
    name: 'ConsentSettings',
    component: ConsentSettings,
    path: 'profil/confidentialite',
    options: { title: 'Paramètres de confidentialité' },
  },
  {
    name: 'EndedBookings',
    component: EndedBookings,
    path: 'reservations-terminees',
    options: { title: 'Réservations terminées' },
    secure: true,
  },
  {
    name: 'FavoritesSorts',
    component: FavoritesSorts,
    path: 'favoris/tri',
    options: { title: 'Tri des favoris' },
    secure: true,
  },
  {
    name: 'ForgottenPassword',
    component: ForgottenPassword,
    path: 'mot-de-passe-oublie',
    options: { title: 'Mot de passe oublié' },
  },
  {
    name: 'LegalNotices',
    component: LegalNotices,
    path: 'notices-legales',
    options: { title: 'Informations légales' },
  },
  {
    name: 'AccountStatusScreenHandler',
    component: AccountStatusScreenHandler,
    path: 'compte-desactive',
    options: { title: 'Compte désactivé' },
  },
  {
    name: 'SuspendedAccountUponUserRequest',
    component: SuspendedAccountUponUserRequest,
    path: 'compte-suspendu-a-la-demande',
    options: { title: 'Compte désactivé' },
  },
  {
    name: 'FraudulentSuspendedAccount',
    component: FraudulentSuspendedAccount,
    path: 'compte-suspendu-pour-fraude',
    options: { title: 'Compte suspendu' },
  },
  {
    name: 'AccountReactivationSuccess',
    component: AccountReactivationSuccess,
    path: 'compte-reactive',
    options: { title: 'Compte réactivé' },
    secure: true,
  },
  {
    name: 'DeleteProfileReason',
    component: DeleteProfileReason,
    path: 'profil/suppression/raison',
    options: { title: 'Raison de suppression de compte' },
    secure: true,
  },
  {
    name: 'DeleteProfileContactSupport',
    component: DeleteProfileContactSupport,
    path: 'profil/suppression/support',
    options: { title: 'Contact support' },
    secure: true,
  },
  {
    name: 'DeleteProfileEmailHacked',
    component: DeleteProfileEmailHacked,
    path: 'profil/suppression/email-pirate',
    options: { title: 'Sécurise ton compte' },
    secure: true,
  },
  {
    name: 'DeleteProfileAccountHacked',
    component: DeleteProfileAccountHacked,
    path: 'profil/suppression/compte-pirate',
    options: { title: 'Sécurise ton compte' },
    secure: true,
  },
  {
    name: 'DeleteProfileAccountNotDeletable',
    component: DeleteProfileAccountNotDeletable,
    path: 'profil/suppression/information',
    options: { title: 'Compte non supprimable' },
    secure: true,
  },
  {
    name: 'SuspendAccountConfirmationWithoutAuthentication',
    component: SuspendAccountConfirmationWithoutAuthentication,
    path: 'profile/suppression/demande-confirmation',
    options: { title: 'Suppression profil confirmation' },
    secure: true,
  },
  {
    name: 'ConfirmDeleteProfile',
    component: ConfirmDeleteProfile,
    path: 'profil/suppression',
    options: { title: 'Suppression de compte' },
    secure: true,
  },
  {
    name: 'FeedbackInApp',
    component: FeedbackInApp,
    path: 'profil/formulaire-suggestion',
    options: { title: 'Forumulaire de suggestion' },
    secure: true,
  },
  {
    name: 'DeleteProfileConfirmation',
    component: DeleteProfileConfirmation,
    path: 'profile/suppression/confirmation',
    options: { title: 'Suppression profil confirmation' },
  },
  {
    name: 'DeactivateProfileSuccess',
    component: DeactivateProfileSuccess,
    path: 'profile/desactivation/succes',
    options: { title: 'Désactivation profil confirmée' },
  },
  {
    name: 'DeleteProfileSuccess',
    component: DeleteProfileSuccess,
    path: 'profile/suppression/succes',
    options: { title: 'Suppression profil confirmée' },
  },
  {
    name: 'Login',
    component: Login,
    pathConfig: {
      path: 'connexion',
      parse: screenParamsParser['Login'],
    },
    options: { title: 'Connexion' },
  },
  {
    name: 'NotificationsSettings',
    component: NotificationsSettings,
    path: 'profil/notifications',
    options: { title: 'Réglages de notifications' },
  },
  {
    name: 'PersonalData',
    component: PersonalData,
    path: 'profil/donnees-personnelles',
    options: { title: 'Mes informations personnelles' },
    secure: true,
  },
  {
    name: 'OnboardingSubscription',
    component: OnboardingSubscription,
    path: 'choix-abonnement',
    options: { title: 'Choix des thèmes à suivre' },
    secure: true,
  },
  {
    name: 'ChangeStatus',
    component: ChangeStatus,
    path: 'profil/modification-statut',
    options: { title: 'Ton statut | Profil' },
    secure: true,
  },
  {
    name: 'ChangeCity',
    component: ChangeCity,
    path: 'profil/modification-ville',
    options: { title: 'Ton code postal | Profil' },
    secure: true,
  },
  {
    name: 'ChangeEmail',
    component: ChangeEmail,
    path: 'profil/modification-email',
    options: { title: 'Modification de l’e-mail' },
  },
  {
    name: 'TrackEmailChange',
    component: TrackEmailChange,
    path: 'profil/suivi-modification-email',
    options: { title: 'Suivi de ton changement d’e-mail' },
    secure: true,
  },
  {
    name: 'ChangeEmailSetPassword',
    component: ChangeEmailSetPassword,
    path: 'profil/creation-mot-de-passe',
    options: { title: 'Création du mot de passe' },
    secure: true,
  },
  {
    name: 'NewEmailSelection',
    component: NewEmailSelection,
    path: 'profil/nouvelle-adresse-email',
    options: { title: 'Nouvelle adresse e-mail' },
    secure: true,
  },
  {
    name: 'ChangePassword',
    component: ChangePassword,
    path: 'profil/modification-mot-de-passe',
    options: { title: 'Modification du mot de passe' },
  },
  {
    name: 'ReinitializePassword',
    component: ReinitializePassword,
    pathConfig: {
      path: 'mot-de-passe-perdu',
      parse: screenParamsParser['ReinitializePassword'],
    },
    options: { title: 'Réinitialiser le mot de passe' },
  },
  {
    name: 'ResetPasswordEmailSent',
    component: ResetPasswordEmailSent,
    path: 'email-modification-mot-de-passe-envoye',
    options: { title: 'Email modification mot de passe envoyé' },
  },
  {
    name: 'ResetPasswordExpiredLink',
    component: ResetPasswordExpiredLink,
    path: 'email-modification-mot-de-passe-expire',
    options: { title: 'Email modification mot de passe expiré' },
  },
  {
    name: 'SuspendAccountConfirmation',
    component: SuspendAccountConfirmation,
    path: 'suspension-compte/confirmation',
    options: { title: 'Suspension de compte' },
  },
  {
    name: 'SearchFilter',
    component: SearchFilter,
    pathConfig: {
      path: 'recherche/filtres',
      parse: screenParamsParser['SearchFilter'],
      stringify: screenParamsStringifier['SearchFilter'],
    },
    options: { title: 'Filtres de recherche' },
  },
  {
    name: 'SignupForm',
    component: SignupForm,
    path: 'creation-compte',
    deeplinkPaths: ['creation-compte/email'],
    options: { title: 'Création de compte' },
  },
  {
    name: 'SignupConfirmationEmailSent',
    component: SignupConfirmationEmailSentPage,
    path: 'email-confirmation-creation-compte/envoye',
    options: { title: 'Email création de compte envoyé' },
  },
  {
    name: 'SignupConfirmationExpiredLink',
    component: SignupConfirmationExpiredLink,
    path: 'email-confirmation-creation-compte/expire',
    options: { title: 'Email création de compte expiré' },
  },
  { name: 'TabNavigator', component: TabNavigator, pathConfig: tabNavigatorPathConfig },
  {
    name: 'VerifyEligibility',
    component: VerifyEligibility,
    path: 'verification-eligibilite',
    options: { title: 'Vérification éligibilité' },
  },
  {
    name: 'NotYetUnderageEligibility',
    component: NotYetUnderageEligibility,
    path: 'cest-pour-bientot',
    options: { title: 'C’est pour bientôt' },
  },
  {
    name: 'Tutorial',
    component: ProfileTutorialAgeInformation,
    path: 'comment-ca-marche',
    options: { title: 'Tutoriel "Comment ça marche"' },
  },
  {
    name: 'Venue',
    component: Venue,
    pathConfig: {
      path: 'lieu/:id',
      deeplinkPaths: ['venue/:id'],
      parse: screenParamsParser['Venue'],
    },
    options: { title: 'Lieu' },
  },
  {
    name: 'VenueMap',
    component: VenueMap,
    path: 'carte-des-lieux',
    options: { title: 'Carte des lieux' },
  },

  {
    name: 'VenuePreviewCarousel',
    component: VenuePreviewCarousel,
    pathConfig: {
      path: 'lieu/:id/apercu',
      deeplinkPaths: ['venue/:id/apercu', 'lieu/apercu', 'venue/apercu'],
      parse: screenParamsParser['VenuePreviewCarousel'],
    },
    options: { title: 'Aperçu du lieu' },
  },
  {
    name: 'Artist',
    component: Artist,
    path: 'artiste/:fromOfferId',
    deeplinkPaths: ['artist/:fromOfferId'],
    options: { title: 'Artiste' },
  },
  // Internals
  {
    name: 'DeeplinksGenerator',
    component: DeeplinksGenerator,
    pathConfig: {
      path: 'liens/generateur',
    },
    options: { title: 'Générateur de lien' },
  },
  {
    name: 'UTMParameters',
    component: UTMParameters,
    pathConfig: {
      path: 'liens/utm',
    },
    options: { title: 'Paramètres UTM' },
  },
  {
    name: 'ABTestingPOC',
    component: ABTestingPOC,
    pathConfig: {
      path: 'ab-testing-poc',
    },
    options: { title: 'POC A/B Testing' },
  },
  {
    name: 'ThematicHome',
    component: ThematicHome,
    pathConfig: {
      path: 'accueil-thematique',
      deeplinkPaths: ['thematic-home'],
      parse: screenParamsParser['ThematicHome'],
    },
    options: { title: 'Page d’accueil thématique' },
  },
  {
    name: 'Achievements',
    component: Achievements,
    path: 'profile/achievements',
  },
]
