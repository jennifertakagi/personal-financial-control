import React, { useState, useEffect } from 'react'

import './styles.css'

import Input from '../../components/Input';
import Button from '../../components/Button';

function setToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function MaintenanceScreen({ transaction, onCancel, onSave }) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(setToday());
  const [type, setType] = useState('-');
  const [mode, setMode] = useState('INSERTING');

  useEffect(() => {
    if (!transaction) return;

    const { description, value, category, yearMonthDay, type } = transaction;

    setDescription(description);
    setValue(value);
    setCategory(category);
    setDate(yearMonthDay);
    setType(type);
    setMode('EDITING');
  }, [transaction])

  function handleDescriptionChange(event) {
    const newDescription = (event && event.target &&
      event.target.value && event.target.value.trim()) || '';
    setDescription(newDescription);
  }

  function handleValueChange(event) {
    const newValue = (event && event.target &&
      event.target.value && event.target.value.trim()) || '';
    setValue(newValue);
  }

  function handleCategoryChange(event) {
    const newCategory = (event && event.target &&
      event.target.value && event.target.value.trim()) || '';
    setCategory(newCategory);
  }

  function handleDateChange(event) {
    const newDate = (event && event.target &&
      event.target.value && event.target.value.trim()) || '';
    setDate(newDate);
  }

  function handleTypeChange(event) {
    const newType = (event && event.target && event.target.value) || '';
    setType(newType);
  }

  function handleSaveClick(event) {
    const newTransaction = {
      _id: transaction ? transaction._id : null,
      description,
      value,
      type,
      yearMonthDay: date,
      category
    }

    onSave(newTransaction);
  }

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <span>
          <Input
            type="radio"
            label="Expense"
            value="-"
            checked={ type === '-' }
            onChange={ handleTypeChange }
            name="expense_earning"
          />
        </span>
        <span style={{ marginLeft: '30px' }}>
          <Input
            type="radio"
            label="Earning"
            value='+'
            checked={ type === '+' }
            onChange={ handleTypeChange }
            name="expense_earning"
          />
        </span>
      </div>
      <Input
        type="text"
        label="Description:"
        value={ description }
        onChange={ handleDescriptionChange }
        id="inputDescription"
      />
      <Input
        type="text"
        label="Value:"
        value={ value }
        onChange={ handleValueChange }
        id="inputValue"
      />
      <Input
        type="text"
        label="Category:"
        value={ category }
        onChange={ handleCategoryChange }
        id="inputCategory"
      />
      <Input
        type="date"
        label="Date:"
        value={ date }
        onChange={ handleDateChange }
        id="inputDate"
      />

      <Button
        classes="waves-effect waves-light btn"
        onClick={ handleSaveClick }
        label="Save"
      />

      <Button
        classes="waves-effect waves-light btn red darken-4"
        styles={{ marginLeft: '10px' }}
        onClick={ onCancel }
        label="Cancel"
      />
    </div>
  )
}
