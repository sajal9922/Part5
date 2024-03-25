import React from 'react';
import propTypes from 'prop-types';

const Logout = ({ handleLogout }) => {
  return <button onClick={handleLogout}>Logout</button>;
};
Logout.propTypes = {
  handleLogout: propTypes.func.isRequired,
};
export default Logout;
