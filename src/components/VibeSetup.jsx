import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';
import Button from './Button';

const steps = [
  {
    question: 'What kind of energy do you give off?',
    options: ['Sweet', 'Chaotic', 'Cold', 'Mysterious', 'Caring', 'Dominant'],
    key: 'energy',
  },
  // Add more steps here as needed
];

const VibeSetup = ({ onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState('');

  const current = steps[step];

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    const newAnswers = { ...answers, [current.key]: selected };
    setAnswers(newAnswers);
    setSelected('');
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Save answers to localStorage for now
      localStorage.setItem('vibe_setup_answers', JSON.stringify(newAnswers));
      
      // If onComplete prop is provided, use it, otherwise navigate to personality summary
      if (onComplete) {
        onComplete(newAnswers);
      } else {
        navigate('/personality-summary');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 via-black to-gray-900 px-4 py-12">
      <Card className="max-w-2xl w-full p-12 rounded-3xl shadow-2xl bg-surface-0/90 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-green-400 mb-6 text-center">Personal Vibe Setup</h2>
        <p className="text-2xl text-on-surface-variant mb-10 text-center">{current.question}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-10">
          {current.options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`rounded-2xl border-2 px-8 py-6 text-2xl font-semibold transition-all duration-150 w-full
                ${selected === option ? 'bg-green-500 text-white border-green-500 shadow-lg scale-105' : 'bg-transparent text-green-400 border-green-400 hover:bg-green-500/10'}`}
            >
              {option}
            </button>
          ))}
        </div>
        <Button
          variant="primary"
          className="bg-green-500 hover:bg-green-600 text-white text-xl px-10 py-4 rounded-full font-bold mt-4 disabled:opacity-50"
          onClick={handleNext}
          disabled={!selected}
        >
          Next
        </Button>
      </Card>
    </div>
  );
};

export default VibeSetup; 