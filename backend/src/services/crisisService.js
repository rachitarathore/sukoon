// Detects crisis phrases and provides supportive emergency guidance.
const crisisPatterns = [
  /kill myself/i,
  /end my life/i,
  /suicide/i,
  /want to die/i,
  /hurt myself/i,
  /self-harm/i,
  /no reason to live/i
];

export function detectCrisis(text = '') {
  return crisisPatterns.some((pattern) => pattern.test(text));
}

export function getCrisisResponse() {
  return {
    message:
      "I'm really glad you reached out. I'm sorry you're carrying so much right now. You matter, and you deserve immediate support from a real person who can help keep you safe.",
    resources: [
      'If you are in immediate danger, call emergency services right now.',
      'US & Canada: Call or text 988 (Suicide & Crisis Lifeline).',
      'UK & ROI: Samaritans at 116 123.',
      'India: AASRA at +91-22-27546669.',
      'If available, contact a trusted friend, family member, counselor, or campus support center now.'
    ]
  };
}
