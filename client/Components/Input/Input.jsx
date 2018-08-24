import axios from 'axios';
import React from 'react';
import FaSearch from 'react-icons/lib/fa/search';
import PropTypes from 'prop-types';
import History from '../History/History.jsx';
import { constants } from '../../utils';

import styles from './Input.css';

const { postRecordsEndpoint, getRecordsEndpoint, searchUrl } = constants;

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.getSearchRecords = this.getSearchRecords.bind(this);
    this.postSearchRecord = this.postSearchRecord.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.executeSearch = this.executeSearch.bind(this);
    this.clearSearchQuery = this.clearSearchQuery.bind(this);
    this.state = {
      searchQuery: '',
      searchRecords: [],
      inputField: null,
    };
  }

  // componentDidMount() {
  //   this.getSearchRecords();
  // }

  // getSearchRecords() {
  //   axios.get(getRecordsEndpoint).then((response) => {
  //     this.setState({ searchRecords: response.data });
  //   });
  // }

  setSearchQuery(searchQuery) {
    this.setState({ searchQuery }, this.executeSearch);
  }

  handleKeyUp(event) {
    const { searchQuery } = this.state;
    if (event.key === 'Enter' && searchQuery) {
      this.executeSearch();
    }
  }

  handleChange(event) {
    const { target } = event;
    this.setState({ inputField: target, searchQuery: target.value });
  }

  postSearchRecord() {
    const { searchQuery } = this.state;
    axios.post(postRecordsEndpoint, { searchQuery });
  }

  executeSearch() {
    this.postSearchRecord();
    this.clearSearchQuery();
    const { history } = this.props;
    const { searchQuery } = this.state;
    history.push(`${searchUrl}/${searchQuery}`);
  }

  clearSearchQuery() {
    const { inputField } = this.state;
    if (inputField) {
      this.setState({ searchQuery: '' }, () => {
        inputField.value = '';
        inputField.focus();
      });
    }
  }

  render() {
    const { searchQuery, searchRecords } = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.bar}>
          <FaSearch className={styles.icon} />
          <input
            className={styles.field}
            value={searchQuery}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            tabIndex="0"
            placeholder="Anywhere"
            maxLength={30}
            autoFocus
          />
          <span
            className={`${styles.cancel} ${searchQuery ? styles.active : ''}`}
            onClick={() => {
              if (searchQuery) {
                this.clearSearchQuery();
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter' && searchQuery) {
                this.clearSearchQuery();
              }
            }}
            role="button"
            tabIndex="0"
          >
            &times;
          </span>
        </div>
        {searchQuery && (
          <History
            searchQuery={searchQuery}
            searchRecords={searchRecords}
            handleClick={this.setSearchQuery}
          />
        )}
      </div>
    );
  }
}

Input.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
