import { useState } from 'react';
import Button from './Button';
import Card from './Card';
import { initSpotifyAuth } from '../services/spotifyService';

const mockSummary = () => `Hey music lover!\n\nYou're a true Indie Explorer. You love discovering new artists and your playlists are a mix of alternative, electronic, and indie pop. You thrive at music festivals, underground gigs, and unique local events.\n\nRecommended events: Indie music festivals, secret warehouse parties, and live sessions at cozy venues.`;

const LandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [demo, setDemo] = useState(false);

  const handleConnectSpotify = () => {
    setLoading(true);
    initSpotifyAuth();
  };

  const handleDemo = () => {
    setLoading(true);
    setDemo(true);
    setTimeout(() => {
      setSummary(mockSummary());
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-black to-gray-900 flex flex-col items-center justify-center px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-2xl w-full text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
          Find Out What Concerts You Should Go To
          <span className="block text-green-400 mt-2">Based On Your Spotify Playlist</span>
        </h1>
        <p className="text-xl md:text-2xl text-on-surface-variant mb-8 text-white/80">
          Connect your Spotify and get a personalized music & event summary powered by AI.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            type="button"
            variant="primary"
            onClick={handleConnectSpotify}
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-200 font-bold glow-green"
            style={{ boxShadow: '0 0 24px 4px #22c55e99' }}
            disabled={loading}
          >
            {loading ? 'Redirecting...' : 'Connect Spotify'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={handleDemo}
            className="text-green-400 border-green-400 hover:bg-green-500/10 px-8 py-4 rounded-lg font-bold"
            disabled={loading}
          >
            Try Demo
          </Button>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-3xl w-full mb-16">
        <Card className="p-8 bg-surface-variant/80 backdrop-blur-md shadow-xl">
          <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">How it works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">1</div>
              <p className="text-lg text-on-surface-variant">Connect your Spotify</p>
            </div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">2</div>
              <p className="text-lg text-on-surface-variant">AI analyzes your music taste</p>
            </div>
            <div className="flex-1 text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">3</div>
              <p className="text-lg text-on-surface-variant">Get your music personality & event matches</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Result Section (Demo) */}
      {loading && demo && (
        <div className="flex flex-col items-center mt-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-400 mb-6"></div>
          <p className="text-xl text-white">Analyzing your Spotify... Hang tight!</p>
        </div>
      )}
      {summary && demo && (
        <Card className="max-w-xl w-full p-8 bg-surface-variant/90 backdrop-blur-md shadow-2xl mt-8">
          <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">Your Music Personality & Event Matches</h3>
          <pre className="text-lg text-on-surface-variant whitespace-pre-wrap text-center">{summary}</pre>
        </Card>
      )}
    </div>
  );
};

export default LandingPage; 