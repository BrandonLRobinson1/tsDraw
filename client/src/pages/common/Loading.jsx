import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const Loading = () => (
  <div className="loading-container">
    <FontAwesomeIcon className="spinner" size="sm" icon={solid('spinner')} />
  </div>
);

export default Loading;
