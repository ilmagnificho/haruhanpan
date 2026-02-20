# 하루한판 (haruhanpan.com) - PRD for Claude Code

## TL;DR
한국 50-60대 시니어 대상 웹 기반 테스트/운세 플랫폼. 푸망(poomang.com)의 시니어 버전.
결과 이미지를 카카오톡 단톡방에 공유하는 바이럴 루프가 핵심.
광고 수익 극대화, 운영비 0원(Vercel 무료 티어) 목표.

## 기술 스택 (반드시 준수)
- **Framework:** Next.js 14 App Router (Static Export - `output: 'export'`)
- **Styling:** TailwindCSS (고대비, 초대형 폰트)
- **Image Gen:** HTML5 Canvas API (결과 카드 이미지 생성)
- **Data:** 정적 JSON 파일 (DB 없음, API 호출 없음)
- **Deploy:** GitHub → Vercel (자동 배포)
- **Analytics:** Google Analytics 4 (gtag.js)
- **Ads:** Google AdSense (전면광고 + 배너)

## 절대 금지 사항
- LLM API 호출 금지 (OpenAI, Anthropic 등) - 비용 발생
- 서버 사이드 DB 금지 (Supabase, Firebase 등) - 비용/복잡성
- 로그인/회원가입 금지 - 5060은 안 함
- 영어 UI 텍스트 금지 - 모든 UI는 100% 한국어
- 작은 폰트 금지 - 최소 18px, 본문 20px, 제목 28px 이상
- localStorage 의존 금지 - 카톡 인앱 브라우저에서 초기화됨

## 디렉토리 구조
```
haruhanpan/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 공통 레이아웃 (메타태그, GA, AdSense)
│   │   ├── page.tsx            # 메인 (테스트 목록)
│   │   ├── fortune/
│   │   │   └── page.tsx        # 오늘의 띠별 운세
│   │   ├── test/
│   │   │   ├── past-life/
│   │   │   │   └── page.tsx    # 전생 테스트
│   │   │   ├── health-age/
│   │   │   │   └── page.tsx    # 건강나이 테스트
│   │   │   └── idiom/
│   │   │       └── page.tsx    # 사자성어 성격 테스트
│   │   └── result/
│   │       └── [testId]/
│   │           └── [resultId]/
│   │               └── page.tsx  # 결과 페이지 (이미지 생성 + 광고 + 공유)
│   ├── components/
│   │   ├── TestCard.tsx        # 메인 테스트 목록 카드
│   │   ├── QuestionStep.tsx    # 질문 단계 UI
│   │   ├── ResultImage.tsx     # Canvas 결과 이미지 생성
│   │   ├── ShareButtons.tsx    # 이미지저장 + 카카오공유 버튼
│   │   ├── AdBanner.tsx        # 광고 배너 컴포넌트
│   │   ├── InterstitialAd.tsx  # 전면 광고 컴포넌트
│   │   └── Header.tsx          # 상단 헤더
│   ├── data/
│   │   ├── fortune.json        # 12띠 x 31일 = 372개 운세 텍스트
│   │   ├── past-life.json      # 전생 테스트 문항 + 12개 결과
│   │   ├── health-age.json     # 건강나이 테스트 문항 + 10개 결과
│   │   └── idiom.json          # 사자성어 테스트 문항 + 12개 결과
│   ├── lib/
│   │   ├── canvas.ts           # Canvas 이미지 생성 유틸
│   │   ├── share.ts            # 카카오 SDK + 이미지 다운로드
│   │   └── fortune-calc.ts     # 띠 계산 (생년 → 12지)
│   └── styles/
│       └── globals.css         # TailwindCSS + 시니어 전용 스타일
├── public/
│   ├── images/
│   │   ├── backgrounds/        # 결과 카드 배경 이미지 10장 (꽃, 산수화)
│   │   ├── og/                 # OG 이미지 (카톡 썸네일)
│   │   └── icons/              # 테스트 아이콘
│   └── fonts/                  # 나눔스퀘어라운드 (시니어 가독성 최적)
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 핵심 사용자 플로우

### 플로우 1: 신규 유저 (네이버 검색 유입)
```
네이버 "하루한판" 검색 → 메인 페이지 → 테스트 선택 → 질문 5-7개 답변
→ [전면광고 1회] → 결과 확인 → "이미지 저장" 클릭 → 갤러리 저장
→ 카톡 단톡방에 사진 전송 (유저가 직접)
```

### 플로우 2: 바이럴 유입 (단톡방에서 이미지 본 사람)
```
단톡방에서 결과 이미지 봄 → 이미지 하단 워터마크 "네이버에서 하루한판 검색!"
→ 네이버 검색 → 메인 페이지 → (플로우 1 반복)
```

### 플로우 3: 재방문 (매일 운세)
```
즐겨찾기/홈화면 바로가기 → 메인 페이지 → "오늘의 운세" 클릭
→ 생년 입력 (쿠키로 기억) → [배너광고] → 오늘 운세 확인
→ 이미지 저장 → 단톡방 공유
```

## 페이지별 상세 스펙

### 1. 메인 페이지 (/)
- **레이아웃:** 세로 스크롤, 카드 리스트
- **상단:** "하루한판" 로고 + "매일 새로운 재미" 태그라인
- **콘텐츠:**
  - [★ 크게] 오늘의 띠별 운세 (매일 변경 표시)
  - 전생 테스트
  - 건강 나이 테스트
  - 사자성어 성격 테스트
- **각 카드:** 아이콘 + 제목 + 한줄 설명 + "시작하기 >" 버튼
- **하단 고정:** AdSense 배너 광고 (320x100)
- **디자인:** 
  - 배경: 밝은 아이보리(#FFF8F0)
  - 카드: 흰색, 둥근 모서리, 큰 그림자
  - 폰트: 제목 28px bold, 설명 18px
  - 카드 간격 넉넉하게 (터치 오류 방지)
  - 버튼: 최소 높이 56px (시니어 터치 최적)

### 2. 테스트 페이지 (/test/[testId])
- **구조:** 한 화면에 질문 1개씩 (스크롤 없음)
- **상단:** 진행 표시 (예: "3 / 7")
- **질문:** 24px bold, 중앙 정렬
- **선택지:** 큰 버튼 4개 세로 배치
  - 각 버튼: 전체 너비, 높이 64px, 20px 폰트
  - 선택 시 색상 변경 + 0.5초 후 자동으로 다음 질문
- **뒤로가기:** 좌상단 "< 이전" 버튼
- **광고 없음** (테스트 도중에는 광고 노출 금지 - 이탈 방지)

### 3. 결과 페이지 (/result/[testId]/[resultId])

#### 3-1. 전면 광고 단계 (결과 확인 직전)
- "결과를 확인하고 있어요..." 텍스트 + 로딩 애니메이션 3초
- 3초 후 Google AdSense 전면광고(Interstitial) 표시
- 광고 닫기 후 결과 표시
- **이것이 핵심 수익 지점** (썸원의 "답변 후 광고"와 동일 위치)

#### 3-2. 결과 표시
- Canvas로 생성된 결과 이미지 (카드형)
- 이미지 아래: 결과 상세 설명 텍스트 (큰 글씨)
- **버튼 2개 (중요도 순):**
  1. [가장 크게] "📷 이미지 저장하기" - 갤러리에 PNG 다운로드
  2. [보조] "💬 카카오톡 공유" - Kakao SDK 링크 공유
- 하단: "다른 테스트 해보기" 링크
- 하단: AdSense 배너 광고

#### 3-3. Canvas 결과 이미지 스펙 (매우 중요)
```
크기: 1080 x 1350px (인스타그램 4:5 비율, 카톡 전송에도 최적)
구성:
┌─────────────────────────┐
│    [꽃/산수화 배경]       │
│                          │
│   ✨ 전생 테스트 결과 ✨   │  ← 테스트 제목 (36px, 흰색)
│                          │
│   당신의 전생은           │  ← 리드 텍스트 (28px)
│   "조선시대 한양의 거상"   │  ← 결과 타이틀 (48px, bold, 강조색)
│                          │
│   💰 장사에 능하고        │  ← 결과 설명 (24px, 3-4줄)
│   사람을 모으는 재주가     │
│   있었습니다              │
│                          │
│  ┌───────────────────┐   │
│  │ 네이버에서           │   │  ← 워터마크 영역 (반투명 배경)
│  │ "하루한판" 검색!     │   │  ← 핵심 CTA (32px, bold)
│  │  haruhanpan.com    │   │  ← 보조 URL (18px, 연한 색)
│  └───────────────────┘   │
└─────────────────────────┘
```
- 배경 이미지: public/images/backgrounds/ 에서 테스트별 1장 지정
- 텍스트 가독성: 배경 위에 반투명 검정 오버레이(opacity 0.3) 적용
- 워터마크: 하단 15% 영역, 반투명 흰색 배경
- **폰트:** 나눔스퀘어라운드 Bold (Canvas에 로드하여 사용)

### 4. 오늘의 운세 (/fortune)
- **입력:** 생년(4자리) 입력 필드 1개 + "운세 보기" 버튼
  - 숫자 키패드 활성화 (input type="number")
  - 입력값은 쿠키에 저장 (재방문 시 자동 입력)
- **결과:** 띠 이미지 + 오늘 운세 텍스트 + 행운의 숫자/색상
- **운세 데이터 로직:**
  - fortune.json에 12띠 x 31일 = 372개 텍스트
  - 오늘 날짜의 day(1-31) + 유저의 띠(생년 % 12) → 인덱스 매핑
  - 매일 다른 내용이 보임 (정적 데이터, API 호출 0)
- **결과 이미지:** 위 Canvas 스펙과 동일하게 생성
- **광고:** 결과 상단에 배너 1개 + 이미지 아래 배너 1개

## 데이터 스키마 (JSON)

### fortune.json
```json
{
  "rat": {
    "name": "쥐띠",
    "emoji": "🐭",
    "daily": {
      "1": { "text": "새로운 만남이 기다리고 있습니다...", "lucky_number": 7, "lucky_color": "빨간색" },
      "2": { "text": "건강에 유의하세요...", "lucky_number": 3, "lucky_color": "파란색" }
    }
  }
}
```

### past-life.json (다른 테스트도 동일 구조)
```json
{
  "id": "past-life",
  "title": "전생 테스트",
  "description": "나의 전생은 어떤 모습이었을까?",
  "questions": [
    {
      "id": 1,
      "text": "아침에 눈을 뜨면 가장 먼저 하고 싶은 것은?",
      "options": [
        { "text": "창밖 풍경 감상", "scores": { "A": 2, "B": 0, "C": 1 } },
        { "text": "따뜻한 차 한 잔", "scores": { "A": 0, "B": 2, "C": 1 } },
        { "text": "가족에게 안부 전화", "scores": { "A": 1, "B": 1, "C": 2 } },
        { "text": "산책 나가기", "scores": { "A": 1, "B": 2, "C": 0 } }
      ]
    }
  ],
  "results": {
    "A": {
      "title": "조선시대 한양의 거상",
      "description": "장사에 능하고 사람을 모으는 재주가 있었습니다...",
      "background": "bg-merchant.jpg"
    }
  }
}
```

## 광고 배치 전략 (수익 극대화 핵심)

### 광고 위치 (3곳)
1. **전면광고 (Interstitial):** 테스트 결과 확인 직전 - 핵심 수익
   - 유저가 이미 5-7문항에 시간 투자 → 이탈율 매우 낮음
   - 썸원 DAU 100만의 메인 수익원과 동일 위치
2. **메인 하단 고정 배너:** 320x100 앵커 광고
3. **결과 페이지 배너:** 결과 설명 아래 336x280 인피드 광고

### AdSense 코드 삽입 위치
```tsx
// layout.tsx의 <head>에 AdSense 스크립트
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXX" crossOrigin="anonymous" />

// 전면광고는 결과 로딩 시 프로그래밍 방식으로 트리거
// 배너광고는 컴포넌트로 삽입
```
- **주의:** AdSense 승인까지 2-4주 소요. MVP 배포 후 즉시 신청.
- **ca-pub ID는 실제 AdSense 계정 생성 후 교체 필요 (placeholder로 구현)**

## 카카오 SDK 연동

### 설정
```tsx
// layout.tsx
<script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js" />
// 초기화는 클라이언트 컴포넌트에서
Kakao.init('KAKAO_JS_KEY'); // 실제 키는 환경변수로
```

### 공유 기능
```ts
// 카카오톡 링크 공유 (보조 기능)
Kakao.Share.sendDefault({
  objectType: 'feed',
  content: {
    title: '나의 전생은 "조선시대 한양의 거상"',
    description: '하루한판에서 나의 전생을 알아보세요!',
    imageUrl: 'OG_IMAGE_URL',
    link: { mobileWebUrl: RESULT_URL, webUrl: RESULT_URL }
  },
  buttons: [{ title: '나도 해보기', link: { mobileWebUrl: RESULT_URL, webUrl: RESULT_URL } }]
});
```

### 이미지 저장 (핵심 기능)
```ts
// Canvas → Blob → 다운로드 (1순위 공유 방법)
const canvas = document.getElementById('result-canvas') as HTMLCanvasElement;
canvas.toBlob((blob) => {
  const url = URL.createObjectURL(blob!);
  const a = document.createElement('a');
  a.href = url;
  a.download = '하루한판_전생테스트_결과.png';
  a.click();
}, 'image/png');
```

## SEO / 메타태그 (네이버 검색 유입 필수)

### 모든 페이지 공통
```tsx
export const metadata = {
  title: '하루한판 - 매일 새로운 재미',
  description: '오늘의 운세, 전생 테스트, 건강 나이 테스트. 결과를 카카오톡으로 공유하세요!',
  keywords: '하루한판, 오늘의운세, 전생테스트, 띠별운세, 건강나이, 사자성어, 시니어테스트',
  openGraph: {
    title: '하루한판 - 매일 새로운 재미',
    description: '나의 전생은? 오늘의 운세는? 지금 확인해보세요!',
    images: ['/images/og/default.jpg'],
    type: 'website'
  }
};
```

### 결과 페이지 동적 OG
```tsx
// /result/[testId]/[resultId]/page.tsx
// 각 결과별 고유 OG 이미지와 텍스트 (카톡 공유 시 썸네일)
export function generateMetadata({ params }) {
  const result = getResult(params.testId, params.resultId);
  return {
    title: `나의 전생은 "${result.title}" - 하루한판`,
    openGraph: { images: [`/images/og/${params.testId}-${params.resultId}.jpg`] }
  };
}
```

### 네이버 서치어드바이저
- robots.txt와 sitemap.xml 반드시 생성
- 네이버 서치어드바이저 등록용 HTML 메타태그 삽입 위치 확보

## UI/UX 디자인 시스템 (시니어 최적화)

### 색상
```
Primary: #D4382C (따뜻한 빨간 - 행운/복 느낌)
Secondary: #2B6CB0 (신뢰감 파랑)
Background: #FFF8F0 (따뜻한 아이보리)
Card: #FFFFFF
Text Primary: #1A1A1A (거의 검정 - 고대비)
Text Secondary: #4A4A4A
Border: #E2D5C5 (따뜻한 베이지)
```

### 폰트 크기 (최소 기준)
```
페이지 제목: 28px, bold
카드 제목: 24px, bold  
본문/설명: 20px
버튼 텍스트: 20px, bold
보조 텍스트: 18px
절대 16px 미만 사용 금지
```

### 버튼
```
최소 높이: 56px (시니어 터치 최적)
최소 너비: 전체폭 또는 200px
둥근 모서리: 12px
그림자: 가볍게 적용 (입체감)
터치 피드백: active 시 scale(0.97) + 색상 변경
버튼 간 간격: 최소 16px (오터치 방지)
```

### 접근성
```
- 모든 텍스트 contrast ratio 4.5:1 이상
- 터치 타겟 최소 48x48px
- 애니메이션 최소화 (어지러움 방지)
- 스크롤 방향 단순화 (세로만)
```

## 성능 최적화

### Static Export
```js
// next.config.js
module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
```
- 모든 페이지 빌드 시 정적 HTML 생성
- Vercel Edge CDN에서 서빙 → 서버 비용 0원
- 5060의 느린 인터넷에서도 빠르게 로드

### 이미지 최적화
- 배경 이미지: WebP 포맷, 최대 200KB
- 아이콘: SVG
- OG 이미지: 1200x630px, JPG, 100KB 이하

### 번들 최적화
- 카카오 SDK: dynamic import (공유 버튼 클릭 시에만 로드)
- AdSense: lazy load (뷰포트 진입 시)
- Canvas 폰트: preload

## 배포 설정

### GitHub Repository
```
repo name: haruhanpan
branch: main → Vercel auto-deploy
```

### Vercel 설정
```
Framework: Next.js
Build Command: next build
Output Directory: out (static export)
Domain: haruhanpan.com
```

### 환경변수 (.env.local)
```
NEXT_PUBLIC_KAKAO_JS_KEY=placeholder_replace_later
NEXT_PUBLIC_GA_ID=placeholder_replace_later
NEXT_PUBLIC_ADSENSE_CLIENT=placeholder_replace_later
```

## 구현 우선순위 (Claude Code 작업 순서)

### Phase 1: 스캐폴딩 (30분)
1. Next.js 프로젝트 생성 (App Router, TypeScript, TailwindCSS)
2. next.config.js (static export 설정)
3. tailwind.config.js (시니어 디자인 시스템 색상/폰트)
4. globals.css (기본 스타일)
5. layout.tsx (공통 레이아웃, 메타태그, GA/AdSense placeholder)

### Phase 2: 데이터 (30분)
1. fortune.json (12띠 x 31일 운세 데이터 생성)
2. past-life.json (7문항 + 6결과)
3. health-age.json (7문항 + 5결과)
4. idiom.json (7문항 + 6결과)

### Phase 3: 핵심 컴포넌트 (1시간)
1. Header.tsx
2. TestCard.tsx
3. QuestionStep.tsx (질문 진행 UI)
4. ResultImage.tsx (Canvas 이미지 생성)
5. ShareButtons.tsx (이미지 저장 + 카카오 공유)
6. AdBanner.tsx / InterstitialAd.tsx

### Phase 4: 페이지 조립 (1시간)
1. 메인 페이지 (/)
2. 오늘의 운세 (/fortune)
3. 테스트 페이지 (/test/past-life, /test/health-age, /test/idiom)
4. 결과 페이지 (/result/[testId]/[resultId])

### Phase 5: 마무리 (30분)
1. robots.txt + sitemap.xml
2. OG 이미지 placeholder
3. PWA manifest (홈화면 추가용)
4. 빌드 테스트 (next build)
5. GitHub push → Vercel 배포 확인

## 콘텐츠 작성 가이드 (JSON 데이터)

### 운세 텍스트 규칙
- 1문장 20자 이내
- 긍정적 톤 80%, 주의 톤 20% (부정적 금지)
- 예: "귀인이 나타나는 날입니다" (O), "오늘은 재수 없는 날입니다" (X)
- 구체적 행동 지침 포함: "오후에 산책을 하면 좋은 기운을 받습니다"

### 테스트 질문 규칙
- 질문당 15자 이내 (간결하게)
- 선택지 4개, 각 10자 이내
- 5060이 공감하는 상황/소재 사용
- 예: "손주에게 가장 해주고 싶은 것은?" (O), "추구하는 라이프스타일은?" (X)

### 결과 텍스트 규칙
- 제목: 10자 이내 ("조선시대 한양의 거상")
- 설명: 3-4문장, 각 20자 이내
- 100% 긍정적/재미있는 톤
- 공유하고 싶은 결과여야 함 (바이럴의 핵심)

## 테스트 데이터 상세

### 테스트 1: 전생 테스트
- 문항 수: 7개
- 결과 유형: 6개
  - 조선시대 한양의 거상
  - 고려시대 풍류 시인
  - 삼국시대 용맹한 장수
  - 조선시대 궁중 요리사
  - 신라시대 지혜로운 승려
  - 백제시대 뛰어난 장인

### 테스트 2: 건강 나이 테스트
- 문항 수: 7개
- 결과: 실제 나이 대비 -15세 ~ +5세 (대부분 젊게 나오도록 = 공유 욕구)
  - "축하합니다! 당신의 건강 나이는 45세입니다" (실제 62세인 사람에게)

### 테스트 3: 사자성어 성격 테스트
- 문항 수: 7개
- 결과 유형: 6개 (각각 사자성어 + 해설)
  - 온고지신(溫故知新) - 지혜로운 어르신
  - 대기만성(大器晩成) - 늦깎이 성공가
  - 일편단심(一片丹心) - 한결같은 사람
  - 유유자적(悠悠自適) - 여유로운 달인
  - 화기애애(和氣靄靄) - 분위기 메이커
  - 백절불굴(百折不屈) - 불굴의 의지

## 주의사항 (Claude Code에게)

1. **토큰 효율:** 반복 코드 최소화. 테스트 3개는 동일 컴포넌트로 데이터만 다르게 렌더링.
2. **정적 export:** getServerSideProps 사용 금지. 모두 정적 페이지로.
3. **이미지 저장이 1순위:** "이미지 저장" 버튼을 가장 크고 눈에 띄게. 카카오 공유는 보조.
4. **광고 위치 정확히:** 결과 확인 "직전"에 전면광고. 테스트 도중에는 절대 광고 없음.
5. **한글 폰트:** Canvas에서 한글 렌더링 시 폰트 로드 완료 후 그려야 함 (FontFace API 사용).
6. **5060 UX:** 모든 인터랙션은 "탭 한 번"으로. 스와이프, 롱프레스, 더블탭 금지.
7. **배경 이미지:** placeholder로 단색 그라데이션 사용. 실제 이미지는 추후 교체.
