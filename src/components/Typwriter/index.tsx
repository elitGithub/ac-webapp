import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface TypewriterProps {
  text: string;
  onFinish?: () => void;
  typingDelay?: number;
  typingSpeed?: number;
  finish?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  onFinish,
  typingDelay = 500,
  typingSpeed = 30,
  finish
}) => {
  const [currentText, setCurrentText] = useState('');
  const [isTypingFinished, setIsTypingFinished] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const typingSpeedRef = useRef(typingSpeed);

  useEffect(() => {
    setCurrentText('');
    setIsTypingFinished(false);
    typingSpeedRef.current = typingSpeed;
  }, [text]);

  useEffect(() => {
    if (currentText === text) {
      setIsTypingFinished(true);
      // Trigger onFinish listener when the typewriter effect ends
      if (typeof onFinish === 'function') {
        onFinish();
      }
      return;
    }

    if(!text) {
      setIsTypingFinished(true);
      return;
    }

    typingTimeoutRef.current = setTimeout(() => {
       setCurrentText((prevText) => text.slice(0, prevText.length + 1));
    }, typingSpeedRef.current);

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [currentText, text]);

  useEffect( () => {
    if(finish) {
      // * Immediately finish the typewrite when set to true
      finishTypewriter();
    }
  }, [finish])

  const finishTypewriter = () => {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    setCurrentText(text);
    setIsTypingFinished(true);
    if (typeof onFinish === 'function') {
      onFinish();
    }
  };

  useEffect(() => {
    if (typingSpeedRef.current > 0) {
      const interval = setInterval(() => {
        typingSpeedRef.current -= 5;
      }, typingDelay);
      return () => {
        clearInterval(interval);
      };
    }
  }, [typingDelay]);

  return (
    <div>
      <ReactMarkdown>{currentText}</ReactMarkdown>
    </div>
  );
};

export default Typewriter;