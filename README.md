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

### Dev #4 – [Mark] – 07/08/2025

+ Fixed errors from the Spotify OAuth connection flow, so users can now connect their accounts successfully. 
+ The app now redirects to the `/onboarding` page after connecting to Spotify
+ Added a `/ai` page that's able to query Gemini
+ Added a non-functional "Connect Instagram" button to the landing page (that you might want to remove)

~ Discovered key limitations with third-party APIs:
  - Instagram requires an app review process, I don't think the remaining devs will want to go through this process
  - Eventbrite has deprecated its public event search API, so we probably can't connect to it to search for events

⚠️ The `/spotify` data page is still encountering `403 Forbidden` errors. Check the console logs - the access token is being successfully created, but for some reason Spotify isn't being queried properly to get the information we need. The next developer needs to debug this issue.
⚠️ The Ticketmaster account creation didn't work during my stream. The next developer should attempt to sign up again to see if we can connect to their API.

**Steps for the next dev**:
.env variables you'll need - VITE_SPOTIFY_CLIENT_ID, VITE_SPOTIFY_REDIRECT_URI, VITE_GEMINI_API_KEY

1. First of all, I suggest setting up ngrok. You'll need to use its URL as a redirect URI for Spotify and put this in the .env file 
2. Add your ngrok redirect URI to the allowedHosts in vite.config.js (mine was 7bfa69ddf234.ngrok-free.app, notice it's not ngrok-free.app/callback or ngrok-free.app/onboarding, it's just ngrok-free.app)
2. Create a Spotify app - paste the ngrok url into there and copy its Client ID into the .env file. 
3. Get a Gemini API key from https://aistudio.google.com/apikey and paste it into the .env file.
4. Use npm run dev to run the project then go to http://localhost:5173/landing 
5. You might want to remove the "Connect with Instagram" button since I don't think you'll want to go through the process of sending the app for review with Meta in order to be able to connect with instagram. 
6. Click on "Connect Spotify" to connect your spotify account.
7. Go to the http://localhost:5173/spotify page and fix the errors to properly retrieve the user's Spotify data
8. Feed the results from that to the AI to get event recommendations. I've got Gemini setup at http://localhost:5173/ai as a reference but you can use OpenAI or anything else.
9. Look into Evenbrite alternatives since we can't search events through Eventbrite's API. So maybe get Ticketmaster working, maybe use LinkedIn events or Meetup, so you can feed the AI's recommendations into this API's event search.
10. We wouldn't actually direct users to the /spotify or /ai pages, this is just for testing to ensure their features are functional. After a user connects their Spotify account from the landing page, they should be redirected to /onboarding. So you'll have to modify this /onboarding page's sample info to display their actual retrieved info and event recommendations.

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
