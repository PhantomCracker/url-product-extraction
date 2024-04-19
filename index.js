const fs = require('fs');
const Papa = require('papaparse');

const groupByDomain = require('./helpers/groupByDomain');
const csvFile = fs.readFileSync('./data/urls.csv', 'utf8');

const parsedData = Papa.parse(csvFile, {
  header: true,
  dynamicTyping: true,
});

const urls = [];
for (let i = 0; i < parsedData.data.length; i++) {
    urls.push(parsedData.data[i].url);
}
console.log(parsedData.data.length);

groupByDomain(urls)
  .then(groupedDomains => {
    var test = Object.keys(groupedDomains).length;
    console.log("Domains grouped successfully:", test);
  })
  .catch(error => {
    console.error("Error grouping domains:", error);
  });