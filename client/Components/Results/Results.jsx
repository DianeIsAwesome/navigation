import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import { constants, functions } from '../../utils';

import styles from './Results.css';

const { getResultsEndpoint, listingUrl } = constants;
const { handleKeyUp } = functions;

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  componentDidMount() {
    this.getSearchResults(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getSearchResults(nextProps);
  }

  getSearchResults(props) {
    const {
      match: { params },
    } = props;
    axios.get(`${getResultsEndpoint}/${params.searchQuery}`).then((response) => {
      this.setState({ searchResults: response.data });
      console.log(response.data)
    });
  }

  render() {
    const { match, history } = this.props;
    const { params } = match;
    const { searchResults } = this.state;
    return (
      <div id="Results" className={styles.container}>
        <div className={styles.summary}>
          {searchResults.length
            ? `Showing results for
          "${params.searchQuery}"`
            : `No results for "${params.searchQuery}" 🙁`}
        </div>
        <div className={styles.list}>
          {searchResults.map((searchResult, index) => (
            <Result key={`result_${index}`} history={history} searchResult={searchResult} />
          ))}
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      searchQuery: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const Result = (props) => {
  const { history, searchResult } = props;
  const {
    listingId, title, host, city, photourl,
  } = searchResult;
  const goToListing = () => {
    history.push(`${listingUrl}/${listingId}`);
  };
  return (
    <div className={styles.result}>
      <img
        className={styles.photo}
        onClick={goToListing}
        onKeyUp={e => handleKeyUp(e, goToListing)}
        role="link"
        tabIndex="0"
        src={photourl}
        alt={title}
      />
      <div className={styles.details}>
        <div
          className={styles.title}
          onClick={goToListing}
          onKeyUp={e => handleKeyUp(e, goToListing)}
          role="link"
          tabIndex="0"
        >
          {title}
        </div>
        <div className={styles.city}>
          {city}
        </div>
        <div className={styles.host}>
          {`Hosted by ${host}`}
        </div>
      </div>
    </div>
  );
};

Result.propTypes = {
  searchResult: PropTypes.shape({
    listingId: PropTypes.number,
    title: PropTypes.string,
    host: PropTypes.string,
    city: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
