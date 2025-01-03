'use client';

import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  texts: string[]; // Accept an array of strings
  speed?: number;
  delayBetweenTexts?: number; // Delay before moving to the next text
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ texts, speed = 50, delayBetweenTexts = 1000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const typeText = () => {
      let i = 0;
      setDisplayText('');
      
      timer = setInterval(() => {
        if (i < texts[currentTextIndex].length) {
          setDisplayText(prev => texts[currentTextIndex].substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          if (currentTextIndex + 1 < texts.length) {
            setTimeout(() => {
              setCurrentTextIndex(prev => prev + 1);
            }, delayBetweenTexts);
          }
        }
      }, speed);
    };

    typeText();
    return () => clearInterval(timer);
  }, [currentTextIndex, texts, speed, delayBetweenTexts]);

  return <span className="font-mono">{displayText}</span>;
};

export default TypewriterText;
