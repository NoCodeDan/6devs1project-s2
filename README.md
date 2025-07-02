# 6 Devs 1 Project – Dev Log & Handoff Template

**IMPORTANT: Follow this format exactly.**  
Keep notes short and skimmable, and update only your section. This keeps the handoff clean for the next dev.

---

## 🔗 Vital Links

- **GitHub Repo:** [INSERT LINK]
- **Hosting Provider/Staging link:** [INSERT LINK]
- **Idea List:** [https://docs.google.com/document/d/1FqR-ghBNKoazT7myHxoWZMD7bymyzotzxLSeGKmrPsI/edit?usp=sharing](https://docs.google.com/document/d/1FqR-ghBNKoazT7myHxoWZMD7bymyzotzxLSeGKmrPsI/edit?usp=sharing)
- **Research:** [https://docs.google.com/document/d/1VImANDWLg5SSYFGdQt7hcKneFPVXj6hcuVWGHZQbmGM/edit?usp=sharing](https://docs.google.com/document/d/1VImANDWLg5SSYFGdQt7hcKneFPVXj6hcuVWGHZQbmGM/edit?usp=sharing)

---

## 📏 Dev Note Rules

1. **Keep it short**

   - Use bullets or shorthand—no paragraphs.

2. **Only include what matters**

   - What you worked on
   - Any breaking changes
   - New env vars
   - Blockers
   - What's still missing

3. **Use this format for your log:**

   ```
   Dev #[X] – [Your Name] – [Date]
   + [Thing you added]
   ~ [Thing you updated]
   - [Thing you removed]
   ENV: [Any new env var or setup note]
   ⚠️ [Anything broken or confusing]
   ```

### Example Logs

#### Dev #1 – [Name] – [Date]

- Created Supabase table: users  
  ~ Updated homepage layout
- Added ENV: NEXT_PUBLIC_SUPABASE_URL  
  ⚠️ Login redirect is still broken

#### Dev #2 – [Name] – [Date]

- Updated Research doc with user personas and marketing research  
  ~ Cleaned up dashboard UI
- Removed old auth flow

* Added ENV: STRIPE_TEST_KEY  
  ⚠️ Mobile nav glitch on iOS Safari

---

## 🧑‍💻 Dev Logs

### Dev #1 – Harry Roper – 07/01/2025

I worked on the core idea of the app. In research document I put what chat gpt sugegsted as the best app idea to GTM quickly and also virality.

I liked the idea of using peoples data that exists already and tell them some interesting insights about their spotify / instagram account and then show them events that match. I came up with a UX flow similar to spotify: https://www.tldraw.com/f/CHqUlrmeJAca_WnkGJ-JH?d=v-748.-1288.5097.3361.G7faoxngNkEOJXLpYy9f-

Added:

- Style guide
- Login page demoing styleguide
- React app in javascript utilising tailwind, jsx
- Set up global design system based on components in styleguide page.
- Added cursor rules so whenever you make new components, it should be in the apps style.

- Created a supabase project (ask for invite) with profiles table already setup and email verification disabled.

Missing:

- Proper login
- Proper fetching of data
- Proper suggestion of events
- Basically the whole app flow lol i did the design please use it.

---

### Dev #2 – Albert – 07/02/2025

+ Complete Spotify Web API integration with OAuth PKCE flow
+ Added comprehensive Spotify service with token management
+ Created SpotifyConnect component with beautiful UI following design system
+ Added SpotifyCallback component for OAuth redirect handling
+ Created Dashboard component with event recommendations layout
+ Added axios and crypto-js dependencies for API calls and PKCE
+ Updated App.jsx with new routes for dashboard and callback
+ Created env.example with Spotify configuration template

~ Updated package.json with new dependencies
~ Updated README with dev log entry

ENV: VITE_SPOTIFY_CLIENT_ID (required), VITE_SPOTIFY_REDIRECT_URI (optional, defaults to localhost:5173/callback)

⚠️ Need to create Spotify app in developer dashboard and get client ID
⚠️ Event recommendation algorithm still needs to be implemented
⚠️ Need to integrate with actual event APIs (Ticketmaster, Eventbrite, etc.)

---

### Dev #3 – [Name] – 07/03/2025

[Add your notes here]

---

### Dev #4 – [Name] – 07/05/2025

[Add your notes here]

---

### Dev #5 – [Name] – 07/06/2025

[Add your notes here]

---

### Dev #6 – [Name] – 07/07/2025

[Add your notes here]

---

## ✅ Before You Finish Your Turn

- Push all code
- Update your dev log
- Note any new env vars
- Mention anything that broke or needs review

---
