'use client';

import TestPage from '@/components/TestPage';
import healthAgeData from '@/data/health-age.json';

export default function HealthAgeTestPage() {
  return <TestPage testData={healthAgeData} />;
}
