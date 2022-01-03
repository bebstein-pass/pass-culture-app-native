import { analytics as actualAnalytics } from '../analytics'

export const analytics: typeof actualAnalytics = {
  disableCollection: jest.fn(),
  enableCollection: jest.fn(),
  setDefaultEventParameters: jest.fn(),
  logAllModulesSeen: jest.fn(),
  logAllTilesSeen: jest.fn(),
  logBackToHomeFromEduconnectError: jest.fn(),
  logBookingConfirmation: jest.fn(),
  logBookingDetailsScrolledToBottom: jest.fn(),
  logBookingError: jest.fn(),
  logBookingImpossibleiOS: jest.fn(),
  logBookingOfferConfirmDates: jest.fn(),
  logBookingProcessStart: jest.fn(),
  logBookingsScrolledToBottom: jest.fn(),
  logCampaignTrackerEnabled: jest.fn(),
  logCancelBooking: jest.fn(),
  logCancelSignup: jest.fn(),
  logChooseEduConnectMethod: jest.fn(),
  logChooseUbbleMethod: jest.fn(),
  logClickBookOffer: jest.fn(),
  logClickBusinessBlock: jest.fn(),
  logClickExclusivityBlock: jest.fn(),
  logClickSeeMore: jest.fn(),
  logClickSocialNetwork: jest.fn(),
  logConfirmBookingCancellation: jest.fn(),
  logConfirmQuitIdentityCheck: jest.fn(),
  logConsultAccessibility: jest.fn(),
  logConsultAvailableDates: jest.fn(),
  logConsultDescriptionDetails: jest.fn(),
  logConsultDisclaimerValidationMail: jest.fn(),
  logConsultHome: jest.fn(),
  logConsultItinerary: jest.fn(),
  logConsultOffer: jest.fn(),
  logConsultVenue: jest.fn(),
  logConsultWholeOffer: jest.fn(),
  logConsultWhyAnniversary: jest.fn(),
  logConsultWithdrawal: jest.fn(),
  logContinueIdentityCheck: jest.fn(),
  logProblemWithLink: jest.fn(),
  logDiscoverOffers: jest.fn(),
  logHasActivateGeolocFromTutorial: jest.fn(),
  logHasAddedOfferToFavorites: jest.fn(),
  logHasAppliedFavoritesSorting: jest.fn(),
  logHasChangedPassword: jest.fn(),
  logHasRefusedCookie: jest.fn(),
  logHasSkippedTutorial: jest.fn(),
  logHelpCenterContactSignupConfirmationEmailSent: jest.fn(),
  logIdentityCheckStep: jest.fn(),
  logIdentityCheckAbort: jest.fn(),
  logIdentityCheckSuccess: jest.fn(),
  logLocationToggle: jest.fn(),
  logLogin: jest.fn(),
  logLogout: jest.fn(),
  logMailTo: jest.fn(),
  logModifyMail: jest.fn(),
  logNoSearchResult: jest.fn(),
  logNotificationToggle: jest.fn(),
  logOfferSeenDuration: jest.fn(),
  logOpenDMSForeignCitizenURL: jest.fn(),
  logOpenDMSFrenchCitizenURL: jest.fn(),
  logOpenExternalUrl: jest.fn(),
  logOpenLocationSettings: jest.fn(),
  logOpenNotificationSettings: jest.fn(),
  logProfilScrolledToBottom: jest.fn(),
  logProfilSignUp: jest.fn(),
  logQuitAuthenticationMethodSelection: jest.fn(),
  logQuitIdentityCheck: jest.fn(),
  logRecommendationModuleSeen: jest.fn(),
  logReinitializeFilters: jest.fn(),
  logResendEmailResetPasswordExpiredLink: jest.fn(),
  logResendEmailSignupConfirmationExpiredLink: jest.fn(),
  logScreenView: jest.fn(),
  logSearchQuery: jest.fn(),
  logSearchScrollToPage: jest.fn(),
  logSeeMyBooking: jest.fn(),
  logSelectSchool: jest.fn(),
  logSendActivationMailAgain: jest.fn(),
  logShareOffer: jest.fn(),
  logShareVenue: jest.fn(),
  logSignUpTooYoung: jest.fn(),
  logStartDMSTransmission: jest.fn(),
  logUseFilter: jest.fn(),
  logVenueContact: jest.fn(),
  logVenueSeeAllOffersClicked: jest.fn(),
  logVenueSeeMoreClicked: jest.fn(),
  logChooseLocation: jest.fn(),
  setUserId: jest.fn(),
  logSaveNewMail: jest.fn(),
  useInit: jest.fn(),
  logErrorSavingNewEmail: jest.fn(),
}
