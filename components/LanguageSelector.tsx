'use client';

import { useState } from 'react';
import {
  type CodeSnippet,
  getAvailableLanguages,
  getRandomSnippet,
  getSnippetByDifficulty,
} from '@/lib/snippets';

interface LanguageSelectorProps {
  onSnippetSelect: (snippet: CodeSnippet, language: string) => void;
  initialLanguage?: string;
  initialDifficulty?: 'easy' | 'medium' | 'hard' | 'random';
}

export default function LanguageSelector({
  onSnippetSelect,
  initialLanguage = 'javascript',
  initialDifficulty = 'random'
}: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | 'random'>(initialDifficulty);

  const languages = getAvailableLanguages();
  const difficulties: Array<'easy' | 'medium' | 'hard' | 'random'> = ['random', 'easy', 'medium', 'hard'];

  const handleGenerateSnippet = () => {
    let snippet: CodeSnippet | null = null;

    if (selectedDifficulty === 'random') {
      snippet = getRandomSnippet(selectedLanguage);
    } else {
      snippet = getSnippetByDifficulty(selectedLanguage, selectedDifficulty);
    }

    if (snippet) {
      onSnippetSelect(snippet, selectedLanguage);
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard' | 'random') => {
    setSelectedDifficulty(difficulty);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20';
      case 'hard':
        return 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20';
      case 'random':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20 hover:bg-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20 hover:bg-gray-500/20';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Language Selection */}
      <div className="space-y-3">
        <div className="block text-sm font-medium text-gray-300">
          Select Language
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {languages.map((language) => (
            <button
              key={language}
              type="button"
              onClick={() => handleLanguageChange(language)}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 font-medium text-sm capitalize ${
                selectedLanguage === language
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              {language}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="space-y-3">
        <div className="block text-sm font-medium text-gray-300">
          Select Difficulty
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {difficulties.map((difficulty) => (
            <button
              key={difficulty}
              type="button"
              onClick={() => handleDifficultyChange(difficulty)}
              className={`px-4 py-2 rounded-lg border transition-all duration-200 font-medium text-sm capitalize ${
                selectedDifficulty === difficulty
                  ? getDifficultyColor(difficulty).replace('hover:', '')
                  : 'bg-gray-800/50 text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          onClick={handleGenerateSnippet}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Generate New Snippet
        </button>
      </div>

      {/* Current Selection Info */}
      <div className="flex items-center justify-center gap-4 text-sm text-gray-400 pt-2">
        <span>
          Language: <span className="text-blue-400 font-medium capitalize">{selectedLanguage}</span>
        </span>
        <span className="text-gray-600">•</span>
        <span>
          Difficulty: <span className={`font-medium capitalize ${
            selectedDifficulty === 'easy' ? 'text-green-400' :
            selectedDifficulty === 'medium' ? 'text-yellow-400' :
            selectedDifficulty === 'hard' ? 'text-red-400' :
            'text-purple-400'
          }`}>{selectedDifficulty}</span>
        </span>
      </div>
    </div>
  );
}