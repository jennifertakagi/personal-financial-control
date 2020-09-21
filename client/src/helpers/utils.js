/**
 * Sum values according to type (+, -)
 * @param {object[]} listTransactions - List of transactions to get values to sum
 * @param {string} typeToSum - Sum's type, e.g: + or -
 * @returns {number} - Sum value
 */
export function sumTypesValues(listTransactions = [], typeToSum) {
  return listTransactions.reduce((sum, transaction) => {
    if (transaction.type === typeToSum) {
      sum = Number(transaction.value) + sum;
    }
    return sum
  }, 0)
}

/**
 * Gets the today date
 */
export function setToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}