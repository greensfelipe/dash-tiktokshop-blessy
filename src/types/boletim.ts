import { z } from "zod";

export interface BoletimDiario {
  id: number;
  dia: number;
  fase_campanha: string;
  video_performatico: string;
  top_videos_promo: string;
  roteiros_ganchos: string;
  trend_musica_viral: string;
  created_at: string;
  updated_at: string;
}

export const boletimSchema = z.object({
  dia: z.number().min(1, "Selecione o dia").max(7),
  fase_campanha: z.string().min(1, "Preencha a fase da campanha"),
  video_performatico: z.string().min(1, "Preencha o vídeo mais performático"),
  top_videos_promo: z.string().min(1, "Preencha os top vídeos"),
  roteiros_ganchos: z.string().min(1, "Preencha os roteiros/ganchos"),
  trend_musica_viral: z.string().min(1, "Preencha a trend/música viral"),
});

export type BoletimFormValues = z.infer<typeof boletimSchema>;
