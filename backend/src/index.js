// Backend server entrypoint for API routes used by the React frontend.
import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import chatRoutes from './routes/chatRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import journalRoutes from './routes/journalRoutes.js';

const app = express();

app.use(
  cors({
    origin: config.allowedOrigin
  })
);
app.use(express.json());

app.get('/api/health', (_, res) => {
  res.json({ ok: true, message: 'Sukoon backend is running.' });
});

app.use('/api/chat', chatRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/journal', journalRoutes);

app.listen(config.port, () => {
  console.log(`Sukoon backend running on http://localhost:${config.port}`);
});
