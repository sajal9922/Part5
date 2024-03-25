import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null;
  }
  return (
    <div>
      {errorMessage && <div>{errorMessage}</div>}
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

Notification.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

export default Notification;
