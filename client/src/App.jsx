import React, { useState, useEffect } from 'react';

import api from './services/api';
import { sumTypesValues } from './helpers/utils';

import ListScreen from './pages/ListScreen';
import MaintenanceModal from './pages/MaintenanceModal';

import './assets/styles/global.css';
import './styles.css';

const PERIODS = [];

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransaction, setFilteredTransactions] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState('');
  const [filteredText, setFilteredText] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [totalEarning, setTotalEarning] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);

  /**
   * Gets all transactions' periods from database and
   * set it on state to show on select to user
   */
  function getPeriodsFromDB() {
    api.get('/transaction/allPeriods')
      .then((response) => {
        const { data = {} } = response;
        PERIODS.push(...data.periods);
        setCurrentPeriod(PERIODS[0]);
      });
  }

  useEffect(() => {
    getPeriodsFromDB();
  }, []);

  /**
   * Gets transactions from database and set it on states,
   * also get and set the earning and expense's sum
   * @param {string} searchPeriod - Current period to get transactions
   */
  function getTransactionsFromDB(searchPeriod) {
    if (!searchPeriod) return;

    api.get(`/transaction/?period=${searchPeriod}`)
      .then((response) => {
        const { data = {} } = response;
        setTransactions(data.transactions);
        setTotalEarning(sumTypesValues(data.transactions, '+'));
        setTotalExpenses(sumTypesValues(data.transactions, '-'));
      });
  }

  useEffect(() => {
    getTransactionsFromDB(currentPeriod);
  }, [currentPeriod]);

  useEffect(() => {
    let newFilteredTransactions = [...transactions];

    if (filteredText && filteredText.trim() !== '') {
      newFilteredTransactions = newFilteredTransactions.filter((transaction) => {
        const transactionDescription = (transaction && transaction.description) || '';
        return transactionDescription.toLowerCase().includes(filteredText);
      });
    }
    setFilteredTransactions(newFilteredTransactions);
    setTotalEarning(sumTypesValues(newFilteredTransactions, '+'));
    setTotalExpenses(sumTypesValues(newFilteredTransactions, '-'));
  }, [transactions, filteredText]);

  /**
   * Handles with period's changes and update its state
   * @param {HTMLEvent} event - Period event changes
   */
  function handlePeriodChange(event) {
    const newPeriod = (event && event.target && event.target.value) || '';

    setCurrentPeriod(newPeriod);
  }

  /**
   * Handles with edit's transaction action
   * @param {HTMLEvent} event - Edit transaction event
   */
  function handleEditTransaction(_id) {
    const newSelectedTransaction = filteredTransaction
      .find((transaction) => transaction._id === _id);

    setSelectedTransaction(newSelectedTransaction);
    setIsOpen(true);
  }

  /**
   * Handles with deleted transaction action, updating the database
   * @param {HTMLEvent} event - Deleted transaction event
   */
  function handleDeleteTransaction(_id) {
    api.delete(`/transaction/delete/${_id}`)
      .then((response) => {
        const { data = {} } = response;

        if (data.status === 'ok') {
          const newTransactions = transactions.filter((transaction) => transaction._id !== _id);
          setTransactions(newTransactions);
        }
      });
  }

  /**
   * Handles with filter's changes and update its state
   * @param {HTMLEvent} event - Filter event changes
   */
  function handleFilterChange(event) {
    const textFilter = (event && event.target
      && event.target.value && event.target.value.trim()) || '';
    setFilteredText(textFilter.toLowerCase());
  }

  /**
   * Handles with new transaction click button
   */
  function handleNewTransaction() {
    setSelectedTransaction([]);
    setIsOpen(true);
  }

  /**
   * Handles with cancel maintenance click button
   */
  function handleCancelMaintenance() {
    setIsOpen(false);
  }

  /**
   * Handles with save maintenance click button
   */
  function handleSaveMaintenance(newTransaction) {
    const { _id } = newTransaction;

    if (!_id) {
      const insertedTransaction = {
        ...newTransaction,
        year: Number(newTransaction.yearMonthDay.substring(0, 4)),
        month: Number(newTransaction.yearMonthDay.substring(5, 7)),
        day: Number(newTransaction.yearMonthDay.substring(8, 10)),
      };

      api.post('/transaction/new', insertedTransaction)
        .then((response) => {
          const { data = {} } = response;

          if (data.status === 'ok') {
            const newTransactions = [...transactions, data.transaction];
            newTransactions.sort((a, b) => a.yearMonth.localeCompare(b.yearMonthDay));

            setTransactions(newTransactions);
            setIsOpen(false);
          }
        });
    } else {
      const editedTransaction = {
        ...newTransaction,
        year: Number(newTransaction.yearMonthDay.substring(0, 4)),
        month: Number(newTransaction.yearMonthDay.substring(5, 7)),
        day: Number(newTransaction.yearMonthDay.substring(8, 10)),
      };

      api.put(`/transaction/update/${_id}`, editedTransaction)
        .then((response) => {
          const { data = {} } = response;

          if (data.status === 'ok') {
            const newTransactions = [...transactions];
            const indexTransaction = newTransactions
              .findIndex((transaction) => transaction._id === editedTransaction._id);

            newTransactions[indexTransaction] = editedTransaction;

            setTransactions(newTransactions);
            setIsOpen(false);
          }
        });
    }
  }

  return (
    <div className="container" id="main-page">
      <h1>Personal Financial Control</h1>
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
        totalEarning={ totalEarning }
        totalExpenses={ totalExpenses }
      />
      <MaintenanceModal
        isOpen={ modalIsOpen }
        onCancel={ handleCancelMaintenance }
        onSave={ handleSaveMaintenance }
        transaction={ selectedTransaction }
      />
    </div>
  );
}
