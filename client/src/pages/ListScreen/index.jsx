import React from 'react'
import PropTypes from 'prop-types';

import './styles.css'

import Button from '../../components/Button';
import Input from '../../components/Input';
import Period from '../../components/Period';
import Summary from '../../components/Summary';
import Transaction from '../../components/Transaction';

function ListScreen({
  currentPeriod,
  filteredText,
  onDeleteTransaction,
  onEditTransaction,
  onFilterChange,
  onNewTransaction,
  onPeriodChange,
  periods,
  transactions,
  totalEarning,
  totalExpenses
}) {
  return (
    <div id="list-screen">
      <Summary
        filteredTransaction={ transactions }
        totalEarning={ totalEarning }
        totalExpenses={ totalExpenses }
      />
      <Period
        currentPeriod={ currentPeriod }
        onPeriodChange={ onPeriodChange }
        periods={ periods }
      />

      <div className="actions-box">
        <Button
          classes="waves-effect waves-light btn"
          label="+ New Transaction"
          onClick={ onNewTransaction }
        />
        <Input
          onChange={ onFilterChange }
          placeholder="Filter by..."
          type="text"
          value={ filteredText }
        />
      </div>

      {transactions.map(transaction => {
        return (
          <Transaction
            key={ transaction._id }
            onDeleteTransaction={ onDeleteTransaction }
            onEditTransaction={ onEditTransaction }
            transaction={ transaction }
          />
        )
      })}
    </div>
  )
}

ListScreen.propTypes = {
  currentPeriod: PropTypes.string.isRequired,
  filteredText: PropTypes.string.isRequired,
  onDeleteTransaction: PropTypes.func.isRequired,
  onEditTransaction: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onNewTransaction: PropTypes.func.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  periods: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  totalEarning: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired
}

export default ListScreen;