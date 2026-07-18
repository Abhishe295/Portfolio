import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import askRouter from './routes/ask.js';
import healthRouter from './routes/health.js';
import { askLimiter } from './middleware/rateLimit.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json({ limit: '10kb' }));

  app.use('/api/health', healthRouter);
  app.use('/api/ask', askLimiter, askRouter);

  app.use((req, res) => {
    res.status(404).json({ error: 'Not found.' });
  });

  app.use(errorHandler);

  return app;
}
