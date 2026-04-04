"use client";

import React, { useCallback, useState } from "react";
import { useAutoRefresh } from "@/hooks/useAutoRefresh";
import { supabase } from "@/lib/supabase";
import { type RelatorioDiario, DIAS, OKR, META_DIA } from "@/types/relatorio";
import KpiCard from "@/components/blessy/KpiCard";
import Callout from "@/components/blessy/Callout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function fmt(val: number | null | undefined): string {
  if (val == null) return "—";
  return "R$ " + val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(val: number, total: number): string {
  if (!val || !total) return "—";
  return (val / total * 100).toFixed(1) + "%";
}

interface S07TrackerProps {
  isActive: boolean;
  onEdit?: (item: RelatorioDiario) => void;
}

export default function S07Tracker({ isActive, onEdit }: S07TrackerProps) {
  const [dados, setDados] = useState<RelatorioDiario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    setError(false);
    const { data, error: err } = await supabase
      .from("relatorio_diario")
      .select("*")
      .order("dia", { ascending: true });
    setLoading(false);
    if (err) { setError(true); return; }
    setDados(data ?? []);
  }, []);

  const excluir = useCallback(async (dia: number) => {
    if (!confirm(`Excluir relatório do Dia ${dia}?`)) return;
    setDeleting(dia);
    await supabase.from("relatorio_diario").delete().eq("dia", dia);
    setDeleting(null);
    carregar();
  }, [carregar]);

  useAutoRefresh(carregar, 5 * 60 * 1000, isActive);

  const totalGMV = dados.reduce((sum, d) => sum + (d.gmv_total ?? 0), 0);
  const okrVariant = totalGMV >= OKR ? "positive" : totalGMV >= OKR * 0.5 ? "warning" : "default";

  // Calcula meta ajustada por dia: redistribui déficit dos dias lançados
  function calcMetaAjustada(): Record<number, number> {
    const metas: Record<number, number> = {};
    let acumuladoGMV = 0;

    for (let d = 1; d <= 7; d++) {
      const item = dados.find((x) => x.dia === d);
      const diasRestantes = 7 - d + 1;

      if (item) {
        // Dia já lançado: meta era o que faltava dividido pelos dias restantes (incluindo este)
        const faltava = OKR - acumuladoGMV;
        metas[d] = Math.max(0, faltava / diasRestantes);
        acumuladoGMV += item.gmv_total;
      } else {
        // Dia futuro: redistribui o que falta pelos dias restantes
        const falta = Math.max(0, OKR - acumuladoGMV);
        metas[d] = falta / diasRestantes;
      }
    }
    return metas;
  }

  const metasAjustadas = calcMetaAjustada();
  const diasRestantes = 7 - dados.length;
  const metaAjustadaHoje = diasRestantes > 0
    ? Math.max(0, OKR - totalGMV) / diasRestantes
    : 0;

  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        Tracker de GMV
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        Dados em tempo real — alimentados por Isabel via aba &quot;Lançar Relatório&quot;
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3.5 mb-6">
        <KpiCard label="OKR" value="R$ 196.991" sub="Meta da campanha 🌼" variant="positive" />
        <KpiCard
          label="Realizado"
          value={loading ? "..." : fmt(totalGMV)}
          sub="Acumulado até agora"
          variant={okrVariant}
        />
        <KpiCard
          label="% do OKR"
          value={loading ? "..." : fmtPct(totalGMV, OKR)}
          sub="Progresso acumulado"
        />
        <KpiCard
          label="Falta"
          value={loading ? "..." : fmt(Math.max(0, OKR - totalGMV))}
          sub="Para atingir o OKR"
        />
        <KpiCard
          label="Meta Diária Ajustada"
          value={loading ? "..." : diasRestantes > 0 ? fmt(metaAjustadaHoje) : "—"}
          sub={diasRestantes > 0 ? `${diasRestantes} dia${diasRestantes > 1 ? "s" : ""} restante${diasRestantes > 1 ? "s" : ""}` : "Campanha encerrada"}
          variant={metaAjustadaHoje > META_DIA * 1.3 ? "negative" : metaAjustadaHoje > META_DIA ? "warning" : "positive"}
        />
      </div>

      {/* Barra de progresso do OKR */}
      {!loading && (
        <div className="mb-6 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bricolage text-[0.82rem] font-semibold text-green-dark">
              Progresso do OKR
            </span>
            <span className={cn(
              "font-bricolage text-[0.9rem] font-bold",
              totalGMV >= OKR ? "text-green-accent" : totalGMV >= OKR * 0.5 ? "text-amber-blessy" : "text-charcoal"
            )}>
              {fmtPct(totalGMV, OKR)}
            </span>
          </div>
          <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-out",
                totalGMV >= OKR ? "bg-green-accent" : totalGMV >= OKR * 0.7 ? "bg-green-accent" : totalGMV >= OKR * 0.5 ? "bg-amber-blessy" : "bg-green-accent"
              )}
              style={{ width: `${Math.min((totalGMV / OKR) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1.5 text-[0.65rem] text-gray-400">
            <span>R$ 0</span>
            <span>{fmt(totalGMV)} de {fmt(OKR)}</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto mb-5 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3.5 pb-0">
          <span className="font-bricolage text-[0.82rem] font-semibold text-charcoal">
            Tracker Diário — War Room 4.4
          </span>
          <Button
            variant="outline"
            size="sm"
            className="text-[0.7rem] h-7"
            onClick={carregar}
            disabled={loading}
          >
            ↻ Atualizar
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dia</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Meta</TableHead>
              <TableHead>GMV Total</TableHead>
              <TableHead>% Meta</TableHead>
              <TableHead>Vídeos</TableHead>
              <TableHead>Lives</TableHead>
              <TableHead>Top Hook</TableHead>
              <TableHead>Top GMV</TableHead>
              <TableHead>Contingência</TableHead>
              <TableHead>Obs.</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={12} className="text-gray-400 italic text-center py-6">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={12} className="text-red-blessy italic text-center py-6">
                  Erro ao carregar dados. Clique em ↻ Atualizar.
                </TableCell>
              </TableRow>
            ) : (
              Array.from({ length: 7 }, (_, i) => i + 1).map((d) => {
                const item = dados.find((x) => x.dia === d);
                const metaDia = metasAjustadas[d] ?? META_DIA;
                const pct = item ? (item.gmv_total / metaDia) * 100 : 0;
                const isHighlight = item && item.gmv_total >= metaDia;
                const metaChanged = Math.abs(metaDia - META_DIA) > 1;
                const isExpanded = expanded === d;
                const hasDetail = item && (item.video_top_retencao_hook || item.video_top_gmv || item.observacoes);
                return item ? (
                  <React.Fragment key={d}>
                  <TableRow
                    className={cn(
                      isHighlight && "bg-lime/10 font-semibold",
                      hasDetail && "cursor-pointer hover:bg-gray-50/80"
                    )}
                    onClick={() => hasDetail && setExpanded(isExpanded ? null : d)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {hasDetail && (
                          <span className={cn("text-[0.6rem] text-gray-400 transition-transform", isExpanded && "rotate-90")}>▶</span>
                        )}
                        <strong>D{d}</strong>
                      </div>
                    </TableCell>
                    <TableCell>{DIAS[d]}</TableCell>
                    <TableCell className={cn(metaChanged && metaDia > META_DIA && "text-red-blessy font-semibold", metaChanged && metaDia < META_DIA && "text-green-accent font-semibold")}>
                      {fmt(metaDia)}
                    </TableCell>
                    <TableCell>{fmt(item.gmv_total)}</TableCell>
                    <TableCell
                      className={cn(
                        pct >= 100 ? "text-green-accent font-semibold" :
                        pct >= 70 ? "text-amber-blessy font-semibold" :
                        "text-red-blessy font-semibold"
                      )}
                    >
                      {pct.toFixed(1)}%
                    </TableCell>
                    <TableCell>{item.videos_publicados ?? "—"}</TableCell>
                    <TableCell>{item.lives_realizadas ?? "—"}</TableCell>
                    <TableCell className="max-w-[120px] truncate">
                      {item.video_top_retencao_hook ? "📎 Ver detalhes" : "—"}
                    </TableCell>
                    <TableCell className="max-w-[120px] truncate">
                      {item.video_top_gmv ? "📎 Ver detalhes" : "—"}
                    </TableCell>
                    <TableCell>
                      {item.contingencia_acionada ? (
                        <Badge variant="outline" className="text-amber-blessy border-amber-blessy text-[0.65rem]">Sim</Badge>
                      ) : (
                        <span className="text-gray-400 text-[0.7rem]">Não</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[140px] truncate text-gray-500">
                      {item.observacoes ? "📎 Ver detalhes" : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[0.68rem] h-6 px-2 text-blue-blessy hover:text-blue-blessy/80"
                            onClick={() => onEdit(item)}
                          >
                            Editar
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[0.68rem] h-6 px-2 text-red-blessy hover:text-red-blessy/80"
                          onClick={() => excluir(item.dia)}
                          disabled={deleting === item.dia}
                        >
                          {deleting === item.dia ? "..." : "🗑️"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  {isExpanded && (
                    <TableRow className="bg-gray-50/50">
                      <TableCell colSpan={12} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[0.75rem]">
                          {item.video_top_retencao_hook && (
                            <div>
                              <div className="font-semibold text-green-dark text-[0.7rem] uppercase tracking-wide mb-1">
                                🎯 Top Hook / Retenção
                              </div>
                              <div className="text-charcoal whitespace-pre-wrap leading-relaxed break-all">
                                {item.video_top_retencao_hook}
                              </div>
                            </div>
                          )}
                          {item.video_top_gmv && (
                            <div>
                              <div className="font-semibold text-green-dark text-[0.7rem] uppercase tracking-wide mb-1">
                                💰 Top GMV
                              </div>
                              <div className="text-charcoal whitespace-pre-wrap leading-relaxed break-all">
                                {item.video_top_gmv}
                              </div>
                            </div>
                          )}
                          {item.observacoes && (
                            <div>
                              <div className="font-semibold text-green-dark text-[0.7rem] uppercase tracking-wide mb-1">
                                📝 Observações
                              </div>
                              <div className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                                {item.observacoes}
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                  </React.Fragment>
                ) : (
                  <TableRow key={d}>
                    <TableCell><strong>D{d}</strong></TableCell>
                    <TableCell>{DIAS[d]}</TableCell>
                    <TableCell className={cn(metaChanged && metaDia > META_DIA && "text-red-blessy font-semibold", metaChanged && metaDia < META_DIA && "text-green-accent font-semibold")}>
                      {fmt(metaDia)}
                    </TableCell>
                    <TableCell colSpan={9} className="text-gray-400 italic">
                      Aguardando lançamento de Isabel
                    </TableCell>
                  </TableRow>
                );
              })
            )}
            <TableRow className="font-bold bg-gray-50 border-t-2 border-gray-200">
              <TableCell colSpan={2}><strong>Total</strong></TableCell>
              <TableCell>R$ 196.991</TableCell>
              <TableCell>{fmt(totalGMV)}</TableCell>
              <TableCell>{fmtPct(totalGMV, OKR)}</TableCell>
              <TableCell colSpan={7} />
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Callout variant="amber">
        <strong>Como funciona:</strong> Isabel lança o relatório de cada dia na aba &quot;📥 Lançar
        Relatório&quot;. Os dados aparecem aqui automaticamente. Clique em &quot;↻ Atualizar&quot;
        para forçar a atualização.
      </Callout>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
