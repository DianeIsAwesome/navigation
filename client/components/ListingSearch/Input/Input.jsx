import React from 'react';
import PropTypes from 'prop-types';

import styles from './Input.css';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.clearSearchQuery = this.clearSearchQuery.bind(this);
    this.state = {
      searchQuery: '',
      inputField: null,
    };
  }

  handleChange(event) {
    const target = event.target;
    this.setState({ inputField: target, searchQuery: target.value });
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.props.getSearchResults(this.state.searchQuery);
      this.clearSearchQuery();
    }
  }

  clearSearchQuery() {
    if (this.state.inputField) {
      this.setState({ searchQuery: '' }, () => {
        this.state.inputField.value = '';
        this.state.inputField.focus();
      });
    }
  }

  render() {
    const { searchQuery } = this.state;
    return (
      <div className={styles.container}>
        <span className={styles.icon}>
🔎
        </span>
        <input
          className={styles.field}
          value={searchQuery}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
          placeholder="Anywhere"
          autoFocus
        />

        <span
          className={`${styles.cancel} ${searchQuery ? styles.active : ''}`}
          onClick={() => {
            if (searchQuery) {
              this.clearSearchQuery();
            }
          }}
        >
          &times;
        </span>
      </div>
    );
  }
}
