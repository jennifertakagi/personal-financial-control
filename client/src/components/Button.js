import React from 'react';
import PropTypes from 'prop-types';

export default function Button ({
  classes = '',
  icon = '',
  label = '',
  onClick,
  styles = {},
  type = 'button'
}) {
  return (
    <button
      className={ classes }
      style={ styles }
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
  styles: PropTypes.object,
  type: PropTypes.string
}
