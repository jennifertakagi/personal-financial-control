const transactionModel = require('../models/TransactionModel');

class TransactionController {
  /**
   * Creates a new transaction based on category, day, description,
   * month, type, value, year, yearMonth. yearMonthDay, and save it on DB
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   */
  async createTransaction(req, res, next) {
    try {
      const {
        category,
        day,
        description,
        month,
        type,
        value,
        year,
        yearMonth,
        yearMonthDay
      } = req.body;

      if (!category || !day || !description || !month || !type ||
        !value || ! year || !yearMonth || !yearMonthDay) {
          throw new Error('These parameters are required: description, value, category, year, month, day, yearMonth, yearMonthDay and type!');
      }

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

      const newTransactionDB = await transactionModel.create(newDocument, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(`Added new transaction ${result._id} success on DB!`);
        }
      });

      logger.info(`POST /transaction/new - ${JSON.stringify(newTransactionDB)}`);
    } catch (error) {
        next(error);
    }
  }

  /**
   * Creates a new transaction based on category, day, description,
   * month, type, value, year, yearMonth. yearMonthDay, and save it on DB
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   */
  async getTransaction(req, res, next) {
    try {
      const { period } = req.query;

      if (!period) {
          throw new Error('The period (YYYY-MM) parameter is required!');
      }

      const transactionDB = await transactionModel.find({yearMonth: period});
      
      res.send({
        size: transactionDB.length,
        transactions: [...transactionDB]
      });

      logger.info(`GET /transaction/:period - ${JSON.stringify(transactionDB)}`);
    } catch (error) {
        next(error);
    }
  }

  /**
   * Updates a new transaction based on category, day, description,
   * month, type, value, year, yearMonth. yearMonthDay, and your ID and save it on DB
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   */
  async updateTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const {
        category,
        day,
        description,
        month,
        type,
        value,
        year,
        yearMonth,
        yearMonthDay
      } = req.body;

      if (!category || !day || !description || !month || !type ||
        !value || ! year || !yearMonth || !yearMonthDay || !id) {
          throw new Error('These parameters are required: description, value, category, year, month, day, yearMonth, yearMonthDay, type and ID!');
      }

      const query = { _id: id };
      const updatedDocument = {
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
      const options = { new: true };

      const newTransactionDB = await transactionModel.findByIdAndUpdate(query, updatedDocument, options);
      
      res.send(newTransactionDB);

      logger.info(`PUT /transaction/update/:id - ${JSON.stringify(newTransactionDB)}`);
    } catch (error) {
        next(error);
    }
  }

  /**
   * Deletes a transaction according to your ID
   * @param {Object} req request object
   * @param {Object} res response object
   * @param {Function} next next function
   */
  async deleteTransaction(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error('The ID parameter is required!');
      }

      const deletedTransactionDB = await transactionModel.deleteOne({ _id: id});
      
      res.send(`The ${id} transaction was deleted!`);

      logger.info(`DELETE /transaction/delete/:id - ${JSON.stringify(deletedTransactionDB)}`);
    } catch (error) {
        next(error);
    }
  }
}

module.exports = new TransactionController;