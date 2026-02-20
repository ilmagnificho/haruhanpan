'use client';

import { useState, useEffect } from 'react';
import ResultImage from '@/components/ResultImage';
import ShareButtons from '@/components/ShareButtons';
import AdBanner from '@/components/AdBanner';
import ZodiacIcon from '@/components/ZodiacIcon';
import fortuneData from '@/data/fortune.json';
import { getZodiacFromYear, getTodayFortuneIndex, type ZodiacKey } from '@/lib/fortune-calc';

type FortuneAnimal = {
  name: string;
  emoji: string;
  daily: Record<string, { text: string; lucky_number: number; lucky_color: string }>;
};

const GRADIENT_COLORS: Record<string, [string, string, string]> = {
  rat: ['#6366f1', '#8b5cf6', '#a855f7'],
  ox: ['#dc2626', '#f43f5e', '#fb7185'],
  tiger: ['#0284c7', '#0ea5e9', '#38bdf8'],
  rabbit: ['#059669', '#10b981', '#34d399'],
  dragon: ['#d97706', '#f59e0b', '#fbbf24'],
  snake: ['#7c3aed', '#a78bfa', '#c4b5fd'],
  horse: ['#ea580c', '#f97316', '#fb923c'],
  sheep: ['#2563eb', '#60a5fa', '#93c5fd'],
  monkey: ['#ca8a04', '#eab308', '#facc15'],
  rooster: ['#be123c', '#e11d48', '#fb7185'],
  dog: ['#4f46e5', '#818cf8', '#a5b4fc'],
  pig: ['#c026d3', '#e879f9', '#f0abfc'],
};

export default function FortunePage() {
  const [birthYear, setBirthYear] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [zodiac, setZodiac] = useState<ZodiacKey | null>(null);

  useEffect(() => {
    const match = document.cookie.match(/birthYear=(\d{4})/);
    if (match) {
      setBirthYear(match[1]);
    }
  }, []);

  const handleSubmit = () => {
    const year = parseInt(birthYear);
    if (isNaN(year) || year < 1930 || year > 2010) return;
    document.cookie = `birthYear=${year}; max-age=${60 * 60 * 24 * 30}; path=/`;
    const z = getZodiacFromYear(year);
    setZodiac(z);
    setShowResult(true);
  };

  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  const dayIndex = getTodayFortuneIndex().toString();
  const animalData = zodiac ? (fortuneData as Record<string, FortuneAnimal>)[zodiac] : null;
  const todayFortune = animalData?.daily[dayIndex];

  if (!showResult || !zodiac || !animalData || !todayFortune) {
    return (
      <div className="min-h-screen bg-background">
        <header className="pt-8 pb-4 px-6 text-center border-b border-primary/10">
          <h1 className="text-[32px] font-bold text-primary tracking-tight leading-tight">
            오늘의 띠별 운세
          </h1>
          <p className="text-[20px] font-medium text-text-secondary mt-2">
            {dateString}
          </p>
        </header>

        <main className="px-6 py-8">
          <div className="space-y-4">
            <label className="block text-[22px] font-bold text-text-primary">
              태어난 해를 입력하세요
            </label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="예: 1965"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full h-16 px-5 text-center text-[24px] font-bold border-4 border-primary/20 rounded-xl bg-card text-text-primary focus:border-primary focus:outline-none focus:ring-0 transition-colors placeholder:text-slate-400"
              min={1930}
              max={2010}
            />
            <button
              onClick={handleSubmit}
              disabled={!birthYear || birthYear.length !== 4}
              className="w-full h-[68px] bg-primary text-white text-[24px] font-bold rounded-xl senior-shadow disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              운세 보기
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="pt-8 pb-4 px-6 text-center border-b border-primary/10">
        <h1 className="text-[32px] font-bold text-primary tracking-tight leading-tight">
          오늘의 띠별 운세
        </h1>
        <p className="text-[20px] font-medium text-text-secondary mt-2">
          {dateString}
        </p>
      </header>

      <main className="px-5 py-6">
        <AdBanner className="mb-6" />

        {/* 띠별 아이콘 + 이름 */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <ZodiacIcon zodiac={zodiac} className="w-20 h-20" />
          <h2 className="text-[32px] font-bold text-primary">
            {animalData.name} 운세
          </h2>
        </div>

        {/* 결과 이미지 (저장용) */}
        <ResultImage
          testTitle="오늘의 운세"
          leadText={`${animalData.name} ${animalData.emoji}`}
          resultTitle={todayFortune.text.slice(0, 20)}
          resultDescription={`${todayFortune.text} 행운의 숫자: ${todayFortune.lucky_number} · 행운의 색: ${todayFortune.lucky_color}`}
          emoji={animalData.emoji}
          gradientColors={GRADIENT_COLORS[zodiac]}
        />

        {/* 골든 운세 카드 */}
        <div className="mt-6 golden-card rounded-2xl p-8 senior-shadow relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-accent px-4 py-1 rounded-full text-sm font-bold text-amber-900 uppercase tracking-widest">
            Today&apos;s Luck
          </div>
          <p className="text-[22px] leading-[1.6] text-text-primary font-medium text-center mt-2">
            &ldquo;{todayFortune.text}&rdquo;
          </p>
        </div>

        {/* 행운 정보 */}
        <div className="mt-5 flex items-center py-4 px-2 bg-white/50 rounded-xl border border-slate-200">
          <div className="flex-1 text-center">
            <p className="text-[16px] text-text-secondary">행운의 숫자</p>
            <p className="text-[32px] font-bold text-primary mt-1">
              {todayFortune.lucky_number}
            </p>
          </div>
          <div className="w-px h-12 bg-gold-accent/30" />
          <div className="flex-1 text-center">
            <p className="text-[16px] text-text-secondary">행운의 색</p>
            <p className="text-senior-lg font-bold text-primary mt-1">
              {todayFortune.lucky_color}
            </p>
          </div>
        </div>

        <ShareButtons
          filename={`하루한판_오늘의운세_${animalData.name}.png`}
          kakaoTitle={`${animalData.name} 오늘의 운세`}
          kakaoDescription="하루한판에서 오늘의 운세를 확인해보세요!"
          saveButtonClassName="bg-save-green hover:bg-save-green/90"
        />

        <AdBanner className="mt-8" />

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
