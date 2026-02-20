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

const OPTION_EMOJIS = ['🅰️', '🅱️', '🅲', '🅳'];
const STEP_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣'];

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
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-senior-xs text-text-secondary min-h-0 py-2 px-3 rounded-full hover:bg-gray-100"
        >
          ← 이전
        </button>
        <div className="flex items-center gap-2">
          <span className="text-[20px]">{STEP_EMOJIS[currentStep - 1] || `${currentStep}`}</span>
          <span className="text-senior-xs font-bold text-text-primary">
            {currentStep} / {totalSteps}
          </span>
        </div>
        <div className="w-16" />
      </div>

      {/* 진행 바 */}
      <div className="px-4 pt-4">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-[#FF6B4A] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* 질문 */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <p className="text-[15px] text-primary font-bold text-center mb-3">
            Q{currentStep}.
          </p>
          <h2 className="text-senior-xl font-bold text-text-primary text-center leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* 선택지 */}
        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index, option.scores)}
              disabled={selected !== null}
              className={`w-full min-h-[68px] px-5 py-4 rounded-2xl text-senior-sm font-medium text-left transition-all duration-300 flex items-center gap-3 ${
                selected === index
                  ? 'bg-gradient-to-r from-primary to-[#FF6B4A] text-white scale-[0.96] shadow-xl'
                  : 'bg-white text-text-primary shadow-md hover:shadow-lg border-2 border-transparent hover:border-primary/20'
              } ${selected !== null && selected !== index ? 'opacity-40 scale-[0.98]' : ''}`}
            >
              <span className="text-[22px] flex-shrink-0">{OPTION_EMOJIS[index]}</span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
