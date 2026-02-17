// Main page layout for Sukoon dashboard.
import { useEffect, useState } from 'react';
import ChatPanel from './components/ChatPanel';
import MoodDashboard from './components/MoodDashboard';
import JournalPanel from './components/JournalPanel';
import { fetchRecentJournal, fetchWeeklyMoods } from './services/api';

export default function App() {
  const [moods, setMoods] = useState([]);
  const [moodLoading, setMoodLoading] = useState(true);
  const [journalEntries, setJournalEntries] = useState([]);

  const loadMoods = async () => {
    setMoodLoading(true);
    try {
      const data = await fetchWeeklyMoods();
      setMoods(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setMoodLoading(false);
    }
  };

  const loadJournal = async () => {
    try {
      const data = await fetchRecentJournal();
      setJournalEntries(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    loadMoods();
    loadJournal();
  }, []);

  return (
    <main className="app-shell">
      <header className="hero">
        <h1>Sukoon</h1>
        <p>Your AI emotional support space for calmer days and stronger minds.</p>
      </header>

      <div className="grid-layout">
        <ChatPanel onMoodLogged={loadMoods} />
        <MoodDashboard moods={moods} loading={moodLoading} />
        <JournalPanel entries={journalEntries} onEntriesUpdate={setJournalEntries} />
      </div>
    </main>
  );
}
