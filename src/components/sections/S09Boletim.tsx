"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabase";
import {
  boletimSchema,
  type BoletimFormValues,
  type BoletimDiario,
} from "@/types/boletim";
import { DIAS } from "@/types/relatorio";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Callout from "@/components/blessy/Callout";
import BoletimPreview from "@/components/blessy/BoletimPreview";
import { cn } from "@/lib/utils";

const DIAS_OPTIONS = [
  { value: "1", label: "Dia 1 — 03/04 Sex" },
  { value: "2", label: "Dia 2 — 04/04 Sab" },
  { value: "3", label: "Dia 3 — 05/04 Dom" },
  { value: "4", label: "Dia 4 — 06/04 Seg" },
  { value: "5", label: "Dia 5 — 07/04 Ter" },
  { value: "6", label: "Dia 6 — 08/04 Qua" },
  { value: "7", label: "Dia 7 — 09/04 Qui" },
];

const FORM_FIELDS = [
  { key: "fase_campanha" as const, label: "Fase da Campanha", placeholder: "Ex: Dia 2 de 7 — esquentando! Já passamos de R$ 50k acumulados..." },
  { key: "video_performatico" as const, label: "Video Mais Performatico (Ontem)", placeholder: "Ex: 'POV: antes vs depois do Blessy' da @criadora — 45k views, 320 vendas" },
  { key: "top_videos_promo" as const, label: "Top Videos da Promo", placeholder: "Ex: 1. POV rotina manhã (120k views)\n2. Unboxing Blessy (85k views)\n3. Comparativo greens (62k views)" },
  { key: "roteiros_ganchos" as const, label: "Roteiros / Ganchos do Dia", placeholder: "Ex: 'Você sabia que 70% das mulheres...'\n'POV: sua amiga te convenceu a experimentar'\n'3 motivos pra trocar seu green'" },
  { key: "trend_musica_viral" as const, label: "Trend / Musica Viral pra Experimentar", placeholder: "Ex: Som viral 'Nasci pra isso' — usar com transição antes/depois\nTrend do 'get ready with me' — encaixar Blessy na rotina" },
];

export default function S09Boletim() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [historico, setHistorico] = useState<BoletimDiario[]>([]);
  const [generating, setGenerating] = useState(false);
  const [viewingId, setViewingId] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BoletimFormValues>({
    resolver: zodResolver(boletimSchema),
  });

  const formValues = watch();
  const hasContent = formValues.dia && formValues.fase_campanha;

  const carregarHistorico = useCallback(async () => {
    const { data } = await supabase
      .from("boletim_diario")
      .select("*")
      .order("dia", { ascending: false });
    if (data) setHistorico(data);
  }, []);

  useEffect(() => {
    carregarHistorico();
  }, [carregarHistorico]);

  async function onSubmit(values: BoletimFormValues) {
    setStatus("idle");

    const { error } = await supabase
      .from("boletim_diario")
      .upsert(values, { onConflict: "dia" });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    setStatus("success");
    carregarHistorico();
  }

  async function gerarPDF() {
    if (!previewRef.current) return;
    setGenerating(true);

    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      // Aguarda fonts do sistema renderizarem
      await document.fonts.ready;

      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });

      const imgWidth = 420;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Extrai URLs de todos os campos
      const allText = [
        formValues.fase_campanha,
        formValues.video_performatico,
        formValues.top_videos_promo,
        formValues.roteiros_ganchos,
        formValues.trend_musica_viral,
      ].join("\n");
      const urlRegex = /https?:\/\/[^\s,)]+/g;
      const urls = [...new Set(allText.match(urlRegex) || [])];

      // Se há links, aumenta o PDF para incluir seção de links
      const linksBlockH = urls.length > 0 ? 50 + urls.length * 18 : 0;
      const totalH = imgHeight + 40 + linksBlockH;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [imgWidth + 40, totalH],
      });

      // Fundo para a área de links (se houver)
      if (urls.length > 0) {
        pdf.setFillColor(18, 56, 43);
        pdf.rect(0, 0, imgWidth + 40, totalH, "F");
      }

      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 20, 20, imgWidth, imgHeight);

      // Seção de links clicáveis
      if (urls.length > 0) {
        let linkY = imgHeight + 40;

        // Linha separadora
        pdf.setDrawColor(191, 249, 164, 80);
        pdf.line(30, linkY, imgWidth + 10, linkY);
        linkY += 18;

        // Título
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(191, 249, 164);
        pdf.text("🔗  Links mencionados (clique para abrir)", 30, linkY);
        linkY += 16;

        // Links clicáveis
        pdf.setFontSize(9.5);
        pdf.setFont("helvetica", "normal");
        for (const url of urls) {
          // Trunca se muito longo para exibir
          const display = url.length > 65 ? url.slice(0, 62) + "..." : url;
          pdf.setTextColor(160, 220, 255);
          pdf.textWithLink(display, 30, linkY, { url });
          linkY += 18;
        }
      }

      pdf.save(`boletim-dia-${formValues.dia}.pdf`);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  }

  function carregarBoletim(boletim: BoletimDiario) {
    setValue("dia", boletim.dia);
    setValue("fase_campanha", boletim.fase_campanha);
    setValue("video_performatico", boletim.video_performatico);
    setValue("top_videos_promo", boletim.top_videos_promo);
    setValue("roteiros_ganchos", boletim.roteiros_ganchos);
    setValue("trend_musica_viral", boletim.trend_musica_viral);
    setViewingId(boletim.id);
    setStatus("idle");
  }

  async function excluirBoletim(id: number) {
    if (!confirm("Excluir este boletim?")) return;
    await supabase.from("boletim_diario").delete().eq("id", id);
    carregarHistorico();
    if (viewingId === id) {
      reset();
      setViewingId(null);
    }
  }

  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        📋 Boletim Diário para Creators
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        Carol preenche, gera o PDF e envia às creators pelo grupo, A1 ou Stories
      </p>

      <div className="flex gap-6 items-start">
        {/* Formulário */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-7 mb-6 flex-1 min-w-0"
        >
          <h3 className="font-bricolage text-[1.2rem] font-bold text-green-dark mb-1.5">
            {viewingId ? "Editar Boletim" : "Novo Boletim"}
          </h3>
          <p className="text-[0.78rem] text-gray-500 mb-5">
            Preencha as seções e veja o preview ao vivo ao lado. Salve e gere o PDF quando pronto.
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

          {/* Campos de texto */}
          {FORM_FIELDS.map((field) => (
            <div key={field.key} className="mb-4">
              <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
                {field.label}
              </label>
              <Textarea
                rows={3}
                placeholder={field.placeholder}
                {...register(field.key)}
                className={cn(errors[field.key] && "border-red-blessy")}
              />
              {errors[field.key] && (
                <p className="text-[0.7rem] text-red-blessy mt-1">
                  {errors[field.key]?.message}
                </p>
              )}
            </div>
          ))}

          <div className="flex gap-3 mt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-dark text-lime hover:bg-green-mid font-semibold"
            >
              {isSubmitting ? "Salvando..." : "💾 Salvar Boletim"}
            </Button>
            {hasContent && (
              <Button
                type="button"
                variant="outline"
                disabled={generating}
                onClick={gerarPDF}
                className="font-semibold"
              >
                {generating ? "Gerando..." : "📄 Gerar PDF"}
              </Button>
            )}
            {viewingId && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => { reset(); setViewingId(null); setStatus("idle"); }}
                className="text-gray-500"
              >
                Novo boletim
              </Button>
            )}
          </div>

          {status === "success" && (
            <div className="mt-3 px-3.5 py-2.5 rounded-lg bg-green-50 border border-green-accent text-green-800 text-[0.78rem]">
              Boletim salvo com sucesso!
            </div>
          )}
          {status === "error" && (
            <div className="mt-3 px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-blessy text-red-700 text-[0.78rem]">
              Erro ao salvar: {errorMsg}
            </div>
          )}
        </form>

        {/* Preview */}
        <div className="flex-shrink-0 sticky top-8">
          <p className="text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-2 text-center">
            Preview do Boletim
          </p>
          <div style={{ transform: "scale(0.85)", transformOrigin: "top center" }}>
            <BoletimPreview ref={previewRef} data={formValues} />
          </div>
        </div>
      </div>

      {/* Histórico */}
      {historico.length > 0 && (
        <div className="mt-8">
          <h3 className="font-bricolage text-[1.15rem] font-bold text-green-dark mb-3.5">
            Boletins Enviados
          </h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            {historico.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bricolage font-bold text-green-dark text-[0.9rem]">
                    Dia {b.dia}
                  </span>
                  <span className="text-[0.65rem] text-gray-400">
                    {DIAS[b.dia]}
                  </span>
                </div>
                <p className="text-[0.72rem] text-gray-500 line-clamp-2 leading-snug">
                  {b.fase_campanha}
                </p>
                <div className="flex gap-2 mt-auto pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[0.68rem] h-6 px-2 text-blue-blessy"
                    onClick={() => carregarBoletim(b)}
                  >
                    Abrir
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[0.68rem] h-6 px-2 text-red-blessy"
                    onClick={() => excluirBoletim(b.id)}
                  >
                    🗑️
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Callout variant="blue">
        <strong>Fluxo:</strong> Carol preenche os campos com as informações do dia, confere o
        preview ao lado, clica em <strong>Salvar</strong> para registrar e depois em{" "}
        <strong>Gerar PDF</strong> para baixar. O PDF pode ser enviado no grupo de creators, A1
        ou nos Stories.
      </Callout>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
