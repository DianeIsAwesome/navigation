const siege = require('siege');

let sieger = siege().on(2999);

for (let i = 10000000; i > 9090000; i--) {
  sieger = sieger.for(1).times.get(`/api/searchListings/${i}`);
}

sieger.attack();
