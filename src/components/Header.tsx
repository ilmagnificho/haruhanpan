'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-[#E85D4A] px-5 pt-12 pb-6 shadow-md sticky top-0 z-50">
      <Link href="/" className="block text-center">
        <span className="text-4xl font-black text-white drop-shadow-sm block tracking-tight">
          하루한판
        </span>
        <span className="text-lg text-white/90 mt-1 block font-medium">
          매일 새로운 재미, 친구에게 공유하세요
        </span>
      </Link>
    </header>
  );
}
