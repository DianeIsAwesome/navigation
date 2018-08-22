require('dotenv').config()
const { Pool } = require('pg');

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
}

const pool = new Pool(config);
pool.connect((err, client2) => {
  if (err) console.log(err, client2);
});

const getSearchResults = function (searchTerm, cb) {
      const query = "SELECT * FROM searchlisting WHERE listingId = ANY (VALUES (" + searchTerm + "));";
      pool.query(query, (err, result) => {
        if (err) {
          console.log(err)
        } else {
          cb(null, result.rows)
        }
      });
};

const getSearchRecords = function (cb) {
    const query = "SELECT * FROM searchRecord WHERE searchId < 10;"
      pool.query(query, (err, result) => {
        if (err) {
          console.log(query, err)
        } else {
          console.log(result.rows[0])
          cb(null, result.rows)
        }
      });
};

const postSearchRecord = function (searchQuery, cb) {
    const query = "INSERT INTO searchlisting (title, host, city, photoURL) VALUES ('test', 'test1', 'test2', 'test3');"
      pool.query(query, (err, result) => {
        if (err) {
          console.log(query, err)
          cb(err);
        } else {
          cb(null, result.rows)
        }
      });
};

const updateSearchListing = (id, data, cb) => {
    const query = "UPDATE searchlisting SET title = 'newtitle', host = 'chris', city = 'san francisco', photoURL = 'nah' WHERE listingId = 2;"
      pool.query(query, (err, result) => {
        if (err) {
          console.log(query, err)
          cb(err);
        } else {
          cb(null, 'success')
        }
      });
}

const deleteSearchListing = (id, cb) => {
    const query = "DELETE FROM searchlisting WHERE listingId = 3;"
      pool.query(query, (err, result) => {
        if (err) {
          console.log(query, err)
          cb(err);
        } else {
          cb(null, 'Successfuly deleted')
        }
      });
}


module.exports = {
  getSearchResults,
  getSearchRecords,
  postSearchRecord,
  updateSearchListing,
  deleteSearchListing,
};
