import ActionCard from "@/components/blessy/ActionCard";

export default function S02Acoes() {
  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        Ações Internas
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        Iniciativas paralelas à campanha — responsáveis e entregáveis
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 mb-6">
        <ActionCard
          title="1. Dashboard War Room"
          border="green"
          items={[
            "GMV + relatório de métricas por dia",
            "Felipe constrói → Isabel alimenta",
            "Atualizado diariamente às 23h",
          ]}
        />
        <ActionCard
          title="2. Gatilho + Contingência"
          border="red"
          items={[
            "Verificação diária do ritmo vs meta",
            "Plano de contingência a definir (Felipe)",
            "Carol aciona se GMV < 70% da meta às 18h",
          ]}
        />
        <ActionCard
          title="3. Gamificação"
          border="amber"
          items={[
            "Top 3 creators por GMV ganham prêmio",
            "Bônus de time se atingir OKR",
            "Felipe anuncia no grupo no D1",
          ]}
        />
        <ActionCard
          title="4. Boletim do Dia"
          border="blue"
          items={[
            "Relatório de sucesso diário para creators",
            "Carol produz e envia antes das 10h",
            "Inclui GMV do dia anterior + ranking",
          ]}
        />
        <ActionCard
          title="5. Cadência Grupo + 1 a 1"
          border="blue"
          items={[
            "Mensagens de urgência no grupo de afiliados",
            "Cadência individual por nível de performance",
            "Carol executa — narrativa de campanha",
          ]}
        />
        <ActionCard
          title="6. Vendas Próprias"
          border="green"
          items={[
            "Live diária 19h–20h — perfil @oiblessy (Felipe)",
            "Lives Renata Lima — cadência a definir",
            "Sprints de vídeos — Renata + Felipe",
          ]}
        />
      </div>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
