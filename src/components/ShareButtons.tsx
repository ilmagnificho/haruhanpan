'use client';

import { downloadCanvasImage, shareKakao } from '@/lib/share';

interface ShareButtonsProps {
  filename: string;
  kakaoTitle?: string;
  kakaoDescription?: string;
}

export default function ShareButtons({
  filename,
  kakaoTitle,
  kakaoDescription,
}: ShareButtonsProps) {
  const handleDownload = () => {
    const canvas = document.getElementById('result-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    downloadCanvasImage(canvas, filename);
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
    <div className="flex flex-col gap-4 w-full mt-6">
      <button
        onClick={handleDownload}
        className="w-full min-h-[64px] bg-primary text-white text-senior-sm font-bold rounded-2xl shadow-lg active:scale-[0.97] transition-transform"
      >
        이미지 저장하기
      </button>
      <button
        onClick={handleKakaoShare}
        className="w-full min-h-[56px] bg-[#FEE500] text-[#3C1E1E] text-senior-xs font-bold rounded-2xl shadow-md active:scale-[0.97] transition-transform"
      >
        카카오톡 공유
      </button>
    </div>
  );
}
