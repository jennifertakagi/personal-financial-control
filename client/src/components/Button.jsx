import React from 'react';
import PropTypes from 'prop-types';

function Button ({
  classes = '',
  icon = '',
  label = '',
  onClick,
  type = 'button'
}) {
  return (
    <button
      className={ classes }
      onClick={ onClick }
      type={ type }
    >
      {icon ? (
        <i className={ icon }>{ label }</i>
      ) : (
        <>{ label }</>
      )}
    </button>
  );
}

Button.propTypes = {
  classes: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
}

export default Button;