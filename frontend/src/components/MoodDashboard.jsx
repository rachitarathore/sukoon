// Displays weekly mood trend and recent entries.
const moodScoreMap = {
  sadness: 1,
  stress: 2,
  anxiety: 2,
  anger: 2,
  neutral: 3,
  happiness: 5
};

function createPath(points, width, height) {
  if (!points.length) return '';

  const maxScore = 5;
  const stepX = points.length > 1 ? width / (points.length - 1) : width;

  return points
    .map((mood, index) => {
      const score = moodScoreMap[mood.mood] || 3;
      const x = index * stepX;
      const y = height - (score / maxScore) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}

export default function MoodDashboard({ moods, loading }) {
  const linePath = createPath(moods, 280, 120);

  return (
    <section className="card mood-card">
      <div className="card-header">
        <h2>Weekly Mood Tracker</h2>
        <p>Your emotional trend over the last 7 days.</p>
      </div>

      {loading ? (
        <p>Loading mood chart...</p>
      ) : moods.length === 0 ? (
        <p>No mood data yet. Start chatting to build your trend.</p>
      ) : (
        <>
          <div className="chart-wrap">
            <svg width="100%" viewBox="0 0 280 120" role="img" aria-label="Weekly mood trend chart">
              <rect x="0" y="0" width="280" height="120" fill="#f8fafc" rx="10" />
              <path d={linePath} fill="none" stroke="#7c83fd" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          <ul className="mood-list">
            {moods.slice(-5).map((moodItem) => (
              <li key={moodItem.id}>
                <span>{new Date(moodItem.created_at).toLocaleDateString()}</span>
                <strong>{moodItem.mood}</strong>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
