import React from 'react'

import formattedCurrency from '../../helpers/currency';
import './styles.css'

import Button from '../../components/Button';
import Input from '../../components/Input';

const EARNING_COLOR = '#00b894';
const EXPENSE_COLOR = '#fab1a0';

export default function ListScreen({
  currentPeriod,
  filteredText,
  onDeleteTransaction,
  onEditTransaction,
  onFilterChange,
  onNewTransaction,
  onPeriodChange,
  periods,
  transactions
}) {
  return (
    <div id="list-screen">
      <select
        className="browser-default"
        value={ currentPeriod }
        onChange={ onPeriodChange }
      >
        {periods.map(period => {
          return (
            <option key={ period }>
              { period }
            </option>
          )
        })}
      </select>

      <div className="actions-box">
        <Button
          classes="waves-effect waves-light btn"
          onClick={ onNewTransaction }
          label="+ New Transaction"
        />
        <Input
          type="text"
          placeholder="Filter by..."
          value={ filteredText }
          onChange={ onFilterChange }
        />
      </div>

      {transactions.map(transaction => {
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
        )
      })}
    </div>
  )
}
