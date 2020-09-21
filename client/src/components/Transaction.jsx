import React from 'react';
import PropTypes from 'prop-types';

import formattedCurrency from '../helpers/currency.js';

import Button from './Button';

const EARNING_COLOR = '#00b894';
const EXPENSE_COLOR = '#fab1a0';

export default function Transaction ({
  transaction,
  onDeleteTransaction,
  onEditTransaction
}) {
  const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;

  return (
    <div
      className="transaction-box"
      style={{ backgroundColor: currentColor }}
      key={ transaction._id }
    >            
      <span>
        { transaction.yearMonthDay } -{' '}
        <strong>{ transaction.category }</strong> -{' '}
        { transaction.description } - { formattedCurrency(transaction.value) }
      </span>

      <span className="transactions-actions">
        <Button
          classes="waves-effect waves-light"
          onClick={ () => onEditTransaction(transaction._id) }
          label="create"
          icon="material-icons right"
        />
        <Button
          classes="waves-effect waves-light"
          onClick={ () => onDeleteTransaction(transaction._id) }
          label="delete"
          icon="material-icons right"
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
