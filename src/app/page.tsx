import Header from '@/components/Header';
import TestCard from '@/components/TestCard';
import AdBanner from '@/components/AdBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pb-28">
      <Header />

      {/* 히어로 영역 */}
      <div className="bg-gradient-to-b from-primary/5 to-background px-4 pt-8 pb-4">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <span className="text-6xl animate-bounce">🎯</span>
          </div>
          <h1 className="text-4xl font-bold text-text-primary mt-2">
            오늘은 어떤 재미?
          </h1>
          <p className="text-xl text-text-secondary mt-2 font-medium">
            재미있는 테스트하고 친구에게 자랑하세요!
          </p>
        </div>
      </div>

      <main className="px-5 py-2">
        <div className="flex flex-col gap-6">
          <TestCard
            href="/fortune/"
            icon="🔮"
            title="오늘의 띠별 운세"
            description="매일 바뀌는 나의 오늘 운세는 어떨까요?"
            highlight
            badge="매일 업데이트"
          />
          <TestCard
            href="/test/past-life/"
            icon="🏛️"
            title="전생 테스트"
            description="나의 전생은 어떤 모습이었을까?"
            badge="인기"
            badgeColor="red"
          />
          <TestCard
            href="/test/health-age/"
            icon="💪"
            title="건강 나이 테스트"
            description="내 몸의 진짜 나이는 몇 살일까요?"
            badge="추천"
            badgeColor="green"
          />
          <TestCard
            href="/test/idiom/"
            icon="📜"
            title="사자성어 테스트"
            description="나를 표현하는 사자성어는 무엇일까요?"
          />
        </div>

        {/* 하단 공유 유도 */}
        <div className="mt-8 bg-orange-100/50 rounded-2xl p-6 text-center">
          <p className="text-xl font-medium text-text-primary">
            결과 이미지를 저장해서<br />
            <span className="text-primary font-bold">카카오톡</span>에 공유해보세요! 📲
          </p>
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
