import React from 'react';

const DisplayCard = ({
  className = "",
  icon,
  title = "Featured",
  description = "Discover amazing content",
  detail = "Just now",
  iconClassName = "text-green-400",
  titleClassName = "text-green-400",
}) => {
  return (
    <div
      className={`
        relative flex h-fit gap-4 w-full max-w-[28rem] min-w-[280px] -skew-y-[8deg] select-none flex-col justify-between 
        rounded-xl border-2 border-white/10 bg-black/40 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 
        transition-all duration-700 overflow-hidden
        hover:border-green-400/30 hover:bg-black/20 
        [&>*]:flex [&>*]:items-center [&>*]:gap-3
        ${className}
      `.trim()}
    >
      <div className="flex items-center gap-3">
        <span className="relative inline-block rounded-full bg-green-800/50 p-1.5 sm:p-2 border border-green-400/20">
          <span className="text-lg sm:text-2xl filter drop-shadow-lg">
            {icon}
          </span>
        </span>
        <p className={`text-lg sm:text-xl font-bold font-ubuntu-medium ${titleClassName}`}>{title}</p>
      </div>
      <p className="text-sm sm:text-base text-white/90 font-ubuntu-light leading-relaxed">{description}</p>
      <p className="text-green-300/70 font-ubuntu-light text-xs sm:text-sm">{detail}</p>
    </div>
  );
};

const DisplayCards = ({ cards = [] }) => {
  const aiCardsWithStyles = [
    {
      className: "[grid-area:stack] hover:-translate-y-8 sm:hover:-translate-y-20 before:absolute before:inset-0 before:rounded-xl before:bg-black/30 before:content-[''] grayscale-[60%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0",
    },
    {
      className: "[grid-area:stack] translate-x-8 translate-y-6 sm:translate-x-16 sm:translate-y-12 hover:-translate-y-4 sm:hover:-translate-y-10 before:absolute before:inset-0 before:rounded-xl before:bg-black/40 before:content-[''] grayscale-[80%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-12 sm:translate-x-32 sm:translate-y-24 grayscale-[100%] hover:grayscale-0 transition-all duration-700",
    },
  ];

  // Merge the passed cards with the positioning styles
  const finalCards = cards.length > 0 
    ? cards.map((card, index) => ({
        ...card,
        className: `${card.className || ''} ${aiCardsWithStyles[index]?.className || ''}`.trim()
      }))
    : aiCardsWithStyles;

  return (
    <div 
      className="grid place-items-center opacity-100 animate-in fade-in-0 duration-700 min-h-[300px] sm:min-h-[400px] w-full max-w-[600px] sm:max-w-[800px] mx-auto"
      style={{ gridTemplateAreas: '"stack"' }}
    >
      {finalCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
};

export default DisplayCards; 