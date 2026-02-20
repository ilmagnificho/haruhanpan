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
  emoji: string;
  gradientColors: [string, string, string];
}

const TEST_MAP: Record<string, TestInfo> = {
  'past-life': {
    ...(pastLifeData as { id: string; title: string; results: Record<string, TestResult> }),
    leadText: '당신의 전생은',
    emoji: '🏛️',
    gradientColors: ['#6366f1', '#a855f7', '#ec4899'],
  },
  'health-age': {
    ...(healthAgeData as { id: string; title: string; results: Record<string, TestResult> }),
    leadText: '당신의 건강 나이는',
    emoji: '💪',
    gradientColors: ['#059669', '#10b981', '#34d399'],
  },
  'idiom': {
    ...(idiomData as { id: string; title: string; results: Record<string, TestResult> }),
    leadText: '당신을 표현하는 사자성어',
    emoji: '📜',
    gradientColors: ['#dc2626', '#f59e0b', '#f97316'],
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-background">
      <Header />

      <main className="px-4 py-6">
        {/* 축하 메시지 */}
        <div className="text-center mb-6">
          <p className="text-[40px]">🎉</p>
          <h1 className="text-senior-xl font-bold text-text-primary mt-1">
            결과가 나왔어요!
          </h1>
        </div>

        {/* 결과 이미지 - 풀 너비 */}
        <ResultImage
          testTitle={test.title}
          leadText={test.leadText}
          resultTitle={result.title}
          resultDescription={result.description}
          emoji={test.emoji}
          gradientColors={test.gradientColors}
        />

        {/* 결과 상세 카드 */}
        <div className="mt-6 bg-white rounded-3xl p-7 shadow-lg border border-gray-100">
          <div className="text-center">
            <span className="inline-block text-[14px] font-bold text-white bg-gradient-to-r from-primary to-[#FF6B4A] px-4 py-1.5 rounded-full mb-4">
              {test.title}
            </span>
            <h2 className="text-[26px] font-bold text-text-primary mb-4">
              {displayTitle}
            </h2>
            <p className="text-senior-sm text-text-secondary leading-relaxed">
              {result.description}
            </p>
          </div>
        </div>

        {/* 공유 버튼 */}
        <ShareButtons
          filename={`하루한판_${test.title}_결과.png`}
          kakaoTitle={`나의 ${test.title} 결과: "${result.title}"`}
          kakaoDescription="하루한판에서 나도 해보기!"
        />

        <AdBanner className="mt-8" format="rectangle" />

        <div className="text-center mt-8 mb-6">
          <a
            href="/"
            className="inline-block text-senior-xs font-bold text-primary bg-primary/10 px-6 py-3 rounded-full"
          >
            🎯 다른 테스트 해보기
          </a>
        </div>
      </main>
    </div>
  );
}
