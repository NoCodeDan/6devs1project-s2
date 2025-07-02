import { useState, useEffect } from 'react';
import { isAuthenticated } from '../services/spotifyService';
import SpotifyConnect from './SpotifyConnect';
import Card from './Card';
import Button from './Button';

const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-surface py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-headline-large text-on-surface mb-4">
              Welcome to EventMatch
            </h1>
            <p className="text-body-large text-on-surface-variant max-w-2xl mx-auto">
              Connect your Spotify account to discover events that match your music taste. 
              We'll analyze your listening habits to find the perfect events for you.
            </p>
          </div>
          
          <SpotifyConnect />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-headline-large text-on-surface mb-2">
            Your Music Dashboard
          </h1>
          <p className="text-body-large text-on-surface-variant">
            Discover events that match your unique music taste
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Spotify Connection Panel */}
          <div className="lg:col-span-1">
            <SpotifyConnect />
          </div>

          {/* Event Recommendations Panel */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-headline-medium text-on-surface">
                  Event Recommendations
                </h2>
                <Button variant="primary">
                  Find More Events
                </Button>
              </div>
              
              {/* Placeholder for event recommendations */}
              <div className="space-y-4">
                <div className="p-6 bg-surface-variant rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-on-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-title-medium text-on-surface mb-1">
                        Music Festival 2024
                      </h3>
                      <p className="text-body-medium text-on-surface-variant mb-2">
                        Based on your love for indie rock and electronic music
                      </p>
                      <div className="flex items-center gap-4 text-body-small text-on-surface-variant">
                        <span>📍 New York, NY</span>
                        <span>📅 June 15, 2024</span>
                        <span>🎵 95% match</span>
                      </div>
                    </div>
                    <Button variant="ghost">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-surface-variant rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-on-secondary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-title-medium text-on-surface mb-1">
                        Jazz Night at Blue Note
                      </h3>
                      <p className="text-body-medium text-on-surface-variant mb-2">
                        Perfect for your sophisticated jazz preferences
                      </p>
                      <div className="flex items-center gap-4 text-body-small text-on-surface-variant">
                        <span>📍 New York, NY</span>
                        <span>📅 May 22, 2024</span>
                        <span>🎵 87% match</span>
                      </div>
                    </div>
                    <Button variant="ghost">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-surface-variant rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-tertiary rounded-lg flex items-center justify-center">
                      <svg className="w-8 h-8 text-on-tertiary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-title-medium text-on-surface mb-1">
                        Electronic Music Showcase
                      </h3>
                      <p className="text-body-medium text-on-surface-variant mb-2">
                        Featuring artists similar to your top electronic tracks
                      </p>
                      <div className="flex items-center gap-4 text-body-small text-on-surface-variant">
                        <span>📍 Brooklyn, NY</span>
                        <span>📅 July 8, 2024</span>
                        <span>🎵 92% match</span>
                      </div>
                    </div>
                    <Button variant="ghost">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 