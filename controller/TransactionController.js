const servicesDB = require('../services/transactionService');

class TransactionController {
  /**
   * Creates a new transaction based on category, day, description,
   * month, type, value, year, yearMonth. yearMonthDay, and save it on DB
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Function} next next function
   */
  async createTransaction(request, response, next) {
    try {
      const {
        category,
        day,
        description,
        month,
        type,
        value,
        year
      } = request.body;

      if (!category || !day || !description || !month || !type || !value || ! year) {
        throw new Error('These parameters are required: description, value, category, year, month, day and type!');
      }

      const yearMonth = mountYearMonth(year, month);
      const yearMonthDay = mountYearMonthDay(yearMonth, day);
      const newDocument = {
        category,
        day,
        description,
        month,
        type,
        value,
        year,
        yearMonth,
        yearMonthDay
      };

      const newTransactionDB = await servicesDB.createTransactionOnDB(newDocument);
      
      if (!newTransactionDB) {
        logger.info(`POST /transaction/new - ${JSON.stringify(newTransactionDB)}`);
        throw new Error('An error occurred while creating a new transaction!');
      }
      
      response.send({
        status: 'ok',
        transaction: newTransactionDB
      });

      logger.info(`POST /transaction/new - ${JSON.stringify(newTransactionDB)}`);
    } catch (error) {
        next(error);
    }
  }

  /**
   * Gets a transaction based on period
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Function} next next function
   */
  async getTransaction(request, response, next) {
    try {
      const { period } = request.query;

      if (!period) {
        throw new Error('The period (YYYY-MM) parameter is required!');
      }

      if (!period.match(/^\d{4}\-\d{1,2}$/)) {
        throw new Error('The period must be on this format: YYYY-MM!');
      }

      const transactionsDB = await servicesDB.getTransactionsFromDB(period);
      
      response.send({
        size: transactionsDB.length,
        transactions: transactionsDB
      });

      logger.info(`GET /transaction/:period - ${JSON.stringify(transactionsDB)}`);
    } catch (error) {
        next(error);
    }
  }

  /**
   * Gets all transaction's periods from database
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Function} next next function
   */
  async getAllPeriodsTransaction(request, response, next) {
    try {
      const periodsDB = await servicesDB.getTransactionsPeriodsFromDB();
      
      response.send({
        status: 'ok',
        periods: periodsDB
      });

      logger.info(`GET /transaction/allPeriods - ${JSON.stringify(periodsDB)}`);
    } catch (error) {
        next(error);
    }
  }

  /**
   * Updates a new transaction based on category, day, description,
   * month, type, value, year, yearMonth. yearMonthDay, and your ID and save it on DB
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Function} next next function
   */
  async updateTransaction(request, response, next) {
    try {
      const { id } = request.params;
      const {
        category,
        day,
        description,
        month,
        type,
        value,
        year
      } = request.body;

      if (!category || !day || !description || !month || !type || !value || ! year || !id) {
        throw new Error('These parameters are required: description, value, category, year, month, day, type and ID!');
      }

      const yearMonth = mountYearMonth(year, month);
      const yearMonthDay = mountYearMonthDay(yearMonth, day);
      const updatedTransaction = {
        category,
        day,
        description,
        month,
        type,
        value,
        year,
        yearMonth,
        yearMonthDay
      };

      const updatedTransactionDB = await servicesDB.updateTransactionOnDB(id, updatedTransaction);
      
      response.send({
        status: 'ok',
        transaction: updatedTransactionDB
      });

      logger.info(`PUT /transaction/update/:id - ${JSON.stringify(updatedTransactionDB)}`);
    } catch (error) {
        next(error);
    }
  }

  /**
   * Deletes a transaction according to your ID
   * @param {Object} request request object
   * @param {Object} response response object
   * @param {Function} next next function
   */
  async deleteTransaction(request, response, next) {
    try {
      const { id } = request.params;

      if (!id) {
        throw new Error('The ID parameter is required!');
      }

      const deletedTransactionDB = await servicesDB.deleteTransactionFromDB(id);
      
      if (!deletedTransactionDB) {
        logger.info(`DELETE /transaction/delete/:id - ${JSON.stringify(deletedTransactionDB)}`);
        throw new Error('An error occurred while deleting the transaction!');
      }

      response.send({
        status: 'ok',
        message: `The ${id} transaction was deleted!`
      })

      logger.info(`DELETE /transaction/delete/:id - ${JSON.stringify(deletedTransactionDB)}`);
    } catch (error) {
        next(error);
    }
  }
}

/**
 * Mounts the year month as string
 * @param {Number} year
 * @param {Number} month
 * @returns {String} yearMonth as YYYY-MM
 */
function mountYearMonth(year, month) {
  return `${year}-${String(month).padStart(2,'0')}`;
}

/**
 * Mounts the year month day as string
 * @param {String} yearMonth
 * @param {Number} day
 * @returns {String} yearMonthDay as YYYY-MM-DD
 */
function mountYearMonthDay(yearMonth, day) {
  return `${yearMonth}-${String(day).padStart(2,'0')}`;
}

module.exports = new TransactionController;