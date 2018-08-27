import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input.jsx';

import styles from './Landing.css';

const Landing = (props) => {
  const { history } = props;
  return (
    <div id="Landing" className={styles.container}>
      <div className={styles.screen}>
        <div className={styles.title}>
          {'Find your Halal...'}
        </div>
        <Input history={history} />
      </div>
    </div>
  );
};

Landing.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

module.exports = Landing;
