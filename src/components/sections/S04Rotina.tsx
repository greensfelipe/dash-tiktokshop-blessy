import ScheduleRow from "@/components/blessy/ScheduleRow";
import Callout from "@/components/blessy/Callout";

export default function S04Rotina() {
  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        Rotina Diária
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        Cadência de atividades durante a War Room 4.4
      </p>

      <h3 className="font-bricolage text-[1.15rem] font-bold text-green-dark mt-7 mb-3.5">
        Manhã — Carol
      </h3>
      <ScheduleRow time="10h" title="Boletim para creators" description="Envio do relatório de sucesso do dia anterior" />
      <ScheduleRow time="10h30" title="Cadência grupo" description="Mensagem de urgência no grupo de afiliados" />
      <ScheduleRow time="11h" title="Cadência 1 a 1" description="Contato individual por nível de performance" />

      <h3 className="font-bricolage text-[1.15rem] font-bold text-green-dark mt-7 mb-3.5">
        Tarde — Carol
      </h3>
      <ScheduleRow time="18h" title="Check parcial + contingência" description="Análise do GMV parcial e decisão de contingência" />

      <h3 className="font-bricolage text-[1.15rem] font-bold text-green-dark mt-7 mb-3.5">
        Noite — Felipe
      </h3>
      <ScheduleRow time="19h–20h" title="Live de marca" description="Live diária — perfil @oiblessy" />

      <h3 className="font-bricolage text-[1.15rem] font-bold text-green-dark mt-7 mb-3.5">
        Noite — Isabel
      </h3>
      <ScheduleRow time="23h" title="Relatório de fechamento" description="Lançar dados do dia na aba 08 do dashboard" />

      <Callout variant="blue">
        <strong>Lembrete:</strong> Após Isabel salvar o relatório, Carol abre a aba{" "}
        <strong>Tracker de GMV (07)</strong> e clica em{" "}
        <strong>↻ Atualizar</strong> para usar no boletim do dia seguinte.
      </Callout>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
