/**
 * Sum values according to type (+, -)
 * @param {object[]} listTransactions - List of transactions to get values to sum
 * @param {string} typeToSum - Sum's type, e.g: + or -
 * @returns {number} - Sum value
 */
export default function sumTypesValues(listTransactions = [], typeToSum) {
  return listTransactions.reduce((sum, transaction) => {
    if (transaction.type === typeToSum) {
      sum = transaction.value + sum;
    }
    return sum
  }, 0)
}