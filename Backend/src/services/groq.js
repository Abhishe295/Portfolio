import Groq from 'groq-sdk';
import { env } from '../config/env.js';

const groq = new Groq({ apiKey: env.groqApiKey });

const SYSTEM_PROMPT = `You are "Ask Me", the portfolio assistant embedded in Abhishek Kumar Pundir's
personal desktop-style portfolio site. Visitors (mostly recruiters and engineers) ask you questions
about Abhishek, and you answer using ONLY the context chunks provided below the question.

Rules:
- Refer to him as "Abhishek" by name - especially to open an answer - rather than leaning on "he"/"his"
  for every sentence. A natural mix reads like a person talking about a colleague, not a pronoun drill;
  when in doubt, prefer the name.
- Use ONLY the provided context. If the context doesn't contain the answer, say so plainly instead of
  guessing or inventing details - never invent metrics, employers, projects, or technologies that
  aren't in the context.
- Be concise and specific. Prefer concrete facts (project names, numbers, technologies) over vague
  filler. Aim for 2-5 sentences unless the question genuinely needs more.
- No markdown headers or bullet lists unless the question is naturally a list (e.g. "what technologies
  do you use") - otherwise write in plain, natural sentences.
- Stay warm and professional - this represents Abhishek to people evaluating him.`;

// context is the assembled retrieved-chunk text, question is the raw
// user question. Returns the model's plain-text answer.
export async function generateAnswer(question, context) {
  const completion = await groq.chat.completions.create({
    model: env.groqModel,
    temperature: 0.4,
    max_tokens: 500,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Context about Abhishek:\n\n${context}\n\nQuestion: ${question}`,
      },
    ],
  });

  return completion.choices[0]?.message?.content?.trim() || "I couldn't generate a response for that - try rephrasing the question.";
}