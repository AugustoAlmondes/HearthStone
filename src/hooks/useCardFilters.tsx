import { useMemo } from "react";
import type { Card, CardClass, CardType } from "../types/card.types";

export interface CardFilters {
    search: string;
    classe: CardClass | "";
    tipo: CardType | "";
}

export default function useCardFilters(cards: Card[], filters: CardFilters): Card[] {
    return useMemo(() => {
        return cards.filter((card) => {
            const matchSearch =
                filters.search === '' ||
                card.id.toString() === filters.search.trim() ||
                card.nome.toLowerCase().includes(filters.search.toLowerCase());
            const matchClasse =
                filters.classe === '' || card.classe === filters.classe;
            const matchTipo =
                filters.tipo === '' || card.tipo === filters.tipo

            return matchSearch && matchClasse && matchTipo;
        })
    }, [cards, filters])
}