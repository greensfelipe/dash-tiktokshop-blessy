import KpiCard from "@/components/blessy/KpiCard";
import PersonCard from "@/components/blessy/PersonCard";
import Callout from "@/components/blessy/Callout";

export default function S00Abertura() {
  return (
    <div>
      <div className="text-center py-16 pb-8">
        <span className="inline-block bg-green-dark text-lime text-[0.72rem] font-semibold px-3.5 py-1 rounded-full mb-4 uppercase tracking-[0.05em]">
          🔴 War Room Ativo
        </span>
        <h1 className="font-bricolage text-[2.4rem] font-extrabold text-green-dark mb-2">
          War Room 4.4
        </h1>
        <p className="text-[0.95rem] text-gray-500">
          TikTok Shop · Promo 4.4 · Blessy Greens &amp; Superfoods
        </p>
      </div>

      <Callout variant="big">
        <strong>Contexto:</strong> Entramos na Promo 4.4 do TikTok Shop. A meta de abril é R$
        393.982 e o OKR desta campanha é <strong>R$ 196.991</strong> — 50% da meta do mês a ser
        puxado no intervalo da campanha. Meta diária: <strong>R$ 28.141,57/dia</strong>.
      </Callout>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5 mb-6">
        <KpiCard label="Meta de Abril" value="R$ 393.982" sub="Faturamento total do mês" />
        <KpiCard
          label="OKR War Room"
          value="R$ 196.991"
          sub="50% da meta de abril 🌼"
          variant="positive"
        />
        <KpiCard label="Meta por Dia" value="R$ 28.141" sub="Ritmo necessário" />
        <KpiCard label="Meta de ROAS" value="A definir" sub="Felipe define na abertura" variant="warning" />
      </div>

      <h3 className="font-bricolage text-[1.15rem] font-bold text-green-dark mt-7 mb-3.5">
        Time da War Room
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 mb-6">
        <PersonCard
          name="Felipe"
          role="Estratégia, Lives & Sprints"
          color="green"
          items={[
            "Marcar + apresentar War Room para o time",
            "Construir o Dashboard da War Room",
            "Definir gatilho + plano de contingência",
            "Definir gamificação da campanha",
            "Briefar Renata + sprintar produção dela",
            "Abrir live diária — perfil Blessy",
          ]}
        />
        <PersonCard
          name="Isabel"
          role="Análise, GMV Max & Relatório"
          color="blue"
          items={[
            "Rotina de análise + GMV Max",
            "Lançar relatório diário no painel (aba 08)",
            "Subir dashboard — ciclo de feedback diário",
          ]}
        />
        <PersonCard
          name="Carol"
          role="Creators, Cadência & Boletim"
          color="purple"
          items={[
            "Produzir template: boletim diário para creators",
            "Escrever cadência de grupo com narrativa de urgência",
            "Escrever cadência 1 a 1 por natureza de performance",
            "Huntar creators no IG usando narrativa de campanha",
          ]}
        />
      </div>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
