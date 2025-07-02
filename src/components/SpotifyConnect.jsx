import { useState, useEffect } from 'react';
import { initSpotifyAuth, isAuthenticated, logout, getUserSpotifyData } from '../services/spotifyService';
import Button from './Button';
import Card from './Card';
import Badge from './Badge';
import Alert from './Alert';

const SpotifyConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const authenticated = isAuthenticated();
    setIsConnected(authenticated);
    
    if (authenticated) {
      await loadUserData();
    }
  };

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUserSpotifyData();
      setUserData(data);
    } catch (err) {
      setError('Failed to load your Spotify data. Please try reconnecting.');
      console.error('Error loading user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    setError(null);
    initSpotifyAuth();
  };

  const handleDisconnect = () => {
    logout();
    setIsConnected(false);
    setUserData(null);
    setError(null);
  };

  const handleRefresh = () => {
    loadUserData();
  };

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center gap-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-body-medium text-on-surface-variant">
            Loading your Spotify data...
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-title-medium text-on-surface">
                Spotify Connection
              </h3>
              <p className="text-body-small text-on-surface-variant">
                {isConnected ? 'Connected to your Spotify account' : 'Connect your Spotify to get personalized event recommendations'}
              </p>
            </div>
          </div>
          <Badge 
            variant={isConnected ? "success" : "warning"}
            text={isConnected ? "Connected" : "Not Connected"}
          />
        </div>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert variant="error" text={error} />
      )}

      {/* Connection Actions */}
      {!isConnected ? (
        <Card className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-headline-small text-on-surface mb-2">
                Connect Your Spotify
              </h3>
              <p className="text-body-medium text-on-surface-variant mb-6">
                We'll analyze your music taste to find events that match your style
              </p>
            </div>
            <Button 
              variant="primary" 
              onClick={handleConnect}
              className="w-full"
            >
              Connect Spotify Account
            </Button>
          </div>
        </Card>
      ) : (
        /* User Data Display */
        <div className="space-y-6">
          {/* User Profile */}
          {userData?.profile && (
            <Card className="p-6">
              <div className="flex items-center gap-4">
                {userData.profile.images?.[0]?.url ? (
                  <img 
                    src={userData.profile.images[0].url} 
                    alt={userData.profile.display_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-surface-variant rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-title-large text-on-surface">
                    {userData.profile.display_name}
                  </h3>
                  <p className="text-body-medium text-on-surface-variant">
                    {userData.profile.followers?.total?.toLocaleString()} followers
                  </p>
                </div>
                <Button variant="ghost" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              </div>
            </Card>
          )}

          {/* Top Tracks */}
          {userData?.topTracks && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-title-medium text-on-surface">
                  Your Top Tracks
                </h3>
                <Button variant="ghost" onClick={handleRefresh}>
                  Refresh
                </Button>
              </div>
              <div className="space-y-3">
                {userData.topTracks.items.slice(0, 5).map((track, index) => (
                  <div key={track.id} className="flex items-center gap-3 p-3 bg-surface-variant rounded-lg">
                    <span className="text-label-large text-on-surface-variant w-6">
                      {index + 1}
                    </span>
                    {track.album.images?.[0]?.url && (
                      <img 
                        src={track.album.images[0].url} 
                        alt={track.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-body-medium text-on-surface truncate">
                        {track.name}
                      </p>
                      <p className="text-body-small text-on-surface-variant truncate">
                        {track.artists.map(artist => artist.name).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Top Artists */}
          {userData?.topArtists && (
            <Card className="p-6">
              <h3 className="text-title-medium text-on-surface mb-4">
                Your Top Artists
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userData.topArtists.items.slice(0, 6).map((artist) => (
                  <div key={artist.id} className="text-center">
                    {artist.images?.[0]?.url ? (
                      <img 
                        src={artist.images[0].url} 
                        alt={artist.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-surface-variant rounded-full mx-auto mb-2 flex items-center justify-center">
                        <svg className="w-8 h-8 text-on-surface-variant" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    )}
                    <p className="text-body-small text-on-surface truncate">
                      {artist.name}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Music Analysis Summary */}
          {userData?.audioFeatures && (
            <Card className="p-6">
              <h3 className="text-title-medium text-on-surface mb-4">
                Your Music Profile
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userData.audioFeatures.audio_features?.slice(0, 4).map((features, index) => (
                  <div key={index} className="text-center p-3 bg-surface-variant rounded-lg">
                    <p className="text-label-large text-on-surface-variant mb-1">
                      Track {index + 1}
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-body-small">
                        <span>Energy:</span>
                        <span>{Math.round(features.energy * 100)}%</span>
                      </div>
                      <div className="flex justify-between text-body-small">
                        <span>Dance:</span>
                        <span>{Math.round(features.danceability * 100)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SpotifyConnect; 