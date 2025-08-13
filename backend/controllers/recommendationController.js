import getRecommendations from '../utils/recommender.js';

const recommendProducts = async (req, res) => {
  const { productId } = req.params;
  
  try {
    console.log(`Fetching recommendations for product: ${productId}`);
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    // Get priceWeight from query, default to 1
    const priceWeight = req.query.priceWeight ? parseFloat(req.query.priceWeight) : 1;
    const recommendations = await getRecommendations(productId, 5, priceWeight);
    console.log(`Found ${recommendations.length} recommendations`);
    
    res.status(200).json(recommendations);
  } catch (err) {
    console.error('Recommendation error:', err);
    res.status(500).json({ 
      error: 'Recommendation failed', 
      details: err.message,
      productId: productId 
    });
  }
};

export default recommendProducts;