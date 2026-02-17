// Handles all Gemini API prompts so chat and journaling logic stays reusable.
import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config.js';

let model;

function getModel() {
  if (!config.geminiApiKey) {
    throw new Error('Missing GEMINI_API_KEY in backend/.env');
  }

  if (!model) {
    const client = new GoogleGenerativeAI(config.geminiApiKey);
    model = client.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  return model;
}

export async function generateSupportReply(userMessage, detectedEmotion) {
  const prompt = `You are Sukoon, a compassionate mental wellness companion for students and young adults.

Rules:
- Sound human, warm, and non-judgmental.
- Validate feelings without being dramatic.
- Keep response practical and short (80-140 words).
- Offer one small actionable coping step.
- Never claim to be a doctor.

Detected emotion: ${detectedEmotion}
User message: "${userMessage}"

Return only the assistant response text.`;

  const result = await getModel().generateContent(prompt);
  return result.response.text().trim();
}

export async function summarizeJournal(entry) {
  const prompt = `You are a gentle emotional wellness assistant.
Summarize the emotional pattern in this journal entry in 2-3 sentences.
End with one encouraging sentence.

Journal entry: "${entry}"

Return only the summary.`;

  const result = await getModel().generateContent(prompt);
  return result.response.text().trim();
}
