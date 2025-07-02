import Card from './Card';
import Button from './Button';
import { useState } from 'react';

const PersonalitySummary = ({ summary, onPlayVoice, playing, onNext }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-black to-gray-900 px-4 py-12">
      <Card className="max-w-2xl w-full p-12 rounded-3xl shadow-2xl bg-surface-0/90 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-green-400 mb-6 text-center">Your AI Music Personality</h2>
        <pre className="text-xl text-on-surface-variant whitespace-pre-wrap text-center mb-10">{summary}</pre>
        <Button
          variant="primary"
          className={`bg-green-500 hover:bg-green-600 text-white text-2xl px-10 py-4 rounded-full font-bold mb-6 flex items-center gap-3 ${playing ? 'opacity-60' : ''}`}
          onClick={onPlayVoice}
          disabled={playing}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-6.518-3.89A1 1 0 007 8.618v6.764a1 1 0 001.234.97l6.518-1.878A1 1 0 0016 13.382V10.618a1 1 0 00-1.248-.95z" /></svg>
          {playing ? 'Playing...' : 'Play Voice' }
        </Button>
        {onNext && (
          <Button
            variant="ghost"
            className="text-green-400 border-green-400 hover:bg-green-500/10 px-8 py-4 rounded-lg font-bold"
            onClick={onNext}
          >
            Next
          </Button>
        )}
      </Card>
    </div>
  );
};

export default PersonalitySummary; 