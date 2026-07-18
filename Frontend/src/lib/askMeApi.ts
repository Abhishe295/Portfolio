// Talks to the ask-me-backend (see the separate backend project).
// Configurable so a deployed frontend can point at a deployed backend
// instead of localhost - set VITE_ASK_ME_API_URL in a .env file at the
// frontend root if you deploy this anywhere other than localhost:8787.
const BASE_URL = import.meta.env.VITE_ASK_ME_API_URL || 'http://localhost:8787';

export interface AskMeResponse {
  answer: string;
  sources: string[];
  retrieved: { section: string; score: number }[];
  pipeline: {
    embeddingModel: string;
    vectorDatabase: string;
    llm: string;
    retrievedChunks: number;
    timings: { searchMs: number; generateMs: number; totalMs: number };
  };
}

export class AskMeError extends Error {
  constructor(message: string, public readonly status?: number) {
    super(message);
    this.name = 'AskMeError';
  }
}

export async function askQuestion(question: string): Promise<AskMeResponse> {
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}/api/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
  } catch {
    throw new AskMeError(
      "Can't reach the ask-me backend. Is it running? (npm run dev in the backend folder)"
    );
  }

  let body: any = null;
  try {
    body = await res.json();
  } catch {
    // ignore - body stays null, handled by the !res.ok branch below
  }

  if (!res.ok) {
    throw new AskMeError(body?.error || `Request failed (${res.status})`, res.status);
  }

  return body as AskMeResponse;
}
