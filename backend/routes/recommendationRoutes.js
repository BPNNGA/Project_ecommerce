import express from 'express';
import recommendProducts from '../controllers/recommendationController.js';

const router = express.Router();

router.get('/recommendations/:productId', recommendProducts);

export default router;