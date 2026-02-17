// Lightweight keyword-based emotion detection to keep logic beginner-friendly.
const emotionKeywords = {
  stress: ['overwhelmed', 'pressure', 'burnout', 'deadline', 'exhausted'],
  anxiety: ['anxious', 'worried', 'panic', 'nervous', 'uneasy'],
  sadness: ['sad', 'down', 'lonely', 'hopeless', 'crying'],
  anger: ['angry', 'frustrated', 'mad', 'irritated', 'annoyed'],
  happiness: ['happy', 'excited', 'grateful', 'good', 'joyful']
};

export function detectEmotion(text = '') {
  const normalized = text.toLowerCase();

  for (const [emotion, words] of Object.entries(emotionKeywords)) {
    if (words.some((word) => normalized.includes(word))) {
      return emotion;
    }
  }

  return 'neutral';
}
