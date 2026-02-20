'use client';

import { useEffect, useRef } from 'react';
import { generateResultCard, generateDarkResultCard } from '@/lib/canvas';

interface ResultImageProps {
  testTitle: string;
  leadText: string;
  resultTitle: string;
  resultDescription: string;
  emoji?: string;
  gradientColors?: [string, string, string];
  theme?: 'default' | 'dark-premium';
}

export default function ResultImage({
  testTitle,
  leadText,
  resultTitle,
  resultDescription,
  emoji,
  gradientColors,
  theme = 'default',
}: ResultImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const opts = { testTitle, leadText, resultTitle, resultDescription, emoji, gradientColors };
    if (theme === 'dark-premium') {
      generateDarkResultCard(canvasRef.current, opts);
    } else {
      generateResultCard(canvasRef.current, opts);
    }
  }, [testTitle, leadText, resultTitle, resultDescription, emoji, gradientColors, theme]);

  const aspectRatio = theme === 'dark-premium' ? '1080/1350' : '1080/1920';

  return (
    <canvas
      ref={canvasRef}
      id="result-canvas"
      className="w-full rounded-2xl shadow-2xl"
      style={{ aspectRatio }}
    />
  );
}
