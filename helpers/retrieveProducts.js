function getProductUrls(data) {
    const productUrls = {};
  
    for (const domain in data) {
      productUrls[domain] = [];
  
      for (const url of data[domain]) {
        if (url.includes("/product/") || url.includes("?product=")) {
          productUrls[domain].push(url);
        }
      }
    }
    if (productUrls.length > 0) {
        console.log(productUrls);
    }
    return productUrls;
  }

module.exports = {
    getProductUrls: getProductUrls
}