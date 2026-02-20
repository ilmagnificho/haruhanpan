import { type ZodiacKey } from '@/lib/fortune-calc';

interface ZodiacIconProps {
  zodiac: ZodiacKey;
  className?: string;
}

const ZODIAC_SVGS: Record<ZodiacKey, React.ReactNode> = {
  // 쥐띠 - 인디고 계열
  rat: (
    <>
      <ellipse cx="60" cy="72" rx="28" ry="24" fill="#8b8fcf" />
      <circle cx="60" cy="44" r="22" fill="#9b9fd4" />
      <ellipse cx="43" cy="28" rx="12" ry="14" fill="#b4b8e0" />
      <ellipse cx="77" cy="28" rx="12" ry="14" fill="#b4b8e0" />
      <ellipse cx="43" cy="28" rx="7" ry="9" fill="#e8e0f0" />
      <ellipse cx="77" cy="28" rx="7" ry="9" fill="#e8e0f0" />
      <circle cx="52" cy="42" r="4" fill="#2d2d3d" />
      <circle cx="68" cy="42" r="4" fill="#2d2d3d" />
      <circle cx="53" cy="40.5" r="1.5" fill="#fff" />
      <circle cx="69" cy="40.5" r="1.5" fill="#fff" />
      <ellipse cx="60" cy="50" rx="4" ry="3" fill="#e0a0a0" />
      <path d="M56 52 Q60 56 64 52" fill="none" stroke="#7a6b6b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M38 60 Q20 58 18 48" fill="none" stroke="#9b9fd4" strokeWidth="4" strokeLinecap="round" />
      <path d="M82 60 Q100 58 102 48" fill="none" stroke="#9b9fd4" strokeWidth="4" strokeLinecap="round" />
      <path d="M88 72 Q102 60 98 44" fill="none" stroke="#8b8fcf" strokeWidth="4" strokeLinecap="round" />
    </>
  ),

  // 소띠 - 레드/브라운 계열
  ox: (
    <>
      <ellipse cx="60" cy="74" rx="32" ry="26" fill="#c4866e" />
      <circle cx="60" cy="48" r="24" fill="#d4966e" />
      <ellipse cx="60" cy="62" rx="16" ry="12" fill="#f5e6d0" />
      <path d="M36 32 Q32 16 26 12" fill="none" stroke="#8b6e5a" strokeWidth="5" strokeLinecap="round" />
      <path d="M84 32 Q88 16 94 12" fill="none" stroke="#8b6e5a" strokeWidth="5" strokeLinecap="round" />
      <circle cx="26" cy="12" r="4" fill="#5a4a3e" />
      <circle cx="94" cy="12" r="4" fill="#5a4a3e" />
      <circle cx="50" cy="44" r="4" fill="#2d2d3d" />
      <circle cx="70" cy="44" r="4" fill="#2d2d3d" />
      <circle cx="51" cy="42.5" r="1.5" fill="#fff" />
      <circle cx="71" cy="42.5" r="1.5" fill="#fff" />
      <ellipse cx="55" cy="58" rx="3" ry="2.5" fill="#c4866e" />
      <ellipse cx="65" cy="58" rx="3" ry="2.5" fill="#c4866e" />
      <path d="M54 64 Q60 68 66 64" fill="none" stroke="#8b6e5a" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="36" cy="50" rx="8" ry="6" fill="#d4966e" />
      <ellipse cx="84" cy="50" rx="8" ry="6" fill="#d4966e" />
    </>
  ),

  // 호랑이띠 - 스카이블루/오렌지 계열
  tiger: (
    <>
      <ellipse cx="60" cy="72" rx="30" ry="26" fill="#f0a830" />
      <circle cx="60" cy="46" r="24" fill="#f5b840" />
      <path d="M36 30 L30 10 L44 24 Z" fill="#f5b840" />
      <path d="M84 30 L90 10 L76 24 Z" fill="#f5b840" />
      <path d="M34 12 L38 22" stroke="#3d3020" strokeWidth="2" strokeLinecap="round" />
      <path d="M86 12 L82 22" stroke="#3d3020" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="60" cy="56" rx="14" ry="10" fill="#fff5e0" />
      <circle cx="50" cy="44" r="4.5" fill="#fff" />
      <circle cx="70" cy="44" r="4.5" fill="#fff" />
      <circle cx="51" cy="44" r="3" fill="#2d2d3d" />
      <circle cx="71" cy="44" r="3" fill="#2d2d3d" />
      <circle cx="52" cy="42.5" r="1.2" fill="#fff" />
      <circle cx="72" cy="42.5" r="1.2" fill="#fff" />
      <ellipse cx="60" cy="52" rx="4" ry="2.5" fill="#e08080" />
      <path d="M56 56 Q60 60 64 56" fill="none" stroke="#8b6040" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M48 36 Q52 34 50 30" stroke="#3d3020" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M72 36 Q68 34 70 30" stroke="#3d3020" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M55 66 Q60 62 65 66" stroke="#3d3020" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M50 72 Q55 68 60 72" stroke="#3d3020" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M60 72 Q65 68 70 72" stroke="#3d3020" strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ),

  // 토끼띠 - 에메랄드 계열
  rabbit: (
    <>
      <ellipse cx="60" cy="76" rx="26" ry="22" fill="#a0d4b0" />
      <circle cx="60" cy="52" r="22" fill="#b0e0c0" />
      <ellipse cx="46" cy="20" rx="10" ry="26" fill="#b0e0c0" />
      <ellipse cx="74" cy="20" rx="10" ry="26" fill="#b0e0c0" />
      <ellipse cx="46" cy="20" rx="6" ry="20" fill="#e8f5ec" />
      <ellipse cx="74" cy="20" rx="6" ry="20" fill="#e8f5ec" />
      <circle cx="52" cy="48" r="4" fill="#2d3d2d" />
      <circle cx="68" cy="48" r="4" fill="#2d3d2d" />
      <circle cx="53" cy="46.5" r="1.5" fill="#fff" />
      <circle cx="69" cy="46.5" r="1.5" fill="#fff" />
      <ellipse cx="60" cy="55" rx="3.5" ry="2.5" fill="#e0a0a0" />
      <path d="M56 58 Q60 61 64 58" fill="none" stroke="#6b8b6b" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="42" cy="54" r="6" fill="#f0c0c0" opacity="0.5" />
      <circle cx="78" cy="54" r="6" fill="#f0c0c0" opacity="0.5" />
      <ellipse cx="60" cy="100" rx="8" ry="6" fill="#c8e8d4" />
    </>
  ),

  // 용띠 - 앰버/골드 계열
  dragon: (
    <>
      <ellipse cx="60" cy="72" rx="30" ry="26" fill="#d4a030" />
      <circle cx="60" cy="46" r="24" fill="#e0b040" />
      <path d="M40 24 L34 8 L46 20" fill="#c49020" />
      <path d="M80 24 L86 8 L74 20" fill="#c49020" />
      <path d="M60 22 L60 6" stroke="#c49020" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="4" r="3" fill="#e0b040" />
      <circle cx="48" cy="42" r="5" fill="#fff8e0" />
      <circle cx="72" cy="42" r="5" fill="#fff8e0" />
      <circle cx="49" cy="42" r="3" fill="#8b4000" />
      <circle cx="73" cy="42" r="3" fill="#8b4000" />
      <circle cx="50" cy="40.5" r="1.2" fill="#fff" />
      <circle cx="74" cy="40.5" r="1.2" fill="#fff" />
      <ellipse cx="60" cy="54" rx="12" ry="8" fill="#f0d880" />
      <ellipse cx="56" cy="52" rx="2" ry="1.5" fill="#c49020" />
      <ellipse cx="64" cy="52" rx="2" ry="1.5" fill="#c49020" />
      <path d="M52 58 Q60 64 68 58" fill="none" stroke="#8b6b20" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 66 Q28 60 22 64 Q28 68 36 66" fill="#c49020" />
      <path d="M84 66 Q92 60 98 64 Q92 68 84 66" fill="#c49020" />
      <path d="M42 86 Q36 92 42 98" fill="none" stroke="#d4a030" strokeWidth="4" strokeLinecap="round" />
      <path d="M78 86 Q84 92 78 98" fill="none" stroke="#d4a030" strokeWidth="4" strokeLinecap="round" />
    </>
  ),

  // 뱀띠 - 바이올렛 계열
  snake: (
    <>
      <path d="M60 90 Q30 85 25 65 Q20 40 40 30 Q55 22 60 35 Q65 22 80 30 Q100 40 95 65 Q90 85 60 90 Z" fill="#9b7ad8" />
      <circle cx="60" cy="50" r="20" fill="#ad8ce0" />
      <ellipse cx="60" cy="56" rx="10" ry="7" fill="#d8c8f0" />
      <circle cx="52" cy="46" r="4" fill="#fff" />
      <circle cx="68" cy="46" r="4" fill="#fff" />
      <circle cx="53" cy="46" r="2.5" fill="#2d2040" />
      <circle cx="69" cy="46" r="2.5" fill="#2d2040" />
      <circle cx="54" cy="44.5" r="1" fill="#fff" />
      <circle cx="70" cy="44.5" r="1" fill="#fff" />
      <path d="M57 54 L60 57 L63 54" fill="none" stroke="#6b4a8b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M56 58 Q60 60 64 58" fill="none" stroke="#6b4a8b" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M88 70 Q100 50 95 30 Q92 22 98 16" fill="none" stroke="#9b7ad8" strokeWidth="5" strokeLinecap="round" />
      <circle cx="98" cy="14" r="2.5" fill="#ad8ce0" />
      <ellipse cx="48" cy="38" rx="3" ry="2" fill="#c8b0e8" />
      <ellipse cx="72" cy="38" rx="3" ry="2" fill="#c8b0e8" />
    </>
  ),

  // 말띠 - 오렌지 계열
  horse: (
    <>
      <ellipse cx="60" cy="68" rx="28" ry="30" fill="#d08050" />
      <ellipse cx="60" cy="42" rx="22" ry="24" fill="#e09060" />
      <path d="M42 20 Q38 6 44 4 Q48 4 46 18" fill="#5a3820" />
      <path d="M58 18 Q56 4 62 2 Q66 2 64 16" fill="#5a3820" />
      <path d="M74 22 Q76 8 72 4 Q68 4 70 18" fill="#5a3820" />
      <ellipse cx="60" cy="56" rx="14" ry="14" fill="#f0d0b0" />
      <circle cx="50" cy="40" r="3.5" fill="#2d2020" />
      <circle cx="70" cy="40" r="3.5" fill="#2d2020" />
      <circle cx="51" cy="38.5" r="1.3" fill="#fff" />
      <circle cx="71" cy="38.5" r="1.3" fill="#fff" />
      <ellipse cx="55" cy="54" rx="2.5" ry="2" fill="#a06040" />
      <ellipse cx="65" cy="54" rx="2.5" ry="2" fill="#a06040" />
      <path d="M54 62 Q60 66 66 62" fill="none" stroke="#6b4030" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="36" cy="46" rx="8" ry="6" fill="#e09060" />
      <ellipse cx="84" cy="46" rx="8" ry="6" fill="#e09060" />
    </>
  ),

  // 양띠 - 블루 계열
  sheep: (
    <>
      <circle cx="42" cy="38" r="12" fill="#e8e4f0" />
      <circle cx="78" cy="38" r="12" fill="#e8e4f0" />
      <circle cx="50" cy="28" r="14" fill="#e8e4f0" />
      <circle cx="70" cy="28" r="14" fill="#e8e4f0" />
      <circle cx="60" cy="22" r="12" fill="#e8e4f0" />
      <ellipse cx="60" cy="70" rx="32" ry="28" fill="#e8e4f0" />
      <circle cx="60" cy="50" r="22" fill="#f5f0ff" />
      <circle cx="52" cy="46" r="3.5" fill="#2d3050" />
      <circle cx="68" cy="46" r="3.5" fill="#2d3050" />
      <circle cx="53" cy="44.5" r="1.3" fill="#fff" />
      <circle cx="69" cy="44.5" r="1.3" fill="#fff" />
      <ellipse cx="60" cy="53" rx="3" ry="2" fill="#e0a0a0" />
      <path d="M56 56 Q60 59 64 56" fill="none" stroke="#8b7090" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="44" cy="52" r="5" fill="#f0c0c0" opacity="0.4" />
      <circle cx="76" cy="52" r="5" fill="#f0c0c0" opacity="0.4" />
      <path d="M60 14 Q60 6 54 4" fill="none" stroke="#c0b0d0" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 14 Q60 6 66 4" fill="none" stroke="#c0b0d0" strokeWidth="3" strokeLinecap="round" />
    </>
  ),

  // 원숭이띠 - 옐로우/브라운 계열
  monkey: (
    <>
      <ellipse cx="60" cy="72" rx="28" ry="24" fill="#c4a060" />
      <circle cx="60" cy="46" r="24" fill="#d4b070" />
      <circle cx="34" cy="46" r="12" fill="#d4b070" />
      <circle cx="86" cy="46" r="12" fill="#d4b070" />
      <circle cx="34" cy="46" r="8" fill="#f0d0a0" />
      <circle cx="86" cy="46" r="8" fill="#f0d0a0" />
      <ellipse cx="60" cy="52" rx="16" ry="14" fill="#f0d0a0" />
      <circle cx="52" cy="44" r="3.5" fill="#2d2020" />
      <circle cx="68" cy="44" r="3.5" fill="#2d2020" />
      <circle cx="53" cy="42.5" r="1.3" fill="#fff" />
      <circle cx="69" cy="42.5" r="1.3" fill="#fff" />
      <ellipse cx="60" cy="52" rx="3.5" ry="2.5" fill="#c08060" />
      <path d="M54 58 Q60 62 66 58" fill="none" stroke="#8b6040" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M88 72 Q100 60 96 48" fill="none" stroke="#c4a060" strokeWidth="5" strokeLinecap="round" />
      <circle cx="96" cy="46" r="3" fill="#c4a060" />
    </>
  ),

  // 닭띠 - 로즈 계열
  rooster: (
    <>
      <ellipse cx="60" cy="74" rx="26" ry="24" fill="#e06040" />
      <circle cx="60" cy="48" r="22" fill="#f07050" />
      <path d="M56 26 L60 8 L64 26" fill="#d42020" />
      <path d="M52 28 L54 16 L58 28" fill="#e03030" />
      <path d="M62 28 L66 16 L68 28" fill="#e03030" />
      <circle cx="52" cy="44" r="4" fill="#fff" />
      <circle cx="68" cy="44" r="4" fill="#fff" />
      <circle cx="53" cy="44" r="2.5" fill="#2d2020" />
      <circle cx="69" cy="44" r="2.5" fill="#2d2020" />
      <circle cx="54" cy="42.5" r="1" fill="#fff" />
      <circle cx="70" cy="42.5" r="1" fill="#fff" />
      <path d="M56 54 L60 60 L64 54" fill="#f0a020" stroke="#d09020" strokeWidth="1" />
      <path d="M50 62 Q48 68 44 70" fill="none" stroke="#d42020" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 62 Q72 68 76 70" fill="none" stroke="#d42020" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="60" cy="94" rx="6" ry="3" fill="#f0a020" />
      <path d="M54 94 L50 102" stroke="#f0a020" strokeWidth="3" strokeLinecap="round" />
      <path d="M66 94 L70 102" stroke="#f0a020" strokeWidth="3" strokeLinecap="round" />
    </>
  ),

  // 개띠 - 인디고 계열
  dog: (
    <>
      <ellipse cx="60" cy="72" rx="28" ry="24" fill="#8b7050" />
      <circle cx="60" cy="48" r="24" fill="#a08060" />
      <path d="M36 36 Q26 20 22 26 Q18 32 34 40" fill="#a08060" />
      <path d="M84 36 Q94 20 98 26 Q102 32 86 40" fill="#a08060" />
      <ellipse cx="60" cy="56" rx="14" ry="10" fill="#d4c0a0" />
      <circle cx="50" cy="44" r="4.5" fill="#fff" />
      <circle cx="70" cy="44" r="4.5" fill="#fff" />
      <circle cx="51" cy="44" r="3" fill="#2d2020" />
      <circle cx="71" cy="44" r="3" fill="#2d2020" />
      <circle cx="52" cy="42.5" r="1.2" fill="#fff" />
      <circle cx="72" cy="42.5" r="1.2" fill="#fff" />
      <ellipse cx="60" cy="54" rx="4" ry="3" fill="#3d2820" />
      <path d="M54 60 Q60 64 66 60" fill="none" stroke="#6b5040" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M88 72 Q96 64 94 56" fill="none" stroke="#8b7050" strokeWidth="4" strokeLinecap="round" />
    </>
  ),

  // 돼지띠 - 퓨셔 계열
  pig: (
    <>
      <ellipse cx="60" cy="72" rx="30" ry="26" fill="#e0a0b8" />
      <circle cx="60" cy="48" r="24" fill="#f0b0c8" />
      <path d="M38 34 Q30 28 28 34 Q28 40 38 38" fill="#f0b0c8" />
      <path d="M82 34 Q90 28 92 34 Q92 40 82 38" fill="#f0b0c8" />
      <ellipse cx="60" cy="56" rx="14" ry="10" fill="#f8d4e0" />
      <circle cx="50" cy="44" r="4" fill="#2d2030" />
      <circle cx="70" cy="44" r="4" fill="#2d2030" />
      <circle cx="51" cy="42.5" r="1.5" fill="#fff" />
      <circle cx="71" cy="42.5" r="1.5" fill="#fff" />
      <ellipse cx="60" cy="56" rx="8" ry="6" fill="#e8a0b0" />
      <circle cx="56" cy="55" r="2" fill="#d08090" />
      <circle cx="64" cy="55" r="2" fill="#d08090" />
      <path d="M54 64 Q60 68 66 64" fill="none" stroke="#a07080" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="42" cy="52" r="6" fill="#f0c0c8" opacity="0.5" />
      <circle cx="78" cy="52" r="6" fill="#f0c0c8" opacity="0.5" />
    </>
  ),
};

export default function ZodiacIcon({ zodiac, className = 'w-20 h-20' }: ZodiacIconProps) {
  return (
    <svg viewBox="0 0 120 120" className={className} xmlns="http://www.w3.org/2000/svg">
      {ZODIAC_SVGS[zodiac]}
    </svg>
  );
}
