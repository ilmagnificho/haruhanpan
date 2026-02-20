import Link from 'next/link';

interface TestCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  badgeColor?: 'red' | 'green' | 'blue';
  gradient?: string;
}

const BADGE_COLORS = {
  red: 'bg-red-100 text-red-600',
  green: 'bg-green-100 text-green-600',
  blue: 'bg-blue-100 text-blue-600',
};

export default function TestCard({ href, icon, title, description, highlight, badge, badgeColor, gradient }: TestCardProps) {
  return (
    <Link href={href} className="block group">
      <div
        className={`relative overflow-hidden rounded-3xl senior-shadow transition-transform active:scale-[0.97] ${
          highlight
            ? 'bg-gradient-to-br from-primary to-[#FF6B4A] text-white p-8'
            : `bg-card p-8 ${gradient || ''}`
        }`}
      >
        <div className="flex items-start gap-6">
          <div className={`flex-shrink-0 p-4 rounded-2xl ${
            highlight ? 'bg-white/20' : 'bg-primary/5'
          }`}>
            <span className="text-5xl block">{icon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h2 className={`text-[26px] font-bold ${highlight ? 'text-white' : 'text-text-primary'}`}>
                {title}
              </h2>
              {badge && (
                <span className={`text-xs px-2 py-1 rounded font-bold ${
                  highlight
                    ? 'bg-white/30 text-white'
                    : badgeColor
                      ? BADGE_COLORS[badgeColor]
                      : 'bg-primary/10 text-primary'
                }`}>
                  {badge}
                </span>
              )}
            </div>
            <p className={`text-senior-sm leading-relaxed mb-6 ${highlight ? 'text-white/90' : 'text-text-secondary'}`}>
              {description}
            </p>
            <button className={`px-8 py-3 rounded-full font-black text-xl flex items-center gap-2 active:scale-95 transition-transform ${
              highlight
                ? 'bg-white text-primary'
                : 'bg-orange-50 text-primary border border-orange-100'
            }`}>
              시작하기
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
