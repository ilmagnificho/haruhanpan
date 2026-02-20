'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  format?: 'auto' | 'fluid' | 'rectangle';
  className?: string;
}

export default function AdBanner({ format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdSenseReady =
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT &&
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT !== 'placeholder_replace_later';

  useEffect(() => {
    if (!isAdSenseReady) return;
    try {
      const adsbygoogle = (window as unknown as Record<string, unknown[]>).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
      }
    } catch {
      // AdSense 로드 실패 시 무시
    }
  }, [isAdSenseReady]);

  if (!isAdSenseReady) {
    // 개발 모드: placeholder
    return (
      <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-text-secondary text-senior-xs py-6 ${className}`}>
        광고 영역
      </div>
    );
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
        data-ad-slot="auto"
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
