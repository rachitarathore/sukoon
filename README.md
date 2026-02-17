# Sukoon — AI Emotional Support Web App

Sukoon is a ready-to-use emotional support web app designed for students and young adults.
It combines empathetic AI chat, emotion detection, mood tracking, crisis support, and AI journaling in a calm startup-style interface.

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** Supabase (PostgreSQL)
- **AI:** Gemini API (`gemini-1.5-flash`)

## Features

1. **AI Chat Support**
   - Empathetic, non-judgmental Gemini-powered companion
   - Human-like supportive responses

2. **Emotion Detection**
   - Detects: stress, anxiety, sadness, anger, happiness, neutral
   - Subtle emotion badge shown in chat

3. **Mood Tracker Dashboard**
   - Mood saved after each chat interaction
   - Weekly mood chart + quick history

4. **Crisis Detection**
   - Detects self-harm / suicidal language
   - Returns calm response, immediate support guidance, and helplines

5. **AI Journal**
   - Daily thought entry
   - AI summary of emotional patterns

---

## 1) Setup

### Prerequisites

- Node.js 18+
- Supabase project
- Gemini API key

### Clone + install

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

---

## 2) Environment variables

Create `backend/.env`:

```env
PORT=4000
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ALLOWED_ORIGIN=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

---

## 3) Supabase table schema

Run this SQL in your Supabase SQL editor:

```sql
create table if not exists moods (
  id bigint generated always as identity primary key,
  user_id text not null,
  mood text not null,
  message text,
  created_at timestamptz default now()
);

create table if not exists journal_entries (
  id bigint generated always as identity primary key,
  user_id text not null,
  entry text not null,
  ai_summary text,
  created_at timestamptz default now()
);
```

> For a quick local demo, this app uses a default `user_id` of `demo-user`.

---

## 4) Run the app

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

---

## Folder Structure

```text
sukoon/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config.js
│   │   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
└── README.md
```

## Safety Note

This project provides emotional support but **is not a replacement for professional mental healthcare**.
If a user appears at risk, the app shares immediate support resources.
