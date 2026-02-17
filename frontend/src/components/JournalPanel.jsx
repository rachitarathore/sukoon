// Journal composer with AI-generated emotional pattern summary.
import { useState } from 'react';
import { fetchRecentJournal, saveJournal } from '../services/api';

export default function JournalPanel({ entries, onEntriesUpdate }) {
  const [entry, setEntry] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!entry.trim() || saving) return;

    setSaving(true);
    try {
      await saveJournal(entry.trim());
      const updated = await fetchRecentJournal();
      onEntriesUpdate(updated);
      setEntry('');
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="card journal-card">
      <div className="card-header">
        <h2>AI Journal</h2>
        <p>Write daily thoughts and get gentle insight from AI.</p>
      </div>

      <textarea
        value={entry}
        onChange={(event) => setEntry(event.target.value)}
        placeholder="Today I felt..."
        rows={4}
      />

      <button className="primary" onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save Journal Entry'}
      </button>

      <div className="journal-history">
        {entries.map((item) => (
          <article key={item.id} className="journal-entry">
            <p>{item.entry}</p>
            <small>AI Insight: {item.ai_summary}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
