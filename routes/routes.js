const express = require('express');
const transactionRouter = express.Router();
const TransactionController = require('../controller/TransactionController');

transactionRouter.post('/new', TransactionController.createTransaction);

transactionRouter.get('/', TransactionController.getTransaction);

transactionRouter.put('/update/:id', TransactionController.updateTransaction);

transactionRouter.delete('/delete/:id', TransactionController.deleteTransaction)


transactionRouter.use((error, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} ${error.message}`);
  res.status(400).send({ error: error.message});
});

module.exports = transactionRouter;
