import axios from 'axios';

// Spotify API Configuration
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

// Ensure the redirect URI has the correct /callback path, as this is a common error.
let rawRedirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
if (rawRedirectUri && !rawRedirectUri.endsWith('/callback')) {
    // If a custom URI is provided in .env, make sure it ends with /callback
    rawRedirectUri = rawRedirectUri.endsWith('/') ? `${rawRedirectUri}callback` : `${rawRedirectUri}/callback`;
}
const SPOTIFY_REDIRECT_URI = rawRedirectUri ?? 'http://localhost:5173/callback';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_BASE = 'https://accounts.spotify.com';

// Generate PKCE code verifier and challenge
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}

function generateCodeVerifier() {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);
  return Array.from(array, dec2hex).join("");
}

async function generateCodeChallenge(verifier) {
  const data = new TextEncoder().encode(verifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Store tokens in localStorage
const setTokens = (accessToken, refreshToken, expiresIn) => {
  const expiresAt = Date.now() + expiresIn * 1000;

  console.log("💾 4. [Storage] Storing tokens. Access Token:", accessToken);
  console.log("💾 4. [Storage] Storing tokens. Refresh Token:", refreshToken);

  localStorage.setItem('spotify_access_token', accessToken);
  localStorage.setItem('spotify_refresh_token', refreshToken);
  localStorage.setItem('spotify_expires_at', expiresAt.toString());
};

const getAccessToken = () => {
  return localStorage.getItem('spotify_access_token');
};

const isTokenExpired = () => {
  const expiresAt = localStorage.getItem('spotify_expires_at');
  if (!expiresAt) return true;
  return Date.now() > parseInt(expiresAt);
};

// Initialize Spotify authentication
export const initSpotifyAuth = async () => {
  // Clear any stale tokens before starting a new auth flow
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
  localStorage.removeItem('spotify_expires_at');

  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  
  console.log("🔑 1. [Auth Init] Generated code verifier:", codeVerifier);

  const scope = [
    'user-read-private',
    'user-read-email',
    'user-top-read',
    'user-read-recently-played',
    'playlist-read-private',
    'playlist-read-collaborative'
  ].join(' ');

  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state: codeVerifier, // Pass the verifier in the state parameter
    scope: scope,
    show_dialog: 'true', // Force the consent screen to appear
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
  });
  
  const authUrl = `${SPOTIFY_AUTH_BASE}/authorize?${params.toString()}`;
  window.location.href = authUrl;
};

// Handle callback and exchange code for tokens
export const handleSpotifyCallback = async (code, codeVerifier) => {
  try {
    console.log("🔑 2. [Callback] Received authorization code:", code);
    console.log("🔑 2. [Callback] Received code verifier from state:", codeVerifier);

    const formData = new URLSearchParams();
    formData.append('client_id', SPOTIFY_CLIENT_ID);
    formData.append('grant_type', 'authorization_code');
    formData.append('code', code);
    formData.append('redirect_uri', SPOTIFY_REDIRECT_URI);
    formData.append('code_verifier', codeVerifier);
    
    const response = await axios.post(`${SPOTIFY_AUTH_BASE}/api/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log("✅ 3. [Token Exchange] Full response from Spotify:", response.data);
    
    const { access_token, refresh_token, expires_in } = response.data;
    setTokens(access_token, refresh_token, expires_in);
    
    return access_token;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    throw error;
  }
};

// Refresh access token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('spotify_refresh_token');
    console.log("🔄 5a. [Refresh] Attempting to refresh with token:", refreshToken);
    
    const formData = new URLSearchParams();
    formData.append('client_id', SPOTIFY_CLIENT_ID);
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', refreshToken);
    
    const response = await axios.post(`${SPOTIFY_AUTH_BASE}/api/token`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log("✅ 5b. [Refresh] Full response from Spotify:", response.data);

    const { access_token, expires_in } = response.data;
    // Note: A new refresh token is not always returned. If it is, store it.
    const newRefreshToken = response.data.refresh_token || refreshToken;
    setTokens(access_token, newRefreshToken, expires_in);
    
    return access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Clear tokens on refresh failure
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_expires_at');
    throw error;
  }
};

// Get authenticated axios instance
const getAuthenticatedClient = async () => {
  let accessToken = getAccessToken();
  console.log("🔎 6. [API Client] Retrieved access token from storage:", accessToken);
  
  if (!accessToken || isTokenExpired()) {
    console.log("⌛ 6a. [API Client] Token is missing or expired. Refreshing...");
    try {
      accessToken = await refreshAccessToken();
    } catch (error) {
      console.error('❌ [API Client] Failed to refresh token.', error);
      // If refresh fails, logout the user to force a fresh login
      logout();
      throw new Error('Failed to refresh authentication token.');
    }
  }
  
  console.log("🔒 7. [API Call] Using this token for the API call:", accessToken);
  return axios.create({
    baseURL: SPOTIFY_API_BASE,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });
};

// API Methods
export const getCurrentUserProfile = async () => {
  try {
    const client = await getAuthenticatedClient();
    const response = await client.get('/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getUserTopTracks = async (timeRange = 'medium_term', limit = 20) => {
  try {
    const client = await getAuthenticatedClient();
    const response = await client.get(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    throw error;
  }
};

export const getUserTopArtists = async (timeRange = 'medium_term', limit = 20) => {
  try {
    const client = await getAuthenticatedClient();
    const response = await client.get(`/me/top/artists?time_range=${timeRange}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    throw error;
  }
};

export const getUserPlaylists = async (limit = 50) => {
  try {
    const client = await getAuthenticatedClient();
    const response = await client.get(`/me/playlists?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

export const getRecentlyPlayed = async (limit = 20) => {
  try {
    const client = await getAuthenticatedClient();
    const response = await client.get(`/me/player/recently-played?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recently played:', error);
    throw error;
  }
};

export const getTrackAudioFeatures = async (trackIds) => {
  try {
    const client = await getAuthenticatedClient();
    const response = await client.get(`/audio-features?ids=${trackIds.join(',')}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching audio features:', error);
    throw error;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const accessToken = getAccessToken();
  return accessToken && !isTokenExpired();
};

// Logout
export const logout = () => {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
  localStorage.removeItem('spotify_expires_at');
  localStorage.removeItem('spotify_code_verifier');
};

// Get comprehensive user data for event matching
export const getUserSpotifyData = async () => {
  try {
    const [profile, topTracks, topArtists, playlists, recentlyPlayed] = await Promise.all([
      getCurrentUserProfile(),
      getUserTopTracks('medium_term', 20),
      getUserTopArtists('medium_term', 20),
      getUserPlaylists(50),
      getRecentlyPlayed(20)
    ]);

    // Get audio features for top tracks
    const trackIds = topTracks.items.map(track => track.id);
    let audioFeatures = null;
    if (trackIds.length > 0) {
      try {
        audioFeatures = await getTrackAudioFeatures(trackIds);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Token is invalid or missing scopes, force logout
          logout();
          throw new Error('Spotify authentication expired or missing permissions. Please reconnect your account.');
        }
        throw error;
      }
    }

    return {
      profile,
      topTracks,
      topArtists,
      playlists,
      recentlyPlayed,
      audioFeatures
    };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      logout();
      throw new Error('Spotify authentication expired or missing permissions. Please reconnect your account.');
    }
    console.error('Error fetching comprehensive user data:', error);
    throw error;
  }
}; 