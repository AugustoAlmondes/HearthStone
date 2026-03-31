import { type Card } from "../types/card.types";

const STORAGE_KEY = "hs_cards";

export const cardService = {

    getAll(): Card[] {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        try {
            return JSON.parse(raw) as Card[];
        } catch {
            return []
        }
    },

    save(cards: Card[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    },

    create(cards: Card[], newCard: Card): Card[] {
        const update = [...cards, newCard];
        cardService.save(update);
        return update;
    },

    update(cards: Card[], updated: Card): Card[] {
        const next = cards.map((c) => (c.id === updated.id ? updated : c))
        cardService.save(next);
        return next;
    },

    delete(cards: Card[], id: number): Card[] {
        const next = cards.filter((c) => c.id !== id);
        cardService.save(next);
        return next;
    }
}