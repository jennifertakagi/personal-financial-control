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
  const { actionsRow, buttonIconStyle, transactionStyle } = styles;

  return (
    <>
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

      <div style={{ display: 'flex',  marginTop: '10px', marginBottom: '10px' }}>
        <Button
          classes="waves-effect waves-light btn"
          onClick={ onNewTransaction }
          label="+ New Transaction"
          styles={{ marginTop: '25px' }}
        />
        <Input
          type="text"
          placeholder="Filter by..."
          value={ filteredText }
          onChange={ onFilterChange }
          styles={{ marginLeft: '20px' }}
        />
      </div>

      {transactions.map(transaction => {
        const currentColor = transaction.type === '+' ? EARNING_COLOR : EXPENSE_COLOR;

        return (
          <div
            style={{ ...transactionStyle, backgroundColor: currentColor }}
            key={ transaction._id }
          >            
            <span>
              { transaction.yearMonthDay } -{' '}
              <strong>{ transaction.category }</strong> -{' '}
              { transaction.description } - { formattedCurrency(transaction.value) }
            </span>

            <span style={ actionsRow }>
              <Button
                classes="waves-effect waves-light"
                onClick={ () => onEditTransaction(transaction._id) }
                styles={ buttonIconStyle }
                label="create"
                icon="material-icons right"
              />
              <Button
                classes="waves-effect waves-light"
                onClick={ () => onDeleteTransaction(transaction._id) }
                styles={ buttonIconStyle }
                label="delete"
                icon="material-icons right"
              />
            </span>
          </div>
        )
      })}
    </>
  )
}

const styles = {
  transactionStyle: {
    padding: '5px',
    margin: '5px',
    border: '1px solid lightgray',
    borderRadius: '5px'
  },
  buttonIconStyle: {
    background: 'transparent',
    border: 'none',
    color: '#000000'
  },
  actionsRow: {
    float: 'right',
    marginLeft: '1rem'
  }
}