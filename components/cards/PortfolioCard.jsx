"use client";
import Link from 'next/link'
export default function PortfolioCard({ item }) {
  const targetRoute = item.type === 'achievements' ? 'achievements' : 'blog';

  return (
    // 2. Wrap your entire layout structure in Next.js Link
    <Link
      href={`/${targetRoute}/${item.id}`}
      className="group block h-full w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-[#6EDD4D]/40 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(110,221,77,0.05)] cursor-pointer"
    >
      <div className="bg-[#121212] border border-neutral-900 rounded-2xl overflow-hidden flex flex-col group hover:border-neutral-800 transition duration-300">
        <div className="relative h-56 w-full overflow-hidden bg-neutral-800">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
          />
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-neutral-900 border border-neutral-800 text-[10px] font-bold tracking-widest text-neutral-400 px-2.5 py-1 rounded">
                {item.category}
              </span>
              <span className="text-[10px] font-bold tracking-wider text-amber-500 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                {item.status}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-3 tracking-tight text-white group-hover:text-[#22c55e] transition">
              {item.title}
            </h3>
            <p className="text-neutral-400 text-xs leading-relaxed mb-6">
              {item.description}
            </p>
          </div>

          <div className="bg-[#181818] border border-neutral-900/50 p-4 rounded-xl">
            <div className="flex items-center gap-1.5 text-[#22c55e] text-[10px] font-extrabold uppercase tracking-wider mb-1">
              <span>⚡</span> SCOPE
            </div>
            <p className="text-neutral-400 text-[11px] font-medium leading-normal line-clamp-2">
              {item.scope}
            </p>
          </div>
        </div>

      </div>
    </Link>
  );
}