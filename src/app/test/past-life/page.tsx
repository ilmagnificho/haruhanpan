'use client';

import TestPage from '@/components/TestPage';
import pastLifeData from '@/data/past-life.json';

export default function PastLifeTestPage() {
  return <TestPage testData={pastLifeData} />;
}
