import { pipeline } from '@xenova/transformers';

// all-MiniLM-L6-v2 outputs 384-dimensional embeddings. This is the exact
// model named in the spec (sentence-transformers/all-MiniLM-L6-v2) - the
// Xenova/ org on Hugging Face hosts ONNX ports of it that run directly in
// Node with no Python and no fine-tuning, just pre-trained inference.
export const EMBEDDING_DIM = 384;

let extractorPromise = null;

function getExtractor() {
  if (!extractorPromise) {
    extractorPromise = pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  }
  return extractorPromise;
}

// Loads (and on first-ever run, downloads + caches) the model. Call this
// once at server boot so the first real request isn't the one paying for
// the download/load time.
export async function warmUp() {
  await getExtractor();
}

// Mean-pooled, L2-normalized embedding as a plain number array (faiss-node
// wants plain arrays, not Float32Array/Tensor objects).
export async function embed(text) {
  const extractor = await getExtractor();
  const output = await extractor(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

export async function embedBatch(texts) {
  const vectors = [];
  for (const text of texts) {
    // eslint-disable-next-line no-await-in-loop -- sequential on purpose,
    // this only runs once at boot over ~40 short chunks, not per-request.
    vectors.push(await embed(text));
  }
  return vectors;
}
