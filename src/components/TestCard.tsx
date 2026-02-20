import Link from 'next/link';

interface TestCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  gradient?: string;
}

export default function TestCard({ href, icon, title, description, highlight, badge, gradient }: TestCardProps) {
  return (
    <Link href={href} className="block">
      <div
        className={`relative overflow-hidden rounded-3xl shadow-lg transition-transform active:scale-[0.97] ${
          highlight
            ? 'bg-gradient-to-br from-primary to-[#FF6B4A] text-white p-6'
            : `bg-card p-5 ${gradient || ''}`
        }`}
      >
        {badge && (
          <span className={`absolute top-3 right-3 text-[13px] font-bold px-3 py-1 rounded-full ${
            highlight ? 'bg-white/25 text-white' : 'bg-primary/10 text-primary'
          }`}>
            {badge}
          </span>
        )}
        <div className="flex items-center gap-4">
          <span className={`text-[52px] flex-shrink-0 ${highlight ? 'drop-shadow-lg' : ''}`}>{icon}</span>
          <div className="flex-1 min-w-0">
            <h2 className={`text-senior-lg font-bold ${highlight ? 'text-white' : 'text-text-primary'}`}>
              {title}
            </h2>
            <p className={`text-[17px] mt-1 ${highlight ? 'text-white/85' : 'text-text-secondary'}`}>
              {description}
            </p>
          </div>
        </div>
        <div className={`mt-4 text-right`}>
          <span className={`inline-block text-senior-xs font-bold px-5 py-2.5 rounded-full ${
            highlight
              ? 'bg-white/25 text-white'
              : 'bg-primary/10 text-primary'
          }`}>
            시작하기 →
          </span>
        </div>
      </div>
    </Link>
  );
}
