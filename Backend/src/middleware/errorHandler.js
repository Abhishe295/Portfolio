export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error('[ask-me] Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong generating that answer. Please try again.' });
}
