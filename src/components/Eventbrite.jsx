
import { useState } from 'react';
import { searchEvents } from '../services/eventbriteService';
import Input from './Input';
import Button from './Button';

const Eventbrite = () => {
  const [query, setQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError(null);
    try {
      const results = await searchEvents(query);
      setEvents(results.events);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Eventbrite Event Search</h1>
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for events..."
          className="flex-grow"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{event.name.text}</h2>
            {event.logo && <img src={event.logo.url} alt={event.name.text} className="my-2"/>}
            <p>{new Date(event.start.local).toLocaleString()}</p>
            {event.venue && <p className="text-gray-600">{event.venue.name} - {event.venue.address.localized_address_display}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventbrite; 