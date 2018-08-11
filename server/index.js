const { createBackgroundTransaction, endTransaction } = require('newrelic');
const cluster = require('cluster');
require('dotenv').config()
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const model = require('./model');

const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

function masterProcess() {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }
  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
  });

  // process.exit();
}

function childProcess() {
  console.log(`Worker ${process.pid} started`);



// createBackgroundTransaction('get search records', () => {
//   axios.get('/api/searchRecords')
//     .then(() => endTransaction())
//     .catch(() => endTransaction());
// });

const port = process.env.PORT || 2999;

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());

// app.get('/api/searchRecords', (req, res) => {
//   console.log('get search records called to server')
//   model.getSearchRecords((err, results) => {
//     if (err) console.log(err);
//     res.statusCode = err ? 400 : 200;
//     res.send(err || results);
//   });
// });

app.get('/api/searchListings/:searchQuery', (req, res) => {
  const { searchQuery } = req.params;
  model.getSearchResults(searchQuery, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.post('/api/searchRecords', (req, res) => {
  const { searchQuery } = req.body;
  res.header('Access-Control-Allow-Origin', '*');
  model.postSearchRecord(searchQuery, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.patch('/api/searchListings/:listingId', (req, res) => {
  model.updateSearchListing(req.params.listingId, req.body, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.delete('/api/searchListings/:listingId', (req, res) => {
  model.deleteSearchListing(req.params.listingId, (err, results) => {
    if (err) console.log(err);
    res.statusCode = err ? 400 : 200;
    res.send(err || results);
  });
});

app.use('/', express.static(path.join(__dirname, '../public/')));
app.use('/search/:query', express.static(path.join(__dirname, '../public/')));
app.use('/listing:listingId', express.static(path.join(__dirname, '../public/')));

// app.get('/*', (req, res) => {
//   res.sendFile(path.resolve(`${__dirname}/../public/index.html`));
// });


app.listen(port, () => console.log(`Listening on port ${port}!`));
// process.exit();
}

// module.exports = app;
