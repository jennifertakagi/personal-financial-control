import React, { useState, useEffect } from 'react'

function setToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default function MaintenanceScreen({
  transaction,
  onCancel,
  onSave 
}) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(setToday());
  const [type, setType] = useState('');
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
          <label>
            <input
              name="expense_earning"
              type="radio"
              checked={ type === '-' }
              onChange={ handleTypeChange }
              value="-"
            />
            <span>Expense</span>
          </label>
        </span>
        <span style={{ marginLeft: '30px' }}>
          <label>
            <input
              name="expense_earning"
              type="radio"
              checked={ type === '+' }
              onChange={ handleTypeChange }
              value="+"
            />
            <span>Earning</span>
          </label>
        </span>
      </div>
      <div className="input-field">
        <input 
          type="text"
          value={ description }
          onChange={ handleDescriptionChange }
          id="inputDescription"
        />
        <label
          htmlFor="inputDescription"
          className="active"
        >
          Description:
        </label>
      </div>
      <div className="input-field">
        <input 
          type="text"
          value={ value }
          onChange={ handleValueChange }
          id="inputValue"
        />
        <label
          htmlFor="inputValue"
          className="active"
        >
          Value:
        </label>
      </div>
      <div className="input-field">
        <input 
          type="text"
          value={ category }
          onChange={ handleCategoryChange }
          id="inputCategory"
        />
        <label
          htmlFor="inputCategory"
          className="active"
        >
          Category:
        </label>
      </div>
      <div className="input-field">
        <input 
          type="date"
          value={ date }
          onChange={ handleDateChange }
          id="inputDate"
        />
        <label
          htmlFor="inputDate"
          className="active"
        >
          Date:
        </label>
      </div>
      <button
        className="waves-effect waves-light btn"
        onClick={ handleSaveClick }
      >
        Save
      </button>
      <button
        className="waves-effect waves-light btn red darken-4"
        style={{ marginLeft: '10px' }}
        onClick={ onCancel }
      >
        Cancel
      </button>
    </div>
  )
}
