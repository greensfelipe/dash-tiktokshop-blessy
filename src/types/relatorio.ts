import { z } from "zod";

export interface RelatorioDiario {
  id: number;
  dia: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  data: string;
  meta: number;
  gmv_total: number;
  videos_publicados: number | null;
  lives_realizadas: number | null;
  video_top_retencao_hook: string | null;
  video_top_gmv: string | null;
  contingencia_acionada: boolean;
  observacoes: string | null;
  created_at: string;
  updated_at: string;
}

export type RelatorioDiarioInsert = Omit<
  RelatorioDiario,
  "id" | "created_at" | "updated_at"
>;

export const relatorioSchema = z.object({
  dia: z.number().min(1, "Selecione o dia").max(7),
  gmv_total: z.number().positive("GMV deve ser positivo"),
  videos_publicados: z.number().int().optional(),
  lives_realizadas: z.number().int().optional(),
  video_top_retencao_hook: z.string().optional(),
  video_top_gmv: z.string().optional(),
  contingencia_acionada: z.boolean(),
  observacoes: z.string().optional(),
});

export type RelatorioFormValues = z.infer<typeof relatorioSchema>;

export const DIAS: Record<number, string> = {
  1: "03/04 Sex",
  2: "04/04 Sab",
  3: "05/04 Dom 🐣",
  4: "06/04 Seg",
  5: "07/04 Ter",
  6: "08/04 Qua",
  7: "09/04 Qui",
};

export const OKR = 196991;
export const META_DIA = 28141.57;

export const DIAS_DATA: Record<number, string> = {
  1: "2026-04-03",
  2: "2026-04-04",
  3: "2026-04-05",
  4: "2026-04-06",
  5: "2026-04-07",
  6: "2026-04-08",
  7: "2026-04-09",
};
