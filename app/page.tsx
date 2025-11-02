'use client';

import { useState } from 'react';

import type { CodeSnippet } from '@/lib/snippets';
import LanguageSelector from '@/components/LanguageSelector';
import type { TypingStats } from '@/components/TypingPractice';
import TypingPractice from '@/components/TypingPractice';

import RootLayout from './layout';

export default function Home() {
  const [currentSnippet, setCurrentSnippet] = useState<CodeSnippet | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>('javascript');
  const [showPractice, setShowPractice] = useState(false);

  const handleSnippetSelect = (snippet: CodeSnippet, language: string) => {
    setCurrentSnippet(snippet);
    setCurrentLanguage(language);
    setShowPractice(true);
  };

  const handleBackToSelector = () => {
    setShowPractice(false);
    setCurrentSnippet(null);
  };

  const handleComplete = (stats: TypingStats) => {
    console.log('Practice completed with stats:', stats);
    // TODO: Add logic to save statistics (Phase 3: Persistence)
  };

  return (
    <RootLayout>
      <div className="min-h-screen py-8 px-4">
        <main className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              CodeType
            </h1>
            <p className="text-gray-400 text-lg">
              Practice your coding speed and accuracy
            </p>
          </div>

          {/* Main Content */}
          {!showPractice ? (
            <LanguageSelector
              onSnippetSelect={handleSnippetSelect}
              initialLanguage="javascript"
              initialDifficulty="random"
            />
          ) : currentSnippet ? (
            <div className="space-y-6">
              {/* Back button and snippet info */}
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <button
                  type="button"
                  onClick={handleBackToSelector}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors flex items-center gap-2"
                >
                  <span>←</span>
                  <span>Back to selector</span>
                </button>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium capitalize">
                    {currentLanguage}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    currentSnippet.difficulty === 'easy' ? 'bg-green-500/10 text-green-500' :
                    currentSnippet.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
                  }`}>
                    {currentSnippet.difficulty}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-gray-400 text-sm">
                  {currentSnippet.description}
                </p>
              </div>

              {/* Typing Practice */}
              <TypingPractice
                codeSnippet={currentSnippet.code}
                language={currentLanguage}
                onComplete={handleComplete}
              />
            </div>
          ) : null}
        </main>
      </div>
    </RootLayout>
  );
}
