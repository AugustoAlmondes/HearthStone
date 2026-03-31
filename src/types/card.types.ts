import { z } from "zod";

export type CardType = "Magia" | "Criatura";

export type CardClass = "Mago" | "Paladino" | "Caçador" | "Druida" | "Qualquer";


export interface Card {
  id: string;
  nome: string;
  descricao: string;
  ataque: number;
  defesa: number;
  mana: number;
  tipo: CardType;
  classe: CardClass;
}

export const cardSchema = z.object({
  nome: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(60, "Nome muito longo"),
  descricao: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(300, "Descrição muito longa"),
  ataque: z
    .number({ error: "Informe um número" })
    .int()
    .min(0)
    .max(10, "Máximo 10"),
  defesa: z
    .number({ error: "Informe um número" })
    .int()
    .min(0)
    .max(10, "Máximo 10"),
  mana: z
    .number({ error: "Informe um número" })
    .int()
    .min(0)
    .max(10, "Máximo 10"),
  tipo: z.enum(["Magia", "Criatura"]),
  classe: z.enum(["Mago", "Paladino", "Caçador", "Druida", "Qualquer"]),
});

export type CardFormData = z.infer<typeof cardSchema>;
