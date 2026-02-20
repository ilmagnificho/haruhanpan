'use client';

import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header';
import ResultImage from '@/components/ResultImage';
import ShareButtons from '@/components/ShareButtons';
import InterstitialAd from '@/components/InterstitialAd';
import AdBanner from '@/components/AdBanner';

import pastLifeData from '@/data/past-life.json';
import healthAgeData from '@/data/health-age.json';
import idiomData from '@/data/idiom.json';

interface TestResult {
  title: string;
  subtitle?: string;
  description: string;
  age_offset?: number;
}

interface TestInfo {
  id: string;
  title: string;
  results: Record<string, TestResult>;
  leadText: string;
  gradientColors: [string, string];
}

const TEST_MAP: Record<string, TestInfo> = {
  'past-life': {
    ...(pastLifeData as { id: string; title: string; results: Record<string, TestResult> }),
    leadText: '당신의 전생은',
    gradientColors: ['#667eea', '#764ba2'],
  },
  'health-age': {
    ...(healthAgeData as { id: string; title: string; results: Record<string, TestResult> }),
    leadText: '당신의 건강 나이는',
    gradientColors: ['#43e97b', '#38f9d7'],
  },
  'idiom': {
    ...(idiomData as { id: string; title: string; results: Record<string, TestResult> }),
    leadText: '당신을 표현하는 사자성어',
    gradientColors: ['#fa709a', '#fee140'],
  },
};

export default function ResultPageClient({
  testId,
  resultId,
}: {
  testId: string;
  resultId: string;
}) {
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAdComplete = useCallback(() => {
    setShowResult(true);
  }, []);

  const test = TEST_MAP[testId];
  const result = test?.results[resultId];

  if (!test || !result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-senior-lg text-text-primary">결과를 찾을 수 없습니다</p>
          <a href="/" className="text-senior-sm text-primary underline mt-4 block">
            메인으로 돌아가기
          </a>
        </div>
      </div>
    );
  }

  const displayTitle = result.subtitle
    ? `${result.title} - ${result.subtitle}`
    : result.title;

  if (!mounted) return null;

  if (!showResult) {
    return <InterstitialAd onComplete={handleAdComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-senior-xl font-bold text-text-primary">
            {test.title} 결과
          </h1>
        </div>

        <ResultImage
          testTitle={test.title}
          leadText={test.leadText}
          resultTitle={result.title}
          resultDescription={result.description}
          gradientColors={test.gradientColors}
        />

        <div className="mt-6 bg-card rounded-2xl p-6 shadow-md">
          <h2 className="text-senior-lg font-bold text-primary text-center mb-3">
            {displayTitle}
          </h2>
          <p className="text-senior-sm text-text-primary leading-relaxed text-center">
            {result.description}
          </p>
        </div>

        <ShareButtons
          filename={`하루한판_${test.title}_결과.png`}
          kakaoTitle={`나의 ${test.title} 결과: "${result.title}"`}
          kakaoDescription="하루한판에서 나도 해보기!"
        />

        <AdBanner className="mt-6" format="rectangle" />

        <div className="text-center mt-8 mb-4">
          <a
            href="/"
            className="text-senior-xs text-secondary underline"
          >
            다른 테스트 해보기
          </a>
        </div>
      </main>
    </div>
  );
}
