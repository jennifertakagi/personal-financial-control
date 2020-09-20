import React from 'react';
import PropTypes from 'prop-types';

export default function Input ({
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
          name={ name }
          type={ type }
          checked={ checked }
          onChange={ onChange }
          value={ value }
        />
        <span>{ label }</span>
      </label>
    )
  }
  return (
    <div className="input-field">
      <input
        id={ id }
        className="validate"
        type={ type }
        autoFocus
        value={ value }
        onChange={ onChange }
        placeholder={ placeholder }
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
