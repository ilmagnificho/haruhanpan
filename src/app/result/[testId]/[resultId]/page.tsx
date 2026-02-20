import ResultPageClient from '@/components/ResultPageClient';

import pastLifeData from '@/data/past-life.json';
import healthAgeData from '@/data/health-age.json';
import idiomData from '@/data/idiom.json';

const TEST_DATA: Record<string, { results: Record<string, unknown> }> = {
  'past-life': pastLifeData,
  'health-age': healthAgeData,
  'idiom': idiomData,
};

export function generateStaticParams() {
  const params: { testId: string; resultId: string }[] = [];
  for (const [testId, data] of Object.entries(TEST_DATA)) {
    for (const resultId of Object.keys(data.results)) {
      params.push({ testId, resultId });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { testId: string; resultId: string } }) {
  const test = TEST_DATA[params.testId];
  if (!test) return { title: '하루한판' };
  const result = test.results[params.resultId] as { title?: string } | undefined;
  const resultTitle = result?.title || '';
  const testNames: Record<string, string> = {
    'past-life': '전생 테스트',
    'health-age': '건강 나이 테스트',
    'idiom': '사자성어 성격 테스트',
  };
  return {
    title: `나의 결과: "${resultTitle}" - ${testNames[params.testId] || '하루한판'}`,
    openGraph: {
      title: `나의 결과: "${resultTitle}" - 하루한판`,
      description: '하루한판에서 나도 해보기!',
      images: ['/images/og/default.jpg'],
    },
  };
}

export default function ResultPage({ params }: { params: { testId: string; resultId: string } }) {
  return <ResultPageClient testId={params.testId} resultId={params.resultId} />;
}
