const fs = require('fs');
const faker = require('faker');

// const imageEndpoint = 'https://s3.amazonaws.com/fec-overview-service-images';
const imageEndpoint = 'https://s3.amazonaws.com/sdc-images-vacationdb';
let file;
const houseOptions = [0, 1, 2, 3, 4];

file = fs.createWriteStream('./data/listingData0-10.csv');
for (let i = 0; i < 10000000; i++) {
    const randHouse = houseOptions[Math.floor((Math.random() * houseOptions.length))]
    file.write(`${i},house${i},${faker.name.findName()},${faker.address.city()},${imageEndpoint}/house${randHouse}.jpg\n`)
}
file.end();

const months = ['01', '02', '03', '04', '05', '06', '07'];
const days = ['01','02','03','04','05','15','16','17','18','28','25'];

// file = fs.createWriteStream('./data/recordsData0-10.csv');
// for (let i = 0; i < 10000000; i++) {
//     const randomMonth = months[Math.floor(Math.random() * months.length)]
//     const randomDay = days[Math.floor(Math.random() * days.length)]
//     file.write(`${i},house${i},${faker.address.city()},${faker.lorem.sentence()},2018-${randomMonth}-${randomDay}\n`)
// }
// file.end();

