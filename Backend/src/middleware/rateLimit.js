import rateLimit from 'express-rate-limit';

// This endpoint costs real Groq API quota per request, and it's public -
// keep it from being hammered by a script or a bored visitor.
export const askLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many questions - please wait a moment before asking again.' },
});
