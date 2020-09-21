import React from 'react';

import loadingIcon from '../assets/icons/loading.gif';

export default function Spinner() {
  return (
    <div id="spinner">
      <img
        src={ loadingIcon }
        alt="Loading..."
      />
    </div>
  );
}
