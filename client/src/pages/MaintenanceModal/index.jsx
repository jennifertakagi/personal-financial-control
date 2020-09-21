import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import { setToday } from '../../helpers/utils';
import './styles.css'

import Input from '../../components/Input';
import Button from '../../components/Button';

function MaintenanceModal({
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
      yearMonthDay: date || setToday(),
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
              checked={ type === '-' }
              label="Expense"
              name="expense_earning"
              onChange={ (event) =>  handlesInputChanges(event, 'type') }
              type="radio"
              value="-"
            />
          </span>
          <span>
            <Input
              checked={ type === '+' }
              label="Earning"
              name="expense_earning"
              onChange={ (event) =>  handlesInputChanges(event, 'type') }
              type="radio"
              value='+'
            />
          </span>
        </div>
        <Input
          id="inputDescription"
          label="Description:"
          onChange={ (event) =>  handlesInputChanges(event, 'description') }
          type="text"
          value={ description }
        />
        <Input
          id="inputValue"
          label="Value:"
          onChange={ (event) =>  handlesInputChanges(event, 'value') }
          type="text"
          value={ value }
        />
        <Input
          id="inputCategory"
          label="Category:"
          onChange={ (event) =>  handlesInputChanges(event, 'category') }
          type="text"
          value={ category }
        />
        <Input
          id="inputDate"
          label="Date:"
          onChange={ (event) =>  handlesInputChanges(event, 'date') }
          type="date"
          value={ date }
        />

        <div className="actions-row">
          <Button
            classes="waves-effect waves-light btn"
            label="Save"
            onClick={ handleSaveClick }
          />

          <Button
            classes="waves-effect waves-light btn red darken-4"
            label="Cancel"
            onClick={ onCancel }
          />
        </div>
      </form>
    </div>
  )
}

MaintenanceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
}

export default MaintenanceModal;