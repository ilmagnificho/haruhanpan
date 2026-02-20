'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-[#E85D4A] px-5 py-4 shadow-md">
      <Link href="/" className="flex items-center gap-3">
        <span className="text-[32px] font-bold text-white drop-shadow-sm">하루한판</span>
        <span className="text-[15px] text-white/80 mt-1">매일 새로운 재미</span>
      </Link>
    </header>
  );
}
