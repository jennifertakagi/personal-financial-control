const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const TransactionModel = require('../models/TransactionModel');

/**
 * Creates a new transaction on database
 * @param {Object} transaction document to be created
 * @returns {Object} the new transaction created
 */
async function createTransactionOnDB(transaction) {
  const newTransactionDB = await TransactionModel.create(transaction);

  return newTransactionDB;
}

/**
 * Deletes a transaction from database
 * @param {String} _id transaction's ID
 * @returns {Boolean} true if the transaction was deleted
 */
async function deleteTransactionFromDB(_id) {
  const deleteTransactionDB = await TransactionModel.deleteOne({_id: ObjectId(_id)});
  return deleteTransactionDB.deletedCount === 1;
}

/**
 * Gets a transaction from database
 * @param {String} period period to filter the transactions
 * @returns {Object[]} list of the transactions of period
 */
async function getTransactionsFromDB(period) {
  const transactionsDB = await TransactionModel.find({yearMonth: period});

  return transactionsDB;
}

/**
 * Gets all transaction's periods from database
 * @returns {Object{}}
 */
async function getTransactionsPeriodsFromDB() {
  const matchGroup= { $group: {_id: '$yearMonth'} };
  const matchSort= { $sort: { _id: 1 }};
  const allPeriodsDB = await TransactionModel.aggregate([matchGroup, matchSort]);
  const allPeriods = allPeriodsDB.reduce((listPeriods, period) => {
    if (period && period._id) {
      listPeriods.push(period._id)
    }
    return listPeriods
  }, []);

  return allPeriods;
}

/**
 * Updates a transaction on database
 * @param {String} _id transaction's ID
 * @returns {Object} the updated transaction
 */
async function updateTransactionOnDB(_id, transaction) {
  await TransactionModel.updateOne({_id: ObjectId(_id)}, transaction);

  return {_id, ...transaction};
}

module.exports = {
  createTransactionOnDB,
  deleteTransactionFromDB,
  getTransactionsPeriodsFromDB,
  getTransactionsFromDB,
  updateTransactionOnDB
}