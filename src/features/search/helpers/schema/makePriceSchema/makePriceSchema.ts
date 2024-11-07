import { string } from 'yup'

import { parseCurrency } from 'libs/parsers/getDisplayPrice'

// integers separated by a dot or comma with 2 decimals max
const PRICE_REGEX = /^\d+(?:[,.]\d{0,2})?$/
const formatPriceError = `Format du prix incorrect. Exemple de format attendu\u00a0: 10,00`

const maxPriceError = (initialCredit: string) => {
  const priceInEuro = parseCurrency(Number(initialCredit))
  return `Le prix indiqué ne doit pas dépasser ${priceInEuro}`
}

export const makePriceSchema = (initialCredit: string) =>
  string()
    .trim()
    .test('validPrice', formatPriceError, (value) => {
      if (!value) return true
      return PRICE_REGEX.test(value.trim())
    })
    .test('validMaxPrice', maxPriceError(initialCredit), (value) => {
      if (!value) return true
      return Number(value.trim().replaceAll(',', '.')) <= Number(initialCredit)
    })
