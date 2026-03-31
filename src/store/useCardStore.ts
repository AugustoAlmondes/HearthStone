import { cardService } from "../services/cardService";
import { type Card, type CardFormData } from "../types/card.types";
import { create } from 'zustand';
import { seedCards } from "../data/seedCards";

interface CardStore {
    cards: Card[];
    selectedCard: Card | null;
    isFormOpen: boolean;

    loadCards: () => void;
    createCard: (data: CardFormData) => void;
    updateCard: (id: number, data: CardFormData) => void;
    deleteCard: (id: number) => void;
    selectCard: (card: Card | null) => void;
    openForm: (card?: Card) => void;
    closeForm: () => void;
}

export const useCardStore = create<CardStore>((set, get) => ({
    cards: [],
    selectedCard: null,
    isFormOpen: false,

    loadCards: () => {
        let cards = cardService.getAll();
        
        // Limpa e recarrega os seeds se o storage estiver vazio ou se for dados antigos (uuid em string)
        const isOldData = cards.length > 0 && typeof cards[0].id === 'string';
        if (cards.length === 0 || isOldData) {
            cardService.save(seedCards);
            cards = seedCards;
        }
        
        set({ cards });
    },

    createCard: (data) => {
        const { cards } = get();

        if (cards.length >= 30) {
            throw new Error("O baralho atingiu o limite máximo de 30 cartas.");
        }

        const duplicatas = cards.filter(c => c.nome.toLowerCase() === data.nome.toLowerCase());
        if (duplicatas.length >= 2) {
            throw new Error("Não é possível ter mais de duas cópias da mesma carta no baralho.");
        }

        const nextId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
        const newCard: Card = { id: nextId, ...data };
        
        const updated = cardService.create(cards, newCard);
        set({ cards: updated, isFormOpen: false, selectedCard: null });
    },

    updateCard: (id, data) => {
        const { cards } = get();

        // Verifica duplicatas ignorando a própria carta que está sendo editada
        const duplicatas = cards.filter(c => c.id !== id && c.nome.toLowerCase() === data.nome.toLowerCase());
        if (duplicatas.length >= 2) {
            throw new Error("Não é possível ter mais de duas cópias da mesma carta no baralho.");
        }

        const updated = cardService.update(cards, { id, ...data });
        set({ cards: updated, isFormOpen: false, selectedCard: null })
    },

    deleteCard: (id) => {
        const updated = cardService.delete(get().cards, id);
        set({ cards: updated });
    },

    selectCard: (card) => set({ selectedCard: card }),

    openForm: (card = undefined) => {
        set({ isFormOpen: true, selectedCard: card ?? null })
    },

    closeForm: () => {
        set({ isFormOpen: false, selectedCard: null })
    }
}))