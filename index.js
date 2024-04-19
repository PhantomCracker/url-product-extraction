const fs = require('fs');
const Papa = require('papaparse');

const csvFile = fs.readFileSync('./data/urls.csv', 'utf8');

const parsedData = Papa.parse(csvFile, {
  header: true,
  dynamicTyping: true,
});

console.log(parsedData.data);