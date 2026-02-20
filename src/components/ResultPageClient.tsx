'use client';

import { useState, useCallback, useEffect } from 'react';
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

const OTHER_TESTS = [
  { id: 'past-life', href: '/test/past-life/', icon: '🏛️', title: '전생 테스트' },
  { id: 'health-age', href: '/test/health-age/', icon: '💪', title: '건강 나이 테스트' },
  { id: 'idiom', href: '/test/idiom/', icon: '📜', title: '사자성어 테스트' },
];

export default function ResultPageClient({
  testId,
  resultId,
}: {
  testId: string;
  resultId: string;
}) {
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    setMounted(true);
    const match = document.cookie.match(/userName=([^;]+)/);
    if (match) {
      setName(decodeURIComponent(match[1]));
    }
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

  if (!mounted) return null;

  if (!showResult) {
    return <InterstitialAd onComplete={handleAdComplete} />;
  }

  const recommendations = OTHER_TESTS.filter((t) => t.id !== testId).slice(0, 2);

  return (
    <div className="min-h-screen bg-background-dark text-white">
      {/* 미니 헤더 */}
      <div className="px-5 py-4 flex items-center justify-between sticky top-0 z-50 bg-background-dark/80 backdrop-blur-md border-b border-primary-green/10">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold text-primary-green tracking-tight">하루한판</span>
        </div>
        <a href="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <svg className="w-6 h-6 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </a>
      </div>

      <main className="max-w-md mx-auto px-5 pt-4 pb-24">
        {/* 결과 이미지 카드 */}
        <div className="relative">
          <ResultImage
            testTitle={test.title}
            leadText={test.leadText}
            resultTitle={result.title}
            resultDescription={result.description}
            emoji={test.emoji}
            gradientColors={test.gradientColors}
            theme="dark-premium"
            name={name || undefined}
          />
          {/* 축하 아이콘 */}
          <div className="absolute -top-3 -right-3 bg-primary-green text-white p-2.5 rounded-full shadow-lg transform rotate-12">
            <span className="text-2xl block leading-none">🎉</span>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="mt-8 space-y-4">
          <ShareButtons
            filename={`하루한판_${test.title}_결과.png`}
            kakaoTitle={`나의 ${test.title} 결과: "${result.title}"`}
            kakaoDescription="하루한판에서 나도 해보기!"
            saveButtonClassName="bg-primary-green hover:bg-primary-green/90"
          />
        </div>

        {/* 이름 입력 (선택) */}
        <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-white/70 text-[15px] mb-3 text-center">
            📝 이름을 넣으면 더 특별한 이미지로 저장돼요!
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="이름 또는 닉네임 (선택)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={10}
              className="flex-1 h-12 px-4 text-[16px] bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary-green"
            />
            <button
              onClick={() => {
                const trimmed = name.trim();
                if (trimmed) {
                  document.cookie = `userName=${encodeURIComponent(trimmed)}; max-age=${60 * 60 * 24 * 90}; path=/`;
                  setName(trimmed);
                } else {
                  document.cookie = 'userName=; max-age=0; path=/';
                  setName('');
                }
              }}
              className="h-12 px-4 bg-primary-green text-white text-[15px] font-bold rounded-xl active:scale-95 transition-transform"
            >
              적용
            </button>
          </div>
        </div>

        {/* 다른 테스트 */}
        <div className="text-center py-4 mt-2">
          <a
            href="/"
            className="text-white/50 text-xl font-semibold inline-flex items-center gap-1 hover:text-primary-green transition-colors"
          >
            다른 테스트 해보기
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* 추천 테스트 */}
        <div className="pt-8 border-t border-primary-green/20">
          <h3 className="text-[20px] font-bold text-white/90 mb-4 flex items-center gap-2">
            <span className="text-primary-green">✨</span>
            다른 테스트도 해보세요
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <a
                key={rec.id}
                href={rec.href}
                className="bg-primary-green/10 rounded-xl p-5 border border-primary-green/10 text-center active:scale-95 transition-transform"
              >
                <span className="text-[40px] block">{rec.icon}</span>
                <p className="text-[15px] font-bold text-white/80 mt-3">{rec.title}</p>
              </a>
            ))}
          </div>
        </div>

        {/* 광고 */}
        <AdBanner className="mt-8" format="rectangle" />
      </main>
    </div>
  );
}
