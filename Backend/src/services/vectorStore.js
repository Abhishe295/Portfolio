import faiss from 'faiss-node';
import { embed, embedBatch, EMBEDDING_DIM } from './embeddings.js';
import { knowledgeBase } from '../data/knowledge.js';

const { IndexFlatIP } = faiss;

// Embeddings are L2-normalized (see embeddings.js), so inner product IS
// cosine similarity here - IndexFlatIP gives us cosine search without
// needing a separate normalize step at query time.
let index = null;
let chunks = [];

export async function buildIndex() {
  chunks = knowledgeBase;
  const vectors = await embedBatch(chunks.map((c) => c.text));

  index = new IndexFlatIP(EMBEDDING_DIM);
  for (const vector of vectors) {
    index.add(vector);
  }

  return { count: chunks.length };
}

export function isReady() {
  return index !== null;
}

// Returns the top-k knowledge chunks for a query, each with its
// cosine-similarity score (higher = more relevant).
export async function search(question, k = 5) {
  if (!index) {
    throw new Error('Vector index has not been built yet - call buildIndex() at startup.');
  }

  const queryVector = await embed(question);
  const { distances, labels } = index.search(queryVector, Math.min(k, chunks.length));

  return labels
    .map((label, i) => ({ chunk: chunks[label], score: distances[i] }))
    .filter((r) => r.chunk);
}
