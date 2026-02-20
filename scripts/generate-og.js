const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// 폰트 등록
const fontPath = path.join(__dirname, '..', 'public', 'fonts', 'NanumSquareRoundB.ttf');
registerFont(fontPath, { family: 'NanumSquareRound', weight: 'bold' });

const WIDTH = 1200;
const HEIGHT = 630;

function generateOGImage(filename) {
  const canvas = createCanvas(WIDTH, HEIGHT);
  const ctx = canvas.getContext('2d');

  // 배경 그라데이션
  const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
  gradient.addColorStop(0, '#D4382C');
  gradient.addColorStop(0.5, '#E85D4A');
  gradient.addColorStop(1, '#FF8A65');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // 장식 원
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(150, 150, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(1050, 480, 250, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // 중앙 카드
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  roundRect(ctx, 80, 60, WIDTH - 160, HEIGHT - 120, 30);
  ctx.fill();

  // 메인 타이틀
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px NanumSquareRound';
  ctx.fillText('하루한판', WIDTH / 2, 230);

  // 태그라인
  ctx.font = 'bold 36px NanumSquareRound';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('매일 새로운 재미', WIDTH / 2, 300);

  // 구분선
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2 - 120, 330);
  ctx.lineTo(WIDTH / 2 + 120, 330);
  ctx.stroke();

  // 서브 텍스트
  ctx.font = 'bold 28px NanumSquareRound';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fillText('오늘의 운세 · 전생 테스트 · 건강 나이 · 사자성어', WIDTH / 2, 390);

  // 하단 CTA
  ctx.font = 'bold 24px NanumSquareRound';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.fillText('지금 바로 해보세요!', WIDTH / 2, 500);

  // URL
  ctx.font = '20px NanumSquareRound';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.fillText('haruhanpan.com', WIDTH / 2, 545);

  // 저장
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'og');
  fs.mkdirSync(outputDir, { recursive: true });
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.85 });
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`Generated: ${filename} (${(buffer.length / 1024).toFixed(1)}KB)`);
}

function roundRect(ctx, x, y, w, h, r) {
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

generateOGImage('default.jpg');
console.log('Done!');
