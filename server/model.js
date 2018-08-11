
require('dotenv').config()
const pg = require('pg');
const format = require('pg-format');


const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
}

const pool = new pg.Pool(config);

const getSearchResults = function (searchTerm, cb) {
    pool.connect((err, client) => {
      const query = "SELECT * FROM searchlisting WHERE city like '%" + searchTerm + "%' limit 20;";
        client.query(query, (err, result) => {
          if (err) {
            console.log(err, result)
          } else {
            cb(null, result.rows)
          }
        });
    });
};

// "SELECT * FROM searchlisting WHERE city::text like '%san%' limit 10;"
// "SELECT * FROM searchlisting WHERE city like '%" + searchTerm + "%' limit 1000;";

const getSearchRecords = function (cb) {
  pool.connect((err, client) => {
    const query = format("SELECT * FROM searchRecord WHERE searchId < 10;")
      client.query(query, (err, result) => {
        if (err) {
          console.log(query, err)
        } else {
          console.log(result.rows[0])
          cb(null, result.rows)
        }
      });
  });
};

const postSearchRecord = function (searchQuery, cb) {
  pool.connect((err, client) => {
    const query = format("INSERT INTO searchlisting (title, host, city, photoURL) VALUES ('test', 'test1', 'test2', 'test3');")
      client.query(query, (err, result) => {
        if (err) {
          console.log(query, err)
          cb(err);
        } else {
          cb(null, result.rows)
        }
      });
  });
};

const updateSearchListing = (id, data, cb) => {
  pool.connect((err, client) => {
    const query = format("UPDATE searchlisting SET title = 'newtitle', host = 'chris', city = 'san francisco', photoURL = 'nah' WHERE listingId = 2;")
      client.query(query, (err, result) => {
        if (err) {
          console.log(query, err)
          cb(err);
        } else {
          cb(null, 'success')
        }
      });
  });
}

const deleteSearchListing = (id, cb) => {
  pool.connect((err, client) => {
    const query = format("DELETE FROM searchlisting WHERE listingId = 3;")
      client.query(query, (err, result) => {
        if (err) {
          console.log(query, err)
          cb(err);
        } else {
          cb(null, 'Successfuly deleted')
        }
      });
  });
}


module.exports = {
  getSearchResults,
  getSearchRecords,
  postSearchRecord,
  updateSearchListing,
  deleteSearchListing,
};
