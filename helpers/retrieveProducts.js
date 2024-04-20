function getProductUrls(data) {
    const productUrls = {};
    let count = 0;
  
    for (const domain in data) {
      productUrls[domain] = [];
  
      for (const url of data[domain]) {
        if (url.includes("/product/") || url.includes("?product=")) {
          productUrls[domain].push(url);
          count++;
        }
      }
    }
    console.log(count);
    return productUrls;
  }

module.exports = {
    getProductUrls: getProductUrls
}