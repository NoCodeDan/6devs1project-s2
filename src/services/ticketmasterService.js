import axios from 'axios';

const TICKETMASTER_API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const TICKETMASTER_API_BASE = 'https://app.ticketmaster.com/discovery/v2';

/**
 * Search for events on Ticketmaster.
 * @param {string} query - Search keyword (e.g., artist, genre).
 * @param {string} city - City to search in (optional).
 * @param {number} size - Number of results to return (default 20).
 * @returns {Promise<Array>} - Array of event objects.
 */
export const searchTicketmasterEvents = async (query, city = '', size = 20) => {
  if (!TICKETMASTER_API_KEY || TICKETMASTER_API_KEY === 'YOUR_TICKETMASTER_API_KEY') {
    console.error('Ticketmaster API key is not configured. Please add VITE_TICKETMASTER_API_KEY to your .env file.');
    throw new Error('Ticketmaster API key is not configured.');
  }
  try {
    const params = {
      apikey: TICKETMASTER_API_KEY,
      keyword: query,
      size,
    };
    if (city) params.city = city;
    const response = await axios.get(`${TICKETMASTER_API_BASE}/events.json`, { params });
    return response.data._embedded?.events || [];
  } catch (error) {
    console.error('Error fetching Ticketmaster events:', error.response?.data || error.message);
    throw error;
  }
}; 