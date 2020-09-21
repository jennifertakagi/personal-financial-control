import React from 'react';
import PropTypes from 'prop-types';

function Input ({
  checked = false,
  id = '',
  label = '',
  name = '',
  onChange,
  placeholder = '',
  type,
  value
}) {
  if (type === 'radio') {
    return (
      <label>
        <input
          checked={ checked }
          name={ name }
          onChange={ onChange }
          type={ type }
          value={ value }
        />
        <span>{ label }</span>
      </label>
    )
  }
  return (
    <div className="input-field">
      <input
        autoFocus
        className="validate"
        id={ id }
        onChange={ onChange }
        placeholder={ placeholder }
        type={ type }
        value={ value }
      />
      <label
        className="active"
        htmlFor={ id }
      >
        { label }
      </label>
    </div>
  );
}

Input.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default Input;