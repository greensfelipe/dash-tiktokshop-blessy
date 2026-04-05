"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { VideoLink } from "@/types/video";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Callout from "@/components/blessy/Callout";
import { cn } from "@/lib/utils";

export default function S10Videos() {
  const [videos, setVideos] = useState<VideoLink[]>([]);
  const [url, setUrl] = useState("");
  const [descricao, setDescricao] = useState("");
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"todos" | "pendentes" | "selecionados">("todos");

  const carregar = useCallback(async () => {
    const { data } = await supabase
      .from("video_links")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setVideos(data);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function adicionarVideo() {
    if (!url.trim()) return;
    setSaving(true);

    // Suporta múltiplos links (um por linha)
    const urls = url
      .split("\n")
      .map((u) => u.trim())
      .filter((u) => u.length > 0);

    for (const u of urls) {
      await supabase.from("video_links").insert({
        url: u,
        descricao: descricao.trim() || null,
      });
    }

    setUrl("");
    setDescricao("");
    setSaving(false);
    carregar();
  }

  async function toggleSelecionado(id: number, current: boolean) {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, selecionado: !current } : v))
    );
    await supabase.from("video_links").update({ selecionado: !current }).eq("id", id);
  }

  async function excluir(id: number) {
    if (!confirm("Excluir este vídeo?")) return;
    await supabase.from("video_links").delete().eq("id", id);
    carregar();
  }

  const filtered = videos.filter((v) => {
    if (filter === "pendentes") return !v.selecionado;
    if (filter === "selecionados") return v.selecionado;
    return true;
  });

  const totalVideos = videos.length;
  const selecionados = videos.filter((v) => v.selecionado).length;
  const pendentes = totalVideos - selecionados;

  return (
    <div>
      <h1 className="font-bricolage text-[1.8rem] font-extrabold text-green-dark mb-1">
        🎬 Banco de Vídeos — GMV Max
      </h1>
      <p className="text-[0.85rem] text-gray-500 mb-7">
        Carol sobe os links · Isabel seleciona quais vai usar na campanha
      </p>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3.5 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
          <div className="text-[0.7rem] text-gray-500 font-medium uppercase tracking-wide mb-1">Total</div>
          <div className="font-bricolage text-[1.4rem] font-bold text-charcoal">{totalVideos}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
          <div className="text-[0.7rem] text-gray-500 font-medium uppercase tracking-wide mb-1">Pendentes</div>
          <div className="font-bricolage text-[1.4rem] font-bold text-amber-blessy">{pendentes}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
          <div className="text-[0.7rem] text-gray-500 font-medium uppercase tracking-wide mb-1">Selecionados</div>
          <div className="font-bricolage text-[1.4rem] font-bold text-green-accent">{selecionados}</div>
        </div>
      </div>

      {/* Form de upload */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 mb-6 max-w-[600px]">
        <h3 className="font-bricolage text-[1rem] font-bold text-green-dark mb-1">
          Adicionar Vídeos
        </h3>
        <p className="text-[0.72rem] text-gray-500 mb-4">
          Cole os links do TikTok — um por linha para adicionar vários de uma vez
        </p>

        <div className="mb-3">
          <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
            Link(s) do TikTok
          </label>
          <Textarea
            rows={3}
            placeholder={"https://www.tiktok.com/@creator/video/123\nhttps://www.tiktok.com/@creator/video/456"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-[0.72rem] font-semibold text-charcoal uppercase tracking-[0.04em] mb-1.5">
            Descrição (opcional)
          </label>
          <Input
            type="text"
            placeholder="ex: Vídeos da @criadora sobre rotina matinal"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <Button
          onClick={adicionarVideo}
          disabled={saving || !url.trim()}
          className="bg-green-dark text-lime hover:bg-green-mid font-semibold"
        >
          {saving ? "Salvando..." : "➕ Adicionar Vídeos"}
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        {(["todos", "pendentes", "selecionados"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[0.72rem] font-semibold transition-colors capitalize",
              filter === f
                ? "bg-green-dark text-lime"
                : "bg-white border border-gray-200 text-gray-500 hover:border-green-accent"
            )}
          >
            {f} {f === "pendentes" ? `(${pendentes})` : f === "selecionados" ? `(${selecionados})` : `(${totalVideos})`}
          </button>
        ))}
      </div>

      {/* Lista de vídeos */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center text-gray-400 text-[0.82rem]">
            {filter === "todos"
              ? "Nenhum vídeo adicionado ainda. Carol adiciona os links acima."
              : filter === "pendentes"
              ? "Nenhum vídeo pendente — Isabel selecionou todos!"
              : "Nenhum vídeo selecionado ainda."}
          </div>
        ) : (
          filtered.map((video) => (
            <div
              key={video.id}
              className={cn(
                "bg-white rounded-xl border shadow-sm px-4 py-3 flex items-center gap-3 transition-colors",
                video.selecionado
                  ? "border-green-accent/40 bg-green-50/30"
                  : "border-gray-200"
              )}
            >
              {/* Checkbox para Isabel */}
              <Checkbox
                checked={video.selecionado}
                onCheckedChange={() => toggleSelecionado(video.id, video.selecionado)}
                className="flex-shrink-0"
              />

              {/* Conteúdo */}
              <div className="flex-1 min-w-0">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "text-[0.78rem] font-medium break-all hover:underline",
                    video.selecionado ? "text-green-accent" : "text-blue-blessy"
                  )}
                >
                  {video.url}
                </a>
                {video.descricao && (
                  <p className="text-[0.7rem] text-gray-500 mt-0.5">{video.descricao}</p>
                )}
                <p className="text-[0.6rem] text-gray-400 mt-0.5">
                  {new Date(video.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Status */}
              {video.selecionado ? (
                <Badge className="bg-green-accent text-white text-[0.6rem] flex-shrink-0">
                  Selecionado
                </Badge>
              ) : (
                <Badge variant="outline" className="text-amber-blessy border-amber-blessy text-[0.6rem] flex-shrink-0">
                  Pendente
                </Badge>
              )}

              {/* Excluir */}
              <Button
                variant="ghost"
                size="sm"
                className="text-[0.68rem] h-6 px-2 text-red-blessy hover:text-red-blessy/80 flex-shrink-0"
                onClick={() => excluir(video.id)}
              >
                🗑️
              </Button>
            </div>
          ))
        )}
      </div>

      <Callout variant="blue">
        <strong>Fluxo:</strong> Carol cola os links dos vídeos que quer subir para GMV Max.
        Isabel acessa esta aba, clica no checkbox dos vídeos que vai usar e marca como{" "}
        <strong>Selecionado</strong>. Vídeos não selecionados ficam como Pendente — Carol sabe
        exatamente o que foi usado.
      </Callout>

      <div className="mt-10 pt-4 border-t border-gray-200 text-[0.65rem] text-gray-400 text-center">
        Blessy Greens &amp; Superfoods · War Room 4.4 · Uso Interno
      </div>
    </div>
  );
}
