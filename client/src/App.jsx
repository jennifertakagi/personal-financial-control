import React, { useState, useEffect } from 'react';

import api from './services/api';
import ListScreen from './pages/ListScreen';
import MaintenanceScreen from './pages/MaintenanceScreen';

import './assets/styles/global.css';

const PERIODS = [];

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransaction, setFilteredTransactions] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState('');
  const [currentScreen, setCurrentScreen] = useState('LIST_SCREEN');
  const [filteredText, setFilteredText] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState(false);
  const [totalEarning, setTotalEarning] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    getPeriodsFromDB();
    const newEarning = sumEarning();
    setTotalEarning(newEarning);

    const newExpenses = sumExpenses();
    setTotalExpenses(newExpenses);
  }, [])

  useEffect(() => {
    getTransactionsFromDB(currentPeriod);
  }, [currentPeriod])

  useEffect(() => {
    const newScreen = (selectedTransaction !== null || newTransaction) ? 'MAINTENANCE_SCREEN' : 'LIST_SCREEN';
    setCurrentScreen(newScreen);
  }, [selectedTransaction, newTransaction])

  useEffect(() => {
    let newFilteredTransactions = [...transactions];

    if (filteredText && filteredText.trim() !== '') {
      newFilteredTransactions = newFilteredTransactions.filter(transaction => {
        const transactionDescription = (transaction && transaction.description) || '';
        return transactionDescription.toLowerCase().includes(filteredText);
      })
    }
    
    const newEarning = sumEarning();
    setTotalEarning(newEarning);

    const newExpenses = sumExpenses();
    setTotalExpenses(newExpenses);

    setFilteredTransactions(newFilteredTransactions);
  }, [transactions, filteredText])

  function sumEarning() {
    return filteredTransaction.reduce((sum, transaction) => {
      if (transaction.type === '+') {
        sum = transaction.value + sum;
      }
      return sum
    }, 0)
  }

  function sumExpenses() {
    return filteredTransaction.reduce((sum, transaction) => {
      if (transaction.type === '-') {
        sum = transaction.value + sum;
      }
      return sum
    }, 0)
  }

  function getTransactionsFromDB(currentPeriod) {
    if (!currentPeriod) return;

    api.get(`/transaction/?period=${currentPeriod}`)
      .then(response => {
          const { data = {} } = response;
          setTransactions(data.transactions);

          const newEarning = sumEarning();
          setTotalEarning(newEarning);
      
          const newExpenses = sumExpenses();
          setTotalExpenses(newExpenses);
      });
  }

  function getPeriodsFromDB() {
    api.get('/transaction/allPeriods')
      .then(response => {
        const { data = {} } = response;
        PERIODS.push(...data.periods);
        setCurrentPeriod(PERIODS[0]);
        
      });
  }

  function handlePeriodChange(event) {
    const newPeriod = (event && event.target && event.target.value) || '';
    setCurrentPeriod(newPeriod);
  }

  function handleEditTransaction(_id) {
    const newSelectedTransaction = filteredTransaction.find(transaction => transaction._id === _id);
    setSelectedTransaction(newSelectedTransaction);
  }

  function handleDeleteTransaction(_id) {
    api.delete(`/transaction/delete/${_id}`)
      .then(response => {
        const { data = {} } = response;

        if (data.status === 'ok') {
          const newTransactions = transactions.filter(transaction => transaction._id !== _id);
          setTransactions(newTransactions);
        }
      });
  }

  function handleFilterChange(event) {
    const textFilter = (event && event.target &&
      event.target.value && event.target.value.trim()) || '';
    setFilteredText(textFilter.toLowerCase());
  }

  function handleNewTransaction() {
    setNewTransaction(true);
  }

  function handleCancelMaintenance(event) {
    setNewTransaction(false);
    setSelectedTransaction(null);
  }

  function handleSaveMaintenance(newTransaction) {
    const { _id } = newTransaction;

    if (!_id) {
      const insertedTransaction = {
        ...newTransaction,
        year: Number(newTransaction.yearMonthDay.substring(0, 4)),
        month: Number(newTransaction.yearMonthDay.substring(5, 7)),
        day: Number(newTransaction.yearMonthDay.substring(8, 10))
      };
  
      api.post('/transaction/new', insertedTransaction)
        .then(response => {
          const { data = {} } = response;
  
          if (data.status === 'ok') {
            const newTransactions = [...transactions, data.transaction];
            newTransactions.sort((a, b) => a.yearMonth.localeCompare(b.yearMonthDay));

            setTransactions(newTransactions);
            setNewTransaction(false);
          }
        });
    } else {
      const editedTransaction = {
        ...newTransaction,
        year: Number(newTransaction.yearMonthDay.substring(0, 4)),
        month: Number(newTransaction.yearMonthDay.substring(5, 7)),
        day: Number(newTransaction.yearMonthDay.substring(8, 10))
      };
  
      api.put(`/transaction/update/${_id}`, editedTransaction)
        .then(response => {
          const { data = {} } = response;
  
          if (data.status === 'ok') {
            const newTransactions = [...transactions];
            const indexTransaction = newTransactions.findIndex(transaction => transaction._id === editedTransaction._id);
            
            newTransactions[indexTransaction] = editedTransaction;
            setTransactions(newTransactions);
            setSelectedTransaction(null);
          }
        });
    }
  }

  return (
    <div className="container">
      <h1>Personal Financial Control</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <span>Transactions: { filteredTransaction.length }</span>
        <span>Earnings: { totalEarning }</span>
        <span>Expenses: { totalExpenses }</span>
        <span>Balance: { totalEarning - totalExpenses }</span>
      </div>
      {currentScreen === 'LIST_SCREEN' ? (
        <ListScreen
          currentPeriod={ currentPeriod }
          filteredText={ filteredText }
          onDeleteTransaction={ handleDeleteTransaction }
          onEditTransaction={ handleEditTransaction }
          onFilterChange={ handleFilterChange }
          onNewTransaction={ handleNewTransaction }
          onPeriodChange={ handlePeriodChange }
          periods={ PERIODS }
          transactions={ filteredTransaction }
        />
      ) : (
        <MaintenanceScreen
          transaction={ selectedTransaction }
          onCancel={ handleCancelMaintenance }
          onSave={ handleSaveMaintenance }
        />
      )}
    </div>
  );
}

