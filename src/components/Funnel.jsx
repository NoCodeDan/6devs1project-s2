import { useState } from 'react';
import QuestionScreen from './QuestionScreen';
import CompletionScreen from './question-screen/CompletionScreen';

const steps = [
  {
    header: 'Personal Vibe Setup',
    question: 'What do you usually do on a Friday night?',
    options: [
      'Going out dancing',
      'Gaming all night',
      'Chill with friends',
      'Writing or making art',
      'Crying to playlists (respectfully)',
    ],
    voiceLine: 'No judgment... but your answer here will say *everything* about you.',
    key: 'friday',
    inputType: 'options',
  },
  {
    header: 'Music Taste Check',
    question: 'What\'s your go-to music vibe?',
    options: [
      'Pop',
      'Indie / Alt',
      'EDM',
      'Rap / Hip-Hop',
      'Classical',
      'Sad girl acoustic',
    ],
    voiceLine: 'You strike me as a sad banger aficionado... or worse: a "Spotify algorithm made me" listener.',
    key: 'music',
    inputType: 'options',
  },
  {
    header: 'Where You At?',
    question: 'Where are you located right now?',
    options: [],
    voiceLine: 'Let me guess... Berlin? Of course it\'s Berlin. You give off strong rooftop techno energy.',
    key: 'city',
    inputType: 'text',
  },
  {
    header: 'Pick Your Event Type',
    question: 'What kind of events are your vibe?',
    options: [
      'Intimate concerts',
      'Massive festivals',
      'Chill outdoor hangouts',
      'Art shows or galleries',
      'Talks or workshops',
      'Secret raves',
    ],
    voiceLine: 'If you click "secret rave" and don\'t send me an invite... I will remember that.',
    key: 'event',
    inputType: 'options',
  },
];



const Funnel = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [completed, setCompleted] = useState(false);

  const current = steps[step];

  const handleSelect = (option) => {
    setSelected(option);
  };

  const handleInputChange = (val) => {
    setInputValue(val);
  };

  const handleNext = () => {
    let value = current.inputType === 'text' ? inputValue : selected;
    const newAnswers = { ...answers, [current.key]: value };
    setAnswers(newAnswers);
    setSelected('');
    setInputValue('');
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
      onComplete && onComplete(newAnswers);
    }
  };

  const handleVoiceLine = (line) => {
    // TODO: Integrate ElevenLabs API here
    console.log('Voice line:', line);
  };

  const nextDisabled =
    current?.inputType === 'text' ? !inputValue.trim() : !selected;

  // Show completion screen if finished
  if (completed) {
    return <CompletionScreen />;
  }

  return (
    <QuestionScreen
      header={current.header}
      question={current.question}
      options={current.options}
      voiceLine={current.voiceLine}
      onNext={handleNext}
      onSelect={handleSelect}
      selected={selected}
      inputType={current.inputType}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      nextDisabled={nextDisabled}
      step={step}
      totalSteps={steps.length}
      onVoiceLine={handleVoiceLine}
    />
  );
};

export default Funnel; 