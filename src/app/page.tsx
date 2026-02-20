import Header from '@/components/Header';
import TestCard from '@/components/TestCard';
import AdBanner from '@/components/AdBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />

      <main className="px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-senior-2xl font-bold text-text-primary">
            오늘은 어떤 재미?
          </h1>
          <p className="text-senior-xs text-text-secondary mt-2">
            테스트하고 결과를 공유해보세요
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <TestCard
            href="/fortune/"
            icon="🔮"
            title="오늘의 띠별 운세"
            description="매일 바뀌는 나의 오늘 운세는?"
            highlight
          />
          <TestCard
            href="/test/past-life/"
            icon="🏛️"
            title="전생 테스트"
            description="나의 전생은 어떤 모습이었을까?"
          />
          <TestCard
            href="/test/health-age/"
            icon="💪"
            title="건강 나이 테스트"
            description="내 몸의 진짜 나이는 몇 살?"
          />
          <TestCard
            href="/test/idiom/"
            icon="📜"
            title="사자성어 성격 테스트"
            description="나를 표현하는 사자성어는?"
          />
        </div>
      </main>

      {/* 하단 고정 배너 광고 */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="mx-auto max-w-lg">
          <AdBanner format="auto" className="bg-white border-t border-border p-2" />
        </div>
      </div>
    </div>
  );
}
