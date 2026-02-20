'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import QuestionStep from '@/components/QuestionStep';

interface Option {
  text: string;
  scores: Record<string, number>;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

interface TestData {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  results: Record<string, { title: string }>;
}

export default function TestPage({ testData }: { testData: TestData }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleAnswer = useCallback(
    (optionScores: Record<string, number>) => {
      const newScores = { ...scores };
      for (const [key, value] of Object.entries(optionScores)) {
        newScores[key] = (newScores[key] || 0) + value;
      }
      setScores(newScores);

      if (step + 1 >= testData.questions.length) {
        // 최고 점수 결과 찾기
        let maxKey = Object.keys(testData.results)[0];
        let maxScore = -1;
        for (const [key, value] of Object.entries(newScores)) {
          if (value > maxScore && testData.results[key]) {
            maxScore = value;
            maxKey = key;
          }
        }
        router.push(`/result/${testData.id}/${maxKey}/`);
      } else {
        setStep(step + 1);
      }
    },
    [scores, step, testData, router]
  );

  const handleBack = useCallback(() => {
    if (step === 0) {
      router.back();
    } else {
      setStep(step - 1);
    }
  }, [step, router]);

  return (
    <QuestionStep
      question={testData.questions[step]}
      currentStep={step + 1}
      totalSteps={testData.questions.length}
      onAnswer={handleAnswer}
      onBack={handleBack}
    />
  );
}
