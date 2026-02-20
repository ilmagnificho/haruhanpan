'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white border-b border-border px-4 py-3">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-[28px] font-bold text-primary">하루한판</span>
        <span className="text-[16px] text-text-secondary mt-1">매일 새로운 재미</span>
      </Link>
    </header>
  );
}
