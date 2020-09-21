import React from 'react';
import PropTypes from 'prop-types';

function Period ({
  currentPeriod = '',
  onPeriodChange,
  periods = []
}) {
  return (
    <select
      className="browser-default"
      onChange={ onPeriodChange }
      value={ currentPeriod }
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

export default Period;