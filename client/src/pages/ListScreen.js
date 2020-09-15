import React from 'react'

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

      <input 
        type="text"
        placeholder="Filter by..."
        value={ filteredText }
        onChange={ onFilterChange }
        style={{ marginTop: '20px', marginBottom: '20px' }}
      />

      <div>
        <button
          className="waves-effect waves-light btn"
          onClick={ onNewTransaction }
        >
            + New Transaction
        </button>
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
              { transaction.description } - { transaction.value }
            </span>

            <span style={ actionsRow }>
              <button
                style={ buttonIconStyle }
                className="waves-effect waves-light"
                type="button"
                onClick={ () => onEditTransaction(transaction._id) }
              >
                <i className="material-icons right">create</i>
              </button>

              <button
                style={ buttonIconStyle }
                className="waves-effect waves-light"
                type="button"
                onClick={ () => onDeleteTransaction(transaction._id) }
              >
                <i className="material-icons right">delete</i>
              </button>
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
    border: 'none'
  },
  actionsRow: {
    float: 'right',
    marginLeft: '1rem'
  }
}