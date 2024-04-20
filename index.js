const fs = require('fs');
const Papa = require('papaparse');

const groupByDomain = require('./helpers/groupByDomain');
const retrieveProducts = require('./helpers/retrieveProducts');
const openAiHelper = require('./helpers/openAIHelper');

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
    // console.log("Domains grouped successfully:", groupedDomains);
    // for (let domain in groupedDomains) {
    //     if (groupedDomains[domain]) {
    //         let prompt = "Can you tell me which of the following urls contain product names? \n" + groupedDomains[domain];
    //         openAiHelper.callForHelp(prompt);
    //     }
    // }
    // for (let i = 0; i < Object.keys(groupedDomains).length; i++) {
        // console.log(groupedDomains[]);
    // }
    // let products = retrieveProducts.getProductUrls(groupedDomains);
    // openAiHelper.callForHelp(prompt);
    // console.log(products);
  })
  .catch(error => {
    console.error("Error grouping domains:", error);
  });

let timeAfter = Date.now();

console.log("Running time: ", timeAfter - timeBefore);

// console.log(parsedData.data);

// openAiHelper.callForHelp("hellooo");