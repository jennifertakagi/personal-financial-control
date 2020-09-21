import React from 'react';
import PropTypes from 'prop-types';

import formattedCurrency from '../helpers/currency.js';

import Button from './Button';

const EARNING_COLOR = '#00b894';
const EXPENSE_COLOR = '#fab1a0';

function Transaction ({
  onDeleteTransaction,
  onEditTransaction,
  transaction
}) {
  const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;

  return (
    <div
      className="transaction-box"
      style={{ backgroundColor: currentColor }}
    >            
      <span>
        { transaction.yearMonthDay } -{' '}
        <strong>
          { transaction.category }
        </strong> -{' '}
        { transaction.description } - { formattedCurrency(transaction.value) }
      </span>

      <span className="transactions-actions">
        <Button
          classes="waves-effect waves-light"
          icon="material-icons right"
          label="create"
          onClick={ () => onEditTransaction(transaction._id) }
        />
        <Button
          classes="waves-effect waves-light"
          icon="material-icons right"
          label="delete"
          onClick={ () => onDeleteTransaction(transaction._id) }
        />
      </span>
    </div>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.object.isRequired,
  onDeleteTransaction: PropTypes.func.isRequired,
  onEditTransaction: PropTypes.func.isRequired
}

export default  Transaction;