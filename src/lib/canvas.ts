const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1350;

interface ResultCardOptions {
  testTitle: string;
  leadText: string;
  resultTitle: string;
  resultDescription: string;
  backgroundColor?: string;
  gradientColors?: [string, string];
}

async function loadFont() {
  try {
    const font = new FontFace(
      'NanumSquareRound',
      'url(/fonts/NanumSquareRoundB.ttf)'
    );
    await font.load();
    document.fonts.add(font);
  } catch {
    // 폰트 로드 실패 시 시스템 폰트 사용
  }
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const chars = text.split('');
  let line = '';
  let currentY = y;

  for (let i = 0; i < chars.length; i++) {
    const testLine = line + chars[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line.length > 0) {
      ctx.fillText(line, x, currentY);
      line = chars[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

export async function generateResultCard(
  canvas: HTMLCanvasElement,
  options: ResultCardOptions
): Promise<void> {
  const {
    testTitle,
    leadText,
    resultTitle,
    resultDescription,
    gradientColors = ['#667eea', '#764ba2'],
  } = options;

  await loadFont();

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d')!;
  const fontFamily = "'NanumSquareRound', 'Malgun Gothic', sans-serif";

  // 배경 그라데이션
  const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  gradient.addColorStop(0, gradientColors[0]);
  gradient.addColorStop(1, gradientColors[1]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // 장식 원 (배경 데코)
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(200, 300, 250, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(880, 900, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // 반투명 중앙 카드
  const cardX = 60;
  const cardY = 120;
  const cardW = CANVAS_WIDTH - 120;
  const cardH = CANVAS_HEIGHT - 380;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  roundRect(ctx, cardX, cardY, cardW, cardH, 30);
  ctx.fill();

  // 테스트 제목
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = `bold 36px ${fontFamily}`;
  ctx.fillText(`✨ ${testTitle} 결과 ✨`, CANVAS_WIDTH / 2, 220);

  // 리드 텍스트
  ctx.fillStyle = '#ffffff';
  ctx.font = `28px ${fontFamily}`;
  ctx.fillText(leadText, CANVAS_WIDTH / 2, 340);

  // 결과 타이틀 (강조)
  ctx.fillStyle = '#FFD700';
  ctx.font = `bold 52px ${fontFamily}`;
  const titleLines = resultTitle.length > 12
    ? [resultTitle.slice(0, Math.ceil(resultTitle.length / 2)), resultTitle.slice(Math.ceil(resultTitle.length / 2))]
    : [resultTitle];
  let titleY = 440;
  for (const line of titleLines) {
    ctx.fillText(`"${line}"`, CANVAS_WIDTH / 2, titleY);
    titleY += 70;
  }

  // 구분선
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(CANVAS_WIDTH / 2 - 150, titleY + 10);
  ctx.lineTo(CANVAS_WIDTH / 2 + 150, titleY + 10);
  ctx.stroke();

  // 결과 설명
  ctx.fillStyle = '#ffffff';
  ctx.font = `26px ${fontFamily}`;
  ctx.textAlign = 'center';
  wrapText(
    ctx,
    resultDescription,
    CANVAS_WIDTH / 2,
    titleY + 70,
    cardW - 100,
    42
  );

  // 워터마크 영역
  const wmY = CANVAS_HEIGHT - 200;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  roundRect(ctx, 100, wmY, CANVAS_WIDTH - 200, 160, 20);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 34px ${fontFamily}`;
  ctx.fillText('네이버에서', CANVAS_WIDTH / 2, wmY + 55);
  ctx.font = `bold 40px ${fontFamily}`;
  ctx.fillText('"하루한판" 검색!', CANVAS_WIDTH / 2, wmY + 105);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = `20px ${fontFamily}`;
  ctx.fillText('haruhanpan.com', CANVAS_WIDTH / 2, wmY + 140);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
