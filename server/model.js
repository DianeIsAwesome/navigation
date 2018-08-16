require('dotenv').config()
const pg = require('pg');
// const cassandra = require('cassandra-driver');

const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  max_connections: 70
}

// const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'listings' });

// const getSearchResults = function (searchTerm, cb) {
//   const query = "SELECT * FROM searchlisting WHERE listingId = " + searchTerm + ";";
//   client.execute(query, (err, result) => {
//     if (err) return console.log(err);
//     console.log(result.rows);
//     cb(null, result.rows)
//   });
// };

const pool = new pg.Pool(config);
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
// execute getInfoById(5555555);
// "SELECT * FROM searchlisting WHERE listingId = 1000000;"
// "SELECT * FROM searchlisting WHERE city::text like '%san%' limit 10;"
// "SELECT * FROM searchlisting WHERE city like '%" + searchTerm + "%' limit 1000;";
// "SELECT * FROM searchlisting WHERE listingId = ANY (VALUES (" + searchTerm + "));"

// const getSearchRecords = function (cb) {
//     const query = "SELECT * FROM searchRecord WHERE searchId < 10;"
//       pool.query(query, (err, result) => {
//         if (err) {
//           console.log(query, err)
//         } else {
//           console.log(result.rows[0])
//           cb(null, result.rows)
//         }
//       });
// };

// const postSearchRecord = function (searchQuery, cb) {
//     const query = "INSERT INTO searchlisting (title, host, city, photoURL) VALUES ('test', 'test1', 'test2', 'test3');"
//       pool.query(query, (err, result) => {
//         if (err) {
//           console.log(query, err)
//           cb(err);
//         } else {
//           cb(null, result.rows)
//         }
//       });
// };

// const updateSearchListing = (id, data, cb) => {
//     const query = "UPDATE searchlisting SET title = 'newtitle', host = 'chris', city = 'san francisco', photoURL = 'nah' WHERE listingId = 2;"
//       pool.query(query, (err, result) => {
//         if (err) {
//           console.log(query, err)
//           cb(err);
//         } else {
//           cb(null, 'success')
//         }
//       });
// }

// const deleteSearchListing = (id, cb) => {
//     const query = "DELETE FROM searchlisting WHERE listingId = 3;"
//       pool.query(query, (err, result) => {
//         if (err) {
//           console.log(query, err)
//           cb(err);
//         } else {
//           cb(null, 'Successfuly deleted')
//         }
//       });
// }


module.exports = {
  getSearchResults,
  // getSearchRecords,
  // postSearchRecord,
  // updateSearchListing,
  // deleteSearchListing,
};
