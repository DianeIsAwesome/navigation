const siege = require('siege');

let sieger = siege().concurrent(20).on('http://ec2-34-207-86-213.compute-1.amazonaws.com:2999');

for (let i = 10000000; i > 9990000; i--) {
    let random = Math.floor(Math.random() * i)
  sieger = sieger.for(1).times.get(`/api/searchListings/${random}`);
}

sieger.attack();
