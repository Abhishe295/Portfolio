// Talks to the ask-me-backend (see the separate backend project).
// The backend's URL always comes from VITE_ASK_ME_API_URL (see .env.example
// at the frontend root) - never hardcoded here, so pointing this at a
// deployed backend later is just an env change, not a code change.
const BASE_URL = import.meta.env.VITE_ASK_ME_API_URL;

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
  if (!BASE_URL) {
    throw new AskMeError(
      'VITE_ASK_ME_API_URL is not set. Copy .env.example to .env at the frontend root and set it.'
    );
  }

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