# ask-me-backend

RAG backend for the `ask-me.app` portfolio assistant window.

Pipeline: your question → embedded locally with `Xenova/all-MiniLM-L6-v2`
(via `@xenova/transformers`, runs in plain Node, no Python) → top-5 chunks
retrieved from an in-memory FAISS index (`faiss-node`) built from
`src/data/knowledge.js` → question + retrieved chunks sent to Groq → answer
streamed back with its sources and pipeline metadata.

## Setup

```bash
npm install
cp .env.example .env
# then edit .env and paste in a free key from https://console.groq.com/keys
npm run dev
```

First boot downloads the embedding model weights (~90MB, cached in
`~/.cache/huggingface` afterward) and builds the FAISS index in memory -
takes a few seconds. You'll see:

```
[ask-me] Loading embedding model (Xenova/all-MiniLM-L6-v2)...
[ask-me] Building the portfolio knowledge index...
[ask-me] Indexed 46 knowledge chunks.
[ask-me] Backend ready → http://localhost:8787
```

## API

**`GET /api/health`**
```json
{ "status": "ok", "indexReady": true }
```

**`POST /api/ask`**
```json
// request
{ "question": "What project best demonstrates backend development?" }

// response
{
  "answer": "...",
  "sources": ["Projects", "Skills"],
  "retrieved": [{ "section": "Projects", "score": 0.71 }, ...],
  "pipeline": {
    "embeddingModel": "Xenova/all-MiniLM-L6-v2",
    "vectorDatabase": "FAISS (IndexFlatIP)",
    "llm": "openai/gpt-oss-120b",
    "retrievedChunks": 5,
    "timings": { "searchMs": 12, "generateMs": 640, "totalMs": 652 }
  }
}
```
Rate-limited to 12 requests/minute per IP (`src/middleware/rateLimit.js`) -
this endpoint spends real Groq quota, so it's worth keeping that in place
even after deploying.

## Updating what the assistant knows

Edit `src/data/knowledge.js` - it's a plain array of `{ section, text }`
chunks, no build step, no re-training. Restart the server and it
re-embeds and rebuilds the index from the new content on boot.

## Deploying

This needs to run as a long-lived Node process (not serverless functions,
since the embedding model and FAISS index live in memory and are built
once at boot) - Render, Railway, Fly.io, or a small VPS all work. Whatever
you use, set `GROQ_API_KEY` and `CORS_ORIGIN` (your deployed frontend's
real origin) as environment variables there - never commit `.env`.
