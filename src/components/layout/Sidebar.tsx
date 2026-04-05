"use client";

import { cn } from "@/lib/utils";

const NAV_GROUPS = [
  {
    label: "Visão Geral",
    items: [
      { id: "s00", num: "00", label: "Abertura" },
      { id: "s01", num: "01", label: "Meta & OKR" },
    ],
  },
  {
    label: "Estrutura",
    items: [
      { id: "s02", num: "02", label: "Ações Internas" },
      { id: "s03", num: "03", label: "Responsabilidades" },
      { id: "s04", num: "04", label: "Rotina Diária" },
    ],
  },
  {
    label: "Execução",
    items: [
      { id: "s05", num: "05", label: "Gamificação" },
      { id: "s06", num: "06", label: "Lives & Sprints" },
    ],
  },
  {
    label: "Dados",
    items: [
      { id: "s07", num: "07", label: "Tracker de GMV" },
      { id: "s08", num: "08", label: "📥 Lançar Relatório" },
      { id: "s09", num: "09", label: "📋 Boletim Creators" },
      { id: "s10", num: "10", label: "🎬 Banco de Vídeos" },
    ],
  },
];

interface SidebarProps {
  active: string;
  onNavigate: (id: string) => void;
}

export default function Sidebar({ active, onNavigate }: SidebarProps) {
  return (
    <nav className="fixed left-0 top-0 bottom-0 w-[260px] bg-green-dark text-white overflow-y-auto z-50 flex flex-col">
      <div className="px-[18px] py-5 border-b border-white/10">
        <h2 className="font-bricolage text-[1.1rem] font-bold text-lime mb-0.5">
          Blessy Greens
        </h2>
        <p className="text-[0.65rem] opacity-60">War Room 4.4 · TikTok Shop</p>
      </div>

      <div className="flex-1">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="pt-2.5 pb-1">
            <p className="text-[0.6rem] uppercase tracking-[0.12em] text-white/35 px-[18px] mb-1 font-semibold">
              {group.label}
            </p>
            {group.items.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={cn(
                  "w-full flex items-center gap-2 px-[18px] py-[7px] text-[0.73rem] text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/6 hover:text-white text-left",
                  active === item.id &&
                    "bg-lime/8 text-lime border-l-lime font-medium"
                )}
              >
                <span className="text-[0.6rem] opacity-50 min-w-[18px] font-semibold font-bricolage">
                  {item.num}
                </span>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="px-[18px] py-3.5 border-t border-white/8 text-[0.6rem] opacity-35 text-center">
        War Room 4.4 · TikTok Shop
        <br />
        OKR: R$ 196.991 · R$ 28.141/dia
      </div>
    </nav>
  );
}
