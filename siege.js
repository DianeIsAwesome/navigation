const siege = require('siege');

let sieger = siege().concurrent(40).on(2999);

for (let i = 10000000; i > 8090000; i--) {
    let random = Math.floor(Math.random() * i)
  sieger = sieger.for(1).times.get(`/api/searchListings/${random}`);
}

sieger.attack();
