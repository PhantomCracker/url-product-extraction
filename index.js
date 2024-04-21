const fs = require('fs');
const Papa = require('papaparse');

const groupByDomain = require('./helpers/groupByDomain');
const retrieveProducts = require('./helpers/retrieveProducts');
const openAiHelper = require('./helpers/openAIHelper');
// const tensorFlowHelper = require('./helpers/tfHelper.js')

const csvFile = fs.readFileSync('./data/urls.csv', 'utf8');

let timeBefore = Date.now();

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
    let products = retrieveProducts.getProductUrls(groupedDomains);
    for (let i = 0; i < parsedData.data.length; i++) {
      let prompt = "does the following url have a product name in it? " + parsedData.data[i].url;
      // openAiHelper.callForHelp(prompt);
    }
    // tensorFlowHelper.predictProductName(urls);
    console.log(groupedDomains);
  })
  .catch(error => {
    console.error("Error grouping domains:", error);
  });

let timeAfter = Date.now();

console.log("Running time: ", timeAfter - timeBefore);

// console.log(parsedData.data);

// openAiHelper.callForHelp("hellooo");