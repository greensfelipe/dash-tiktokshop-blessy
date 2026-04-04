import { forwardRef } from "react";
import type { BoletimFormValues } from "@/types/boletim";
import { DIAS } from "@/types/relatorio";

interface BoletimPreviewProps {
  data: BoletimFormValues;
}

const SECTIONS = [
  { key: "fase_campanha" as const, icon: "📊", label: "Fase da Campanha" },
  { key: "video_performatico" as const, icon: "🔥", label: "Vídeo Mais Performático (Ontem)" },
  { key: "top_videos_promo" as const, icon: "🏆", label: "Top Vídeos da Promo" },
  { key: "roteiros_ganchos" as const, icon: "🎬", label: "Roteiros / Ganchos do Dia" },
  { key: "trend_musica_viral" as const, icon: "🎵", label: "Trend / Música Viral pra Experimentar" },
];

// Fontes do sistema para garantir que html2canvas renderize corretamente
const FONT_BODY = "Arial, Helvetica, sans-serif";
const FONT_HEADING = "Arial Black, Arial, Helvetica, sans-serif";

const BoletimPreview = forwardRef<HTMLDivElement, BoletimPreviewProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: 420,
          fontFamily: FONT_BODY,
          background: "linear-gradient(180deg, #12382B 0%, #1a5c46 100%)",
          borderRadius: 20,
          padding: 32,
          color: "#fff",
          wordSpacing: "0.05em",
          letterSpacing: "0.01em",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              display: "inline-block",
              background: "rgba(191,249,164,0.2)",
              border: "1px solid rgba(191,249,164,0.4)",
              borderRadius: 99,
              padding: "4px 16px",
              fontSize: 11,
              fontWeight: 700,
              fontFamily: FONT_BODY,
              color: "#BFF9A4",
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
              marginBottom: 12,
              wordSpacing: "0.1em",
            }}
          >
            War Room 4.4 · TikTok Shop
          </div>
          <h1
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 26,
              fontWeight: 900,
              color: "#BFF9A4",
              margin: "0 0 4px",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              wordSpacing: "0.05em",
            }}
          >
            Boletim do Dia
          </h1>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              fontFamily: FONT_BODY,
              wordSpacing: "0.05em",
            }}
          >
            {data.dia ? `Dia ${data.dia} · ${DIAS[data.dia] ?? ""}` : ""}
          </p>
        </div>

        {/* Content sections */}
        {SECTIONS.map((section) => {
          const value = data[section.key];
          if (!value) return null;
          return (
            <div
              key={section.key}
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: FONT_BODY,
                  color: "#BFF9A4",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.06em",
                  marginBottom: 6,
                  wordSpacing: "0.1em",
                }}
              >
                {section.icon} {section.label}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontFamily: FONT_BODY,
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.7,
                  whiteSpace: "pre-wrap" as const,
                  wordSpacing: "0.05em",
                  letterSpacing: "0.01em",
                }}
              >
                {value}
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            paddingTop: 14,
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              fontFamily: FONT_HEADING,
              fontSize: 14,
              fontWeight: 900,
              color: "#BFF9A4",
              wordSpacing: "0.05em",
            }}
          >
            Blessy Greens & Superfoods 🌿
          </div>
          <div
            style={{
              fontSize: 10,
              fontFamily: FONT_BODY,
              color: "rgba(255,255,255,0.35)",
              marginTop: 4,
              wordSpacing: "0.05em",
            }}
          >
            Promo 4.4 · Bora bater essa meta! 💪
          </div>
        </div>
      </div>
    );
  }
);

BoletimPreview.displayName = "BoletimPreview";
export default BoletimPreview;
