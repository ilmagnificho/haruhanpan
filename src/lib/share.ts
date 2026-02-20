export function downloadCanvasImage(canvas: HTMLCanvasElement, filename: string) {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 'image/png');
}

export async function shareKakao({
  title,
  description,
  imageUrl,
  pageUrl,
}: {
  title: string;
  description: string;
  imageUrl: string;
  pageUrl: string;
}) {
  const Kakao = (window as unknown as Record<string, unknown>).Kakao as {
    isInitialized: () => boolean;
    init: (key: string) => void;
    Share: {
      sendDefault: (params: Record<string, unknown>) => void;
    };
  } | undefined;

  if (!Kakao) return;

  if (!Kakao.isInitialized()) {
    const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (key && key !== 'placeholder_replace_later') {
      Kakao.init(key);
    } else {
      return;
    }
  }

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title,
      description,
      imageUrl,
      link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
    },
    buttons: [
      {
        title: '나도 해보기',
        link: { mobileWebUrl: pageUrl, webUrl: pageUrl },
      },
    ],
  });
}
