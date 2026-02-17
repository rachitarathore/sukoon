// Chat UI with emotion tag and crisis resources.
import { useState } from 'react';
import { sendChatMessage } from '../services/api';

export default function ChatPanel({ onMoodLogged }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      text: "Hi, I'm Sukoon 🌿 I'm here to listen and support you. How are you feeling today?",
      emotion: 'neutral'
    }
  ]);
  const [resources, setResources] = useState([]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userText = message.trim();
    setMessage('');
    setResources([]);
    setChatHistory((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const result = await sendChatMessage(userText);
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: result.reply, emotion: result.emotion }
      ]);

      onMoodLogged();

      if (result.isCrisis) {
        setResources(result.resources || []);
      }
    } catch (error) {
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: `Sorry, I couldn't respond right now. ${error.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card chat-card">
      <div className="card-header">
        <h2>AI Companion Chat</h2>
        <p>Safe, calm, and judgment-free support.</p>
      </div>

      <div className="chat-window">
        {chatHistory.map((item, index) => (
          <div key={index} className={`bubble ${item.role}`}>
            <p>{item.text}</p>
            {item.emotion && <span className="emotion-tag">Detected: {item.emotion}</span>}
          </div>
        ))}
      </div>

      {resources.length > 0 && (
        <div className="crisis-box">
          <strong>Immediate Support Resources</strong>
          <ul>
            {resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="chat-input-row">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Share what's on your mind..."
          onKeyDown={(event) => event.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
      </div>
    </section>
  );
}
