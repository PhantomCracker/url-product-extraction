const url = require('url');

const retrieveProducts = require('../helpers/retrieveProducts');

module.exports = function groupByDomain(urls) {
  return new Promise((resolve, reject) => {
    try {
      const domains = urls.reduce((domains, currentUrl) => {
        if (typeof currentUrl === 'string') { // Check if it's a string because this ******* wants a string :)
          const parsedUrl = url.parse(currentUrl);
          const domain = parsedUrl.hostname;
          const pathname = parsedUrl.pathname;
          let data = {
            currentUrl: currentUrl,
            pathname: pathname
          }
          domains[domain] = domains[domain] || [];
          domains[domain].push(data);
        }
        return domains;
      }, {});
      retrieveProducts.getProductUrls(domains);
      resolve(domains);
    } catch (error) {
      reject(error);
    }
  });
}