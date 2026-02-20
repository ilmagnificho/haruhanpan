'use client';

import { useEffect, useRef } from 'react';
import { generateResultCard } from '@/lib/canvas';

interface ResultImageProps {
  testTitle: string;
  leadText: string;
  resultTitle: string;
  resultDescription: string;
  emoji?: string;
  gradientColors?: [string, string, string];
}

export default function ResultImage({
  testTitle,
  leadText,
  resultTitle,
  resultDescription,
  emoji,
  gradientColors,
}: ResultImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    generateResultCard(canvasRef.current, {
      testTitle,
      leadText,
      resultTitle,
      resultDescription,
      emoji,
      gradientColors,
    });
  }, [testTitle, leadText, resultTitle, resultDescription, emoji, gradientColors]);

  return (
    <canvas
      ref={canvasRef}
      id="result-canvas"
      className="w-full rounded-2xl shadow-2xl"
      style={{ aspectRatio: '1080/1920' }}
    />
  );
}
