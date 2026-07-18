import { env } from './config/env.js';
import { createApp } from './app.js';
import { buildIndex } from './services/vectorStore.js';
import { warmUp } from './services/embeddings.js';

async function main() {
  console.log('[ask-me] Loading embedding model (Xenova/all-MiniLM-L6-v2)...');
  console.log('[ask-me] (First run downloads ~90MB of model weights - cached after that.)');
  await warmUp();

  console.log('[ask-me] Building the portfolio knowledge index...');
  const { count } = await buildIndex();
  console.log(`[ask-me] Indexed ${count} knowledge chunks.`);

  const app = createApp();
  app.listen(env.port, () => {
    console.log(`[ask-me] Backend ready → http://${env.host}:${env.port}`);
    console.log(`[ask-me] Allowing requests from → ${env.corsOrigin}`);
  });
}

main().catch((err) => {
  console.error('[ask-me] Failed to start:', err);
  process.exit(1);
});