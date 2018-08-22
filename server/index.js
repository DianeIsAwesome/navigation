require('dotenv').config()
const newrelic = require('newrelic');
const cluster = require('cluster');
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const model = require('./model');
const numCPUs = require('os').cpus().length;
const redis = require("redis");
const compression = require('compression');  



const masterProcess = () => {
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('online', function(worker) {
  });
  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });
}

const childProcess = () => {
  const port = process.env.PORT || 2999;
  const app = express();
  
  app.use(compression());
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));
  app.use(cors());

  app.get('/api/searchRecords', (req, res) => {
    console.log('get search records called to server')
    model.getSearchRecords((err, results) => {
      if (err) console.log(err);
      res.statusCode = err ? 400 : 200;
      res.send(err || results);
    });
  });
  
  const redisAddress = process.env.REDIS;
  const client = redis.createClient(redisAddress);

  app.get('/api/searchListings/:searchQuery', (req, res) => {
    const { searchQuery } = req.params;
    client.get(searchQuery, (err, results) => {
      if (results) {
        res.send(results);
      } else {
        model.getSearchResults(searchQuery, (err, results) => {
          if (err) console.log(err);
          res.statusCode = err ? 400 : 200;
          if (results) client.setex(searchQuery, 300, JSON.stringify(results));
          res.send(err || results);
        });
      }
    })
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

  app.listen(port, () => console.log(`Listening on port ${port}!`));
}

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

