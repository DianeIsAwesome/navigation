require('dotenv').config()
const faker = require('faker');
const pg = require('pg');
const format = require('pg-format');


const config = {
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
}

const pool = new pg.Pool(config);
let myClient;

const queryDB = () => {
  const startDate = new Date()
    pool.connect((err, client) => {
      myClient = client;
      const query = format(`select * from searchRecord where searchId = 1;`)
        myClient.query(query, (err, result) => {
          if (err) {
            return console.log(insertQuery, err);
          } 
          console.log('difference', (new Date()) - startDate, startDate, new Date());
        })
    })
    console.log('https://s3.amazonaws.com/fec-overview-service-images/home_5.jpg'.length)
}
queryDB();