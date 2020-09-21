import React from 'react'

import './styles.css'

import Button from '../../components/Button';
import Input from '../../components/Input';
import Summary from '../../components/Summary';
import Transaction from '../../components/Transaction';

export default function ListScreen({
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
        return (
          <Transaction
            transaction={ transaction }
            onDeleteTransaction={ onDeleteTransaction }
            onEditTransaction={ onEditTransaction }
          />
        )
      })}
    </div>
  )
}
