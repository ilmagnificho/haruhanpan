'use client';

import { useEffect, useRef } from 'react';
import { generateResultCard } from '@/lib/canvas';

interface ResultImageProps {
  testTitle: string;
  leadText: string;
  resultTitle: string;
  resultDescription: string;
  gradientColors?: [string, string];
}

export default function ResultImage({
  testTitle,
  leadText,
  resultTitle,
  resultDescription,
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
      gradientColors,
    });
  }, [testTitle, leadText, resultTitle, resultDescription, gradientColors]);

  return (
    <canvas
      ref={canvasRef}
      id="result-canvas"
      className="w-full max-w-md mx-auto rounded-2xl shadow-lg"
      style={{ aspectRatio: '1080/1350' }}
    />
  );
}
