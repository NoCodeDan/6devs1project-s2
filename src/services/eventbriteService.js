
import axios from 'axios';

// Eventbrite API Configuration
const EVENTBRITE_PRIVATE_TOKEN = import.meta.env.VITE_EVENTBRITE_PRIVATE_TOKEN;
const EVENTBRITE_API_BASE = 'https://www.eventbriteapi.com/v3';

// Create an authenticated axios instance
const apiClient = axios.create({
  baseURL: EVENTBRITE_API_BASE,
  headers: {
    'Authorization': `Bearer ${EVENTBRITE_PRIVATE_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Searches for events on Eventbrite.
 * @param {string} query The search term.
 * @returns {Promise<object>} The search results from the Eventbrite API.
 */
export const searchEvents = async (query) => {
  if (!EVENTBRITE_PRIVATE_TOKEN || EVENTBRITE_PRIVATE_TOKEN === 'YOUR_EVENTBRITE_PRIVATE_TOKEN') {
    console.error('Eventbrite private token is not configured. Please add VITE_EVENTBRITE_PRIVATE_TOKEN to your .env file.');
    throw new Error('Eventbrite private token is not configured.');
  }

  try {
    const response = await apiClient.get('/events/search', {
      params: {
        q: query,
        'expand': 'venue'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching Eventbrite events:', error.response ? error.response.data : error.message);
    throw error;
  }
}; 