
import { useState } from 'react';
import { run } from '../services/geminiService';
import Button from './Button';

const AIPage = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setError(null);
    setResponse('');

    try {
      const result = await run(prompt);
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gemini AI</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="p-2 border rounded"
          rows="4"
        ></textarea>
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? 'Sending...' : 'Send to AI'}
        </Button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {response && (
        <div className="border p-4 rounded-lg bg-gray-100">
          <h2 className="text-xl font-bold">Response</h2>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
    </div>
  );
};

export default AIPage; 