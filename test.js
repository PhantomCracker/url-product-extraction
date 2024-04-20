const fs = require('fs');
const csv = require('csv-parser');
const natural = require('natural');
const { PorterStemmer } = natural;
const { KMeans } = require('ml-kmeans');

// Function to tokenize and add documents to the TF-IDF model
function addDocumentsToTFIDF(data, tfidf) {
  data.forEach(row => {
    const url = row['url'];
    const tokens = url.split('/').filter(Boolean); // Split URL by '/'
    const stemmedTokens = tokens.map(token => PorterStemmer.stem(token.toLowerCase())); // Stem tokens
    tfidf.addDocument(stemmedTokens, url);
  });
}

// Function to extract product name from URL
function extractProductName(url) {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 1];
  return lastPart.replace(/-/g, ' '); // Replace hyphens with spaces
}

// Initialize data array
const data = [];

// Read data from CSV
fs.createReadStream('./data/urls.csv')
  .pipe(csv())
  .on('data', row => {
    data.push(row);
  })
  .on('end', () => {
    // Create TF-IDF model
    const tfidf = new natural.TfIdf();

    addDocumentsToTFIDF(data, tfidf);

    // Convert TF-IDF vectors to array
    const documentsArray = tfidf.documents.map(doc => Object.keys(doc));

    // Cluster URLs
    const numClusters = 3; // You can adjust this parameter based on the number of clusters you want
    const kmeans = new KMeans();
    const clusters = kmeans.fit(documentsArray, numClusters);

    // Analyze clusters
    const clusterMap = {};
    clusters.forEach((clusterId, idx) => {
      const url = tfidf.documents[idx];
      if (!clusterMap[clusterId]) {
        clusterMap[clusterId] = [];
      }
      clusterMap[clusterId].push(url);
    });

    for (const clusterId in clusterMap) {
      const urls = clusterMap[clusterId];
      console.log(`\nCluster ${clusterId}:`);
      console.log('-------------------');
      urls.forEach(url => {
        console.log(url);
      });

      // Extract product names
      const productNames = [];
      urls.forEach(url => {
        const productName = extractProductName(url);
        if (productName) {
          productNames.push(productName);
        }
      });

      console.log('Product Names:', productNames);
    }
  });
