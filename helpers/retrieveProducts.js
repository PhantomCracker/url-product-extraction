function getProductUrls(data) {
    const productUrls = {};
    const categoryUrls = {};
    let count = 0;
    let countCategories = 0;
  
    for (const domain in data) {
      productUrls[domain] = [];
      categoryUrls[domain] = [];
  
      for (const url of data[domain]) {
        if (url.includes("/product/") || url.includes("?product=") || url.includes("product")) {
          productUrls[domain].push(url);
          count++;

          if (url.includes("/category/") || url.includes("?category=") || url.includes("category")) {
            countCategories++;
          }
        }
      }
    }
    console.log("No of products: ", count);
    console.log("No of categories: ", countCategories);
    return productUrls;
  }

module.exports = {
    getProductUrls: getProductUrls
}