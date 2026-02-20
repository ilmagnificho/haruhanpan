'use client';

import { useState } from 'react';

interface Option {
  text: string;
  scores: Record<string, number>;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface QuestionStepProps {
  question: Question;
  currentStep: number;
  totalSteps: number;
  onAnswer: (scores: Record<string, number>) => void;
  onBack: () => void;
}

export default function QuestionStep({
  question,
  currentStep,
  totalSteps,
  onAnswer,
  onBack,
}: QuestionStepProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number, scores: Record<string, number>) => {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => {
      onAnswer(scores);
      setSelected(null);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 상단 바 */}
      <header className="flex items-center justify-between px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-text-primary font-bold text-xl min-h-0 py-2 active:opacity-60 transition-opacity"
        >
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          이전
        </button>
        <div className="text-text-primary font-bold text-2xl tracking-widest">
          {currentStep} / {totalSteps}
        </div>
        <div className="w-20" />
      </header>

      {/* 진행 바 */}
      <div className="px-6 mb-12">
        <div className="w-full h-3 bg-primary/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* 질문 + 선택지 */}
      <div className="flex-1 flex flex-col px-6">
        <h2 className="text-[26px] font-bold text-text-primary text-center leading-snug mb-12">
          {question.text}
        </h2>

        <div className="flex flex-col gap-4">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index, option.scores)}
              disabled={selected !== null}
              className={`w-full min-h-[72px] px-6 py-4 rounded-xl text-senior-sm font-semibold text-center transition-all duration-300 ${
                selected === index
                  ? 'bg-primary text-white font-bold ring-4 ring-primary/20 shadow-lg scale-[0.98]'
                  : 'bg-white text-text-primary shadow-sm border-2 border-slate-100'
              } ${selected !== null && selected !== index ? 'opacity-40 scale-[0.98]' : ''}`}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
