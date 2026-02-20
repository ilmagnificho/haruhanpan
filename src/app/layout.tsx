import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://haruhanpan.com'),
  title: '하루한판 - 매일 새로운 재미',
  description: '오늘의 운세, 전생 테스트, 건강 나이 테스트. 결과를 카카오톡으로 공유하세요!',
  keywords: '하루한판, 오늘의운세, 전생테스트, 띠별운세, 건강나이, 사자성어, 시니어테스트',
  openGraph: {
    title: '하루한판 - 매일 새로운 재미',
    description: '나의 전생은? 오늘의 운세는? 지금 확인해보세요!',
    images: ['/images/og/default.jpg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== 'placeholder_replace_later' && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        {/* 네이버 서치어드바이저 - searchadvisor.naver.com 등록 후 content 값 교체 */}
        <meta name="naver-site-verification" content="NAVER_VERIFICATION_CODE_HERE" />
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && process.env.NEXT_PUBLIC_ADSENSE_CLIENT !== 'placeholder_replace_later' && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="antialiased">
        <div className="mx-auto max-w-lg min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
