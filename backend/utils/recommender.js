import productModel from '../models/productModel.js';
function preprocessText(product) {
  return `${product.name} ${product.description} ${product.category} ${product.subCategory} ${product.brand || ''} ${(product.tags || []).join(' ')}`.toLowerCase();
}
function normalizePrice(price, min, max) {
  return (max - min) > 0 ? (price - min) / (max - min) : 0;
}
// Helper to tokenize text
function tokenize(text) {
  return text.split(/\W+/).filter(Boolean);
}
// Build vocabulary from all documents
function buildVocabulary(corpus) {
  const vocabSet = new Set();
  corpus.forEach(doc => {
    tokenize(doc).forEach(token => vocabSet.add(token));
  });
  return Array.from(vocabSet);
}
// Compute term frequency for a document
function termFrequency(tokens, vocab) {
  const tf = Array(vocab.length).fill(0);
  tokens.forEach(token => {
    const idx = vocab.indexOf(token);
    if (idx !== -1) tf[idx] += 1;
  });
  const total = tokens.length;
  return tf.map(count => total > 0 ? count / total : 0);
}
// Compute inverse document frequency for the corpus
function inverseDocumentFrequency(corpus, vocab) {
  const N = corpus.length;
  return vocab.map(term => {
    const containing = corpus.reduce((acc, doc) => acc + (tokenize(doc).includes(term) ? 1 : 0), 0);
    return Math.log((N + 1) / (containing + 1)) + 1; // Smoothing
  });
}
// Compute TF-IDF vector for a document
function tfidfVector(tokens, vocab, idf) {
  const tf = termFrequency(tokens, vocab);
  return tf.map((val, i) => val * idf[i]);
}

async function getRecommendations(productId, topN = 10, priceWeight = 1) {
  try {
    console.log(`Getting recommendations for product: ${productId}`);
    
    const products = await productModel.find();
    console.log(`Total products in database: ${products.length}`);
    
    if (products.length === 0) {
      console.log('No products found in database');
      return [];
    }
    
    if (products.length === 1) {
      console.log('Only one product in database, no recommendations possible');
      return [];
    }

    const textCorpus = products.map(preprocessText);
    const vocab = buildVocabulary(textCorpus);
    const idf = inverseDocumentFrequency(textCorpus, vocab);
    const tfidfVectors = textCorpus.map(doc => tfidfVector(tokenize(doc), vocab, idf));

    const prices = products.map(p => p.price).filter(price => price !== undefined && price !== null);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    const vectors = products.map((product, index) => {
      const vec = [...tfidfVectors[index]];
      // Apply price weight
      vec.push(normalizePrice(product.price, minPrice, maxPrice) * priceWeight);
      return vec;
    });

    const targetIndex = products.findIndex(p => p._id.toString() === productId);
    console.log(`Target product index: ${targetIndex}`);
    
    if (targetIndex === -1) {
      console.log(`Product with ID ${productId} not found`);
      return [];
    }

    function cosineSimilarity(a, b) {
      if (a.length !== b.length) return 0;
      
      let dot = 0, normA = 0, normB = 0;
      for (let i = 0; i < a.length; i++) {
        dot += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
      }
      return dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1);
    }

    const similarities = vectors.map((vec, i) => {
      if (i === targetIndex) return -1;
      return cosineSimilarity(vectors[targetIndex], vec);
    });

    const recommendations = similarities
      .map((score, i) => ({ score, i }))
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)
      .map(entry => products[entry.i]);
    
    console.log(`Generated ${recommendations.length} recommendations`);
    return recommendations;
  } catch (error) {
    console.error('Error in getRecommendations:', error);
    throw error;
  }
}
export default getRecommendations;