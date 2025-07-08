import { useState, useEffect } from 'react';
import { getUserSpotifyData, logout } from '../services/spotifyService';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Button from './Button';

const SpotifyData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const spotifyData = await getUserSpotifyData();
        setData(spotifyData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Spotify data:", err);
        // If a 403 error occurs, the token is invalid. Force a logout and re-authentication.
        if (err.response && err.response.status === 403) {
          logout();
          navigate('/landing');
        } else {
          setError('An unexpected error occurred while fetching your Spotify data.');
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface text-on-surface text-center p-4">
        <div>
          <p className="text-xl mb-4">{error}</p>
          <Button onClick={() => navigate('/landing')}>Reconnect Spotify</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {data.profile && (
          <Card className="p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
            <img 
              src={data.profile.images?.[0]?.url} 
              alt={data.profile.display_name}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm text-on-surface-variant">Spotify Profile</p>
              <h1 className="text-4xl font-bold">{data.profile.display_name}</h1>
              <p className="text-md text-on-surface-variant">{data.profile.followers?.total} Followers</p>
            </div>
            <div className="sm:ml-auto">
              <Button onClick={handleLogout} variant="ghost">Logout</Button>
            </div>
          </Card>
        )}

        {data.playlists && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Your Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {data.playlists.items.map((playlist) => (
                <Card key={playlist.id} className="p-4 flex flex-col items-center text-center hover:bg-surface-variant transition-colors duration-200">
                  <img 
                    src={playlist.images?.[0]?.url}
                    alt={playlist.name}
                    className="w-full aspect-square rounded-lg object-cover mb-4 shadow-lg"
                  />
                  <h3 className="font-bold text-md mb-1 truncate w-full">{playlist.name}</h3>
                  <p className="text-sm text-on-surface-variant">{playlist.tracks.total} tracks</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotifyData; 