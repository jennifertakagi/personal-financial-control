import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import formattedCurrency from '../helpers/currency.js';

export default function Summary ({
  filteredTransaction = [],
  totalEarning = 0,
  totalExpenses = 0,
}) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(totalEarning- totalExpenses);
  }, [totalEarning, totalExpenses])

  return (
    <div className="summary-box">
      <p>{ filteredTransaction.length } transactions</p>
      <p className="earning-text">Earnings: { formattedCurrency(totalEarning) }</p>
      <p className="expenses-text">Expenses: { formattedCurrency(totalExpenses) }</p>
      <p>Balance: { formattedCurrency(balance) }</p>
    </div>
  );
}

Summary.propTypes = {
  filteredTransaction: PropTypes.array,
  totalEarning: PropTypes.number,
  totalExpenses: PropTypes.number
}
