import ActionCard from "@/components/blessy/ActionCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function S03Responsabilidades() {
  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        Responsabilidades
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        Sprints e entregas por pessoa durante a War Room
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4 mb-7">
        <ActionCard
          title="Felipe — Estratégia & Lives"
          border="green"
          items={[
            "Marcar + apresentar War Room para o time",
            "Construir o Dashboard da War Room",
            "Definir gatilho + plano de contingência",
            "Definir gamificação da campanha",
            "Briefar Renata + sprintar produção dela",
            "Abrir live diária — perfil Blessy",
          ]}
        />
        <ActionCard
          title="Isabel — Análise & Relatório"
          border="blue"
          items={[
            "Rotina de análise + GMV Max",
            "Lançar relatório diário no painel (aba 08)",
            "Subir dashboard — ciclo de feedback diário",
          ]}
        />
        <ActionCard
          title="Carol — Creators & Cadência"
          border="amber"
          items={[
            "Produzir template: boletim diário para creators",
            "Escrever cadência de grupo com narrativa de urgência",
            "Escrever cadência 1 a 1 por natureza de performance",
            "Huntar creators no IG usando narrativa de campanha",
          ]}
        />
      </div>

      <h3 className="font-bricolage text-[1.15rem] font-bold text-green-dark mt-7 mb-3.5">
        Consolidado de Sprints
      </h3>
      <div className="overflow-x-auto mb-5 rounded-xl border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pessoa</TableHead>
              <TableHead>Área</TableHead>
              <TableHead>Entregável</TableHead>
              <TableHead>Prazo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">Felipe</TableCell>
              <TableCell>Estratégia</TableCell>
              <TableCell>Dashboard + abertura da War Room</TableCell>
              <TableCell>D1 — 03/04</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Felipe</TableCell>
              <TableCell>Lives</TableCell>
              <TableCell>Live diária 19h–20h + briefing Renata</TableCell>
              <TableCell>D1 a D7</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Isabel</TableCell>
              <TableCell>Dados</TableCell>
              <TableCell>Relatório diário + GMV Max</TableCell>
              <TableCell>D1 a D7 · 23h</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-semibold">Carol</TableCell>
              <TableCell>Creators</TableCell>
              <TableCell>Boletim + cadência grupo + 1 a 1</TableCell>
              <TableCell>D1 a D7 · 10h</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
