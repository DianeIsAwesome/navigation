require('dotenv').config()
const faker = require('faker');
const db = require('./index.js');
const pg = require('pg');
const format = require('pg-format');


const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
}

const pool = new pg.Pool(config);
let myClient;

const imageEndpoint = 'https://s3.amazonaws.com/fec-overview-service-images';

// const insertData = () => {
//   const startDate = new Date().getSeconds();
//     pool.connect((err, client) => {
//       myClient = client;
//       for (let i = 0; i < 10000000; i++) {
//       const insertQuery = format(`INSERT INTO searchListing (title, host, city, photoURL) 
//       VALUES ('${faker.random.words()}', '${faker.name.findName()}${i}', '${faker.address.city()}', '${imageEndpoint}/home_${5}.jpg');`)
//         myClient.query(insertQuery, (err, result) => {
//           if (err) console.log(insertQuery, err);
//           console.log(i);
//           if (i === 9999999) console.log('difference', (new Date()).getMinutes() - startDate)
//         })
//       }
//     })
// }
// insertData();


// const listingCount = 101;

// const generateFakeSearchListing = function (id) {
//   return {
//     listingId: id,
//     title: faker.random.words(),
//     host: faker.name.findName(),
//     city: faker.address.city(),
//     photo: `${imageEndpoint}/home_${id % 5}.jpg`,
//   };
// };

// const generateData = function () {
//   const searchListings = [];
//   for (let i = 0; i < listingCount; i++) {
//     searchListings.push(generateFakeSearchListing(i));
//   }
//   return {
//     SearchListing: searchListings,
//   };
// };

// const initializeData = function () {
//   const data = generateData();
//   const processes = [];
//   Object.keys(db).forEach((model) => {
//     processes.push(
//       db[model]
//         .find({})
//         .remove()
//         .exec()
//         .then(() => db[model].insertMany(data[model]))
//         .catch((err) => {
//           console.log(`Error initializing data for ${model}, ${err}`);
//           process.exit(-1);
//         })
//     );
//   });
//   Promise.all(processes).then(() => process.exit(0));
// };

// initializeData();
