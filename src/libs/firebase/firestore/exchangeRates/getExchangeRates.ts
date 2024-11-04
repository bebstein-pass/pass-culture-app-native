import { firestoreRemoteStore } from 'libs/firebase/firestore/client'
import {
  FIRESTORE_ROOT_COLLECTION,
  RemoteStoreDocuments,
  RemoteStoreExchangeRates,
} from 'libs/firebase/firestore/types'
import { captureMonitoringError } from 'libs/monitoring'

export const getExchangeRates = (onRateChange: (euroToCFPRate: number) => void) =>
  firestoreRemoteStore
    .collection(FIRESTORE_ROOT_COLLECTION)
    .doc(RemoteStoreDocuments.EXCHANGE_RATES)
    .onSnapshot(
      (docSnapshot) => onRateChange(docSnapshot.get(RemoteStoreExchangeRates.EURO_TO_CFP_RATE)),
      (error) => captureMonitoringError(error.message, 'firestore_not_available')
    )
