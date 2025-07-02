import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleSpotifyCallback } from '../services/spotifyService';
import Card from './Card';
import Alert from './Alert';

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setError('Spotify authorization was cancelled or failed.');
          setLoading(false);
          return;
        }

        if (!code) {
          setError('No authorization code received from Spotify.');
          setLoading(false);
          return;
        }

        // Exchange code for tokens
        await handleSpotifyCallback(code);
        
        // Redirect to vibe setup
        navigate('/vibe-setup', { replace: true });
      } catch (err) {
        console.error('Error handling Spotify callback:', err);
        setError('Failed to connect your Spotify account. Please try again.');
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="flex flex-col items-center gap-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <div className="text-center">
              <h2 className="text-headline-small text-on-surface mb-2">
                Connecting to Spotify
              </h2>
              <p className="text-body-medium text-on-surface-variant">
                Please wait while we connect your account...
              </p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-error rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-headline-small text-on-surface mb-2">
                Connection Failed
              </h2>
              <p className="text-body-medium text-on-surface-variant mb-6">
                {error}
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-primary text-on-primary rounded-lg hover:bg-primary-variant transition-colors"
            >
              Try Again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};

export default SpotifyCallback; 