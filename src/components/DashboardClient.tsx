"use client";

import { useState, useCallback } from "react";
import Sidebar from "./layout/Sidebar";
import NavIndicator from "./layout/NavIndicator";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
import type { RelatorioDiario } from "@/types/relatorio";
import S00Abertura from "./sections/S00Abertura";
import S01MetaOkr from "./sections/S01MetaOkr";
import S02Acoes from "./sections/S02Acoes";
import S03Responsabilidades from "./sections/S03Responsabilidades";
import S04Rotina from "./sections/S04Rotina";
import S05Gamificacao from "./sections/S05Gamificacao";
import S06Lives from "./sections/S06Lives";
import S07Tracker from "./sections/S07Tracker";
import S08Relatorio from "./sections/S08Relatorio";

const SECTIONS = ["s00", "s01", "s02", "s03", "s04", "s05", "s06", "s07", "s08"];

export default function DashboardClient() {
  const [active, setActive] = useState("s00");
  const [editData, setEditData] = useState<RelatorioDiario | null>(null);
  useKeyboardNav(SECTIONS, active, setActive);

  const handleEdit = useCallback((item: RelatorioDiario) => {
    setEditData(item);
    setActive("s08");
  }, []);

  const handleFormDone = useCallback(() => {
    setEditData(null);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      <Sidebar active={active} onNavigate={(id) => { setActive(id); if (id !== "s08") setEditData(null); }} />
      <main className="ml-[260px] flex-1 overflow-y-auto px-10 py-8 pb-16">
        {active === "s00" && <S00Abertura />}
        {active === "s01" && <S01MetaOkr />}
        {active === "s02" && <S02Acoes />}
        {active === "s03" && <S03Responsabilidades />}
        {active === "s04" && <S04Rotina />}
        {active === "s05" && <S05Gamificacao />}
        {active === "s06" && <S06Lives />}
        {active === "s07" && <S07Tracker isActive={active === "s07"} onEdit={handleEdit} />}
        {active === "s08" && <S08Relatorio editData={editData} onDone={handleFormDone} />}
      </main>
      <NavIndicator />
    </div>
  );
}
