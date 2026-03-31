import { z } from "zod";

export type CardType = "Magia" | "Criatura";
export const CARD_TYPES: CardType[] = ["Magia", "Criatura"];

export type CardClass = "Mago" | "Paladino" | "Caçador" | "Druida" | "Qualquer";
export const CARD_CLASSES: CardClass[] = ["Mago", "Paladino", "Caçador", "Druida", "Qualquer"];


export interface Card {
  id: string;
  name: string;
  description: string;
  attack: number;
  defense: number;
  mana: number;
  type: CardType;
  class: CardClass;
}

export const cardSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(60, "Nome muito longo"),
  description: z
    .string()
    .min(1, "Descrição é obrigatória")
    .max(300, "Descrição muito longa"),
  attack: z
    .number({ error: "Informe um número" })
    .int()
    .min(0)
    .max(10, "Máximo 10"),
  defense: z
    .number({ error: "Informe um número" })
    .int()
    .min(0)
    .max(10, "Máximo 10"),
  mana: z
    .number({ error: "Informe um número" })
    .int()
    .min(0)
    .max(10, "Máximo 10"),
  type: z.enum(["Magia", "Criatura"]),
  class: z.enum(["Mago", "Paladino", "Caçador", "Druida", "Qualquer"]),
});

export type CardFormData = z.infer<typeof cardSchema>;
