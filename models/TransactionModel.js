const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  category:  {
    type: String,
    require: true
  },
  day: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  month: {
    type: Number,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  value: {
    type: Number,
    require: true
  },
  year:  {
    type: Number,
    require: true
  },
  yearMonth: {
    type: String,
    require: true
  },
  yearMonthDay: {
    type: String,
    require: true
  }
});

const transactionModel = mongoose.model('transactions', transactionSchema);

module.exports = transactionModel;
