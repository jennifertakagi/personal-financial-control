import React, { useState, useEffect } from 'react'

import { setToday } from '../../helpers/utils';
import './styles.css'

import Input from '../../components/Input';
import Button from '../../components/Button';

export default function MaintenanceModal({
  isOpen,
  onCancel,
  onSave,
  transaction,
}) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(setToday());
  const [type, setType] = useState('-');

  useEffect(() => {
    if (!transaction) return;

    const { description, value, category, yearMonthDay, type } = transaction;

    setDescription(description);
    setValue(value);
    setCategory(category);
    setDate(yearMonthDay);
    setType(type);
  }, [transaction])

  /**
   * Handles with input's changes, setting state according to type changed
   * @param {HTMLEvent} event - Event from input
   * @param {string} typeChanged - Type to be changed 
   */
  function handlesInputChanges(event, typeChanged) {
    const newValue = (event && event.target &&
      event.target.value && event.target.value.trim()) || '';

    switch (typeChanged) {
      case 'description':
        setDescription(newValue);
        break;
      case 'value':
        setValue(newValue);
        break;    
      case 'category':
        setCategory(newValue);
        break;        
      case 'date':
        setDate(newValue);
        break;
      case 'type':
        setType(newValue);
        break;  
      default:
        break;
    }
  }

  /**
   * Handles with value's changed, setting the value's state
   * @param {HTMLEvent} event 
   */
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

  if (!isOpen) {
    return null;
  }

  return (
    <div id="maintenance-screen" className="overlay">
      <form>
        <div className="type-box">
          <span>
            <Input
              type="radio"
              label="Expense"
              value="-"
              checked={ type === '-' }
              onChange={ (event) =>  handlesInputChanges(event, 'type') }
              name="expense_earning"
            />
          </span>
          <span>
            <Input
              type="radio"
              label="Earning"
              value='+'
              checked={ type === '+' }
              onChange={ (event) =>  handlesInputChanges(event, 'type') }
              name="expense_earning"
            />
          </span>
        </div>
        <Input
          type="text"
          label="Description:"
          value={ description }
          onChange={ (event) =>  handlesInputChanges(event, 'description') }
          id="inputDescription"
        />
        <Input
          type="text"
          label="Value:"
          value={ value }
          onChange={ (event) =>  handlesInputChanges(event, 'value') }
          id="inputValue"
        />
        <Input
          type="text"
          label="Category:"
          value={ category }
          onChange={ (event) =>  handlesInputChanges(event, 'category') }
          id="inputCategory"
        />
        <Input
          type="date"
          label="Date:"
          value={ date }
          onChange={ (event) =>  handlesInputChanges(event, 'date') }
          id="inputDate"
        />

        <div className="actions-row">
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
      </form>
    </div>
  )
}
