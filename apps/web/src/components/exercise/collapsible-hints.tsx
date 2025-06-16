'use client';

import React, { useState } from 'react';

interface CollapsibleHintsProps {
  hints: string[];
}

export function CollapsibleHints({ hints }: CollapsibleHintsProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!hints || hints.length === 0) {
    return null;
  }

  return (
    <div className="border border-warning-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-warning-50 hover:bg-warning-100 transition-colors duration-200 flex items-center justify-between text-warning-800"
      >
        <div className="flex items-center gap-2">
          <span>💡</span>
          <span className="font-medium">Need a hint?</span>
        </div>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="px-4 py-3 bg-warning-25 border-t border-warning-200 animate-slide-up">
          <div className="space-y-3">
            {hints.map((hint, index) => (
              <div key={index} className="flex gap-3">
                <span className="text-warning-600 font-medium text-sm mt-0.5">
                  {index + 1}.
                </span>
                <p className="text-warning-700 text-sm flex-1">
                  {hint}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
