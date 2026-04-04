import MetaHero from "@/components/blessy/MetaHero";
import KpiCard from "@/components/blessy/KpiCard";
import Callout from "@/components/blessy/Callout";

export default function S01MetaOkr() {
  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        Meta &amp; OKR
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        Números da War Room 4.4 — TikTok Shop
      </p>

      <MetaHero
        title="OKR da War Room 4.4"
        value="R$ 196.991"
        sub="50% da meta de abril · 03–09/04/2026 · 7 dias"
        metrics={[
          { label: "Meta diária", value: "R$ 28.141" },
          { label: "Meta de abril", value: "R$ 393.982" },
          { label: "Período", value: "7 dias" },
        ]}
      />

      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5 mb-6">
        <KpiCard label="GMV Orgânico" value="A definir" sub="Vídeos + lives" />
        <KpiCard label="GMV Max" value="A definir" sub="Budget a confirmar" />
        <KpiCard label="ROAS Alvo" value="A definir" sub="Felipe define na abertura" variant="warning" />
        <KpiCard label="Afiliados Ativos" value="A definir" sub="Meta de creators" />
      </div>

      <Callout variant="amber">
        <strong>Distribuição da meta:</strong> O OKR de R$ 196.991 deve vir de três frentes —
        vendas orgânicas (vídeos + lives), tráfego pago via GMV Max e performance de afiliados.
        Felipe define o split na abertura da War Room.
      </Callout>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
