'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ResultImage from '@/components/ResultImage';
import ShareButtons from '@/components/ShareButtons';
import AdBanner from '@/components/AdBanner';
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

  const dayIndex = getTodayFortuneIndex().toString();
  const animalData = zodiac ? (fortuneData as Record<string, FortuneAnimal>)[zodiac] : null;
  const todayFortune = animalData?.daily[dayIndex];

  if (!showResult || !zodiac || !animalData || !todayFortune) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="px-4 py-8">
          <div className="text-center mb-10">
            <div className="text-[80px] mb-2">🔮</div>
            <h1 className="text-senior-xl font-bold text-text-primary">
              오늘의 띠별 운세
            </h1>
            <p className="text-senior-xs text-text-secondary mt-2">
              태어난 해를 입력하세요
            </p>
          </div>

          <div className="max-w-xs mx-auto">
            <input
              type="number"
              inputMode="numeric"
              placeholder="예: 1965"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full h-16 text-center text-senior-lg font-bold border-2 border-border rounded-2xl bg-card text-text-primary focus:border-primary focus:outline-none"
              min={1930}
              max={2010}
            />
            <button
              onClick={handleSubmit}
              disabled={!birthYear || birthYear.length !== 4}
              className="w-full mt-4 min-h-[64px] bg-gradient-to-r from-primary to-[#FF6B4A] text-white text-senior-sm font-bold rounded-2xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              운세 보기 ✨
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-background">
      <Header />

      <main className="px-4 py-6">
        <AdBanner className="mb-6" />

        <div className="text-center mb-6">
          <span className="text-[64px]">{animalData.emoji}</span>
          <h2 className="text-senior-xl font-bold text-text-primary mt-2">
            {animalData.name} 오늘의 운세
          </h2>
        </div>

        <ResultImage
          testTitle="오늘의 운세"
          leadText={`${animalData.name} ${animalData.emoji}`}
          resultTitle={todayFortune.text.slice(0, 20)}
          resultDescription={`${todayFortune.text} 행운의 숫자: ${todayFortune.lucky_number} · 행운의 색: ${todayFortune.lucky_color}`}
          emoji={animalData.emoji}
          gradientColors={GRADIENT_COLORS[zodiac]}
        />

        <div className="mt-6 bg-white rounded-3xl p-7 shadow-lg border border-gray-100">
          <p className="text-senior-sm text-text-primary leading-relaxed text-center">
            {todayFortune.text}
          </p>
          <div className="mt-5 flex gap-4">
            <div className="flex-1 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 text-center">
              <p className="text-[15px] text-text-secondary">행운의 숫자</p>
              <p className="text-[32px] font-bold text-primary mt-1">
                {todayFortune.lucky_number}
              </p>
            </div>
            <div className="flex-1 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-4 text-center">
              <p className="text-[15px] text-text-secondary">행운의 색</p>
              <p className="text-senior-lg font-bold text-primary mt-1">
                {todayFortune.lucky_color}
              </p>
            </div>
          </div>
        </div>

        <ShareButtons
          filename={`하루한판_오늘의운세_${animalData.name}.png`}
          kakaoTitle={`${animalData.name} 오늘의 운세`}
          kakaoDescription="하루한판에서 오늘의 운세를 확인해보세요!"
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
