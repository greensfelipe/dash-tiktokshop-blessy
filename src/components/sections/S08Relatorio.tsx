"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { RelatorioDiario } from "@/types/relatorio";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import {
  relatorioSchema,
  type RelatorioFormValues,
  type RelatorioDiarioInsert,
  DIAS_DATA,
} from "@/types/relatorio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Callout from "@/components/blessy/Callout";
import { cn } from "@/lib/utils";

const DIAS_OPTIONS = [
  { value: "1", label: "Dia 1 — 03/04 Sex" },
  { value: "2", label: "Dia 2 — 04/04 Sab" },
  { value: "3", label: "Dia 3 — 05/04 Dom 🐣" },
  { value: "4", label: "Dia 4 — 06/04 Seg" },
  { value: "5", label: "Dia 5 — 07/04 Ter" },
  { value: "6", label: "Dia 6 — 08/04 Qua" },
  { value: "7", label: "Dia 7 — 09/04 Qui" },
];

interface S08RelatorioProps {
  editData?: RelatorioDiario | null;
  onDone?: () => void;
}

export default function S08Relatorio({ editData, onDone }: S08RelatorioProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const isEditing = !!editData;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RelatorioFormValues>({
    resolver: zodResolver(relatorioSchema),
    defaultValues: { contingencia_acionada: false },
  });

  useEffect(() => {
    if (editData) {
      setValue("dia", editData.dia);
      setValue("gmv_total", editData.gmv_total);
      setValue("videos_publicados", editData.videos_publicados ?? undefined);
      setValue("lives_realizadas", editData.lives_realizadas ?? undefined);
      setValue("video_top_retencao_hook", editData.video_top_retencao_hook ?? "");
      setValue("video_top_gmv", editData.video_top_gmv ?? "");
      setValue("contingencia_acionada", editData.contingencia_acionada);
      setValue("observacoes", editData.observacoes ?? "");
      setStatus("idle");
    }
  }, [editData, setValue]);

  const contingencia = watch("contingencia_acionada");

  async function onSubmit(values: RelatorioFormValues) {
    setStatus("idle");

    const payload: RelatorioDiarioInsert = {
      dia: values.dia as 1 | 2 | 3 | 4 | 5 | 6 | 7,
      data: DIAS_DATA[values.dia],
      meta: 28141.57,
      gmv_total: values.gmv_total,
      videos_publicados: values.videos_publicados ?? null,
      lives_realizadas: values.lives_realizadas ?? null,
      video_top_retencao_hook: values.video_top_retencao_hook || null,
      video_top_gmv: values.video_top_gmv || null,
      contingencia_acionada: values.contingencia_acionada,
      observacoes: values.observacoes || null,
    };

    const { error } = await supabase
      .from("relatorio_diario")
      .upsert(payload, { onConflict: "dia" });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setStatus("success");
    reset();
    onDone?.();
  }

  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        {isEditing ? "✏️ Editar Relatório" : "📥 Lançar Relatório do Dia"}
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        {isEditing
          ? `Editando relatório do Dia ${editData.dia} — corrija os campos e salve`
          : "Isabel preenche este formulário ao fechar cada dia — os dados atualizam o Tracker automaticamente"}
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-7 mb-6 max-w-[640px]"
      >
        <h3 className="font-bricolage text-[1.2rem] font-bold text-green-dark mb-1.5">
          Relatório de Fechamento
        </h3>
        <p className="text-[0.78rem] text-gray-500 mb-5">
          Preencha todos os campos e clique em Salvar. Os dados aparecem no Tracker (aba 07)
          imediatamente.
        </p>

        {/* Dia */}
        <div className="mb-4">
          <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
            Dia da campanha
          </label>
          <Select
            value={watch("dia")?.toString() ?? ""}
            onValueChange={(v) => setValue("dia", Number(v))}
          >
            <SelectTrigger className={cn(errors.dia && "border-red-blessy")}>
              <SelectValue placeholder="Selecione o dia" />
            </SelectTrigger>
            <SelectContent>
              {DIAS_OPTIONS.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.dia && (
            <p className="text-[0.7rem] text-red-blessy mt-1">{errors.dia.message}</p>
          )}
        </div>

        {/* GMV Total */}
        <div className="mb-4">
          <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
            GMV Total do Dia (R$)
          </label>
          <Input
            type="number"
            step="0.01"
            min="0"
            placeholder="ex: 32500.00"
            {...register("gmv_total", { valueAsNumber: true })}
            className={cn(errors.gmv_total && "border-red-blessy")}
          />
          {errors.gmv_total && (
            <p className="text-[0.7rem] text-red-blessy mt-1">{errors.gmv_total.message}</p>
          )}
        </div>

        {/* Vídeos + Lives */}
        <div className="grid grid-cols-2 gap-3.5 mb-4">
          <div>
            <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
              Vídeos Publicados
            </label>
            <Input type="number" min="0" placeholder="ex: 6" {...register("videos_publicados", { valueAsNumber: true })} />
          </div>
          <div>
            <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
              Lives Realizadas
            </label>
            <Input type="number" min="0" placeholder="ex: 2" {...register("lives_realizadas", { valueAsNumber: true })} />
          </div>
        </div>

        {/* Hook */}
        <div className="mb-4">
          <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
            Vídeo Top Retenção / Hook
          </label>
          <Input
            type="text"
            placeholder="ex: 'POV sem blessy vs com blessy' ou link do vídeo"
            {...register("video_top_retencao_hook")}
          />
        </div>

        {/* Top GMV */}
        <div className="mb-4">
          <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
            Vídeo Top GMV
          </label>
          <Input
            type="text"
            placeholder="ex: 'live Renata 19h' ou link do vídeo"
            {...register("video_top_gmv")}
          />
        </div>

        {/* Contingência */}
        <div className="mb-4">
          <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
            Contingência Acionada?
          </label>
          <label className="flex items-center gap-2.5 px-3.5 py-2.5 border border-gray-300 rounded-lg cursor-pointer hover:border-green-accent hover:bg-green-50/30 transition-colors">
            <Checkbox
              checked={contingencia}
              onCheckedChange={(v) => setValue("contingencia_acionada", Boolean(v))}
            />
            <span className="text-[0.82rem] text-charcoal">
              Sim — contingência foi acionada hoje
            </span>
          </label>
        </div>

        {/* Observações */}
        <div className="mb-4">
          <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
            Observações do Dia
          </label>
          <Textarea
            rows={3}
            placeholder="Contexto do dia, o que funcionou, o que não funcionou, ajustes para amanhã..."
            {...register("observacoes")}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-dark text-lime hover:bg-green-mid mt-2 font-semibold"
        >
          {isSubmitting ? "Salvando..." : isEditing ? "✏️ Atualizar Relatório" : "💾 Salvar Relatório"}
        </Button>

        {status === "success" && (
          <div className="mt-3 px-3.5 py-2.5 rounded-lg bg-green-50 border border-green-accent text-green-800 text-[0.78rem]">
            ✅ Relatório {isEditing ? "atualizado" : "salvo"} com sucesso! O Tracker foi atualizado.
          </div>
        )}
        {status === "error" && (
          <div className="mt-3 px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-blessy text-red-700 text-[0.78rem]">
            Erro ao salvar. Tente novamente. Detalhe: {errorMsg}
          </div>
        )}
      </form>

      <Callout variant="blue">
        <strong>Dica para Carol:</strong> Após Isabel salvar o relatório, abra a aba{" "}
        <strong>Tracker de GMV (07)</strong> e clique em <strong>↻ Atualizar</strong> para ver os
        dados atualizados e usar no boletim do dia seguinte.
      </Callout>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
