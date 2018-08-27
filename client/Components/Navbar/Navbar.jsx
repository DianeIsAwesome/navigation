import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input.jsx';
import { constants, functions } from '../../utils';

import styles from './Navbar.css';

const { handleKeyUp } = functions;
const logo = `${constants.imagesEndpoint}/logo.png`;
const profilePic = `${constants.imagesEndpoint}/host_1.jpg`;

const Navbar = (props) => {
  const { history } = props;
  const goHome = () => {
    history.push('/');
  };
  return (
    <div id="Navbar" className={styles.navbar}>
      <div className={styles.search}>
        <img
          className={styles.logo}
          src={logo}
          alt="logo"
          onClick={goHome}
          onKeyUp={e => handleKeyUp(e, goHome)}
        />
        <Input history={history} />
      </div>
      <div className={styles.menu}>
        <span>
Become a host
        </span>
        <span>
Saved
        </span>
        <span>
Trips
        </span>
        <span>
Messages
        </span>
        <img src={profilePic} alt="profile pic" />
      </div>
    </div>
  );
};

Navbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

module.exports = Navbar;
