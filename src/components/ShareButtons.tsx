'use client';

import { useState } from 'react';
import { downloadCanvasImage, shareKakao } from '@/lib/share';

interface ShareButtonsProps {
  filename: string;
  kakaoTitle?: string;
  kakaoDescription?: string;
  saveButtonClassName?: string;
}

export default function ShareButtons({
  filename,
  kakaoTitle,
  kakaoDescription,
  saveButtonClassName,
}: ShareButtonsProps) {
  const [saved, setSaved] = useState(false);

  const handleDownload = () => {
    const canvas = document.getElementById('result-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    downloadCanvasImage(canvas, filename);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleKakaoShare = () => {
    if (!kakaoTitle) return;
    shareKakao({
      title: kakaoTitle,
      description: kakaoDescription || '하루한판에서 확인해보세요!',
      imageUrl: '',
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    });
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-8">
      <button
        onClick={handleDownload}
        className={`w-full min-h-[72px] text-white text-[22px] font-bold rounded-2xl shadow-xl active:scale-[0.97] transition-all duration-200 ${
          saved
            ? 'bg-green-500'
            : saveButtonClassName || 'bg-gradient-to-r from-primary to-[#FF6B4A] hover:shadow-2xl'
        }`}
      >
        {saved ? '저장 완료! 카톡에 공유해보세요 ✅' : '📸 이미지 저장하기'}
      </button>
      <button
        onClick={handleKakaoShare}
        className="w-full min-h-[60px] bg-[#FEE500] text-[#3C1E1E] text-senior-sm font-bold rounded-2xl shadow-md active:scale-[0.97] transition-all"
      >
        💬 카카오톡 공유
      </button>
      <p className="text-center text-[15px] text-text-secondary mt-1">
        💡 이미지를 저장한 뒤 카톡 단톡방에 올려보세요!
      </p>
    </div>
  );
}
