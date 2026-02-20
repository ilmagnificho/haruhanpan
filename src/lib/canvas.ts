const CANVAS_WIDTH = 1080;
const CANVAS_HEIGHT = 1920;

interface ResultCardOptions {
  testTitle: string;
  leadText: string;
  resultTitle: string;
  resultDescription: string;
  emoji?: string;
  gradientColors?: [string, string, string];
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
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (const word of words) {
    const testLine = line ? line + ' ' + word : word;
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line.length > 0) {
      ctx.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
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
    emoji = '✨',
    gradientColors = ['#6366f1', '#a855f7', '#ec4899'],
  } = options;

  await loadFont();

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const ctx = canvas.getContext('2d')!;
  const fontFamily = "'NanumSquareRound', 'Malgun Gothic', sans-serif";
  const cx = CANVAS_WIDTH / 2;

  // === 배경 ===
  const bgGrad = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  bgGrad.addColorStop(0, gradientColors[0]);
  bgGrad.addColorStop(0.5, gradientColors[1]);
  bgGrad.addColorStop(1, gradientColors[2]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // === 장식 패턴 ===
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 8; i++) {
    const x = Math.sin(i * 1.3) * 400 + cx;
    const y = i * 240 + 100;
    const r = 80 + (i % 3) * 60;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 30; i++) {
    const x = (Math.sin(i * 2.1) * 0.5 + 0.5) * CANVAS_WIDTH;
    const y = (Math.cos(i * 1.7) * 0.5 + 0.5) * CANVAS_HEIGHT;
    ctx.beginPath();
    ctx.arc(x, y, 4 + (i % 5) * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // === 상단 장식 ===
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 120);
  ctx.lineTo(CANVAS_WIDTH - 80, 120);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(80, 126);
  ctx.lineTo(CANVAS_WIDTH - 80, 126);
  ctx.stroke();

  // === 테스트 제목 ===
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  ctx.font = `bold 38px ${fontFamily}`;
  ctx.fillText(testTitle, cx, 200);

  // === 큰 이모지 ===
  ctx.font = `120px ${fontFamily}`;
  ctx.fillText(emoji, cx, 400);

  // === 리드 텍스트 ===
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.font = `36px ${fontFamily}`;
  ctx.fillText(leadText, cx, 520);

  // === 메인 결과 카드 ===
  const cardX = 60;
  const cardY = 580;
  const cardW = CANVAS_WIDTH - 120;
  const cardH = 520;

  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  roundRect(ctx, cardX + 6, cardY + 6, cardW, cardH, 40);
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.95)';
  roundRect(ctx, cardX, cardY, cardW, cardH, 40);
  ctx.fill();

  const barGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY);
  barGrad.addColorStop(0, gradientColors[0]);
  barGrad.addColorStop(1, gradientColors[2]);
  ctx.fillStyle = barGrad;
  roundRectTop(ctx, cardX, cardY, cardW, 12, 40);
  ctx.fill();

  // 결과 타이틀
  ctx.fillStyle = gradientColors[0];
  ctx.font = `bold 56px ${fontFamily}`;
  const titleLines = resultTitle.length > 10
    ? splitKoreanText(resultTitle)
    : [resultTitle];
  let titleY = cardY + 110;
  for (const line of titleLines) {
    ctx.fillText(line, cx, titleY);
    titleY += 72;
  }

  // 구분 장식
  const divY = titleY + 10;
  const divGrad = ctx.createLinearGradient(cx - 100, divY, cx + 100, divY);
  divGrad.addColorStop(0, 'transparent');
  divGrad.addColorStop(0.2, gradientColors[1]);
  divGrad.addColorStop(0.8, gradientColors[1]);
  divGrad.addColorStop(1, 'transparent');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 120, divY);
  ctx.lineTo(cx + 120, divY);
  ctx.stroke();

  ctx.fillStyle = gradientColors[1];
  ctx.save();
  ctx.translate(cx, divY);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-8, -8, 16, 16);
  ctx.restore();

  // 결과 설명
  ctx.fillStyle = '#444444';
  ctx.font = `28px ${fontFamily}`;
  wrapText(ctx, resultDescription, cx, divY + 60, cardW - 120, 44);

  // === "공유하면 복이 와요!" ===
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  roundRect(ctx, 80, 1180, CANVAS_WIDTH - 160, 100, 50);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 34px ${fontFamily}`;
  ctx.fillText('친구에게 공유하면 행운이 2배! 🍀', cx, 1245);

  // === 워터마크 ===
  const wmY = 1380;
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  roundRect(ctx, 80, wmY, CANVAS_WIDTH - 160, 240, 30);
  ctx.fill();

  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  roundRectTop(ctx, 80, wmY, CANVAS_WIDTH - 160, 6, 30);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 42px ${fontFamily}`;
  ctx.fillText('네이버에서', cx, wmY + 80);
  ctx.font = `bold 54px ${fontFamily}`;
  ctx.fillText('"하루한판" 검색!', cx, wmY + 150);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = `24px ${fontFamily}`;
  ctx.fillText('haruhanpan.com', cx, wmY + 200);

  // === 하단 ===
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, CANVAS_HEIGHT - 120);
  ctx.lineTo(CANVAS_WIDTH - 80, CANVAS_HEIGHT - 120);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = `20px ${fontFamily}`;
  ctx.fillText('매일 새로운 재미 · 하루한판', cx, CANVAS_HEIGHT - 80);
}

// === 다크 프리미엄 테마 (결과 페이지용) ===
const DARK_WIDTH = 1080;
const DARK_HEIGHT = 1350;

export async function generateDarkResultCard(
  canvas: HTMLCanvasElement,
  options: ResultCardOptions
): Promise<void> {
  const {
    testTitle,
    resultTitle,
    resultDescription,
    emoji = '✨',
  } = options;

  await loadFont();

  canvas.width = DARK_WIDTH;
  canvas.height = DARK_HEIGHT;
  const ctx = canvas.getContext('2d')!;
  const fontFamily = "'NanumSquareRound', 'Malgun Gothic', sans-serif";
  const cx = DARK_WIDTH / 2;

  // === 다크 배경 그라디언트 ===
  const bgGrad = ctx.createLinearGradient(0, 0, 0, DARK_HEIGHT);
  bgGrad.addColorStop(0, '#141e16');
  bgGrad.addColorStop(0.5, '#1a2b1e');
  bgGrad.addColorStop(1, '#0f1a12');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, DARK_WIDTH, DARK_HEIGHT);

  // === 전통 패턴 (금색 도트) ===
  ctx.globalAlpha = 0.04;
  ctx.fillStyle = '#FFD700';
  for (let i = 0; i < 50; i++) {
    const x = (Math.sin(i * 2.3) * 0.5 + 0.5) * DARK_WIDTH;
    const y = (Math.cos(i * 1.9) * 0.5 + 0.5) * DARK_HEIGHT;
    ctx.beginPath();
    ctx.arc(x, y, 3 + (i % 4) * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 6; i++) {
    const x = Math.sin(i * 1.5) * 300 + cx;
    const y = i * 220 + 120;
    const r = 60 + (i % 3) * 40;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // === 장식 코너 (좌상단, 우하단) ===
  const cornerSize = 80;
  const cornerInset = 50;
  ctx.strokeStyle = '#2b883d';
  ctx.lineWidth = 6;
  // 좌상단
  ctx.beginPath();
  ctx.moveTo(cornerInset, cornerInset + cornerSize);
  ctx.lineTo(cornerInset, cornerInset);
  ctx.lineTo(cornerInset + cornerSize, cornerInset);
  ctx.stroke();
  // 우하단
  ctx.beginPath();
  ctx.moveTo(DARK_WIDTH - cornerInset, DARK_HEIGHT - cornerInset - cornerSize);
  ctx.lineTo(DARK_WIDTH - cornerInset, DARK_HEIGHT - cornerInset);
  ctx.lineTo(DARK_WIDTH - cornerInset - cornerSize, DARK_HEIGHT - cornerInset);
  ctx.stroke();

  // === 테스트 라벨 ===
  ctx.textAlign = 'center';
  ctx.fillStyle = '#2b883d';
  ctx.font = `bold 36px ${fontFamily}`;
  ctx.fillText(`✨ ${testTitle} 결과 ✨`, cx, 160);

  // === 구분선 ===
  ctx.strokeStyle = 'rgba(43, 136, 61, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx - 60, 190);
  ctx.lineTo(cx + 60, 190);
  ctx.stroke();

  // === 큰 이모지 ===
  ctx.font = `100px ${fontFamily}`;
  ctx.fillText(emoji, cx, 340);

  // === 메인 결과 타이틀 (골드) ===
  ctx.fillStyle = '#FFD700';
  ctx.shadowColor = 'rgba(255, 215, 0, 0.5)';
  ctx.shadowBlur = 30;
  ctx.font = `bold 64px ${fontFamily}`;
  const titleLines = resultTitle.length > 10
    ? splitKoreanText(resultTitle)
    : [resultTitle];
  let titleY = 480;
  for (const line of titleLines) {
    ctx.fillText(line, cx, titleY);
    titleY += 80;
  }
  ctx.shadowBlur = 0;

  // === 결과 설명 ===
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = `32px ${fontFamily}`;
  wrapText(ctx, resultDescription, cx, titleY + 30, DARK_WIDTH - 200, 50);

  // === "공유하면 복이 와요!" ===
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  roundRect(ctx, 100, 880, DARK_WIDTH - 200, 90, 45);
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = `bold 30px ${fontFamily}`;
  ctx.fillText('친구에게 공유하면 행운이 2배! 🍀', cx, 935);

  // === 워터마크 ===
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  roundRect(ctx, 80, 1030, DARK_WIDTH - 160, 200, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(43, 136, 61, 0.3)';
  ctx.lineWidth = 1;
  roundRect(ctx, 80, 1030, DARK_WIDTH - 160, 200, 24);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = `bold 36px ${fontFamily}`;
  ctx.fillText('네이버에서', cx, 1110);
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold 48px ${fontFamily}`;
  ctx.fillText('"하루한판" 검색!', cx, 1170);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = `22px ${fontFamily}`;
  ctx.fillText('haruhanpan.com', cx, 1210);
}

function splitKoreanText(text: string): string[] {
  const mid = Math.ceil(text.length / 2);
  let splitAt = mid;
  for (let i = 0; i < 5; i++) {
    if (text[mid + i] === ' ') { splitAt = mid + i; break; }
    if (mid - i >= 0 && text[mid - i] === ' ') { splitAt = mid - i; break; }
  }
  return [text.slice(0, splitAt).trim(), text.slice(splitAt).trim()];
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
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

function roundRectTop(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
