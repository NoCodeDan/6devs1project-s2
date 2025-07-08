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
Spotify index api https://developer.spotify.com/documentation/web-api/concepts/authorization
ngrok for redirect url, use 11labs voice for interactive experience
---

### Dev #3 – Leonel – 07/05/2025

+ Added Ubuntu fonts to public/fonts/ directory and integrated throughout UI
+ Enhanced landing page components with improved glassmorphism effects and animations
+ Implemented GSAP and @gsap/react for smooth page transitions and micro-interactions
+ Added background music context with toggle functionality in landing page
+ Created CompletionScreen component with success state for funnel completion
+ Added completion state management to Funnel.jsx with proper flow handling
+ Separated CompletionScreen into dedicated /question-screen folder for better organization
+ Enhanced QuestionScreen.jsx with premium styling following brand guidelines
+ Implemented magnetic button effects and smooth hover animations throughout funnel
+ Integrated Lenis smooth scrolling library for premium inertia-based scrolling experience

~ Updated Funnel.jsx to handle completion state and prevent blank screen issues
~ Enhanced UI/UX consistency across landing and funnel pages
~ Improved component structure and organization
~ Replaced basic CSS scroll-behavior with Lenis for smooth momentum scrolling

⚠️ Funnel now requires GSAP and @gsap/react dependencies for animations
⚠️ CompletionScreen expects onComplete callback to be handled by parent component
⚠️ Lenis smooth scrolling is now active app-wide - use data-lenis-prevent attribute for nested scroll containers

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
