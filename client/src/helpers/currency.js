/**
 * Formatted value as currency
 * @param {number} value - Value to be formatted
 * @param {string} currencyCountry - Country's currency type
 * @param {string} currencyType - Country's type
 * @returns {string} formatted value as currency, e.g: R$ 10,00
 */
export default function formattedCurrency(value = 0, currencyCountry = 'pt-BR', currencyType = 'BRL') {
  return value.toLocaleString(currencyCountry, { style: 'currency', currency: currencyType })
}
