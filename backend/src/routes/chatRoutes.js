// Chat route: emotion detection, crisis checks, Gemini response, and mood persistence.
import express from 'express';
import { detectEmotion } from '../services/emotionService.js';
import { detectCrisis, getCrisisResponse } from '../services/crisisService.js';
import { generateSupportReply } from '../services/geminiService.js';
import { saveMood } from '../services/supabaseService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message, userId = 'demo-user' } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const emotion = detectEmotion(message);

    if (detectCrisis(message)) {
      const crisis = getCrisisResponse();
      return res.json({
        reply: crisis.message,
        emotion,
        isCrisis: true,
        resources: crisis.resources
      });
    }

    const reply = await generateSupportReply(message, emotion);

    try {
      await saveMood({ userId, mood: emotion, message });
    } catch (dbError) {
      console.error('Mood save failed:', dbError.message);
    }

    return res.json({ reply, emotion, isCrisis: false, resources: [] });
  } catch (error) {
    console.error('Chat route error:', error.message);
    return res.status(500).json({ error: 'Unable to process your message right now.' });
  }
});

export default router;
