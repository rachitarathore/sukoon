// Mood route: fetches recent mood data for the weekly chart.
import express from 'express';
import { getWeeklyMoods } from '../services/supabaseService.js';

const router = express.Router();

router.get('/weekly', async (req, res) => {
  try {
    const userId = req.query.userId || 'demo-user';
    const moods = await getWeeklyMoods(userId);
    return res.json(moods);
  } catch (error) {
    console.error('Weekly moods error:', error.message);
    return res.status(500).json({ error: 'Failed to load weekly moods.' });
  }
});

export default router;
