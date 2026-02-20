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
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6">
      {/* 상단 네비게이션 */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-senior-xs text-text-secondary min-h-0 py-2 px-3"
        >
          &lt; 이전
        </button>
        <span className="text-senior-sm font-bold text-primary">
          {currentStep} / {totalSteps}
        </span>
        <div className="w-16" />
      </div>

      {/* 진행 바 */}
      <div className="w-full h-2 bg-border rounded-full mb-10 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* 질문 */}
      <h2 className="text-senior-lg font-bold text-text-primary text-center mb-10 leading-relaxed">
        {question.text}
      </h2>

      {/* 선택지 */}
      <div className="flex flex-col gap-4 flex-1">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index, option.scores)}
            disabled={selected !== null}
            className={`w-full min-h-[64px] px-5 py-4 rounded-2xl text-senior-sm font-medium text-left transition-all duration-200 ${
              selected === index
                ? 'bg-primary text-white scale-[0.97] shadow-lg'
                : 'bg-card text-text-primary shadow-md hover:shadow-lg'
            } ${selected !== null && selected !== index ? 'opacity-50' : ''}`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
