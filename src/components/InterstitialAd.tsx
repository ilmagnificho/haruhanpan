'use client';

import { useState, useEffect } from 'react';

interface InterstitialAdProps {
  onComplete: () => void;
}

export default function InterstitialAd({ onComplete }: InterstitialAdProps) {
  const [phase, setPhase] = useState<'loading' | 'ad' | 'done'>('loading');
  const [dots, setDots] = useState('');

  useEffect(() => {
    // 로딩 애니메이션 (점 추가)
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    // 3초 후 광고 단계로 전환
    const timer = setTimeout(() => {
      setPhase('ad');
      clearInterval(dotInterval);
    }, 3000);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'ad') return;

    // AdSense가 없으면 바로 결과 표시
    const isAdSenseReady =
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT &&
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT !== 'placeholder_replace_later';

    if (!isAdSenseReady) {
      const timer = setTimeout(() => {
        setPhase('done');
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }

    // AdSense 전면광고 트리거 시도
    try {
      const adsbygoogle = (window as unknown as Record<string, unknown[]>).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
      }
    } catch {
      // 실패 시 바로 진행
    }

    const timer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      {phase === 'loading' && (
        <div className="text-center">
          <div className="text-[48px] mb-6 animate-bounce">🔮</div>
          <p className="text-senior-lg font-bold text-text-primary">
            결과를 확인하고 있어요{dots}
          </p>
          <div className="mt-8 w-48 h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-[loading_3s_ease-in-out]" />
          </div>
        </div>
      )}
      {phase === 'ad' && (
        <div className="text-center">
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl w-[300px] h-[250px] flex items-center justify-center text-text-secondary text-senior-xs mb-6">
            광고 영역
          </div>
          <button
            onClick={() => {
              setPhase('done');
              onComplete();
            }}
            className="text-senior-xs text-text-secondary underline min-h-0 py-2"
          >
            결과 보기
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
