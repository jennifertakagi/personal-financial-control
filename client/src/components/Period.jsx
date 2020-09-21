import React from 'react';
import PropTypes from 'prop-types';

export default function Period ({
  currentPeriod = '',
  onPeriodChange,
  periods = []
}) {
  return (
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
  );
}

Period.propTypes = {
  currentPeriod: PropTypes.string,
  onPeriodChange: PropTypes.func.isRequired,
  periods: PropTypes.array
}
