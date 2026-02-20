// 12지신 순서: 자(쥐), 축(소), 인(호랑이), 묘(토끼), 진(용), 사(뱀),
//              오(말), 미(양), 신(원숭이), 유(닭), 술(개), 해(돼지)

const ZODIAC_KEYS = [
  'monkey',  // 0 - 신(원숭이) - 기준: 2016, 2004, 1992, 1980, 1968, 1956
  'rooster', // 1 - 유(닭)
  'dog',     // 2 - 술(개)
  'pig',     // 3 - 해(돼지)
  'rat',     // 4 - 자(쥐)
  'ox',      // 5 - 축(소)
  'tiger',   // 6 - 인(호랑이)
  'rabbit',  // 7 - 묘(토끼)
  'dragon',  // 8 - 진(용)
  'snake',   // 9 - 사(뱀)
  'horse',   // 10 - 오(말)
  'sheep',   // 11 - 미(양)
] as const;

export type ZodiacKey = typeof ZODIAC_KEYS[number];

export function getZodiacFromYear(year: number): ZodiacKey {
  return ZODIAC_KEYS[year % 12];
}

export function getTodayFortuneIndex(): number {
  const today = new Date();
  return today.getDate(); // 1-31
}
