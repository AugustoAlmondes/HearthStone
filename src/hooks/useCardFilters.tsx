import { useMemo } from "react";
import type { Card, CardClass, CardType } from "../types/card.types";

export interface CardFilters {
    search: string;
    class: CardClass | "";
    type: CardType | "";

}

export default function useCardFilters(cards: Card[], filters: CardFilters): Card[] {
    return useMemo(() => {
        return cards.filter((card) => {
            const matchSearch =
                filters.search === '' ||
                card.id === filters.search ||
                card.name.toLowerCase().includes(filters.search.toLowerCase());
            const matchClass =
                filters.class === '' || card.class === filters.class;
            const matchType =
                filters.type === '' || card.type === filters.type

            return matchSearch && matchClass && matchType;
        })
    }, [cards, filters])
}