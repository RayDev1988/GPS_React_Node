const moment = require('moment')
let current = new Date();
console.log(current)
console.log(moment(current));

let utc = new Date(Date.UTC(2022,5,3,18,40,0));
console.log(utc)
console.log(moment(utc));