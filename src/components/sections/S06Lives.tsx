import ActionCard from "@/components/blessy/ActionCard";
import Callout from "@/components/blessy/Callout";

export default function S06Lives() {
  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        Lives &amp; Sprints
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        Estratégia de conteúdo ao vivo e sprints de vídeo
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 mb-6">
        <ActionCard
          title="Live de Marca — Felipe"
          border="green"
          items={[
            "19h–20h todos os dias da War Room",
            "Perfil @oiblessy",
            "Foco em showcase de produto + CTA de compra",
            "Felipe ancora + interage com o chat",
          ]}
        />
        <ActionCard
          title="Lives Renata Lima"
          border="blue"
          items={[
            "Cadência a definir com Felipe",
            "Perfil da Renata + cross com @oiblessy",
            "Foco em conversão + storytelling de produto",
          ]}
        />
        <ActionCard
          title="Sprints de Vídeos — Renata"
          border="amber"
          items={[
            "Felipe briefa Renata no D1",
            "Formatos: hooks curtos, POV, comparativo",
            "Meta: X vídeos por dia (Felipe define)",
            "Prioridade: vídeos com gancho forte no 1º segundo",
          ]}
        />
      </div>

      <Callout variant="amber">
        <strong>Dica de hook:</strong> Os vídeos com melhor retenção nos últimos 30 dias usam o
        padrão <strong>&quot;POV: antes vs depois do Blessy&quot;</strong>. Priorizar esse formato
        nos sprints da War Room.
      </Callout>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
