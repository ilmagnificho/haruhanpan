'use client';

import TestPage from '@/components/TestPage';
import idiomData from '@/data/idiom.json';

export default function IdiomTestPage() {
  return <TestPage testData={idiomData} />;
}
