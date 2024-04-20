const fs = require('fs');
const Papa = require('papaparse');

const groupByDomain = require('./helpers/groupByDomain');
const retrieveProducts = require('./helpers/retrieveProducts');

const csvFile = fs.readFileSync('./data/urls.csv', 'utf8');

const parsedData = Papa.parse(csvFile, {
  header: true,
  dynamicTyping: true,
});

const urls = [];
for (let i = 0; i < parsedData.data.length; i++) {
    urls.push(parsedData.data[i].url);
}

groupByDomain(urls)
  .then(groupedDomains => {
    // console.log("Domains grouped successfully:", groupedDomains);
    let domainsWithProducts = retrieveProducts.getProductUrls(groupByDomain);
    console.log(domainsWithProducts);
  })
  .catch(error => {
    console.error("Error grouping domains:", error);
  });