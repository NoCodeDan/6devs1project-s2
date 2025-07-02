import { useEffect } from 'react';
import Button from './Button';

const glowGreen = 'shadow-[0_0_16px_2px_#00ff99] border-[#00ff99]';

const QuestionScreen = ({
  header,
  question,
  options = [],
  voiceLine,
  onNext,
  onSelect,
  selected,
  inputType = 'options',
  inputValue = '',
  onInputChange,
  nextDisabled,
  step,
  totalSteps,
  onVoiceLine
}) => {
  useEffect(() => {
    if (onVoiceLine) onVoiceLine(voiceLine);
  }, [voiceLine, onVoiceLine]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] px-4 py-12 transition-all duration-500">
      <div className="max-w-xl w-full rounded-3xl shadow-2xl bg-[#181818] flex flex-col items-center p-10 md:p-16 border border-[#222]">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#00ff99] drop-shadow-lg">
          {header}
        </h2>
        <p className="text-2xl text-white mb-8 text-center">
          {question}
        </p>
        <div className="mb-8 w-full">
          {inputType === 'options' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => onSelect(option)}
                  className={`rounded-2xl border-2 px-8 py-6 text-2xl font-semibold transition-all duration-150 w-full
                    ${selected === option ? 'bg-[#00ff99] text-black border-[#00ff99] scale-105 ' + glowGreen : 'bg-transparent text-[#00ff99] border-[#00ff99] hover:bg-[#00ff99]/10'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          {inputType === 'text' && (
            <input
              type="text"
              value={inputValue}
              onChange={e => onInputChange(e.target.value)}
              placeholder="Type your city..."
              className={`w-full px-6 py-4 rounded-2xl border-2 text-2xl bg-black text-[#00ff99] border-[#00ff99] focus:outline-none focus:ring-2 focus:ring-[#00ff99] mt-2 ${glowGreen}`}
              autoFocus
            />
          )}
        </div>
        <div className="mb-6 text-lg text-[#00ff99] text-center italic min-h-[2.5rem]">
          {voiceLine}
        </div>
        <Button
          variant="primary"
          className={`bg-[#00ff99] hover:bg-[#00cc77] text-black text-xl px-10 py-4 rounded-full font-bold mt-4 disabled:opacity-50 ${glowGreen}`}
          onClick={onNext}
          disabled={nextDisabled}
        >
          Next
        </Button>
        {typeof step === 'number' && typeof totalSteps === 'number' && (
          <div className="mt-6 text-[#00ff99] text-sm opacity-70">Step {step + 1} of {totalSteps}</div>
        )}
      </div>
    </div>
  );
};

export default QuestionScreen; 