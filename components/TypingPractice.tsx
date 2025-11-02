'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TypingStats {
  wpm: number;
  accuracy: number;
  time: number;
  errors: number;
  correctChars: number;
  totalChars: number;
}

interface TypingPracticeProps {
  codeSnippet: string;
  language: string;
  onComplete?: (stats: TypingStats) => void;
}

export default function TypingPractice({
  codeSnippet,
  language,
  onComplete
}: TypingPracticeProps) {
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    time: 0,
    errors: 0,
    correctChars: 0,
    totalChars: 0,
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Calculate WPM and accuracy
  const calculateStats = useCallback((input: string, timeElapsed: number): TypingStats => {
    const correctChars = input.split('').filter((char, i) => char === codeSnippet[i]).length;
    const totalChars = input.length;
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 100;
    const minutes = timeElapsed / 60000;
    const wordsTyped = correctChars / 5; // Standard: 5 characters = 1 word
    const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;

    return {
      wpm,
      accuracy: Math.round(accuracy * 10) / 10,
      time: Math.round(timeElapsed / 1000),
      errors,
      correctChars,
      totalChars: codeSnippet.length,
    };
  }, [codeSnippet, errors]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    // Start timer on first keystroke
    if (!startTime && value.length === 1) {
      setStartTime(Date.now());
    }

    // Prevent typing beyond the snippet length
    if (value.length > codeSnippet.length) {
      return;
    }

    // Check if current character is wrong
    if (value.length > userInput.length) {
      const newCharIndex = value.length - 1;
      if (value[newCharIndex] !== codeSnippet[newCharIndex]) {
        setErrors(prev => prev + 1);
      }
    }

    setUserInput(value);
    setCurrentIndex(value.length);

    // Check if finished
    if (value === codeSnippet) {
      const timeElapsed = Date.now() - (startTime || Date.now());
      const finalStats = calculateStats(value, timeElapsed);
      setStats(finalStats);
      setIsFinished(true);
      onComplete?.(finalStats);
    }
  };

  // Update stats in real-time
  useEffect(() => {
    if (startTime && !isFinished && userInput.length > 0) {
      const interval = setInterval(() => {
        const timeElapsed = Date.now() - startTime;
        setStats(calculateStats(userInput, timeElapsed));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [startTime, userInput, isFinished, calculateStats]);

  // Reset function
  const handleReset = () => {
    setUserInput('');
    setStartTime(null);
    setIsFinished(false);
    setCurrentIndex(0);
    setErrors(0);
    setStats({
      wpm: 0,
      accuracy: 100,
      time: 0,
      errors: 0,
      correctChars: 0,
      totalChars: 0,
    });
    inputRef.current?.focus();
  };

  // Render character with correct/incorrect styling
  const renderCharacter = (char: string, index: number) => {
    let className = 'text-gray-500';

    if (index < userInput.length) {
      if (userInput[index] === char) {
        className = 'text-green-500';
      } else {
        className = 'text-red-500 bg-red-500/10';
      }
    } else if (index === currentIndex) {
      className = 'text-gray-500 bg-yellow-500/20 animate-pulse';
    }

    // Handle special characters visibility
    const displayChar = char === ' ' ? '·' : char === '\n' ? '↵' : char === '\t' ? '→' : char;

    return (
      <span key={index} className={`${className} transition-colors duration-75`}>
        {displayChar === '↵' ? (
          <>
            {displayChar}
            <br />
          </>
        ) : (
          displayChar
        )}
      </span>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Stats Bar */}
      <div className="flex gap-6 justify-center text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">{stats.wpm}</div>
          <div className="text-gray-400">WPM</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">{stats.accuracy}%</div>
          <div className="text-gray-400">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-500">{stats.time}s</div>
          <div className="text-gray-400">Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-500">{errors}</div>
          <div className="text-gray-400">Errors</div>
        </div>
      </div>

      {/* Language Badge */}
      <div className="flex justify-center">
        <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium">
          {language}
        </span>
      </div>

      {/* Code Display */}
      <div className="relative">
        <div className="bg-gray-900 rounded-lg p-6 font-mono text-base leading-relaxed overflow-x-auto border border-gray-800">
          <pre className="whitespace-pre-wrap break-words">
            {codeSnippet.split('').map((char, index) => renderCharacter(char, index))}
          </pre>
        </div>

        {/* Hidden Input */}
        <textarea
          ref={inputRef}
          value={userInput}
          onChange={handleInputChange}
          disabled={isFinished}
          className="absolute inset-0 opacity-0 cursor-default resize-none"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </div>

      {/* Result Screen */}
      {isFinished && (
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-500">Completed!</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold text-yellow-500">{stats.wpm}</div>
              <div className="text-gray-400 mt-1">WPM</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500">{stats.accuracy}%</div>
              <div className="text-gray-400 mt-1">Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-500">{stats.time}s</div>
              <div className="text-gray-400 mt-1">Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-500">{stats.errors}</div>
              <div className="text-gray-400 mt-1">Errors</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Instructions */}
      {!startTime && !isFinished && (
        <div className="text-center text-gray-400 text-sm">
          Click anywhere and start typing to begin
        </div>
      )}
    </div>
  );
}
