import Link from 'next/link';

interface TestCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export default function TestCard({ href, icon, title, description, highlight }: TestCardProps) {
  return (
    <Link href={href} className="block">
      <div
        className={`bg-card rounded-2xl shadow-md p-5 flex items-center gap-4 transition-transform active:scale-[0.97] ${
          highlight ? 'ring-2 ring-primary' : ''
        }`}
      >
        <span className="text-[40px] flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <h2 className="text-senior-lg font-bold text-text-primary">{title}</h2>
          <p className="text-senior-xs text-text-secondary mt-1">{description}</p>
        </div>
        <span className="text-senior-sm text-primary font-bold flex-shrink-0">
          시작 &gt;
        </span>
      </div>
    </Link>
  );
}
