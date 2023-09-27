import AsyncStorage from '@react-native-async-storage/async-storage'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { getHistoryLessThan30Days } from 'features/search/helpers/useSearchHistory/helpers/getHistoryLessThan30Days'
import { CreateHistoryItem, HistoryItem } from 'features/search/types'
import { eventMonitoring } from 'libs/monitoring'
import { SNACK_BAR_TIME_OUT, useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'

export const HISTORY_KEY = 'search_history'
export const MAX_HISTORY_RESULTS = 20
export const MIN_HISTORY_RESULTS = 3

export function useSearchHistory() {
  const { showErrorSnackBar } = useSnackBarContext()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [queryHistory, setQueryHistory] = useState<string>('')

  const setHistoryItems = useCallback(async (newItems: HistoryItem[]) => {
    return AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newItems))
  }, [])

  const getHistoryFromStorage = useCallback(async () => {
    try {
      const items = await AsyncStorage.getItem(HISTORY_KEY)

      if (!items) return []

      const history: HistoryItem[] = JSON.parse(items)

      const historyLessThan30Days = getHistoryLessThan30Days(history)
      await setHistoryItems(historyLessThan30Days)

      return historyLessThan30Days
    } catch (error) {
      return []
    }
  }, [setHistoryItems])

  useEffect(() => {
    const fetchHistory = async () => {
      const historyData = await getHistoryFromStorage()
      setHistory(historyData)
    }

    fetchHistory()
  }, [getHistoryFromStorage])

  const internalRemoveFromHistory = useCallback(
    async (item: HistoryItem) => {
      const lastHistory = await getHistoryFromStorage()
      const filteredItems = lastHistory.filter((i) => i.createdAt !== item.createdAt)
      await setHistoryItems(filteredItems)
      setHistory(filteredItems)
    },
    [getHistoryFromStorage, setHistoryItems]
  )

  const removeFromHistory = useCallback(
    async (item: HistoryItem) => {
      try {
        await internalRemoveFromHistory(item)
      } catch (error) {
        showErrorSnackBar({
          message: 'Impossible de supprimer l’entrée de l’historique',
          timeout: SNACK_BAR_TIME_OUT,
        })
      }
    },
    [internalRemoveFromHistory, showErrorSnackBar]
  )

  const addToHistory = useCallback(
    async (item: CreateHistoryItem) => {
      try {
        let currentHistory = await getHistoryFromStorage()

        const existingHistoryItem = currentHistory.find(
          (i) =>
            i.query === item.query &&
            i.nativeCategory === item.nativeCategory &&
            i.category === item.category
        )

        if (existingHistoryItem) {
          await internalRemoveFromHistory(existingHistoryItem)
          currentHistory = await getHistoryFromStorage()
        }

        const newItems = [{ ...item, createdAt: new Date().getTime() }, ...currentHistory]
        await setHistoryItems(newItems)
        setHistory(newItems)
      } catch (error) {
        eventMonitoring.captureMessage('Impossible d’ajouter l’entrée à l’historique', 'info')
      }
    },
    [getHistoryFromStorage, setHistoryItems, internalRemoveFromHistory]
  )

  const filteredHistory = useMemo(() => {
    const nbHistoryResults = queryHistory === '' ? MAX_HISTORY_RESULTS : MIN_HISTORY_RESULTS

    if (queryHistory === '') return history.slice(0, nbHistoryResults)

    return history
      .filter((item) => item.query.toLowerCase().includes(queryHistory.toLowerCase()))
      .slice(0, nbHistoryResults)
  }, [history, queryHistory])

  return {
    queryHistory,
    addToHistory,
    removeFromHistory,
    filteredHistory,
    setQueryHistory,
  }
}
