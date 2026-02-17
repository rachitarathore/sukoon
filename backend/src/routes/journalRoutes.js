// Journal route: saves a daily thought and AI summary.
import express from 'express';
import { summarizeJournal } from '../services/geminiService.js';
import { saveJournalEntry, getRecentJournalEntries } from '../services/supabaseService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { entry, userId = 'demo-user' } = req.body;

    if (!entry) {
      return res.status(400).json({ error: 'Journal entry is required.' });
    }

    const aiSummary = await summarizeJournal(entry);
    const saved = await saveJournalEntry({ userId, entry, aiSummary });

    return res.status(201).json(saved);
  } catch (error) {
    console.error('Journal create error:', error.message);
    return res.status(500).json({ error: 'Failed to save journal entry.' });
  }
});

router.get('/recent', async (req, res) => {
  try {
    const userId = req.query.userId || 'demo-user';
    const entries = await getRecentJournalEntries(userId);
    return res.json(entries);
  } catch (error) {
    console.error('Journal fetch error:', error.message);
    return res.status(500).json({ error: 'Failed to load journal entries.' });
  }
});

export default router;
