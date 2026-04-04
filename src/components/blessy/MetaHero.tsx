interface MetaHeroProps {
  title: string;
  value: string;
  sub: string;
  metrics: { label: string; value: string }[];
}

export default function MetaHero({ title, value, sub, metrics }: MetaHeroProps) {
  return (
    <div className="bg-green-dark rounded-2xl px-8 py-7 mb-6 text-white">
      <div className="text-[0.72rem] uppercase tracking-[0.08em] text-white/50 mb-1">{title}</div>
      <div className="font-bricolage text-[2.8rem] font-extrabold text-lime leading-none mb-1.5">
        {value}
      </div>
      <div className="text-[0.8rem] text-white/60">{sub}</div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="text-[0.65rem] uppercase tracking-[0.06em] text-white/45 mb-0.5">
              {m.label}
            </div>
            <div className="font-bricolage text-[1.2rem] font-bold text-white">{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
