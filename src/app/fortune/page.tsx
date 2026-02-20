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

const GRADIENT_COLORS: Record<string, [string, string]> = {
  rat: ['#667eea', '#764ba2'],
  ox: ['#f093fb', '#f5576c'],
  tiger: ['#4facfe', '#00f2fe'],
  rabbit: ['#43e97b', '#38f9d7'],
  dragon: ['#fa709a', '#fee140'],
  snake: ['#a18cd1', '#fbc2eb'],
  horse: ['#ffecd2', '#fcb69f'],
  sheep: ['#89f7fe', '#66a6ff'],
  monkey: ['#fddb92', '#d1fdff'],
  rooster: ['#ff9a9e', '#fecfef'],
  dog: ['#fbc2eb', '#a6c1ee'],
  pig: ['#ffecd2', '#fcb69f'],
};

export default function FortunePage() {
  const [birthYear, setBirthYear] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [zodiac, setZodiac] = useState<ZodiacKey | null>(null);

  // 쿠키에서 생년 복원
  useEffect(() => {
    const match = document.cookie.match(/birthYear=(\d{4})/);
    if (match) {
      setBirthYear(match[1]);
    }
  }, []);

  const handleSubmit = () => {
    const year = parseInt(birthYear);
    if (isNaN(year) || year < 1930 || year > 2010) return;

    // 쿠키에 저장 (30일)
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
            <div className="text-[64px] mb-4">🔮</div>
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
              className="w-full mt-4 min-h-[64px] bg-primary text-white text-senior-sm font-bold rounded-2xl shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              운세 보기
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-4 py-6">
        <AdBanner className="mb-6" />

        <div className="text-center mb-6">
          <span className="text-[48px]">{animalData.emoji}</span>
          <h2 className="text-senior-xl font-bold text-text-primary mt-2">
            {animalData.name} 오늘의 운세
          </h2>
        </div>

        <ResultImage
          testTitle="오늘의 운세"
          leadText={`${animalData.name} ${animalData.emoji}`}
          resultTitle={todayFortune.text.slice(0, 20)}
          resultDescription={`${todayFortune.text}\n\n행운의 숫자: ${todayFortune.lucky_number}\n행운의 색: ${todayFortune.lucky_color}`}
          gradientColors={GRADIENT_COLORS[zodiac]}
        />

        <div className="mt-6 bg-card rounded-2xl p-6 shadow-md">
          <p className="text-senior-sm text-text-primary leading-relaxed">
            {todayFortune.text}
          </p>
          <div className="mt-4 flex gap-4">
            <div className="flex-1 bg-background rounded-xl p-4 text-center">
              <p className="text-senior-xs text-text-secondary">행운의 숫자</p>
              <p className="text-senior-lg font-bold text-primary mt-1">
                {todayFortune.lucky_number}
              </p>
            </div>
            <div className="flex-1 bg-background rounded-xl p-4 text-center">
              <p className="text-senior-xs text-text-secondary">행운의 색</p>
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

        <AdBanner className="mt-6" />

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
