import { Router } from 'express';
import { isReady } from '../services/vectorStore.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({ status: 'ok', indexReady: isReady() });
});

export default router;
