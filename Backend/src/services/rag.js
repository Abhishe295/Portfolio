import { search } from './vectorStore.js';
import { generateAnswer } from './groq.js';
import { env } from '../config/env.js';

const TOP_K = 5;
// Below this cosine-similarity score a chunk is probably not actually
// relevant - still passed to the LLM (it's instructed to say when it
// doesn't know), but excluded from the "Sources" shown to the user so we
// don't claim we retrieved something we barely matched.
const RELEVANCE_FLOOR = 0.2;

export async function answerQuestion(question) {
  const t0 = performance.now();

  const results = await search(question, TOP_K);
  const tSearch = performance.now();

  const context = results
    .map((r, i) => `[${i + 1}] (${r.chunk.section}) ${r.chunk.text}`)
    .join('\n\n');

  const answer = await generateAnswer(question, context);
  const tGenerate = performance.now();

  const relevant = results.filter((r) => r.score >= RELEVANCE_FLOOR);
  const sources = [...new Set(relevant.map((r) => r.chunk.section))];

  return {
    answer,
    sources,
    retrieved: results.map((r) => ({
      section: r.chunk.section,
      score: Number(r.score.toFixed(4)),
    })),
    pipeline: {
      embeddingModel: 'Xenova/all-MiniLM-L6-v2',
      vectorDatabase: 'FAISS (IndexFlatIP)',
      llm: env.groqModel,
      retrievedChunks: results.length,
      timings: {
        searchMs: Math.round(tSearch - t0),
        generateMs: Math.round(tGenerate - tSearch),
        totalMs: Math.round(tGenerate - t0),
      },
    },
  };
}
