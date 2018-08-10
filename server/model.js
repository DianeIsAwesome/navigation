
require('dotenv').config()
const pg = require('pg');
const format = require('pg-format');


const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
}

const pool = new pg.Pool(config);
let myClient;

const getSearchResults = function (searchTerm, cb) {
    pool.connect((err, client) => {
      myClient = client;
      const query = format("SELECT * FROM searchListing WHERE listingId = " + searchTerm + ";")
        myClient.query(query, (err, result) => {
          if (err) {
            console.log(query, err)
          } else {
            cb(null, result.rows)
          }
        })
    })
}


// const getSearchRecords = function (callback) {
//   models.SearchRecord.find({})
//     .sort('-createdAt')
//     .exec(callback);
// };

// const postSearchRecord = function (searchQuery, callback) {
//   const searchRecord = new models.SearchRecord({ text: searchQuery, createdAt: new Date() });
//   searchRecord
//     .save()
//     .then(results => callback(null, results))
//     .catch(err => callback(err));
// };

// const updateSearchListing = (id, data, cb) => {
//   models.SearchListing.findByIdAndUpdate(id, data, {new: true}, (err, result) => {
//     if (err) console.log(err);
//     return cb(null, result);
//   })
// }

// const deleteSearchListing = (id, cb) => {
//   models.SearchListing.findByIdAndRemove(id, (err, results) => {  
//     if (err) console.log(err);

//     const response = {
//         message: "Successfully deleted",
//         id: id
//     };
//     return cb(null, response)
//   });
// }


module.exports = {
  getSearchResults,
  // getSearchRecords,
  // postSearchRecord,
  // updateSearchListing,
  // deleteSearchListing,
};
