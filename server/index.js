require('dotenv').config()
const { createBackgroundTransaction, endTransaction } = require('newrelic');
const cluster = require('cluster');
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');
const model = require('./model');
const numCPUs = require('os').cpus().length;
const redis = require("redis");
const http = require('http');
http.globalAgent.maxSockets = Infinity;



const masterProcess = () => {
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

const childProcess = () => {
  console.log(`Worker ${process.pid} started`);

  const port = process.env.PORT || 2999;
  const compression = require('compression');  
  
  const app = express();
  
  app.use(compression())
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

  
  const redisAddress = process.env.REDIS;
  
  const client = redis.createClient(redisAddress);

  app.get('/api/searchListings/:searchQuery', (req, res) => {
    const { searchQuery } = req.params;
    client.get('api/searchListings/' + searchQuery, (err, results) => {
      if (results) {
        console.log("Cache hit for " + searchQuery, results);
        res.send(results);
      } else {
        model.getSearchResults(searchQuery, (err, results) => {
          if (err) console.log(err);
          res.statusCode = err ? 400 : 200;
          if (results) client.setex('api/searchListings/' + searchQuery, 300, JSON.stringify(results));
          res.send(err || results);
        });
      }
    })
  });
  
  // app.get("/schools", (req, resp) => {
  //   let terms = req.query.name;
  //   client.get("schools/" + terms, (err, result) => {
  //     if (result != null) {
  //       console.log("Cache hit for " + terms);
  //       resp.send(result);
  //     } else {
  //       console.log("Cache missed for " + terms);
  //       fetch(
  //         "https://api.data.gov/ed/collegescorecard/v1/schools?api_key=" +
  //           apikey +
  //           "&school.name=" +
  //           terms +
  //           "&fields=school.name,location.lon,location.lat&per_page=100"
  //       )
  //         .then(res => res.json())
  //         .then(json => {
  //           client.setex("schools/" + terms, 300, JSON.stringify(json));
  //           resp.send(json);
  //         })
  //         .catch(err => {
  //           console.error(err);
  //           resp.send(202);
  //         });
  //     }
  //   });
  //   return;
  // });


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

if (cluster.isMaster) {
  masterProcess();
} else {
  childProcess();  
}

// module.exports = app;
