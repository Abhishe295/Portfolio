import { Router } from 'express';
import { answerQuestion } from '../services/rag.js';
import { isReady } from '../services/vectorStore.js';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const { question } = req.body ?? {};

    if (typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'A non-empty "question" string is required.' });
    }
    if (question.length > 500) {
      return res.status(400).json({ error: 'Question is too long (max 500 characters).' });
    }
    if (!isReady()) {
      return res
        .status(503)
        .json({ error: 'The knowledge base is still warming up - try again in a few seconds.' });
    }

    const result = await answerQuestion(question.trim());
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
