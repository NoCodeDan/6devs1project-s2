# 🎧 AI Event Wrapped – Vision Document

## ✨ Core Idea
A playful, personalized experience where users connect their **Spotify account**, answer a few **vibe-setting questions**, and get a fun **AI-generated summary** of their music taste + recommended local events — narrated by a cheeky voice using **ElevenLabs**.

Think:  
**Spotify Wrapped** × **ChatGPT** × **EventBrite** × **AI banter**.

---

## 🌐 Landing Page Flow

### 1. **Hero CTA**
- Tagline: _“Discover your vibe. Hear what AI thinks of your Spotify taste.”_
- Button: `🎧 Connect your Spotify`

### 2. **Spotify Auth**
- Use OAuth to fetch:
  - Top Artists
  - Top Songs
  - Playlists (optional)
  - Total minutes listened

---

## 📋 Multi-Step Form Flow

### Step 1: Quick Questions
After Spotify connects, user sees fun animated questions (multi-step or single form):

| Question | Type |
|----------|------|
| Where do you live? (City) | Text or geolocation |
| What kind of events do you enjoy? (Concerts, Parties, Talks...) | Multi-select |
| What vibe are you into? (Chill, Hype, Niche, etc.) | Dropdown or emoji scale |
| Open to nearby travel? | Yes / No |

---

## 🎙️ AI Summary + Voice Response

### Process:
- Combine Spotify data + user answers
- Prompt ChatGPT:
  > “Create a short, funny, lovingly-roasty personality summary based on this user’s music and event preferences…”

- Example output:
  > "You’re a Phoebe Bridgers fan in Berlin who lives for sad bangers and rooftop wine nights. I bet your Discover Weekly is just 60 minutes of seasonal depression with a beat."

### Use ElevenLabs TTS:
- Synthesize the above as playful voice commentary
- Option to “play again” for a remix or second version

---

## 🎟️ Event Recommendation Screen

Based on:
- Location
- Preferred vibe + event type
- GPT can help match events using descriptions and titles

### Sources:
- Luma API
- Eventbrite API
- Optional: scrape Songkick/Resident Advisor

### UI:
- Show Spotify stats as cards
- Personality summary (GPT)
- Recommended events (cards w/ image, title, CTA)
- Buttons:
  - "Save to Calendar"
  - "Get Tickets"
  - "Share Your AI Summary"

---

## 💡 Optional Fun Add-Ons
- Leaderboard: “You’re in the top 2% of indie listeners in Stockholm!”
- Shareable card generator (html2canvas)
- Light/dark animated theme
- Secret Easter egg if user listens to Nickelback 😉

---

## 🛠️ Stack
- **Frontend**: React / Vite
- **Backend**: Node.js or Python FastAPI
- **Auth**: Spotify OAuth
- **Voice**: ElevenLabs API
- **GPT**: OpenAI API
- **Events**: Eventbrite / Luma
- **Hosting**: Vercel or Replit

---

## 🚀 MVP Goal
Within 2 hours, demo the flow:
1. Spotify connect
2. Question flow
3. GPT personality summary
4. One ElevenLabs voice comment
5. 2–3 mock events from static JSON or API

---

## 📦 Folder Structure Suggestion
