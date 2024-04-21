const fs = require('fs');

function getProductUrls(data) {
    const fileWriteStream = fs.createWriteStream('products.csv');
    fileWriteStream.write('URL,category,product\n', 'utf8');
    const productUrls = {};
    const categoryUrls = {};
    let count = 0;
    let countCategories = 0;
  
    for (const domain in data) {
      productUrls[domain] = [];
      categoryUrls[domain] = [];
  
      for (const url of data[domain]) {
        let category = '""';
        let product = '""';
        if (url.pathname === '/') {
          category = 'None';
          product = 'None';
        } else if (url.currentUrl.includes("/product/") || url.currentUrl.includes("?product=") | url.currentUrl.includes("product")) {
          productUrls[domain].push(url);
          product = url.pathname.split('/').pop();
          count++;

          if (url.currentUrl.includes("/category/") || url.currentUrl.includes("?category=") || url.currentUrl.includes("category")) {
            countCategories++;
          }
        }
        
        fileWriteStream.write(`${url.currentUrl},${category},${product}\n`);
      }
    }
    console.log("No of products: ", count);
    console.log("No of categories: ", countCategories);
    return productUrls;
  }

module.exports = {
    getProductUrls: getProductUrls
}