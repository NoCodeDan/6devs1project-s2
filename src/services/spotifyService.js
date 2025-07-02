import axios from 'axios';
import CryptoJS from 'crypto-js';

// Spotify API Configuration
const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI ?? '';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';
const SPOTIFY_AUTH_BASE = 'https://accounts.spotify.com';

// Generate PKCE code verifier and challenge
const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const generateCodeChallenge = (verifier) => {
  const hash = CryptoJS.SHA256(verifier);
  return btoa(String.fromCharCode(...new Uint8Array(hash.words)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

// Store tokens in localStorage
const setTokens = (accessToken, refreshToken, expiresIn) => {
  const expiresAt = Date.now() + expiresIn * 1000;
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
export const initSpotifyAuth = () => {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  
  // Store code verifier for later use
  localStorage.setItem('spotify_code_verifier', codeVerifier);
  
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    scope: 'user-read-private user-read-email user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative'
  });
  
  const authUrl = `${SPOTIFY_AUTH_BASE}/authorize?${params.toString()}`;
  window.location.href = authUrl;
};

// Handle callback and exchange code for tokens
export const handleSpotifyCallback = async (code) => {
  try {
    const codeVerifier = localStorage.getItem('spotify_code_verifier');
    
    const response = await axios.post(`${SPOTIFY_AUTH_BASE}/api/token`, {
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      code_verifier: codeVerifier
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    const { access_token, refresh_token, expires_in } = response.data;
    setTokens(access_token, refresh_token, expires_in);
    
    // Clean up
    localStorage.removeItem('spotify_code_verifier');
    
    return access_token;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    throw error;
  }
};

// Refresh access token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('spotify_refresh_token');
    
    const response = await axios.post(`${SPOTIFY_AUTH_BASE}/api/token`, {
      client_id: SPOTIFY_CLIENT_ID,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    const { access_token, expires_in } = response.data;
    setTokens(access_token, refreshToken, expires_in);
    
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
  
  if (!accessToken || isTokenExpired()) {
    accessToken = await refreshAccessToken();
  }
  
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
    const audioFeatures = await getTrackAudioFeatures(trackIds);

    return {
      profile,
      topTracks,
      topArtists,
      playlists,
      recentlyPlayed,
      audioFeatures
    };
  } catch (error) {
    console.error('Error fetching comprehensive user data:', error);
    throw error;
  }
}; 