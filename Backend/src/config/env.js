import 'dotenv/config';

const required = ['GROQ_API_KEY'];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`\n[ask-me] Missing required environment variable: ${key}`);
    console.error('[ask-me] Copy .env.example to .env and fill in your Groq API key.\n');
    process.exit(1);
  }
}

export const env = {
  port: Number(process.env.PORT) || 8787,
  groqApiKey: process.env.GROQ_API_KEY,
  // llama-3.3-70b-versatile is being retired by Groq (deprecated June 2026,
  // shutting down ~August 2026). openai/gpt-oss-120b is Groq's recommended,
  // currently-supported replacement as of this writing. Override via env
  // if that changes - check https://console.groq.com/docs/models.
  groqModel: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};
